"""
Hand-curated slug → source-file overrides for cases the fuzzy gate
in convert_sources_to_markdown.py rejected, but where filename + first
line make the match obviously correct on human inspection.

Run from website folder:
    python3 tools/manual_overrides.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract_text import extract
from convert_sources_to_markdown import blocks_to_markdown

ROOT = Path(__file__).parent.parent
OUT_MD_DIR = ROOT / "content" / "articles"

USB = Path("/Volumes/RIDGEVIEW/Content/Copywriting")

# slug → source-file path (relative to USB/Content/Copywriting/).
# Resolved against the USB; if not at the exact path, we fall back to
# recursive filename search.
OVERRIDES = {
    "blanc-de-noirs-2016-the-perfect-vintage":
        "Products and Campaigns/Blanc de Noirs/Blanc de Noirs 2016 Product Copy.docx",
    "still-english-rose":
        "Products and Campaigns/Still Rosé/Still Rose Launch.docx",
    "ridgeviews-red-reserve-a-new-chapter":
        "Products and Campaigns/Wine Technical Notes/Archive/Red Reserve R.docx",
    "sparkling-wine-magnum-bloomsbury":
        "Products and Campaigns/Bloomsbury Magnum/Magnum Bloomsbury NV Copy.docx",
    "exclusive-demi-sec":
        "OurView/OurView Demi-Sec Copy Deck.docx",
    "vineyard-restaurant-the-rows-vine-returns":
        "Hospitality & Retail/Spring-Summer/2025/The Rows & Vine goes Alfresco with New Menu 2025.docx",
    "building-the-rows-and-vine":
        "Hospitality & Retail/Autumn-Winter/The Rows & Vine at The Winery.docx",
}


def find_file(rel_path: str):
    """Try the exact path first; fall back to recursive name search."""
    direct = USB / rel_path
    if direct.exists():
        return direct
    # Try just the filename anywhere under USB
    name = Path(rel_path).name
    for p in USB.rglob(name):
        return p
    return None


def main():
    OUT_MD_DIR.mkdir(parents=True, exist_ok=True)
    done = 0
    skipped = []
    for slug, rel_path in OVERRIDES.items():
        path = find_file(rel_path)
        if not path:
            skipped.append((slug, f"file not found: {rel_path}"))
            continue
        try:
            blocks = extract(path)
        except Exception as e:
            skipped.append((slug, f"extract failed: {e}"))
            continue
        if len(blocks) < 2:
            skipped.append((slug, f"only {len(blocks)} blocks"))
            continue
        md = blocks_to_markdown(blocks, slug)
        out = OUT_MD_DIR / f"{slug}.md"
        out.write_text(md, encoding="utf-8")
        print(f"  + {slug[:55]:55s}  ←  {path.name[:50]} ({len(blocks)} blocks)")
        done += 1

    print(f"\nWrote {done} markdown files. Skipped: {len(skipped)}")
    for s, r in skipped:
        print(f"  - {s}: {r}")


if __name__ == "__main__":
    main()
