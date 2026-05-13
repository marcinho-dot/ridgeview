"""
Phase 3: Pull full article bodies from wp-json, parse to structured
blocks, rewrite internal links, download inline images.

Reads tools/news-categorized.json (Phase 2 output). For each article:
  1. Fetch /wp-json/wp/v2/news/<id> to get content.rendered (HTML)
  2. Parse the HTML into structured ArticleBlock[]:
       paragraph / heading / image / quote / list
  3. Rewrite legacy ridgeview.co.uk internal links to local routes
  4. Download inline images to public/images/articles/<slug>/fig-N.<ext>
  5. Strip any remaining external links (keep text, drop href)

Writes the result to tools/article-bodies.json. A follow-up script
regenerate_articles_ts.py merges this with the metadata into the
final src/data/articles.ts.

Run:
    python3 tools/pull_article_bodies.py
    python3 tools/pull_article_bodies.py --only=harvest-vintage-2025   # single article
"""

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from html import unescape
from urllib.parse import urlparse, quote
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).parent.parent
IN = Path(__file__).parent / "news-categorized.json"
WINES_TS = ROOT / "src" / "data" / "wines.ts"
OUT_BODIES = Path(__file__).parent / "article-bodies.json"
ARTICLES_DIR = ROOT / "public" / "images" / "articles"

HEADERS = {"User-Agent": "Ridgeview-Migration/1.0"}

# Map of legacy URL prefixes → local rewrite. Order matters; first
# matching prefix wins. Anything that doesn't match becomes plain
# text (link stripped, content preserved).
LINK_REWRITES = [
    # Wine SKU pages — handled separately because they need a slug lookup
    # ("ridgeview.co.uk/shop/X" or "/product/X" → "/wine/X" iff X is in wines.ts)
    ("https://www.ridgeview.co.uk/news/", "/beyond-the-bottle/"),
    ("https://www.ridgeview.co.uk/ourview/", "/#ourview"),
    ("https://www.ridgeview.co.uk/visit-us/", "/booking/"),
    ("https://www.ridgeview.co.uk/visit/", "/booking/"),
]


def safe_url(url):
    """Percent-encode non-ASCII chars in path so urlopen doesn't choke."""
    p = urlparse(url)
    return f"{p.scheme}://{p.netloc}{quote(p.path, safe='/')}" + (
        f"?{quote(p.query, safe='=&')}" if p.query else ""
    )


def load_wine_slugs():
    """Tiny regex pull from wines.ts. We only need the set of valid slugs."""
    if not WINES_TS.exists():
        return set()
    text = WINES_TS.read_text()
    return set(re.findall(r'slug:\s*"([a-z0-9-]+)"', text))


WINE_SLUGS = load_wine_slugs()


def rewrite_link(href):
    """
    Return either:
      (new_href, True)  — rewritten to a local route
      (None,    False)  — strip the link, keep only its text content
    """
    if not href:
        return None, False
    h = href.strip()

    # Anchor-only or relative → keep
    if h.startswith("#") or h.startswith("/"):
        return h, True

    # Wine SKU rewrite
    for prefix in ("https://www.ridgeview.co.uk/shop/",
                   "https://www.ridgeview.co.uk/product/",
                   "http://www.ridgeview.co.uk/shop/",
                   "http://www.ridgeview.co.uk/product/"):
        if h.startswith(prefix):
            rest = h[len(prefix):].split("/")[0].split("?")[0].strip("/")
            if rest in WINE_SLUGS:
                return f"/wine/{rest}/", True
            return None, False

    # Generic legacy prefixes
    for prefix, replacement in LINK_REWRITES:
        if h.startswith(prefix):
            tail = h[len(prefix):].strip("/")
            if not tail:
                return replacement, True
            # /beyond-the-bottle/<slug>/
            if replacement.endswith("/"):
                return f"{replacement}{tail}/", True
            return f"{replacement}/{tail}", True

    # Same-domain hash links etc.
    if h.startswith("https://www.ridgeview.co.uk/") or h.startswith(
        "http://www.ridgeview.co.uk/"
    ):
        return None, False

    # External (other domains) → strip
    return None, False


