from pydantic import BaseModel


class ChunkMetadata(BaseModel):
    paper_name: str
    page: int


class ChunkSchema(BaseModel):
    chunk_id: int
    text: str
    metadata: ChunkMetadata


class UploadResponse(BaseModel):
    filename: str
    pages: int
    text: str
    chunks: list[ChunkSchema]


class IndexRequest(BaseModel):
    chunks: list[ChunkSchema]


class IndexResponse(BaseModel):
    status: str
    chunk_count: int


class ErrorResponse(BaseModel):
    detail: str
