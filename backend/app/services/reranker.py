from functools import lru_cache

from app.config import USE_LOCAL_EMBEDDINGS

MODEL_NAME = "cross-encoder/ms-marco-TinyBERT-L-2"


@lru_cache(maxsize=1)
def get_reranker():
    from sentence_transformers import CrossEncoder
    return CrossEncoder(MODEL_NAME)


def rerank(query: str, chunks: list[dict], top_k: int = 5) -> list[dict]:
    if not USE_LOCAL_EMBEDDINGS:
        return chunks[:top_k]

    model = get_reranker()
    pairs = [[query, c["text"]] for c in chunks]
    scores = model.predict(pairs)
    scored = list(zip(chunks, scores.tolist()))
    scored.sort(key=lambda x: x[1], reverse=True)
    result = []
    for c, s in scored[:top_k]:
        c["rerank_score"] = float(s)
        result.append(c)
    return result
