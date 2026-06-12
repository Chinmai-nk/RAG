import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        className="w-full border dark:border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 shadow-sm bg-white dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500 transition-colors"
        placeholder="Search across uploaded papers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
    </form>
  )
}
