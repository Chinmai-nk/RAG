from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import upload, index, search

app = FastAPI(title="Research Paper Assistant")

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


@app.get("/health")
async def health():
    return {"status": "ok"}
