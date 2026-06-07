from fastapi import APIRouter, HTTPException

from app.models.schemas import IndexRequest, IndexResponse
from app.services.embeddings import embed_texts
from app.services.vector_store import add_chunks

router = APIRouter(prefix="/index", tags=["index"])


@router.post("", response_model=IndexResponse)
async def index_chunks(body: IndexRequest):
    try:
        texts = [c.text for c in body.chunks]
        embeddings = embed_texts(texts)
        chunk_dicts = [
            {
                "chunk_id": c.chunk_id,
                "text": c.text,
                "metadata": {
                    "paper_name": c.metadata.paper_name,
                    "page": c.metadata.page,
                },
            }
            for c in body.chunks
        ]
        count = add_chunks(chunk_dicts, embeddings)
        return IndexResponse(status="indexed", chunk_count=count)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
