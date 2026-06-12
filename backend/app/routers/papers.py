from fastapi import APIRouter

from app.services.vector_store import list_papers

router = APIRouter(prefix="/papers", tags=["papers"])


@router.get("")
async def get_papers():
    return {"papers": list_papers()}
