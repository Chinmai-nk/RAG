from pathlib import Path

import fitz


def extract_text_from_pdf(path: Path) -> dict:
    doc = fitz.open(path)
    pages_text = []
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        pages_text.append(text)
    doc.close()

    return {
        "pages": len(pages_text),
        "text": "\n\n".join(pages_text),
    }
