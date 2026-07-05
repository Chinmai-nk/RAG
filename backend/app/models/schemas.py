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


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5
    paper_names: list[str] | None = None
    use_rerank: bool = True


class SearchResult(BaseModel):
    chunk_id: int
    text: str
    metadata: ChunkMetadata
    distance: float
    rerank_score: float | None = None


class SearchResponse(BaseModel):
    query: str
    results: list[SearchResult]


class ChatRequest(BaseModel):
    query: str
    top_k: int = 5
    paper_names: list[str] | None = None
    use_rerank: bool = True


class SourceSchema(BaseModel):
    text: str
    page: int
    paper_name: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceSchema]


class LitReviewRequest(BaseModel):
    topic: str
    top_k: int = 20
    paper_names: list[str] | None = None
    use_rerank: bool = True


class LitReviewResponse(BaseModel):
    topic: str
    review: str
    sources: list[SourceSchema]


class DeleteResponse(BaseModel):
    status: str
    chunk_count: int


class ErrorResponse(BaseModel):
    detail: str
