"""
Categorize each Ridgeview news article into one of the 7 fixed
Beyond-the-Bottle categories. Keyword-based heuristic — output is
written to tools/news-categorized.json for review before generating
the final articles.ts.

Categories:
  wines           — new releases, vintage profiles, limited editions
  vineyard        — harvest, terroir, growing seasons
  entertaining    — pairings, gifts, occasions, festive content
  knowledge       — wine guides, education, how-to
  experiences     — vineyard visits, restaurant, tours
  sustainability  — B Corp, environmental, charity
  estate-life     — people, careers, heritage, founder/winemaker
"""

import json
import re
from pathlib import Path

IN = Path(__file__).parent / "news-metadata.json"
OUT = Path(__file__).parent / "news-categorized.json"

# Hand-curated overrides — articles whose title doesn't match the
# keyword rules cleanly. Slug → category.
OVERRIDES = {
    # Estate Life / heritage / people
    "remembering-mike-roberts-the-father-of-english-wine": "estate-life",
    "winter-in-the-vineyard": "vineyard",
    "championing-wellbeing-and-mental-health-at-work": "estate-life",
    "international-womens-day-2024": "estate-life",
    "supporting-careers-in-wine": "estate-life",
    "careers-in-wine-technical-winemaking": "estate-life",
    # Sustainability
    "b-corp-impact-report-2025": "sustainability",
    "bcorp-impact-2024": "sustainability",
    "our-impact": "sustainability",
    "our-sustainable-origins": "sustainability",
    "2025-charity-partner-prept-foundation": "sustainability",
    "vineyard-sustainability-gold-award": "sustainability",
    "sustainable-wine-and-the-future-of-our-vines": "sustainability",
    "sustainable-wine-pruning-for-the-future": "sustainability",
    "ridgeview-recommends-inspiring-b-corp-brands": "sustainability",
    # Knowledge
    "english-sparkling-wine-guide": "knowledge",
    "when-to-age-wine-or-drink-it": "knowledge",
    "how-to-collect-wine": "knowledge",
    "wine-wisdom": "knowledge",
    "the-magic-of-ageing-wine-magnums": "knowledge",
    "pinot-noir-grape-guide": "knowledge",
    "whats-the-best-glass-for-sparkling-wine": "knowledge",
    "terroir": "knowledge",
    "white-wine-question-time": "knowledge",
    "white-wine-question-time-with-kate-thornton": "knowledge",
    # Experiences
    "vineyard-experiences-a-place-for-everyone": "experiences",
    "vineyard-restaurant-the-rows-vine-returns": "experiences",
    "winter-walks-and-wine-experiences": "experiences",
    "afternoon-tea-with-a-touch-of-sparkle": "experiences",
    "ridgeview-wine-goodwood-estate": "experiences",
    "travels-to-taiwan-and-japan": "experiences",
    # Entertaining
    "christmas-sparkling-wine-pairings": "entertaining",
    "standout-sparkling-wine-pairings-for-christmas": "entertaining",
    "luxury-sparkling-wine-gift-guide": "entertaining",
    "valentines-day-delicious-date-night-food-and-wine-pairings": "entertaining",
    "festive-food-pairings": "entertaining",
    "celebration-sparkling-rose-wine": "entertaining",
    # Vineyard
    "south-lodge-vineyard-harvest-2025": "vineyard",
    "harvest-vintage-2025": "vineyard",
    "harvest-in-the-winery": "vineyard",
    # Wines
    "rose-de-noirs-revealed": "wines",
    "still-chardonnay-from-england": "wines",
    "still-english-rose": "wines",
    "new-still-english-rose-wine": "wines",
    "inside-blanc-de-blancs-2020": "wines",
    "blanc-de-noirs-2016-the-perfect-vintage": "wines",
    "exclusive-demi-sec": "wines",
    "sparkling-wine-magnum-bloomsbury": "wines",
    "ridgeviews-red-reserve-a-new-chapter": "wines",
    "late-disgorged-oak-reserve": "wines",
    "english-rose-wine": "wines",
    "wine-awards-2023": "wines",
    "blending-a-taste-of-vintage-2022": "wines",
    "ridgeview-vintage-2021": "wines",
    "crowned-best-sussex-drinks-producer": "wines",
    # Knowledge
    "what-are-vintage-and-non-vintage-wines": "knowledge",
    # Estate Life (community / company news / values)
    "london-gatwick-northern-runway-campaign": "estate-life",
    "continued-expansion-of-ridgeviews-production": "estate-life",
    "inspiring-the-next-generation-for-english-wine": "estate-life",
    "diversity-and-inclusion": "estate-life",
    # Experiences
    "ridgefest": "experiences",
}

# Fallback keyword rules — applied to title.rendered (lowercased)
KEYWORD_RULES = [
    ("wines", [
        "blanc de blancs", "blanc de noirs", "rosé de noirs", "rose de noirs",
        "still chardonnay", "still english rosé", "still english rose",
        "demi-sec", "magnum", "oak reserve", "red reserve", "fitzrovia",
        "bloomsbury", "cavendish", "new vintage", "limited edition",
        "release", "launch",
    ]),
    ("sustainability", [
        "b corp", "b-corp", "bcorp", "sustainab", "charity", "impact",
        "carbon", "biodivers", "ethical",
    ]),
    ("entertaining", [
        "pairing", "christmas", "festive", "valentine", "gift", "occasion",
        "celebrat", "feasting", "afternoon tea",
    ]),
    ("knowledge", [
        "guide", "wisdom", "how to", "definitive", "terroir", "ageing",
        "aging", "grape", "glass", "question time", "method", "tasting note",
    ]),
    ("experiences", [
        "visit", "tour", "restaurant", "rows & vine", "rows and vine",
        "winery", "cellar door", "wine bar", "experience", "open day",
    ]),
    ("vineyard", [
        "harvest", "vineyard", "vine", "pruning", "winter in the",
        "south lodge", "soil", "chalk",
    ]),
    ("estate-life", [
        "career", "winemaker", "team", "wellbeing", "mental health",
        "founder", "roberts", "history", "story", "anniversary",
        "women", "people",
    ]),
]


def auto_categorize(title):
    t = title.lower()
    for category, keywords in KEYWORD_RULES:
        for kw in keywords:
            if kw in t:
                return category
    return None


def main():
    posts = json.loads(IN.read_text())
    out = []
    uncategorized = []
    counts = {c[0]: 0 for c in KEYWORD_RULES}

    for post in posts:
        slug = post["slug"]
        title = post["title"]["rendered"]
        category = OVERRIDES.get(slug) or auto_categorize(title)
        if not category:
            uncategorized.append(slug)
            category = "estate-life"  # default bucket
        counts[category] = counts.get(category, 0) + 1

        # Clean the title — remove WordPress HTML entities for previewing
        clean_title = (
            title.replace("&#8217;", "'")
                 .replace("&#8211;", "—")
                 .replace("&#8220;", '"')
                 .replace("&#8221;", '"')
                 .replace("&amp;", "&")
        )

        out.append({
            "slug": slug,
            "category": category,
            "title": clean_title,
            "date": post["date"][:10],
            "id": post["id"],
            "featured_media": post["featured_media"],
        })

    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))

    print(f"Categorized {len(out)} articles\n")
    print("Distribution:")
    for cat, n in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {cat:18s} {n:3d}")
    if uncategorized:
        print(f"\n{len(uncategorized)} fell to default bucket (estate-life):")
        for slug in uncategorized:
            print(f"  · {slug}")
    print(f"\nWrote {OUT}")


if __name__ == "__main__":
    main()
