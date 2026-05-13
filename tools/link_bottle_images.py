"""
Post-process content/articles/<slug>.md to wrap bottle images in links
to their corresponding SKU page (/wine/<sku>/).

Detection is heuristic — for each ![alt](src) in a markdown file:
  1. Lowercase + normalize the alt text and the filename
  2. Match against WINE_PATTERNS in priority order (most-specific first)
  3. If matched and the SKU exists in src/data/wines.ts → wrap:
        ![alt](src)  →  [![alt](src)](/wine/<sku>/)
  4. If matched but SKU does not exist → record in unlinked report

Wines mentioned in articles that have no SKU page (Demi-Sec, generic
"Magnum", vintage-specific releases) end up in the report so the user
can decide whether to add SKU pages or accept them as un-linked.

Run from website folder:
    python3 tools/link_bottle_images.py [--dry-run]
"""

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
ARTICLES_DIR = ROOT / "content" / "articles"
WINES_TS = ROOT / "src" / "data" / "wines.ts"

# (pattern → SKU slug) — order matters: longest/most-specific first so
# "Sparkling Red Reserve" matches before "Red Reserve" or "Sparkling".
WINE_PATTERNS = [
    # Specific multi-word wines first
    ("sparkling red reserve", "sparkling-red-reserve"),
    ("red reserve",           "sparkling-red-reserve"),
    ("oak reserve",           "oak-reserve"),
    ("blanc de blancs",       "blanc-de-blancs"),
    ("blanc de noirs",        "blanc-de-noirs"),
    ("rose de noirs",         "rose-de-noirs"),
    ("rosé de noirs",         "rose-de-noirs"),
    ("rdn",                   "rose-de-noirs"),
    ("bdb",                   "blanc-de-blancs"),
    ("bdn",                   "blanc-de-noirs"),
    ("still english rose",    "still-english-rose"),
    ("still english rosé",    "still-english-rose"),
    ("still chardonnay",      "still-chardonnay"),
    # Single-word wines
    ("bloomsbury",            "bloomsbury"),
    ("fitzrovia",             "fitzrovia"),
    ("cavendish",             "cavendish"),
]

# Wine variants/styles mentioned in articles but without an SKU page.
# Detection here is just for the audit report — no link is emitted.
NO_SKU_PATTERNS = [
    ("demi-sec", "Demi-Sec (OurView exclusive, no public SKU)"),
    ("demi sec", "Demi-Sec (OurView exclusive, no public SKU)"),
    # "Magnum Bloomsbury" — bottle-format variant; CLAUDE.md says it
    # lives under the bloomsbury SKU. We still flag in case the user
    # wants a dedicated /wine/magnum-bloomsbury/ page later.
]


def load_sku_slugs():
    """Read src/data/wines.ts and return the set of available SKU slugs."""
    text = WINES_TS.read_text()
    slugs = set(re.findall(r'slug:\s*"([^"]+)"', text))
    return slugs


def find_sku(alt: str, src: str, available_skus: set):
    """Return (sku_slug, matched_label) if alt or src indicates a wine
    that exists in wines.ts. Otherwise (None, None)."""
    haystack = (alt + " " + src).lower()
    for pattern, sku in WINE_PATTERNS:
        if pattern in haystack and sku in available_skus:
            return sku, pattern
    return None, None


def detect_no_sku(alt: str, src: str):
    """Report wine names that appear in alt/src but have no SKU page."""
    haystack = (alt + " " + src).lower()
    for pattern, label in NO_SKU_PATTERNS:
        if pattern in haystack:
            return label
    return None


# Match a markdown image (line-anchored). We do NOT re-wrap one already
# inside [...]( ) because the line starts with `[!` not `!`.
IMG_RE = re.compile(r"^!\[([^\]]*)\]\(([^)]+)\)\s*$")

# Side-by-side fence boundaries — for context-aware detection
SBS_START = re.compile(r"^:::side-by-side\s+image-(?:left|right)\s*$")
SBS_END = re.compile(r"^:::\s*$")


def find_first_wine_in_text(text: str, available_skus: set):
    """Scan `text` chronologically (left-to-right) and return the first
    wine name that matches an available SKU. Returns (sku, matched_pattern)
    or (None, None). This avoids over-prioritising long patterns when an
    earlier shorter wine name is the actual subject of the section."""
    lower = text.lower()
    best_pos = -1
    best = (None, None)
    for pattern, sku in WINE_PATTERNS:
        if sku not in available_skus:
            continue
        idx = lower.find(pattern)
        if idx == -1:
            continue
        if best_pos == -1 or idx < best_pos:
            best_pos = idx
            best = (sku, pattern)
    return best


