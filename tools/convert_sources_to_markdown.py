"""
Convert matched source files (from source-matches.json) into markdown
files under content/articles/<slug>.md, ready to be ingested by
import_markdown.py.

Strict acceptance gate: only auto-convert when the source file's
first-line text (= the document's own title) fuzzy-matches the
article's title with ≥0.60. This rules out filename-only matches
where the doc is actually about something else (e.g. "RdN 2020.docx"
matching a "harvest-2020" slug — wrong content despite filename
proximity).

Outputs:
  - content/articles/<slug>.md  for each auto-accepted match
  - tools/manual-review.json  with the slugs we could NOT auto-match,
    showing top candidates so the user can pick manually if they want
"""

import json
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract_text import extract, first_line_of

ROOT = Path(__file__).parent.parent
MATCHES = Path(__file__).parent / "source-matches.json"
OUT_MD_DIR = ROOT / "content" / "articles"
MANUAL_REVIEW = Path(__file__).parent / "manual-review.json"

# Title-vs-first-line fuzzy threshold — strict to avoid false positives
ACCEPT_THRESHOLD = 0.60


def normalize(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def title_match(article_title: str, file_first_line: str) -> float:
    """Score how well the file's first line matches the article title."""
    if not file_first_line:
        return 0.0
    return SequenceMatcher(None, normalize(article_title),
                            normalize(file_first_line)).ratio()


def blocks_to_markdown(blocks, slug: str) -> str:
    """Convert (style, text) tuples to markdown."""
    lines = [f"---\nslug: {slug}\n---\n"]

    # Skip the first block — it's the title, which articles.ts already has
    seen_title = False
    pending_list = []
    list_ordered = False

    def flush_list():
        nonlocal pending_list, list_ordered
        if pending_list:
            prefix = "1. " if list_ordered else "- "
            for item in pending_list:
                lines.append(f"{prefix}{item}")
            lines.append("")
            pending_list = []
            list_ordered = False

    for style, text in blocks:
        text = re.sub(r"\s+", " ", text).strip()
        if not text:
            continue

        # Skip the very first text block — it's typically the title
        if not seen_title:
            seen_title = True
            continue

        # Skip obvious CTA / link-only / navigation lines
        if text.upper() in ("FIND OUT MORE", "READ MORE", "LEARN MORE",
                            "DISCOVER MORE", "SHOP NOW", "BUY NOW"):
            continue
        # Skip lines that are entirely capitalised navigation/section-headers
        # of marketing-card style (very short, all caps)
        if len(text) < 40 and text == text.upper() and any(c.isalpha() for c in text):
            # Could be a heading — treat as h2 if it has content
            flush_list()
            lines.append(f"## {text.title()}")
            lines.append("")
            continue

        # Headings (detected via DOCX style names)
        if "Heading1" in style or "Heading 1" in style or "Title" in style:
            flush_list()
            lines.append(f"## {text}")
            lines.append("")
        elif "Heading2" in style or "Heading 2" in style:
            flush_list()
            lines.append(f"## {text}")
            lines.append("")
        elif "Heading3" in style or "Heading 3" in style:
            flush_list()
            lines.append(f"### {text}")
            lines.append("")
        # List items
        elif "ListParagraph" in style or "ListItem" in style or "List" in style:
            # Heuristic: if text starts with a number+dot, ordered
            if re.match(r"^\d+\.\s+", text):
                list_ordered = True
                pending_list.append(re.sub(r"^\d+\.\s+", "", text))
            else:
                list_ordered = False
                pending_list.append(text)
        # Quote/blockquote style
        elif "Quote" in style:
            flush_list()
            lines.append(f"> {text}")
            lines.append("")
        else:
            # Default: paragraph
            flush_list()
            lines.append(text)
            lines.append("")

    flush_list()
    # Trim trailing blanks
    while lines and not lines[-1].strip():
        lines.pop()
    return "\n".join(lines) + "\n"


def main():
    matches = json.loads(MATCHES.read_text())
    OUT_MD_DIR.mkdir(parents=True, exist_ok=True)

    accepted = []
    rejected = {}

    for slug, info in matches.items():
        title = info["title"]
        top = info["top_matches"]
        if not top:
            rejected[slug] = {
                "title": title, "reason": "no candidates", "candidates": []
            }
            continue

        # Best by first-line match (= title of the doc itself)
        best = None
        best_first_line_score = 0.0
        for cand in top:
            score = title_match(title, cand["first_line"])
            if score > best_first_line_score:
                best_first_line_score = score
                best = cand

        if best is None or best_first_line_score < ACCEPT_THRESHOLD:
            rejected[slug] = {
                "title": title,
                "best_first_line_score": round(best_first_line_score, 3),
                "candidates": top,
            }
            continue

        # Auto-accept this match — extract + convert to markdown
        path = Path(best["path"])
        try:
            blocks = extract(path)
        except Exception as e:
            rejected[slug] = {
                "title": title,
                "reason": f"extract failed: {e}",
                "candidates": top,
            }
            continue

        if len(blocks) < 3:
            rejected[slug] = {
                "title": title,
                "reason": f"only {len(blocks)} blocks — likely not a full article",
                "candidates": top,
            }
            continue

        md = blocks_to_markdown(blocks, slug)
        md_path = OUT_MD_DIR / f"{slug}.md"
        md_path.write_text(md, encoding="utf-8")
        accepted.append((slug, path.name, len(blocks), best_first_line_score))
        print(f"  ✓ {best_first_line_score:.2f}  {slug[:55]:55s}  →  "
              f"{path.name[:50]} ({len(blocks)} blocks)")

    MANUAL_REVIEW.write_text(json.dumps(rejected, indent=2, ensure_ascii=False))

    print(f"\nAuto-converted: {len(accepted)}  →  content/articles/")
    print(f"Manual review:  {len(rejected)}  →  see tools/manual-review.json")


if __name__ == "__main__":
    main()
