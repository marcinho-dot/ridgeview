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


def _is_real_url(v):
    """Return True if `v` looks like a real fetchable image URL (not a
    placeholder.svg or an inline data: URI)."""
    if not v:
        return False
    if v.startswith("data:"):
        return False
    if "placeholder" in v:
        return False
    return True


def img_real_src(img_tag):
    """Lazy-loaded WP images put the real URL in one of several attrs
    depending on which lazy-loader is active on the page. Different
    Ridgeview articles use different schemes — `data-src` (default WP
    theme), `data-lazy-src` (autoptimize/wp-rocket variant), or just
    `src` when no lazy-loader is active. The visible `src` is often a
    placeholder SVG (inline data: URI or .../placeholder.svg)."""
    for attr in ("data-lazy-src", "data-src", "src"):
        v = img_tag.get(attr)
        if _is_real_url(v):
            return v
    # If only srcset is set, pick the largest entry
    srcset = (img_tag.get("data-lazy-srcset")
              or img_tag.get("data-srcset")
              or img_tag.get("srcset"))
    if srcset:
        entries = [e.strip() for e in srcset.split(",")]
        # entries like "URL 1200w" — sort by width descending
        def width(e):
            m = re.search(r"(\d+)w$", e)
            return int(m.group(1)) if m else 0
        entries.sort(key=width, reverse=True)
        for e in entries:
            url = e.split()[0] if e else None
            if _is_real_url(url):
                return url
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


def emit_image(el, slug: str, img_idx_ref: list, seen_imgs: set, out: list):
    """Process one <img> tag. Returns True if emitted, False if skipped."""
    if any(p.name == "noscript" for p in el.parents):
        return False
    src = img_real_src(el)
    if not src or "placeholder" in src:
        return False
    if "icon" in src.lower() or src.endswith(".svg"):
        return False
    if src in seen_imgs:
        return False
    seen_imgs.add(src)
    img_idx_ref[0] += 1
    local = download_image(src, slug, img_idx_ref[0])
    if local:
        alt = (el.get("alt") or "").strip()
        out.append(f"![{alt}]({local})")
        out.append("")
        return True
    return False


def emit_block(el, slug: str, img_idx_ref: list, seen_imgs: set, out: list):
    """Render one HTML element (h2/h3/p/li/img/etc.) to one or more markdown lines."""
    name = el.name
    # Skip nav/breadcrumb artefacts. The legacy hero's text-half contains
    # an inline breadcrumb (<p class="breadcrumbs">Home | News | …</p>)
    # that we already render in the detail page's hero area.
    cls = " ".join(el.get("class", [])) if el.get("class") else ""
    if "breadcrumb" in cls.lower():
        return
    if name == "h1":
        return
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
        if el.find("img"):
            return
        txt = inline_render(el)
        if txt:
            out.append(txt)
            out.append("")
    elif name == "li":
        ordered = el.parent.name == "ol"
        prefix = "1. " if ordered else "- "
        txt = inline_render(el)
        if txt:
            out.append(f"{prefix}{txt}")
    elif name == "img":
        emit_image(el, slug, img_idx_ref, seen_imgs, out)


def parse_side_by_side_module(mod, slug: str, img_idx_ref: list, seen_imgs: set):
    """Render a side-by-side-module as a fenced :::side-by-side block.
    Returns the markdown lines list, or None if the module isn't actually a
    valid side-by-side (e.g. missing image or text half)."""
    halves = mod.find_all("div", class_=lambda c: c and "half-page" in c)
    if len(halves) < 2:
        return None

    # Restrict to DIRECT child halves so nested grid containers don't
    # confuse us (rare, but happens on some pages).
    direct_halves = [h for h in mod.find_all(
        "div", class_=lambda c: c and "half-page" in c, recursive=True
    ) if h.find_parent("div", class_=lambda c: c and "half-page" in c) is None
       or h.find_parent("div", class_=lambda c: c and "half-page" in c)
       not in mod.descendants]
    if direct_halves:
        halves = direct_halves[:2]

    # Classify each half: the one(s) with <img> is the image-half; the
    # other is the text-half. Class-based detection (`single-image`,
    # `image-collage`, etc.) is a hint but the article hero uses neither
    # — it just has a generic `half-page order-second` div containing
    # the bottle photo.
    image_half = None
    text_half = None
    for h in halves:
        hclasses = " ".join(h.get("class", []))
        class_says_img = (
            "single-image" in hclasses or "image-collage" in hclasses
            or "image-one" in hclasses or "image-two" in hclasses
        )
        has_img_tag = h.find("img") is not None
        if (class_says_img or has_img_tag) and image_half is None:
            image_half = h
        elif text_half is None:
            text_half = h
    if image_half is None or text_half is None:
        return None

    # imageSide is determined by which half visually comes first (order-first
    # = left column). If image is order-first → "left", else → "right".
    img_classes = " ".join(image_half.get("class", []))
    image_side = "left" if "order-first" in img_classes else "right"

    # Render image (only emit the first one if it's a collage)
    img_lines: list = []
    for img in image_half.find_all("img"):
        before = len(img_lines)
        emit_image(img, slug, img_idx_ref, seen_imgs, img_lines)
        if len(img_lines) > before:
            # Got one image — stop, side-by-side is single-image semantics
            break

    if not img_lines:
        return None  # nothing renderable, fall back to default handling

    # Render text-half content
    text_lines: list = []
    for el in text_half.descendants:
        if not getattr(el, "name", None):
            continue
        emit_block(el, slug, img_idx_ref, seen_imgs, text_lines)

    if not text_lines:
        return None

    # Compose fenced block
    block: list = [f":::side-by-side image-{image_side}"]
    block.extend(l for l in img_lines if l)
    block.append("")
    block.extend(text_lines)
    # Strip trailing blank inside the fence
    while block and not block[-1].strip():
        block.pop()
    block.append(":::")
    block.append("")
    return block


