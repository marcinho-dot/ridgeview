"""
Plain text + paragraph-style extractor for .docx and .odt source files
from the Ridgeview USB stick. Pure stdlib — no python-docx dependency.

Returns a list of (style_hint, text) tuples in document order. The
style_hint is a normalized string like "Heading1", "Heading2",
"Normal", or "" — enough for the markdown conversion step to decide
between paragraph and heading blocks.

Usage from another script:
    from extract_text import extract
    blocks = extract(Path("/Volumes/RIDGEVIEW/Content/Copywriting/..."))
"""

import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
OFFICE_NS = "{urn:oasis:names:tc:opendocument:xmlns:office:1.0}"
TEXT_NS = "{urn:oasis:names:tc:opendocument:xmlns:text:1.0}"


def _extract_docx(path):
    blocks = []
    with zipfile.ZipFile(path) as z:
        with z.open("word/document.xml") as f:
            root = ET.parse(f).getroot()

    body = root.find(f"{W_NS}body")
    if body is None:
        return blocks

    for child in list(body):
        tag = child.tag
        if tag == f"{W_NS}p":
            # Get pStyle val
            style = ""
            ppr = child.find(f"{W_NS}pPr")
            if ppr is not None:
                p_style = ppr.find(f"{W_NS}pStyle")
                if p_style is not None:
                    style = p_style.get(f"{W_NS}val", "")
            # Get text — gather all <w:t> within the paragraph
            text_parts = []
            for t in child.iter(f"{W_NS}t"):
                if t.text:
                    text_parts.append(t.text)
            text = "".join(text_parts).strip()
            if text:
                blocks.append((style, text))
    return blocks


def _extract_odt(path):
    blocks = []
    with zipfile.ZipFile(path) as z:
        with z.open("content.xml") as f:
            root = ET.parse(f).getroot()

    body = root.find(f"{OFFICE_NS}body")
    if body is None:
        return blocks
    text_root = body.find(f"{OFFICE_NS}text")
    if text_root is None:
        text_root = body

    for child in list(text_root):
        tag = child.tag
        if tag == f"{TEXT_NS}p":
            text = "".join(child.itertext()).strip()
            if text:
                blocks.append(("Normal", text))
        elif tag == f"{TEXT_NS}h":
            level = child.get(f"{TEXT_NS}outline-level", "1")
            text = "".join(child.itertext()).strip()
            if text:
                blocks.append((f"Heading{level}", text))
        elif tag == f"{TEXT_NS}list":
            # Flatten list items to plain paragraphs prefixed with "- "
            for item in child.iter(f"{TEXT_NS}list-item"):
                t = "".join(item.itertext()).strip()
                if t:
                    blocks.append(("ListItem", t))
    return blocks


def extract(path: Path):
    """Return list of (style_hint, text) tuples for a .docx or .odt file."""
    suffix = path.suffix.lower()
    if suffix == ".docx":
        return _extract_docx(path)
    if suffix == ".odt":
        return _extract_odt(path)
    if suffix == ".doc":
        # Legacy .doc — binary format, would need a separate tool.
        # Return empty so the caller skips this source.
        return []
    return []


def first_line_of(path: Path) -> str:
    """Best-effort: return the first meaningful line of text for matching."""
    try:
        blocks = extract(path)
    except Exception:
        return ""
    for _, text in blocks:
        if len(text) >= 8:
            return text[:200]
    return ""


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: extract_text.py <path/to/file.docx>")
        sys.exit(1)
    path = Path(sys.argv[1])
    blocks = extract(path)
    print(f"{len(blocks)} blocks")
    for style, text in blocks[:10]:
        print(f"  [{style or '-':10s}] {text[:100]}")