def find_sku_with_context(alt: str, src: str, context: str, available_skus: set):
    """Try alt-or-src first (highest signal). Fall back to scanning the
    surrounding side-by-side fence context chronologically and taking the
    first wine name found there."""
    s, m = find_sku(alt, src, available_skus)
    if s:
        return s, m, "alt-or-src"
    s, m = find_first_wine_in_text(context, available_skus)
    if s:
        return s, m, "context"
    return None, None, None


def index_sbs_fences(lines):
    """Return a list of (start_idx, end_idx) for each :::side-by-side fence."""
    fences = []
    start = None
    for i, line in enumerate(lines):
        s = line.strip()
        if SBS_START.match(s):
            start = i
        elif SBS_END.match(s) and start is not None:
            fences.append((start, i))
            start = None
    return fences


def context_for_line(lines, line_idx, sbs_ranges):
    """Return text around line_idx — preferring the enclosing side-by-side
    fence if there is one, otherwise the next ~10 lines as fallback."""
    for start, end in sbs_ranges:
        if start <= line_idx <= end:
            return "\n".join(lines[start:end + 1])
    return "\n".join(lines[line_idx:line_idx + 10])


def process_file(path: Path, available_skus: set, dry_run: bool):
    text = path.read_text()
    lines = text.split("\n")
    sbs_ranges = index_sbs_fences(lines)

    linked = []
    no_sku = []
    new_lines = []
    for i, line in enumerate(lines):
        m = IMG_RE.match(line.strip())
        if not m:
            new_lines.append(line)
            continue
        alt, src = m.group(1), m.group(2)
        ctx = context_for_line(lines, i, sbs_ranges)
        sku, matched, how = find_sku_with_context(alt, src, ctx, available_skus)
        if sku:
            linked.append((alt, src, sku, matched, how))
            new_lines.append(f"[![{alt}]({src})](/wine/{sku}/)")
            continue
        no = detect_no_sku(alt, src) or detect_no_sku("", ctx)
        if no:
            no_sku.append((alt, src, no))
        new_lines.append(line)

    new_text = "\n".join(new_lines)
    if new_text != text and not dry_run:
        path.write_text(new_text)
    return linked, no_sku


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="Report only, don't modify files")
    args = ap.parse_args()

    available_skus = load_sku_slugs()
    print(f"Available SKUs in wines.ts: {sorted(available_skus)}\n")

    files = sorted(ARTICLES_DIR.glob("*.md"))
    print(f"Scanning {len(files)} article markdowns...\n")

    total_linked = 0
    total_no_sku = 0
    no_sku_report = []   # (slug, alt, src, reason)
    by_sku = {}          # sku → count

    for path in files:
        slug = path.stem
        linked, no_sku = process_file(path, available_skus, args.dry_run)
        if linked:
            print(f"  ✓ {slug}: linked {len(linked)} image(s)")
            for alt, src, sku, matched, how in linked:
                by_sku[sku] = by_sku.get(sku, 0) + 1
            total_linked += len(linked)
        if no_sku:
            for alt, src, reason in no_sku:
                no_sku_report.append((slug, alt, src, reason))
                total_no_sku += 1

    print(f"\n{'─' * 60}")
    print(f"Total bottle images linked: {total_linked}")
    print(f"  by SKU:")
    for sku, n in sorted(by_sku.items(), key=lambda x: -x[1]):
        print(f"    /wine/{sku}/  →  {n} image(s)")

    if no_sku_report:
        print(f"\n{'─' * 60}")
        print(f"Wines mentioned in articles but with NO SKU page ({total_no_sku}):")
        for slug, alt, src, reason in no_sku_report:
            print(f"  • {slug}: {reason}")
            print(f"      alt: {alt[:80] or '(empty)'}")
            print(f"      src: {src}")

    out = ROOT / "tools" / "bottle-link-report.json"
    out.write_text(json.dumps({
        "total_linked": total_linked,
        "linked_by_sku": by_sku,
        "no_sku_images": [
            {"article": s, "alt": a, "src": src, "reason": r}
            for s, a, src, r in no_sku_report
        ],
    }, indent=2, ensure_ascii=False))
    print(f"\nReport written to {out}")


if __name__ == "__main__":
    main()
