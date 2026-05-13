"""
Authoritative 1:1 migration of article bodies from the live legacy site
https://www.ridgeview.co.uk/news/<slug>/

For each of the 83 articles in articles.ts, fetch the rendered HTML page,
extract every <div class="...modular-content-module..."> block in order,
parse heading/paragraph/list/image content into our ArticleBlock structure,
download inline images to public/images/articles/<slug>/, and rewrite
internal Ridgeview links to local routes.

Output: content/articles/<slug>.md  (then import_markdown.py merges into
src/data/articles.ts). Markdown is the intermediate format so the audit
trail matches the USB-derived articles already in place.

Run from website folder:
    python3 tools/scrape_legacy_articles.py [--only=<slug>] [--limit=N]
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).parent.parent
META = Path(__file__).parent / "news-metadata.json"
OUT_MD_DIR = ROOT / "content" / "articles"
IMAGES_OUT_DIR = ROOT / "public" / "images" / "articles"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

# Ridgeview link rewriting rules. Order matters — first match wins.
LINK_REWRITES = [
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/news/([^/?#]+)/?$"),
     r"/beyond-the-bottle/\1/"),
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/(?:shop|product)/([^/?#]+)/?$"),
     r"/wine/\1/"),
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/ourview/?$"),
     r"/#ourview"),
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/visit-us/?$"),
     r"/booking/"),
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/our-story/?$"),
     r"/"),
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/wines/?$"),
     r"/wines/"),
    # Generic ridgeview.co.uk fallback — strip to root
    (re.compile(r"^https?://(?:www\.)?ridgeview\.co\.uk/?$"),
     r"/"),
]


def safe_url(url: str) -> str:
    """Percent-encode non-ASCII chars (× etc.) so urllib doesn't choke."""
    return urllib.parse.quote(url, safe=":/?#[]@!$&'()*+,;=%")


def rewrite_link(href: str) -> str:
    """Map a ridgeview.co.uk URL to our local route, or leave external as-is."""
    for pattern, repl in LINK_REWRITES:
        if pattern.match(href):
            return pattern.sub(repl, href)
    # Any other ridgeview.co.uk URL we don't know — strip path, keep external
    return href


