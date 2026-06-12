import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { searchQuery } from '../services/api'
import SearchBar from '../components/Search/SearchBar'
import SearchFilters from '../components/Search/SearchFilters'
import SearchResultCard from '../components/Search/SearchResultCard'
import EmptyState from '../components/common/EmptyState'

export default function SearchPage() {
  const { selectedPapers } = useApp()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [topK, setTopK] = useState(10)
  const [sortBy, setSortBy] = useState('relevance')
  const [searched, setSearched] = useState(false)

  async function handleSearch(query) {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const paper_names = selectedPapers.length > 0 ? selectedPapers : null
      const res = await searchQuery(query, topK, paper_names, true)
      setResults(res.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const sorted = [...results].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance
    if (sortBy === 'paper') return (a.metadata.paper_name || '').localeCompare(b.metadata.paper_name || '')
    return (b.rerank_score || b.distance || 0) - (a.rerank_score || a.distance || 0)
  })

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Semantic Search</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Search across your uploaded research papers.</p>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {results.length > 0 && (
        <SearchFilters sortBy={sortBy} onSortChange={setSortBy} topK={topK} onTopKChange={setTopK} />
      )}
      <div className="space-y-3 mt-4">
        {loading && <p className="text-gray-400 dark:text-gray-500 text-sm">Searching...</p>}
        {!loading && searched && results.length === 0 && (
          <EmptyState icon="Search" title="No results" description="Try a different query." />
        )}
        {sorted.map((r, i) => (
          <SearchResultCard key={i} result={r} />
        ))}
      </div>
    </div>
  )
}
