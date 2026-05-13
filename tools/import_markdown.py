"""
Import user-supplied article bodies from markdown into articles.ts.

Workflow:
  1. User writes .md files under content/articles/<slug>.md (one per
     article, frontmatter + markdown body).
  2. User drops inline images under content/articles/_images/<slug>/
     (any name, e.g. fig-1.jpg, harvest-shot.png, etc.).
  3. Run this script. It:
       - Reads every .md file
       - Parses frontmatter + body into ArticleBlock[]
       - Copies images from content/articles/_images/<slug>/ to
         public/images/articles/<slug>/ (preserving filenames)
       - Resolves ![alt](filename.jpg) refs to /images/articles/<slug>/filename.jpg
       - Re-writes src/data/articles.ts with merged bodies

  Idempotent: re-runs safely. Articles with no .md file keep their
  existing body (or stay empty). Articles with a .md file get their
  body overwritten by the markdown content.

Markdown format (per file):

    ---
    slug: winter-in-the-vineyard
    category: vineyard           # optional — defaults to existing
    title: Winter in the Vineyard  # optional — defaults to existing
    date: 2026-01-22             # optional — defaults to existing
    ---

    First paragraph here.

    ## A subheading

    Another paragraph.

    ![Caption-less alt text](fig-1.jpg)

    ![Alt text "with caption"](fig-2.jpg "An optional caption.")

    > A pull quote. — Attribution

    - A bullet point
    - Another bullet point

    1. Numbered list works too
    2. Like this

Run:
    python3 tools/import_markdown.py
    python3 tools/import_markdown.py --only=harvest-vintage-2025
    python3 tools/import_markdown.py --dry-run
"""

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
CONTENT_DIR = ROOT / "content" / "articles"
IMAGES_DIR = CONTENT_DIR / "_images"
PUBLIC_IMAGES = ROOT / "public" / "images" / "articles"
METADATA = Path(__file__).parent / "news-metadata.json"
CATEGORIZED = Path(__file__).parent / "news-categorized.json"
ARTICLES_TS = ROOT / "src" / "data" / "articles.ts"

VALID_CATEGORIES = {
    "wines", "vineyard", "entertaining", "knowledge",
    "experiences", "sustainability", "estate-life",
}


# ── Frontmatter + markdown parsing ───────────────────────────────────────────
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_frontmatter(text):
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    fm_raw = m.group(1)
    rest = text[m.end():]
    fm = {}
    for line in fm_raw.split("\n"):
        line = line.strip()
        if not line or ":" not in line:
            continue
        key, _, value = line.partition(":")
        fm[key.strip()] = value.strip().strip('"').strip("'")
    return fm, rest


# Markdown → ArticleBlock[]
# Simple line-based parser tailored to our content shape. Doesn't try
# to handle every CommonMark edge case — just what an editor would
# realistically write for an editorial article.

IMG_RE = re.compile(r'!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)')
# Linked image: [![alt](src)](href). The src/alt captures map to groups
# 1/2; the outer href is group 3.
LINKED_IMG_RE = re.compile(
    r'\[!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)\]\(([^)\s]+)\)'
)
HEADING_RE = re.compile(r"^(#{2,3})\s+(.+)$")
UL_RE = re.compile(r"^\s*[-*]\s+(.+)$")
OL_RE = re.compile(r"^\s*\d+\.\s+(.+)$")
QUOTE_RE = re.compile(r"^>\s?(.*)$")
HR_RE = re.compile(r"^[-*]{3,}\s*$")


