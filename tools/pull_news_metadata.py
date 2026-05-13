"""
Pull legacy Ridgeview news metadata from ridgeview.co.uk wp-json.

Single-call fetch of all 93 news posts (custom post type `news`),
including title, slug, date, excerpt, featured_media (image id),
and link. Writes the raw list to tools/news-metadata.json so we
don't have to re-hit the network during categorization or
articles.ts generation.

Run from the website folder:
    python3 tools/pull_news_metadata.py
"""

import json
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

API = (
    "https://www.ridgeview.co.uk/wp-json/wp/v2/news"
    "?per_page=100"
    "&_fields=id,slug,date,title.rendered,excerpt.rendered,featured_media,link"
)

OUT = Path(__file__).parent / "news-metadata.json"


def fetch():
    req = Request(API, headers={"User-Agent": "Ridgeview-Migration/1.0"})
    try:
        with urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
            return data
    except (HTTPError, URLError) as e:
        print(f"Fetch failed: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    posts = fetch()
    print(f"Fetched {len(posts)} posts")
    # Sort newest -> oldest by date
    posts.sort(key=lambda p: p["date"], reverse=True)
    OUT.write_text(json.dumps(posts, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT}")

    # Quick sanity print
    for p in posts[:5]:
        print(f"  · {p['date'][:10]}  {p['slug']}  →  {p['title']['rendered'][:60]}")
    if len(posts) > 5:
        print(f"  ... and {len(posts) - 5} more")


if __name__ == "__main__":
    main()
