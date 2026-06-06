from fastapi import APIRouter, UploadFile, File, HTTPException

from app.models.schemas import UploadResponse
from app.services.parser import extract_text_from_pdf
from app.utils.helpers import validate_pdf, save_upload

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    try:
        validate_pdf(file.filename)
        file_path = await save_upload(file)
        result = extract_text_from_pdf(file_path)
        return UploadResponse(
            filename=file.filename,
            pages=result["pages"],
            text=result["text"],
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
