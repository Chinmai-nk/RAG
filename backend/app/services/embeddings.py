from functools import lru_cache

from app.config import GEMINI_API_KEY, USE_LOCAL_EMBEDDINGS

MODEL_NAME = "BAAI/bge-small-en-v1.5"
GEMINI_EMBEDDING_MODEL = "text-embedding-004"


@lru_cache(maxsize=1)
def get_gemini_client():
    from google import genai
    return genai.Client(api_key=GEMINI_API_KEY)


@lru_cache(maxsize=1)
def get_embedding_model():
    from sentence_transformers import SentenceTransformer
    return SentenceTransformer(MODEL_NAME)


def embed_texts(texts: list[str]) -> list[list[float]]:
    if not USE_LOCAL_EMBEDDINGS:
        client = get_gemini_client()
        result = client.models.embed_content(
            model=GEMINI_EMBEDDING_MODEL,
            contents=texts,
        )
        return [e.values for e in result.embeddings]

    model = get_embedding_model()
    embeddings = model.encode(texts, normalize_embeddings=True)
    return embeddings.tolist()
