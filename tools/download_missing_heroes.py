"""
Fallback hero-image downloader for the 9 articles that couldn't pull
their image via the wp-json media endpoint. Tries the article's
own HTML page and extracts the og:image meta tag instead.

Run AFTER download_hero_images.py.
"""

import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, quote
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError


def safe_url(url):
    """Percent-encode any non-ASCII chars in the path so urllib accepts it."""
    parts = urlparse(url)
    safe_path = quote(parts.path, safe="/")
    safe_query = quote(parts.query, safe="=&")
    rebuilt = f"{parts.scheme}://{parts.netloc}{safe_path}"
    if safe_query:
        rebuilt += f"?{safe_query}"
    return rebuilt

ROOT = Path(__file__).parent.parent
IN = ROOT / "tools" / "news-categorized.json"
OUT_DIR = ROOT / "public" / "images" / "articles"

HEADERS = {"User-Agent": "Ridgeview-Migration/1.0"}

OG_IMAGE_RE = re.compile(
    r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
    re.IGNORECASE,
)


def find_og_image(article_url):
    req = Request(article_url, headers=HEADERS)
    with urlopen(req, timeout=30) as r:
        html = r.read().decode("utf-8", errors="replace")
    match = OG_IMAGE_RE.search(html)
    return match.group(1) if match else None


def download(url, dest):
    req = Request(safe_url(url), headers=HEADERS)
    with urlopen(req, timeout=60) as r:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(r.read())


def main():
    articles = json.loads(IN.read_text())
    missing = [a for a in articles
               if not (OUT_DIR / a["slug"]).exists()
               or not list((OUT_DIR / a["slug"]).glob("hero.*"))]
    print(f"{len(missing)} articles need a hero image fallback\n")

    ok = 0
    still_missing = []
    for art in missing:
        slug = art["slug"]
        article_url = f"https://www.ridgeview.co.uk/news/{slug}/"
        try:
            og = find_og_image(article_url)
            if not og:
                still_missing.append((slug, "no og:image"))
                print(f"  · {slug}  →  no og:image")
                continue
            ext = Path(urlparse(og).path).suffix.lower() or ".jpg"
            dest = OUT_DIR / slug / f"hero{ext}"
            download(og, dest)
            ok += 1
            print(f"  · {slug}  →  hero{ext}  ({dest.stat().st_size // 1024} KB)")
        except (HTTPError, URLError) as e:
            still_missing.append((slug, str(e)))
            print(f"  · {slug}  →  ERROR: {e}")

    print(f"\nFallback download: {ok} recovered")
    if still_missing:
        print(f"\n{len(still_missing)} still missing:")
        for slug, reason in still_missing:
            print(f"  · {slug}  ({reason})")


if __name__ == "__main__":
    main()
