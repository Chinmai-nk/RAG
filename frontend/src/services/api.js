import axios from 'axios'

const API = import.meta.env.VITE_API_URL || ''

export async function uploadPDF(file) {
  const form = new FormData()
  form.append('file', file)
  const { data } = await axios.post(`${API}/upload`, form)
  return data
}

export async function indexChunks(chunks) {
  const { data } = await axios.post(`${API}/index`, { chunks })
  return data
}

export async function searchQuery(query, top_k = 5, paper_names = null, use_rerank = true) {
  const { data } = await axios.post(`${API}/search`, { query, top_k, paper_names, use_rerank })
  return data
}

export async function chatQuery(query, top_k = 5, paper_names = null, use_rerank = true) {
  const { data } = await axios.post(`${API}/chat`, { query, top_k, paper_names, use_rerank })
  return data
}

export async function literatureReview(topic, top_k = 20, paper_names = null, use_rerank = true) {
  const { data } = await axios.post(`${API}/literature`, { topic, top_k, paper_names, use_rerank })
  return data
}

export async function deletePaper(filename) {
  const { data } = await axios.delete(`${API}/papers/${encodeURIComponent(filename)}`)
  return data
}
