"""
Deep scan of the entire USB stick — extracts first-line + filename for
every .docx/.odt regardless of folder, then matches each against every
PENDING article slug (= slugs without a markdown body yet).

For each pending slug, ranks the top-5 candidates by
max(filename-fuzzy, title-vs-first-line-fuzzy).

Writes tools/deep-scan-matches.json with the top candidates
per pending slug — so we can review which ones look like real matches
that the narrower category-based scan missed.

Run from website folder:
    python3 tools/deep_scan_usb.py
"""

import json
import os
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract_text import first_line_of

ROOT = Path(__file__).parent.parent
CATEGORIZED = Path(__file__).parent / "news-categorized.json"
OUT = Path(__file__).parent / "deep-scan-matches.json"

USB = Path("/Volumes/RIDGEVIEW/Content")
ALLOWED_EXT = (".docx", ".odt")

# Folders to skip even on deep scan — true noise or non-article content
SKIP_PATH_FRAGMENTS = ("HR/", "/Tech Notes/", "/Wine Technical Notes/",
                       "Back Label & Product", "PPC", "/Misc/")


def normalize(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def fuzzy(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, normalize(a), normalize(b)).ratio()


def scan_files():
    files = []
    for path in USB.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in ALLOWED_EXT:
            continue
        if path.name.startswith("~") or path.name.startswith("._"):
            continue
        spath = str(path)
        if any(frag in spath for frag in SKIP_PATH_FRAGMENTS):
            continue
        files.append(path)
    return files


def main():
    articles = json.loads(CATEGORIZED.read_text())
    have = {f.replace(".md", "")
            for f in os.listdir(ROOT / "content" / "articles")
            if f.endswith(".md")}
    pending = [a for a in articles if a["slug"] not in have]
    print(f"Scanning USB for {len(pending)} pending slugs...")

    files = scan_files()
    print(f"Found {len(files)} candidate source files.\n")

    # Cache first lines once
    cache = {}
    for i, f in enumerate(files):
        if i % 30 == 0:
            print(f"  reading first lines... {i}/{len(files)}")
        cache[f] = first_line_of(f) or ""

    print()

    out = {}
    for art in pending:
        slug = art["slug"]
        title = art["title"]
        scored = []
        for f in files:
            stem = f.stem
            first_line = cache[f]
            # Title-vs-first-line is the strongest signal
            s_first = fuzzy(title, first_line)
            # Slug/title-vs-filename as fallback
            s_name = max(fuzzy(slug, stem), fuzzy(title, stem))
            score = max(s_first, 0.6 * s_name + 0.4 * s_first)
            scored.append((score, str(f), first_line[:130]))
        scored.sort(reverse=True)
        top5 = scored[:5]
        out[slug] = {
            "title": title,
            "best_score": round(top5[0][0], 3) if top5 else 0.0,
            "top_matches": [
                {"score": round(s, 3),
                 "path": p.replace("/Volumes/RIDGEVIEW/Content/", ""),
                 "first_line": fl}
                for s, p, fl in top5
            ],
        }
        marker = "✓" if top5 and top5[0][0] >= 0.70 else (
            "~" if top5 and top5[0][0] >= 0.50 else "✗"
        )
        if top5:
            print(f"  {marker} {top5[0][0]:.2f}  {slug[:40]:40s}  →  "
                  f"{Path(top5[0][1]).name[:50]}")

    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    n_strong = sum(1 for v in out.values() if v["best_score"] >= 0.70)
    n_mid = sum(1 for v in out.values() if 0.50 <= v["best_score"] < 0.70)
    print(f"\nWrote {OUT}")
    print(f"Strong (≥0.70): {n_strong}, mid (0.50–0.70): {n_mid}")


if __name__ == "__main__":
    main()