def parse_markdown_body(text, slug):
    """Walk the body line-by-line and emit ArticleBlock dicts."""
    lines = text.split("\n")
    blocks = []
    i = 0
    para_buf = []
    quote_buf = []
    list_buf = []
    list_ordered = False

    def flush_paragraph():
        nonlocal para_buf
        if para_buf:
            text = " ".join(l.strip() for l in para_buf).strip()
            if text:
                blocks.append({"type": "paragraph", "text": text})
            para_buf = []

    def flush_quote():
        nonlocal quote_buf
        if quote_buf:
            text = " ".join(l.strip() for l in quote_buf).strip()
            # Last segment after " — " becomes attribution if short
            parts = re.split(r"\s+[—–-]{1,2}\s+", text)
            block = {"type": "quote", "text": text}
            if len(parts) >= 2 and len(parts[-1]) < 60:
                block["text"] = " ".join(parts[:-1]).strip()
                block["attribution"] = parts[-1].strip()
            blocks.append(block)
            quote_buf = []

    def flush_list():
        nonlocal list_buf, list_ordered
        if list_buf:
            blocks.append({
                "type": "list",
                "ordered": list_ordered,
                "items": list_buf,
            })
            list_buf = []
            list_ordered = False

    def flush_all():
        flush_paragraph()
        flush_quote()
        flush_list()

    while i < len(lines):
        line = lines[i]

        # Blank line — paragraph/list/quote terminator
        if not line.strip():
            flush_all()
            i += 1
            continue

        # Horizontal rule — ignore
        if HR_RE.match(line):
            flush_all()
            i += 1
            continue

        # Linked image: [![alt](src)](href) — check before bare image.
        m = LINKED_IMG_RE.match(line.strip())
        if m:
            flush_all()
            alt, src, href = m.group(1), m.group(2), m.group(3)
            if not src.startswith("/") and not src.startswith("http"):
                src = f"/images/articles/{slug}/{src}"
            block = {"type": "image", "src": src, "alt": alt, "href": href}
            blocks.append(block)
            i += 1
            continue

        # Image (its own block)
        m = IMG_RE.match(line.strip())
        if m:
            flush_all()
            alt = m.group(1)
            src = m.group(2)
            caption = m.group(3)
            # Resolve relative image path: just the filename → /images/articles/<slug>/<filename>
            if not src.startswith("/") and not src.startswith("http"):
                src = f"/images/articles/{slug}/{src}"
            block = {"type": "image", "src": src, "alt": alt}
            if caption:
                block["caption"] = caption
            blocks.append(block)
            i += 1
            continue

        # Heading
        m = HEADING_RE.match(line)
        if m:
            flush_all()
            level = len(m.group(1))
            blocks.append({
                "type": "heading",
                "level": 2 if level == 2 else 3,
                "text": m.group(2).strip(),
            })
            i += 1
            continue

        # Unordered list item
        m = UL_RE.match(line)
        if m and not quote_buf:
            flush_paragraph()
            flush_quote()
            if list_ordered:
                flush_list()
            list_ordered = False
            list_buf.append(m.group(1).strip())
            i += 1
            continue

        # Ordered list item
        m = OL_RE.match(line)
        if m and not quote_buf:
            flush_paragraph()
            flush_quote()
            if not list_ordered and list_buf:
                flush_list()
            list_ordered = True
            list_buf.append(m.group(1).strip())
            i += 1
            continue

        # Blockquote
        m = QUOTE_RE.match(line)
        if m:
            flush_paragraph()
            flush_list()
            quote_buf.append(m.group(1))
            i += 1
            continue

        # Default: paragraph line
        flush_quote()
        flush_list()
        para_buf.append(line)
        i += 1

    flush_all()
    return blocks


# ── Image-folder sync ────────────────────────────────────────────────────────
def sync_images(slug, dry_run):
    """Copy content/articles/_images/<slug>/* → public/images/articles/<slug>/."""
    src_dir = IMAGES_DIR / slug
    if not src_dir.exists():
        return 0
    dst_dir = PUBLIC_IMAGES / slug
    if not dry_run:
        dst_dir.mkdir(parents=True, exist_ok=True)
    n = 0
    for f in src_dir.iterdir():
        if not f.is_file():
            continue
        if f.name.startswith("."):
            continue
        dst = dst_dir / f.name
        if not dry_run:
            shutil.copy2(f, dst)
        n += 1
    return n


# ── articles.ts rewriter ─────────────────────────────────────────────────────
def to_ts_string(s):
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def emit_article_ts(article):
    lines = ["  {"]
    lines.append(f'    slug: "{article["slug"]}",')
    lines.append(f'    category: "{article["category"]}",')
    lines.append(f'    title: "{to_ts_string(article["title"])}",')
    lines.append(f'    date: "{article["date"]}",')
    lines.append(f'    excerpt: "{to_ts_string(article.get("excerpt", ""))}",')
    lines.append(f'    heroImage: "{article.get("heroImage", "")}",')
    body = article.get("body")
    if body:
        lines.append("    body: [")
        for block in body:
            lines.append("      " + emit_block_ts(block) + ",")
        lines.append("    ],")
    lines.append("  },")
    return "\n".join(lines)


def emit_block_ts(block):
    t = block["type"]
    if t == "paragraph":
        return f'{{ type: "paragraph", text: "{to_ts_string(block["text"])}" }}'
    if t == "heading":
        return f'{{ type: "heading", level: {block["level"]}, text: "{to_ts_string(block["text"])}" }}'
    if t == "image":
        parts = [
            f'type: "image"',
            f'src: "{to_ts_string(block["src"])}"',
            f'alt: "{to_ts_string(block.get("alt", ""))}"',
        ]
        if block.get("caption"):
            parts.append(f'caption: "{to_ts_string(block["caption"])}"')
        if block.get("href"):
            parts.append(f'href: "{to_ts_string(block["href"])}"')
        return "{ " + ", ".join(parts) + " }"
    if t == "quote":
        parts = [
            f'type: "quote"',
            f'text: "{to_ts_string(block["text"])}"',
        ]
        if block.get("attribution"):
            parts.append(f'attribution: "{to_ts_string(block["attribution"])}"')
        return "{ " + ", ".join(parts) + " }"
    if t == "list":
        items_ts = ", ".join(f'"{to_ts_string(i)}"' for i in block["items"])
        return f'{{ type: "list", ordered: {"true" if block["ordered"] else "false"}, items: [{items_ts}] }}'
    return "{}"


