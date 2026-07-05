# Research Paper Assistant

A full-stack RAG (Retrieval-Augmented Generation) system for uploading, searching, and querying research papers. Upload PDFs, ask questions with citation-backed answers, compare multiple papers, and generate literature reviews.

## Features

- **PDF Upload & Parsing** — Extract text page-by-page via PyMuPDF
- **Semantic Chunking** — LangChain `RecursiveCharacterTextSplitter` with page-aware metadata
- **Vector Search** — BGE-small embeddings (384-dim) or Gemini API embeddings stored in ChromaDB with cosine similarity
- **Reranking** — Cross-encoder (`ms-marco-TinyBERT-L-2`) scores retrieved chunks for higher relevance
- **Citation-Backed Q&A** — Gemini LLM generates answers grounded in retrieved chunks with source labels
- **Multi-Paper Comparison** — Filter by paper or compare across papers with balanced retrieval
- **Literature Review Generator** — Structured markdown reviews (Introduction, Methods, Results, Limitations, Gaps)
- **Dark-Theme Web UI** — React + Vite + TailwindCSS with NotebookLM-inspired three-panel layout

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI + Uvicorn |
| PDF Parsing | PyMuPDF (fitz) |
| Text Splitting | LangChain `RecursiveCharacterTextSplitter` |
| Embeddings | `BAAI/bge-small-en-v1.5` (Sentence Transformers) |
| Vector Store | ChromaDB (persistent) |
| Reranking | `cross-encoder/ms-marco-TinyBERT-L-2` |
| LLM | Google Gemini (`google-genai`) |
| Frontend | React 18 + Vite + TailwindCSS |
| Icons | Lucide React |
| Markdown | react-markdown |

## Pipeline

```
Upload PDF → PyMuPDF extracts text → RecursiveCharacterTextSplitter
→ embeddings (BGE-small or Gemini API) → ChromaDB storage

Query → same embedding → ChromaDB similarity search → optional cross-encoder rerank
→ Gemini generates answer with source citations
```

## Quick Start

### Prerequisites

- Python 3.13+
- Node.js 22+
- A Google Gemini API key

### 1. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
source venv/Scripts/activate
# Linux/Mac
# source venv/bin/activate

pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/upload` | Upload a PDF (returns text + chunks) |
| POST | `/index` | Embed and store chunks in ChromaDB |
| POST | `/search` | Semantic search (no LLM) |
| POST | `/chat` | RAG question answering with citations |
| POST | `/literature` | Generate a structured literature review |
| GET | `/papers` | List indexed papers with stats |
| DELETE | `/papers/{filename}` | Delete a paper and its chunks |
| GET | `/health` | Health check |

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | — | Required for LLM features and Gemini embeddings |
| `USE_LOCAL_EMBEDDINGS` | `true` | `false` uses Gemini API embeddings (lighter, no PyTorch); `true` uses BGE-small locally |

Set `USE_LOCAL_EMBEDDINGS=false` on constrained environments (e.g., Render free tier). This avoids loading PyTorch/sentence-transformers and uses Gemini's `text-embedding-004` API instead.

### Notes

- `uploads/` and `chroma_db/` are wiped on every server restart (clean slate)
- Reranking is enabled by default; pass `use_rerank: false` to skip it (always skipped when `USE_LOCAL_EMBEDDINGS=false`)
- The cross-encoder model (~50MB with TinyBERT) and BGE model (~133MB) download on first run locally
- `POST /literature` defaults to `top_k=20` for broader context

## Project Structure

```
rag/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry, lifespan reset, CORS
│   │   ├── config.py             # Paths, env vars, file limits
│   │   ├── routers/
│   │   │   ├── upload.py         # POST /upload
│   │   │   ├── index.py          # POST /index
│   │   │   ├── search.py         # POST /search
│   │   │   ├── chat.py           # POST /chat
│   │   │   ├── literature.py     # POST /literature
│   │   │   └── papers.py         # GET/DELETE /papers
│   │   ├── services/
│   │   │   ├── parser.py         # PyMuPDF extraction
│   │   │   ├── chunker.py        # Text splitting
│   │   │   ├── embeddings.py     # BGE-small or Gemini embeddings
│   │   │   ├── vector_store.py   # ChromaDB operations
│   │   │   ├── llm.py            # Gemini prompt + generation
│   │   │   └── reranker.py       # Cross-encoder reranking (no-op on Render)
│   │   └── models/
│   │       └── schemas.py        # Pydantic models
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── context/AppContext.jsx
    │   ├── services/api.js
    │   ├── components/
    │   │   ├── Layout/           # Sidebar, SourcesDrawer, Layout
    │   │   ├── Chat/             # Message, CitationChip
    │   │   ├── Papers/           # PaperCard
    │   │   └── common/           # ConfirmModal, EmptyState
    │   └── pages/                # Home, Chat, Search, Papers, Upload, Literature
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── vercel.json                # SPA rewrites for Vercel deployment
```

## License

MIT