def parse_article(html: str, slug: str):
    """Walk the modular-content-module blocks of an article page and emit
    markdown lines for the body. Returns the list of markdown lines."""
    soup = BeautifulSoup(html, "html.parser")
    # Capture both "regular" modular-content-modules AND the article's hero
    # side-by-side, which lives on an inner-container that only has the
    # side-by-side-module class (no modular-content-module). The hero's
    # text-half (.standfirst, in .hero-content) holds the article's intro
    # paragraph, which we otherwise lose.
    modules = soup.find_all(
        "div",
        class_=lambda c: c and (
            "modular-content-module" in c or "side-by-side-module" in c
        ),
    )
    # Dedup: if a node already has an ancestor in the list, skip it (avoids
    # double-processing when both an outer and inner div carry the class).
    deduped = []
    for m in modules:
        if any(parent in modules for parent in m.parents):
            continue
        deduped.append(m)
    modules = deduped

    out: list = []
    img_idx_ref = [0]
    seen_imgs = set()

    for mod in modules:
        classes = " ".join(mod.get("class", []))

        # Side-by-side modules render as a fenced :::side-by-side block so
        # the renderer can do a 2-column grid (text-and-image, not stacked).
        if "side-by-side-module" in classes:
            sbs = parse_side_by_side_module(mod, slug, img_idx_ref, seen_imgs)
            if sbs:
                out.extend(sbs)
                continue
            # Fall through to default if extraction failed

        # Fallback: walk every descendant of the module in document order.
        # Used for hero-text-only blocks and any non-side-by-side modules.
        for el in mod.descendants:
            if not getattr(el, "name", None):
                continue
            emit_block(el, slug, img_idx_ref, seen_imgs, out)

        # Blank line between modules for readability
        if out and out[-1] != "":
            out.append("")

    # Trim trailing blanks
    while out and not out[-1].strip():
        out.pop()
    return out


def slug_to_url(slug: str) -> str:
    return f"https://www.ridgeview.co.uk/news/{slug}/"


def extract_display_title(html: str):
    """Return the editorial H1 from the article hero, which is often a
    stylised variant of the wp-json `title` (e.g. "ENGLISH SPARKLING
    WINE FOR EVERY FESTIVE MOMENT" vs the listing title "Wine for the
    Moments That Make Christmas Yours")."""
    soup = BeautifulSoup(html, "html.parser")
    # Prefer the H1 inside the hero-content half if present
    hero = soup.find("div", class_=lambda c: c and "hero-content" in c)
    if hero:
        h1 = hero.find("h1")
        if h1:
            return h1.get_text(" ", strip=True)
    # Fallback: first H1 on the page
    h1 = soup.find("h1")
    if h1:
        return h1.get_text(" ", strip=True)
    return None


def write_markdown(slug: str, body_lines: list, display_title: str = None) -> Path:
    md = ["---", f"slug: {slug}"]
    if display_title:
        # Quoted so the importer treats it as a string even with special chars
        md.append(f'displayTitle: "{display_title}"')
    md.append("---")
    md.append("")
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

        display_title = extract_display_title(html)
        write_markdown(slug, lines, display_title=display_title)
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
