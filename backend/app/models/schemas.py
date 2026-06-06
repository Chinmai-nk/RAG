from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    pages: int
    text: str


class ErrorResponse(BaseModel):
    detail: str