def parse_existing_articles_ts(text):
    """Parse the existing articles.ts to capture metadata + any existing bodies.

    Returns a list of dicts in document order.
    """
    # Find the `export const articles: Article[] = [` block
    m = re.search(r"export const articles[^=]*=\s*\[(.*)\];\s*$", text, re.DOTALL)
    if not m:
        return []
    body_text = m.group(1)

    # Brace-depth split — top-level "{...}" blocks
    articles = []
    depth = 0
    start = None
    for i, ch in enumerate(body_text):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and start is not None:
                chunk = body_text[start: i + 1]
                articles.append(parse_article_chunk(chunk))
                start = None
    return articles


def parse_article_chunk(chunk):
    """Pull fields out of a single article object literal."""
    def field(name):
        m = re.search(rf'\b{name}\s*:\s*"((?:[^"\\]|\\.)*)"', chunk)
        return m.group(1).replace('\\"', '"').replace("\\\\", "\\") if m else ""

    out = {
        "slug": field("slug"),
        "category": field("category"),
        "title": field("title"),
        "date": field("date"),
        "excerpt": field("excerpt"),
        "heroImage": field("heroImage"),
    }
    # Body is preserved verbatim if present — we don't try to re-parse it
    bm = re.search(r"body\s*:\s*\[(.*)\]\s*,?\s*}?", chunk, re.DOTALL)
    if bm:
        out["_body_raw"] = bm.group(1).strip()
    return out


def rewrite_articles_ts(articles, dry_run):
    """Re-emit articles.ts preserving the type definitions block,
    replacing only the `articles` array contents."""
    text = ARTICLES_TS.read_text()

    # Find header (everything up to and including `export const articles ... = [`)
    header_match = re.search(r"export const articles[^=]*=\s*\[", text)
    if not header_match:
        print("Could not locate `export const articles` in articles.ts", file=sys.stderr)
        sys.exit(1)
    header = text[: header_match.end()]

    # Emit body
    body_lines = []
    for a in articles:
        body_lines.append(emit_article_ts(a))
    new_body = "\n" + "\n".join(body_lines) + "\n];\n"

    new_text = header + new_body
    if dry_run:
        print(f"[dry-run] Would rewrite {ARTICLES_TS} ({len(new_text):,} chars)")
        return
    ARTICLES_TS.write_text(new_text)


# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="Only process the given slug")
    ap.add_argument("--dry-run", action="store_true", help="Preview without writing")
    args = ap.parse_args()

    if not ARTICLES_TS.exists():
        print(f"Missing {ARTICLES_TS}. Run generate_articles_ts.py first.")
        sys.exit(1)

    # Parse existing articles.ts → list of dicts
    existing_text = ARTICLES_TS.read_text()
    existing = parse_existing_articles_ts(existing_text)
    if not existing:
        print("Could not parse any articles out of articles.ts", file=sys.stderr)
        sys.exit(1)
    by_slug = {a["slug"]: a for a in existing}

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    md_files = sorted(CONTENT_DIR.glob("*.md"))
    if args.only:
        md_files = [f for f in md_files if f.stem == args.only]

    if not md_files:
        if args.only:
            print(f"No markdown file matches --only={args.only}")
        else:
            print(f"No markdown files found in {CONTENT_DIR}")
            print(f"Drop article bodies as <slug>.md files into that folder.")
        sys.exit(0)

    print(f"Processing {len(md_files)} markdown file(s)\n")
    updated = 0
    image_count = 0

    for f in md_files:
        slug = f.stem
        if slug not in by_slug:
            print(f"  · {slug}  →  SKIP (slug not in articles.ts)")
            continue

        raw = f.read_text(encoding="utf-8")
        fm, body_text = parse_frontmatter(raw)

        # Update any frontmatter overrides
        a = dict(by_slug[slug])  # shallow copy
        a.pop("_body_raw", None)
        for key in ("title", "date", "excerpt"):
            if key in fm and fm[key]:
                a[key] = fm[key]
        if "category" in fm and fm["category"] in VALID_CATEGORIES:
            a["category"] = fm["category"]

        # Sync images first so paths exist when body references them
        n_imgs = sync_images(slug, args.dry_run)
        image_count += n_imgs

        # Parse body markdown
        blocks = parse_markdown_body(body_text, slug)
        a["body"] = blocks
        by_slug[slug] = a
        updated += 1

        print(f"  · {slug:55s}  {len(blocks):2d} blocks, {n_imgs:2d} images")

    # Rebuild ordered articles list (preserve original order from articles.ts)
    final = []
    for orig in existing:
        slug = orig["slug"]
        # If we updated this article, use updated. Otherwise keep its existing
        # parsed metadata; preserve any existing body via _body_raw.
        if slug in by_slug and by_slug[slug] is not orig:
            final.append(by_slug[slug])
        else:
            # Article wasn't touched. Carry it through verbatim.
            a = dict(orig)
            # If it had a _body_raw, re-encode the raw body as a marker so
            # we don't lose existing content. (Rare; usually body is empty.)
            if "_body_raw" in a:
                a.pop("_body_raw")
            final.append(a)

    rewrite_articles_ts(final, args.dry_run)

    print(f"\nUpdated {updated} article(s) · synced {image_count} image(s)")
    print(f"Wrote {ARTICLES_TS}" if not args.dry_run else "(dry run — no changes written)")


if __name__ == "__main__":
    main()
