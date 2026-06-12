from functools import lru_cache

from sentence_transformers import CrossEncoder

MODEL_NAME = "cross-encoder/ms-marco-MiniLM-L-6-v2"


@lru_cache(maxsize=1)
def get_reranker():
    return CrossEncoder(MODEL_NAME)


def rerank(query: str, chunks: list[dict], top_k: int = 5) -> list[dict]:
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