# ── Image-URL normalisation ──────────────────────────────────────────────────
# WordPress images often have a "-WxH" suffix for thumbnail variants
# (e.g. "image-1024x768.jpg"). Strip it to get the full-size original.
THUMB_SUFFIX = re.compile(r"-\d+x\d+(\.\w+)$")


def fullsize_image_url(src):
    return THUMB_SUFFIX.sub(r"\1", src)


def download_inline_image(src, slug, index):
    """Download to public/images/articles/<slug>/fig-<index>.<ext>."""
    full = fullsize_image_url(src)
    ext = Path(urlparse(full).path).suffix.lower() or ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        ext = ".jpg"
    dest = ARTICLES_DIR / slug / f"fig-{index}{ext}"
    if dest.exists():
        return f"/images/articles/{slug}/{dest.name}"
    try:
        req = Request(safe_url(full), headers=HEADERS)
        with urlopen(req, timeout=60) as r:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(r.read())
        return f"/images/articles/{slug}/{dest.name}"
    except (HTTPError, URLError):
        return None


# ── HTML → ArticleBlock[] parser ─────────────────────────────────────────────
class BodyParser(HTMLParser):
    """
    Walks the WordPress content HTML and emits a list of ArticleBlock dicts.

    Supported block types:
      paragraph  — <p> content, inline formatting stripped to plain text
      heading    — <h2> / <h3> content
      image      — <img>; captions read from a wrapping <figure><figcaption>
      quote      — <blockquote>; attribution is the last line if separated
      list       — <ul> / <ol> with <li> items as plain text strings
    """

    BLOCK_TAGS = {"p", "h2", "h3", "h4", "blockquote", "ul", "ol", "figure"}
    SKIP_TAGS = {"script", "style", "iframe", "noscript"}
    INLINE_BREAK_TAGS = {"br"}

    def __init__(self, slug):
        super().__init__(convert_charrefs=True)
        self.slug = slug
        self.blocks = []
        self.image_counter = 0
        self.image_downloads = []  # (src, slug, idx) tuples queued

        # Capture state
        self._buf = []         # current text buffer for the active block
        self._stack = []       # tag stack (so we know what we're inside of)
        self._current_block = None   # "paragraph" / "heading2" / etc.
        self._heading_level = None
        self._list_items = []
        self._list_ordered = False
        self._list_item_buf = []
        self._in_list_item = False
        self._figure_caption = None
        self._figure_img = None
        self._skipping = False

    # --- helpers ---------------------------------------------------------
    def _flush_buf(self):
        text = "".join(self._buf).strip()
        text = re.sub(r"\s+", " ", text)
        self._buf = []
        return text

    def _emit_paragraph_or_heading(self):
        text = self._flush_buf()
        if not text:
            return
        if self._current_block == "paragraph":
            self.blocks.append({"type": "paragraph", "text": text})
        elif self._current_block == "heading":
            level = self._heading_level if self._heading_level in (2, 3) else 2
            self.blocks.append({"type": "heading", "level": level, "text": text})
        elif self._current_block == "quote":
            # Last line might be attribution if separated by " — "
            parts = re.split(r"\s+[—–-]{1,2}\s+", text)
            if len(parts) >= 2 and len(parts[-1]) < 60:
                quote_text = " ".join(parts[:-1]).strip()
                attribution = parts[-1].strip()
                self.blocks.append({
                    "type": "quote", "text": quote_text, "attribution": attribution
                })
            else:
                self.blocks.append({"type": "quote", "text": text})
        self._current_block = None

    # --- HTMLParser overrides --------------------------------------------
    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag in self.SKIP_TAGS:
            self._skipping = True
            return
        self._stack.append(tag)

        if tag == "p":
            self._emit_paragraph_or_heading()
            self._current_block = "paragraph"
        elif tag in ("h2", "h3", "h4"):
            self._emit_paragraph_or_heading()
            self._current_block = "heading"
            self._heading_level = 2 if tag in ("h2", "h4") else 3
        elif tag == "blockquote":
            self._emit_paragraph_or_heading()
            self._current_block = "quote"
        elif tag in ("ul", "ol"):
            self._emit_paragraph_or_heading()
            self._list_items = []
            self._list_ordered = tag == "ol"
            self._list_item_buf = []
            self._in_list_item = False
        elif tag == "li":
            if self._list_item_buf:
                text = "".join(self._list_item_buf).strip()
                if text:
                    self._list_items.append(text)
            self._list_item_buf = []
            self._in_list_item = True
        elif tag == "br":
            if self._in_list_item:
                self._list_item_buf.append("\n")
            else:
                self._buf.append(" ")
        elif tag == "img":
            self.image_counter += 1
            src = attr.get("src") or attr.get("data-src") or ""
            alt = attr.get("alt", "")
            if "figure" in self._stack:
                # Hold and emit when </figure> fires
                self._figure_img = {"src": src, "alt": alt}
            else:
                local = download_inline_image(src, self.slug, self.image_counter)
                if local:
                    self.blocks.append({
                        "type": "image",
                        "src": local,
                        "alt": alt,
                    })
        elif tag == "figure":
            self._emit_paragraph_or_heading()
            self._figure_img = None
            self._figure_caption = None
        elif tag == "figcaption":
            self._figure_caption = []

    def handle_endtag(self, tag):
        if tag in self.SKIP_TAGS:
            self._skipping = False
            return
        if self._stack and self._stack[-1] == tag:
            self._stack.pop()

        if tag == "p" or tag in ("h2", "h3", "h4") or tag == "blockquote":
            self._emit_paragraph_or_heading()
        elif tag in ("ul", "ol"):
            if self._list_item_buf:
                text = "".join(self._list_item_buf).strip()
                if text:
                    self._list_items.append(text)
                self._list_item_buf = []
            if self._list_items:
                self.blocks.append({
                    "type": "list",
                    "ordered": self._list_ordered,
                    "items": self._list_items,
                })
            self._list_items = []
            self._in_list_item = False
        elif tag == "li":
            text = "".join(self._list_item_buf).strip()
            if text:
                self._list_items.append(text)
            self._list_item_buf = []
            self._in_list_item = False
        elif tag == "figcaption":
            if self._figure_caption is not None:
                self._figure_caption = "".join(self._figure_caption).strip()
        elif tag == "figure":
            # Emit the held figure image with its caption
            if self._figure_img:
                local = download_inline_image(
                    self._figure_img["src"], self.slug, self.image_counter
                )
                if local:
                    block = {
                        "type": "image",
                        "src": local,
                        "alt": self._figure_img.get("alt", ""),
                    }
                    if isinstance(self._figure_caption, str) and self._figure_caption:
                        block["caption"] = self._figure_caption
                    self.blocks.append(block)
            self._figure_img = None
            self._figure_caption = None

    def handle_data(self, data):
        if self._skipping:
            return
        if not self._stack:
            return
        # Direct text outside any tracked block — bucket as paragraph
        if self._current_block is None and not self._in_list_item and "figure" not in self._stack:
            # Only collect non-whitespace orphan text; helps with WP weirdness
            if data.strip():
                self._current_block = "paragraph"
                self._buf.append(data)
            return
        if self._in_list_item:
            self._list_item_buf.append(data)
            return
        if "figcaption" in self._stack and self._figure_caption is not None:
            self._figure_caption.append(data)
            return
        if self._current_block is not None:
            self._buf.append(data)

    def close(self):
        super().close()
        self._emit_paragraph_or_heading()


