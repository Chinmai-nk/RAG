import shutil
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import UPLOAD_DIR, CHROMA_DB_PATH
from app.routers import upload, index, search, chat, literature, papers


@asynccontextmanager
async def lifespan(app: FastAPI):
    for path in [UPLOAD_DIR, CHROMA_DB_PATH]:
        if path.exists():
            shutil.rmtree(path)
        path.mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(title="Research Paper Assistant", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(index.router)
app.include_router(search.router)
app.include_router(chat.router)
app.include_router(literature.router)
app.include_router(papers.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
