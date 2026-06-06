from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(
    text: str,
    paper_name: str,
    page_map: list[tuple[int, int]],
) -> list[dict]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", ".", " "],
    )
    chunks = splitter.split_text(text)

    result = []
    search_start = 0

    for i, chunk in enumerate(chunks):
        pos = text.find(chunk, search_start)
        if pos == -1:
            pos = search_start

        page = 1
        for p_idx, (p_start, p_end) in enumerate(page_map):
            if p_start <= pos < p_end:
                page = p_idx + 1
                break

        result.append({
            "chunk_id": i,
            "text": chunk,
            "metadata": {
                "paper_name": paper_name,
                "page": page,
            },
        })

        search_start = pos + 1

    return result
