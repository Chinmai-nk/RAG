from functools import lru_cache

from google import genai

from app.config import GEMINI_API_KEY

MODEL = "gemini-3.1-flash-lite"


def build_prompt(context_chunks: list[dict], query: str) -> str:
    context_parts = []
    for c in context_chunks:
        meta = c["metadata"]
        context_parts.append(
            f"[Source: {meta['paper_name']} | Page {meta['page']}]\n{c['text']}"
        )
    context_str = "\n\n".join(context_parts)

    prompt = f"""Use only the provided context to answer the question.

If the answer is not available in the context, say so.

Context:
{context_str}

Question: {query}

Answer and cite the source paper and page for each claim."""

    return prompt


@lru_cache(maxsize=1)
def get_client():
    return genai.Client(api_key=GEMINI_API_KEY)


def generate_answer(context_chunks: list[dict], query: str) -> str:
    prompt = build_prompt(context_chunks, query)
    client = get_client()
    response = client.models.generate_content(model=MODEL, contents=prompt)
    return response.text
