from fastapi import APIRouter, HTTPException

from app.config import UPLOAD_DIR
from app.services.vector_store import list_papers, delete_paper
from app.models.schemas import DeleteResponse

router = APIRouter(prefix="/papers", tags=["papers"])


@router.get("")
async def get_papers():
    return {"papers": list_papers()}


@router.delete("/{filename}", response_model=DeleteResponse)
async def remove_paper(filename: str):
    chunk_count = delete_paper(filename)
    pdf_path = UPLOAD_DIR / filename
    if pdf_path.exists():
        pdf_path.unlink()
    return DeleteResponse(status="deleted", chunk_count=chunk_count)
