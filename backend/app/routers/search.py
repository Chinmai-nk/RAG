from fastapi import APIRouter, HTTPException

from app.models.schemas import SearchRequest, SearchResponse, SearchResult, ChunkMetadata
from app.services.embeddings import embed_texts
from app.services.vector_store import search_chunks
from app.services.reranker import rerank

RETRIEVE_MULTIPLIER = 4

router = APIRouter(prefix="/search", tags=["search"])


@router.post("", response_model=SearchResponse)
async def search(body: SearchRequest):
    try:
        [query_embedding] = embed_texts([body.query])

        if body.use_rerank:
            retrieve_k = max(20, body.top_k * RETRIEVE_MULTIPLIER)
            raw = search_chunks(query_embedding, retrieve_k, body.paper_names)
            results = rerank(body.query, raw, body.top_k)
        else:
            results = search_chunks(query_embedding, body.top_k, body.paper_names)

        return SearchResponse(
            query=body.query,
            results=[
                SearchResult(
                    chunk_id=r["chunk_id"],
                    text=r["text"],
                    metadata=ChunkMetadata(**r["metadata"]),
                    distance=r.get("distance", 0),
                    rerank_score=r.get("rerank_score"),
                )
                for r in results
            ],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
