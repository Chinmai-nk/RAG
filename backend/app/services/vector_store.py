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