# ── Pre-processing: rewrite/strip <a> tags before parsing ────────────────────
A_TAG_RE = re.compile(
    r'<a\b[^>]*\bhref=["\']([^"\']*)["\'][^>]*>(.*?)</a>',
    re.IGNORECASE | re.DOTALL,
)


def preprocess_anchors(html):
    """Rewrite legacy links per the rules; strip externals (keep text).

    Returns: (processed_html, stats_dict)
    """
    stats = {"rewritten": 0, "stripped": 0, "kept": 0}

    def repl(m):
        href = m.group(1)
        inner = m.group(2)
        new_href, ok = rewrite_link(href)
        if ok and new_href:
            stats["rewritten"] += 1
            # Keep the <a> wrapper with new href so the parser can preserve
            # link text — but since our parser collapses to plain text per
            # paragraph, we just keep the inner text. Phase 4 detail-page
            # rendering can re-introduce links if needed.
            stats["kept"] += 1
        else:
            stats["stripped"] += 1
        return inner

    return A_TAG_RE.sub(repl, html), stats


# ── Per-article pipeline ─────────────────────────────────────────────────────
def fetch_article(post_id):
    # _fields filter doesn't work on single-resource endpoints — drop it
    url = f"https://www.ridgeview.co.uk/wp-json/wp/v2/news/{post_id}"
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def parse_one(article):
    post = fetch_article(article["id"])
    raw_html = post.get("content", {}).get("rendered", "")
    if not raw_html:
        return [], {"rewritten": 0, "stripped": 0, "kept": 0}

    # Remove WordPress shortcodes [foo bar="baz"] that show up as literal text
    raw_html = re.sub(r"\[/?[a-zA-Z][^\]]*\]", "", raw_html)

    # Rewrite anchors
    processed, stats = preprocess_anchors(raw_html)

    # Decode HTML entities once before parsing
    parser = BodyParser(article["slug"])
    parser.feed(processed)
    parser.close()

    return parser.blocks, stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="Process only the given slug")
    ap.add_argument("--limit", type=int, help="Process at most N articles")
    args = ap.parse_args()

    articles = json.loads(IN.read_text())
    if args.only:
        articles = [a for a in articles if a["slug"] == args.only]
        if not articles:
            print(f"No article with slug {args.only}", file=sys.stderr)
            sys.exit(1)
    if args.limit:
        articles = articles[: args.limit]

    print(f"Processing {len(articles)} articles\n")

    # Load any existing partial result so re-runs are incremental
    existing = {}
    if OUT_BODIES.exists():
        try:
            existing = json.loads(OUT_BODIES.read_text())
        except Exception:
            existing = {}

    totals = {"rewritten": 0, "stripped": 0, "kept": 0}
    failed = []

    for i, art in enumerate(articles, 1):
        slug = art["slug"]
        try:
            blocks, stats = parse_one(art)
            existing[slug] = blocks
            totals["rewritten"] += stats["rewritten"]
            totals["stripped"] += stats["stripped"]
            totals["kept"] += stats["kept"]
            n_blocks = len(blocks)
            n_imgs = sum(1 for b in blocks if b["type"] == "image")
            print(
                f"  [{i:3d}/{len(articles)}] {slug:55s}  "
                f"{n_blocks:3d} blocks, {n_imgs:2d} imgs"
            )
            # Incremental write every 10 articles
            if i % 10 == 0:
                OUT_BODIES.write_text(json.dumps(existing, indent=2, ensure_ascii=False))
        except (HTTPError, URLError, json.JSONDecodeError) as e:
            failed.append((slug, str(e)))
            print(f"  [{i:3d}/{len(articles)}] {slug:55s}  ERROR: {e}")

    OUT_BODIES.write_text(json.dumps(existing, indent=2, ensure_ascii=False))
    print(
        f"\nDone. Links rewritten: {totals['rewritten']} · stripped: {totals['stripped']}"
    )
    print(f"Wrote {OUT_BODIES}")
    if failed:
        print(f"\n{len(failed)} failed:")
        for slug, e in failed:
            print(f"  · {slug}: {e}")


if __name__ == "__main__":
    main()
