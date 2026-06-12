from fastapi import APIRouter, HTTPException

from app.models.schemas import SearchRequest, SearchResponse, SearchResult, ChunkMetadata
from app.services.embeddings import embed_texts
from app.services.vector_store import search_chunks

router = APIRouter(prefix="/search", tags=["search"])


@router.post("", response_model=SearchResponse)
async def search(body: SearchRequest):
    try:
        [query_embedding] = embed_texts([body.query])
        results = search_chunks(query_embedding, body.top_k, body.paper_names)
        return SearchResponse(
            query=body.query,
            results=[
                SearchResult(
                    chunk_id=r["chunk_id"],
                    text=r["text"],
                    metadata=ChunkMetadata(**r["metadata"]),
                    distance=r["distance"],
                )
                for r in results
            ],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
