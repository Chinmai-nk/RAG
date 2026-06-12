from fastapi import APIRouter, HTTPException

from app.models.schemas import LitReviewRequest, LitReviewResponse, SourceSchema
from app.services.embeddings import embed_texts
from app.services.vector_store import search_chunks
from app.services.reranker import rerank
from app.services.llm import generate_literature_review

RETRIEVE_MULTIPLIER = 4

router = APIRouter(prefix="/literature", tags=["literature"])


@router.post("", response_model=LitReviewResponse)
async def literature_review(body: LitReviewRequest):
    try:
        [query_embedding] = embed_texts([body.topic])

        if body.use_rerank:
            retrieve_k = max(20, body.top_k * RETRIEVE_MULTIPLIER)
            raw = search_chunks(query_embedding, retrieve_k, body.paper_names)
            chunks = rerank(body.topic, raw, body.top_k)
        else:
            chunks = search_chunks(query_embedding, body.top_k, body.paper_names)

        review = generate_literature_review(body.topic, chunks)

        sources = [
            SourceSchema(
                text=c["text"],
                page=c["metadata"]["page"],
                paper_name=c["metadata"]["paper_name"],
            )
            for c in chunks
        ]

        return LitReviewResponse(topic=body.topic, review=review, sources=sources)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
