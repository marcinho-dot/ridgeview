"""
Download hero images for all categorized news articles.

For each article in tools/news-categorized.json:
  1. Look up the featured_media id
  2. Fetch /wp-json/wp/v2/media/<id> to get source_url
  3. Download the image
  4. Save to public/images/articles/<slug>/hero.<ext>

Skips articles where featured_media = 0 (no image) and any slug whose
hero already exists on disk (idempotent — safe to re-run).

Run from the website folder:
    python3 tools/download_hero_images.py
"""

import json
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).parent.parent
IN = ROOT / "tools" / "news-categorized.json"
OUT_DIR = ROOT / "public" / "images" / "articles"

HEADERS = {"User-Agent": "Ridgeview-Migration/1.0"}


def fetch_media(media_id):
    url = f"https://www.ridgeview.co.uk/wp-json/wp/v2/media/{media_id}?_fields=source_url,alt_text"
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def download_image(url, dest):
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=60) as r:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(r.read())


def main():
    articles = json.loads(IN.read_text())
    print(f"Processing {len(articles)} articles\n")

    ok = 0
    skip_exists = 0
    skip_nomedia = 0
    errors = []

    for i, art in enumerate(articles, 1):
        slug = art["slug"]
        media_id = art.get("featured_media", 0)
        if not media_id:
            skip_nomedia += 1
            print(f"  [{i:3d}/{len(articles)}] {slug:55s}  no featured_media")
            continue

        # Check if any hero file already exists for this slug
        slug_dir = OUT_DIR / slug
        existing = list(slug_dir.glob("hero.*")) if slug_dir.exists() else []
        if existing:
            skip_exists += 1
            print(f"  [{i:3d}/{len(articles)}] {slug:55s}  exists ({existing[0].name})")
            continue

        try:
            media = fetch_media(media_id)
            src = media.get("source_url")
            if not src:
                skip_nomedia += 1
                print(f"  [{i:3d}/{len(articles)}] {slug:55s}  media has no source_url")
                continue

            ext = Path(urlparse(src).path).suffix.lower() or ".jpg"
            dest = slug_dir / f"hero{ext}"
            download_image(src, dest)
            ok += 1
            print(f"  [{i:3d}/{len(articles)}] {slug:55s}  → hero{ext}  ({dest.stat().st_size // 1024} KB)")
        except (HTTPError, URLError, json.JSONDecodeError) as e:
            errors.append((slug, str(e)))
            print(f"  [{i:3d}/{len(articles)}] {slug:55s}  ERROR: {e}")

    print(f"\nSummary:")
    print(f"  Downloaded:   {ok}")
    print(f"  Already had:  {skip_exists}")
    print(f"  No media:     {skip_nomedia}")
    print(f"  Errors:       {len(errors)}")
    if errors:
        print("\nErrors:")
        for slug, err in errors:
            print(f"  · {slug}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
