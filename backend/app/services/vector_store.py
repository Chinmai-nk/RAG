import chromadb
from chromadb.config import Settings

from app.config import CHROMA_DB_PATH

COLLECTION_NAME = "papers"


def get_collection():
    client = chromadb.PersistentClient(
        path=str(CHROMA_DB_PATH),
        settings=Settings(anonymized_telemetry=False),
    )
    return client.get_or_create_collection(COLLECTION_NAME)


def add_chunks(chunks: list[dict], embeddings: list[list[float]]) -> int:
    collection = get_collection()

    ids = [f"{c['metadata']['paper_name']}-chunk-{c['chunk_id']}" for c in chunks]
    documents = [c["text"] for c in chunks]
    metadatas = [
        {
            "paper_name": c["metadata"]["paper_name"],
            "page": c["metadata"]["page"],
            "chunk_id": c["chunk_id"],
        }
        for c in chunks
    ]

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=embeddings,
    )

    return len(chunks)


def _format_results(results: dict) -> list[dict]:
    output = []
    for i in range(len(results["ids"][0])):
        output.append({
            "chunk_id": results["metadatas"][0][i].get("chunk_id"),
            "text": results["documents"][0][i],
            "metadata": {
                "paper_name": results["metadatas"][0][i].get("paper_name"),
                "page": results["metadatas"][0][i].get("page"),
            },
            "distance": results["distances"][0][i],
        })
    return output


def list_papers() -> list[dict]:
    collection = get_collection()
    all_data = collection.get(include=["metadatas"])
    seen = {}
    for meta in all_data["metadatas"]:
        name = meta["paper_name"]
        if name not in seen:
            seen[name] = {"name": name, "pages": set(), "chunks": 0}
        seen[name]["pages"].add(meta["page"])
        seen[name]["chunks"] += 1
    result = []
    for p in seen.values():
        result.append({
            "name": p["name"],
            "pages": len(p["pages"]),
            "chunks": p["chunks"],
        })
    return result


def search_chunks(
    query_embedding: list[float],
    top_k: int = 5,
    paper_names: list[str] | None = None,
) -> list[dict]:
    collection = get_collection()

    if paper_names and len(paper_names) > 1:
        per_paper = max(1, top_k // len(paper_names))
        all_results = []
        for name in paper_names:
            results = collection.query(
                query_embeddings=[query_embedding],
                n_results=per_paper,
                where={"paper_name": name},
                include=["documents", "metadatas", "distances"],
            )
            all_results.extend(_format_results(results))
        return all_results

    where_filter = None
    if paper_names:
        where_filter = {"paper_name": {"$in": paper_names}}
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where=where_filter,
        include=["documents", "metadatas", "distances"],
    )
    return _format_results(results)
