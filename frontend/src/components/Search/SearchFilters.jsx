export default function SearchFilters({ sortBy, onSortChange, topK, onTopKChange }) {
  return (
    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
      <label className="flex items-center gap-2">
        Sort
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border dark:border-gray-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="relevance">Relevance</option>
          <option value="distance">Similarity</option>
          <option value="paper">Paper</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        Top-K
        <select
          value={topK}
          onChange={(e) => onTopKChange(Number(e.target.value))}
          className="border dark:border-gray-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
        >
          {[5, 10, 15, 20, 30].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