def fetch_page(url: str) -> str:
    req = urllib.request.Request(safe_url(url), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")


def download_image(url: str, slug: str, idx: int):
    """Download to public/images/articles/<slug>/inline-<n>.<ext> and
    return the local /-rooted path. Returns None on failure."""
    out_dir = IMAGES_OUT_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    # Strip srcset query / cache args; pick the largest variant if present
    base = url.split("?")[0]
    # WordPress images often end .jpg.webp — pick a clean ext
    ext = ".webp" if base.endswith(".webp") else (
        ".jpg" if re.search(r"\.jpe?g$", base, re.I) else (
        ".png" if base.lower().endswith(".png") else ".jpg"))
    fname = f"inline-{idx}{ext}"
    out_path = out_dir / fname
    if out_path.exists():
        return f"/images/articles/{slug}/{fname}"
    try:
        req = urllib.request.Request(safe_url(url), headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r:
            out_path.write_bytes(r.read())
        return f"/images/articles/{slug}/{fname}"
    except Exception as e:
        print(f"    image fail {url}: {e}", file=sys.stderr)
        return None


def img_real_src(img_tag):
    """Lazy-loaded WP images put the real URL in data-src; the visible
    src is a placeholder.svg. Fall back to data-srcset / src as needed."""
    for attr in ("data-src", "src"):
        v = img_tag.get(attr)
        if v and "placeholder" not in v:
            return v
    # If only srcset is set, pick the largest entry
    srcset = img_tag.get("data-srcset") or img_tag.get("srcset")
    if srcset:
        entries = [e.strip() for e in srcset.split(",")]
        # entries like "URL 1200w" — sort by width descending
        def width(e):
            m = re.search(r"(\d+)w$", e)
            return int(m.group(1)) if m else 0
        entries.sort(key=width, reverse=True)
        first = entries[0].split()[0] if entries else None
        return first
    return None


def inline_render(tag) -> str:
    """Render a bs4 element to a string with inline link markdown.
    Converts <a href="...">label</a> → [label](rewritten-href).
    Keeps plain text; strips other inline tags."""
    parts = []
    for elem in tag.children:
        if isinstance(elem, str):
            parts.append(elem)
        elif elem.name == "a":
            href = elem.get("href", "")
            label = elem.get_text(" ", strip=True)
            if href.startswith(("http://", "https://", "/")):
                new_href = rewrite_link(href)
                parts.append(f"[{label}]({new_href})")
            else:
                parts.append(label)
        elif elem.name in ("strong", "b"):
            parts.append(f"**{elem.get_text(' ', strip=True)}**")
        elif elem.name in ("em", "i"):
            parts.append(f"*{elem.get_text(' ', strip=True)}*")
        elif elem.name == "br":
            parts.append(" ")
        else:
            parts.append(elem.get_text(" ", strip=True))
    text = "".join(parts)
    return re.sub(r"\s+", " ", text).strip()


def parse_article(html: str, slug: str):
    """Walk the modular-content-module blocks of an article page and emit
    markdown lines for the body. Returns the list of markdown lines."""
    soup = BeautifulSoup(html, "html.parser")
    modules = soup.find_all(
        "div", class_=lambda c: c and "modular-content-module" in c
    )

    out: list = []
    img_idx = 0
    seen_imgs = set()

    for mod in modules:
        # Skip modules that are obviously navigation / not article content
        classes = " ".join(mod.get("class", []))
        if "hero-content" in classes:
            # Hero blocks contain just the title and a date — already in articles.ts
            continue

        # Walk every descendant of the module in document order — a single
        # modular-content-module on this WP theme can hold multiple
        # inner-container divs (one per "row"), so we can't restrict to
        # just the first one.
        for el in mod.descendants:
            if not getattr(el, "name", None):
                continue
            name = el.name
            if name == "h1":
                # Article H1 is the title — already in articles.ts. Skip.
                continue
            elif name == "h2":
                txt = inline_render(el)
                if txt:
                    out.append(f"## {txt}")
                    out.append("")
            elif name == "h3":
                txt = inline_render(el)
                if txt:
                    out.append(f"### {txt}")
                    out.append("")
            elif name == "blockquote":
                txt = inline_render(el)
                if txt:
                    out.append(f"> {txt}")
                    out.append("")
            elif name == "p":
                # Skip <p> that only contains an image or only whitespace
                if el.find("img"):
                    continue
                txt = inline_render(el)
                if txt:
                    out.append(txt)
                    out.append("")
            elif name == "li":
                # Parent is ul or ol
                ordered = el.parent.name == "ol"
                prefix = "1. " if ordered else "- "
                txt = inline_render(el)
                if txt:
                    out.append(f"{prefix}{txt}")
            elif name == "img":
                # Skip the <noscript> fallback img — same image as the
                # lazy-loaded one above it.
                if any(p.name == "noscript" for p in el.parents):
                    continue
                src = img_real_src(el)
                if not src or "placeholder" in src:
                    continue
                # Skip tiny/icon images
                if "icon" in src.lower() or src.endswith(".svg"):
                    continue
                # Skip if we already emitted this URL (some modules show
                # the same image in multiple containers)
                if src in seen_imgs:
                    continue
                seen_imgs.add(src)
                img_idx += 1
                local = download_image(src, slug, img_idx)
                if local:
                    alt = (el.get("alt") or "").strip()
                    out.append(f"![{alt}]({local})")
                    out.append("")

        # Blank line between modules for readability
        if out and out[-1] != "":
            out.append("")

    # Trim trailing blanks
    while out and not out[-1].strip():
        out.pop()
    return out


def slug_to_url(slug: str) -> str:
    return f"https://www.ridgeview.co.uk/news/{slug}/"


def write_markdown(slug: str, body_lines: list) -> Path:
    md = [f"---", f"slug: {slug}", f"---", ""]
    md.extend(body_lines)
    out = OUT_MD_DIR / f"{slug}.md"
    out.write_text("\n".join(md) + "\n", encoding="utf-8")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="Process a single slug only (for testing)")
    ap.add_argument("--limit", type=int, default=0,
                    help="Process at most this many articles")
    ap.add_argument("--sleep", type=float, default=0.5,
                    help="Polite sleep between requests (seconds)")
    args = ap.parse_args()

    meta = json.loads(META.read_text())
    if args.only:
        meta = [m for m in meta if m["slug"] == args.only]

    OUT_MD_DIR.mkdir(parents=True, exist_ok=True)

    processed = 0
    errors = []
    for art in meta:
        slug = art["slug"]
        if args.limit and processed >= args.limit:
            break

        url = slug_to_url(slug)
        try:
            html = fetch_page(url)
        except Exception as e:
            print(f"  ✗ {slug}: fetch failed: {e}")
            errors.append((slug, f"fetch: {e}"))
            continue

        try:
            lines = parse_article(html, slug)
        except Exception as e:
            print(f"  ✗ {slug}: parse failed: {e}")
            errors.append((slug, f"parse: {e}"))
            continue

        # Count actual content lines (not empty / headers)
        n_paras = sum(1 for l in lines if l and not l.startswith(("#", ">", "-", "1.")))
        n_imgs = sum(1 for l in lines if l.startswith("!["))
        n_heads = sum(1 for l in lines if l.startswith("#"))
        if not lines:
            print(f"  ~ {slug}: empty body (modular blocks not found?)")
            errors.append((slug, "empty body"))
            continue

        write_markdown(slug, lines)
        print(f"  ✓ {slug[:50]:50s}  →  {n_heads} headings, {n_paras} paras, {n_imgs} imgs")
        processed += 1
        time.sleep(args.sleep)

    print(f"\nProcessed {processed} articles.")
    if errors:
        print(f"Errors: {len(errors)}")
        for s, r in errors:
            print(f"  {s}: {r}")


if __name__ == "__main__":
    main()
