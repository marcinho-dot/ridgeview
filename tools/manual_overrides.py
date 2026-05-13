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
USB_PARENT = Path("/Volumes/RIDGEVIEW/Content")  # for fallback search of non-Copywriting docs

# slug → source-file path (relative to USB/Content/Copywriting/).
# Resolved against the USB; if not at the exact path, we fall back to
# recursive filename search anywhere under USB/Content.
OVERRIDES = {
    # First batch — confirmed via spot-reading
    "still-english-rose":
        "Products and Campaigns/Still Rosé/Still Rose Launch.docx",
    "sparkling-wine-magnum-bloomsbury":
        "Products and Campaigns/Bloomsbury Magnum/Magnum Bloomsbury NV Copy.docx",
    "exclusive-demi-sec":
        "OurView/OurView Demi-Sec Copy Deck.docx",
    "vineyard-restaurant-the-rows-vine-returns":
        "Hospitality & Retail/Spring-Summer/2025/The Rows & Vine goes Alfresco with New Menu 2025.docx",

    # Second batch — discovered by mapping non-default folders
    # "BdN 2016 Blog" first-line matches the slug title EXACTLY
    "blanc-de-noirs-2016-the-perfect-vintage":
        "Products and Campaigns/Blanc de Blancs/BdB 2016/BdN 2016 Blog.docx",
    # Long-form Christmas pairings blog — likely matches the "Standout"-titled article
    "standout-sparkling-wine-pairings-for-christmas":
        "Products and Campaigns/Holidays and Seasonal Celebrations/Christmas/Christmas Pairings Blog 2025.docx",
    # "Rosé de Noirs 2020 Copy & Messaging" — RdN 2020 launch doc
    "rose-de-noirs-revealed":
        "Products and Campaigns/Rosé de Noirs/RdN 2020 full copy.docx",
    # BdB 2020 blog — different file from the one already in articles.ts
    # (inside-blanc-de-blancs-2020 used Short-Copy email/social; this is the full blog)
    # "Blog Title: Think You Know Rosé? Think Again." — provocative rosé article
    "english-rose-wine":
        "Products and Campaigns/Rosé general/Think you know Rosé, Think Again.docx",
    # First line matches the slug title verbatim
    "ridgeview-wine-goodwood-estate":
        "Trade sales/Goodwood Sponsorship Announcement.docx",

    # Third batch — discovered by deep_scan_usb.py which searches *every*
    # USB folder (including "Drafts - Do Not Use" where the FINAL versions
    # of many published articles actually live, despite the folder name).
    "south-lodge-vineyard-harvest-2025":
        "Drafts - Do Not Use/Do Not Use/South Lodge Harvest Blog.docx",
    "harvest-vintage-2025":
        "Drafts - Do Not Use/Do Not Use/Harvest 2025 - A Dream Year in the Vines.docx",
    "remembering-mike-roberts-the-father-of-english-wine":
        "Drafts - Do Not Use/Do Not Use/Mike Robert's Tribute.docx",
    "whats-the-best-glass-for-sparkling-wine":
        "SEO/The Best Glass for Sparkling Wine.docx",
    "championing-wellbeing-and-mental-health-at-work":
        "Drafts - Do Not Use/Do Not Use/Mental Health Matters - Championing Wellbeing at Work.docx",
    "new-still-english-rose-wine":
        "Drafts - Do Not Use/Do Not Use/Still Rosé 2024 Blog.docx",
    # Replaces the bad draft-with-placeholders we quarantined earlier
    "ridgeviews-red-reserve-a-new-chapter":
        "Drafts - Do Not Use/Do Not Use/Sparkling Red Reserve Second Release WriteUp.docx",
    "travels-to-taiwan-and-japan":
        "Drafts - Do Not Use/Do Not Use/Simon's Trip to Japan and Taiwan 2024.docx",
    "our-impact":
        "Drafts - Do Not Use/Do Not Use/Ridgeview 2023 Impact Report - Comms Planning.docx",
    "afternoon-tea-with-a-touch-of-sparkle":
        "Trade sales/Sparkling Afternoon Tea.docx",
    # Doc opens with "B CORP MONTH 2024 / RIDGEVIEW RECOMMENDS – B CORP BRANDS WE LOVE"
    "ridgeview-recommends-inspiring-b-corp-brands":
        "B Corp & Sustainability/B Corp Month 2024.docx",
}


def find_file(rel_path: str):
    """Try the exact path first; fall back to recursive name search."""
    direct = USB / rel_path
    if direct.exists():
        return direct
    # Try just the filename anywhere under USB/Content
    name = Path(rel_path).name
    for p in USB_PARENT.rglob(name):
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
