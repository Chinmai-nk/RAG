import uuid
from pathlib import Path

from fastapi import UploadFile

from app.config import UPLOAD_DIR, ALLOWED_EXTENSIONS, MAX_FILE_SIZE


def validate_pdf(filename: str) -> None:
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Invalid file type: {ext}. Only PDFs allowed.")


async def save_upload(file: UploadFile) -> Path:
    unique_name = f"{uuid.uuid4()}_{file.filename}"
    file_path = UPLOAD_DIR / unique_name

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise ValueError("File too large (max 50MB).")

    with open(file_path, "wb") as f:
        f.write(content)

    return file_path
