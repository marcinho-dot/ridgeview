"""
For each of the 83 article slugs, find the best-matching source
file on the Ridgeview USB stick (Content/Copywriting/...).

Strategy:
  1. Per-category folder priorities (Wines → Products and Campaigns,
     Sustainability → B Corp & Sustainability, etc.).
  2. For each candidate file, score against the article's slug AND
     against its title using fuzzy ratio. Take max(slug_score, title_score).
  3. Also score against the first meaningful line of text inside the
     file (extracted via extract_text.py). Title often appears as the
     first line — strong signal.
  4. Output JSON with the top-3 candidates per slug.

Run from website folder:
    python3 tools/match_sources_to_articles.py
"""

import json
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract_text import first_line_of

ROOT = Path(__file__).parent.parent
CATEGORIZED = Path(__file__).parent / "news-categorized.json"
OUT = Path(__file__).parent / "source-matches.json"

USB_ROOT = Path("/Volumes/RIDGEVIEW/Content/Copywriting")

# Per-category folder priorities. First folder = highest priority.
CATEGORY_FOLDERS = {
    "wines": ["Products and Campaigns"],
    "vineyard": ["Products and Campaigns"],
    "entertaining": ["Hospitality & Retail", "Products and Campaigns"],
    "knowledge": ["Products and Campaigns"],
    "experiences": ["Hospitality & Retail", "OurView"],
    "sustainability": ["B Corp & Sustainability"],
    "estate-life": ["People", "Company copy, ads and boilerplates"],
}

# Folders we never look in, regardless of category
SKIP_FOLDERS = {"Drafts - Do Not Use", "~$ Drafts", "Misc", "HR", "PPC", "SEO", "Strategy", "Richard"}

ALLOWED_EXT = (".docx", ".odt")

MIN_SCORE = 0.40  # below this → flag as needing manual mapping


def normalize(s: str) -> str:
    """Lowercase, strip punctuation, collapse whitespace."""
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def fuzzy(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, normalize(a), normalize(b)).ratio()


def gather_candidate_files(category: str):
    """Return list of source file Paths for a given category."""
    folders = CATEGORY_FOLDERS.get(category, [])
    # Also include all folders as a fallback after the priority list
    fallback = ["Hospitality & Retail", "Products and Campaigns",
                "B Corp & Sustainability", "OurView", "Company copy, ads and boilerplates",
                "People"]
    seen = set()
    files = []
    for f in folders + fallback:
        d = USB_ROOT / f
        if not d.exists():
            continue
        for path in d.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in ALLOWED_EXT:
                continue
            if path.name.startswith("~") or path.name.startswith("._"):
                continue
            if any(skip in str(path) for skip in SKIP_FOLDERS):
                continue
            if path in seen:
                continue
            seen.add(path)
            files.append(path)
    return files


def score_file_against(slug: str, title: str, file_path: Path,
                       first_line: str) -> float:
    """Composite score: filename match + first-line match."""
    stem = file_path.stem
    s_slug = fuzzy(slug, stem)
    s_title = fuzzy(title, stem)
    name_score = max(s_slug, s_title)
    # First-line title match (title at the top of the article body)
    line_score = fuzzy(title, first_line) if first_line else 0.0
    # Weighted: 60% name, 40% first-line
    return 0.6 * name_score + 0.4 * line_score


def main():
    articles = json.loads(CATEGORIZED.read_text())
    print(f"Matching {len(articles)} articles against USB-stick sources...\n")

    # Cache first-lines once per file (extracting from .docx is slow)
    first_line_cache = {}

    out = {}
    missing = []
    for art in articles:
        slug = art["slug"]
        title = art["title"]
        category = art["category"]
        candidates = gather_candidate_files(category)

        scored = []
        for f in candidates:
            if f not in first_line_cache:
                try:
                    first_line_cache[f] = first_line_of(f)
                except Exception:
                    first_line_cache[f] = ""
            score = score_file_against(slug, title, f, first_line_cache[f])
            if score > 0.15:  # ignore very weak matches to keep the list small
                scored.append((score, str(f), first_line_cache[f][:120]))

        scored.sort(reverse=True)
        top3 = scored[:3]

        best_score = top3[0][0] if top3 else 0.0
        out[slug] = {
            "title": title,
            "category": category,
            "best_score": round(best_score, 3),
            "top_matches": [
                {"score": round(s, 3), "path": p, "first_line": fl}
                for s, p, fl in top3
            ],
        }
        if best_score < MIN_SCORE:
            missing.append((slug, title, best_score))

        marker = "✓" if best_score >= 0.55 else ("~" if best_score >= MIN_SCORE else "✗")
        print(f"  {marker} {best_score:.2f}  {slug[:48]:48s}  →  "
              f"{top3[0][1].split('/')[-1] if top3 else '(none)'}")

    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"\nWrote {OUT}")
    print(f"\nSummary: {sum(1 for v in out.values() if v['best_score'] >= 0.55):3d} strong matches (≥0.55)")
    print(f"         {sum(1 for v in out.values() if MIN_SCORE <= v['best_score'] < 0.55):3d} weak matches  ({MIN_SCORE:.2f}–0.55)")
    print(f"         {sum(1 for v in out.values() if v['best_score'] < MIN_SCORE):3d} no good match (<{MIN_SCORE})")


if __name__ == "__main__":
    main()
