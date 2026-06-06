from pathlib import Path

import fitz

from app.services.chunker import chunk_text


def extract_text_from_pdf(path: Path, paper_name: str) -> dict:
    doc = fitz.open(path)
    pages_text = []
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        pages_text.append(text)
    doc.close()

    combined = "\n\n".join(pages_text)

    page_map = []
    offset = 0
    for i, pt in enumerate(pages_text):
        page_map.append((offset, offset + len(pt)))
        offset += len(pt)
        if i < len(pages_text) - 1:
            offset += 2

    chunks = chunk_text(combined, paper_name, page_map)

    return {
        "pages": len(pages_text),
        "text": combined,
        "chunks": chunks,
    }
