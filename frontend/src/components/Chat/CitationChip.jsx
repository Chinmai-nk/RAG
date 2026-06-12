import { useState } from 'react'

export default function CitationChip({ source }) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <span
      className="relative inline-flex items-center bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg px-2 py-0.5 text-xs font-medium cursor-default transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/60"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {source.paper_name} | Page {source.page}
      {showPreview && (
        <span className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-xl p-3 shadow-lg z-10">
          <p className="font-medium mb-1">{source.paper_name}</p>
          <p className="text-gray-300">Page {source.page}</p>
          <p className="text-gray-400 mt-1 line-clamp-3">{source.text}</p>
        </span>
      )}
    </span>
  )
}
