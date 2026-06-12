from fastapi import APIRouter, HTTPException

from app.models.schemas import ChatRequest, ChatResponse, SourceSchema, ChunkMetadata
from app.services.embeddings import embed_texts
from app.services.vector_store import search_chunks
from app.services.llm import generate_answer

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(body: ChatRequest):
    try:
        [query_embedding] = embed_texts([body.query])
        chunks = search_chunks(query_embedding, body.top_k, body.paper_names)

        answer = generate_answer(chunks, body.query)

        sources = [
            SourceSchema(
                text=c["text"],
                page=c["metadata"]["page"],
                paper_name=c["metadata"]["paper_name"],
            )
            for c in chunks
        ]

        return ChatResponse(answer=answer, sources=sources)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
