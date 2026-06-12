import { FileText } from 'lucide-react'

export default function SearchResultCard({ result }) {
  return (
    <div className="border dark:border-gray-700 rounded-2xl p-4 bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-gray-800 transition-shadow">
      <div className="flex items-start gap-3">
        <FileText size={18} className="text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium truncate dark:text-gray-200">{result.metadata.paper_name}</span>
            <span className="text-gray-400 dark:text-gray-500">· Page {result.metadata.page}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{result.text}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
            <span>Score: {(result.rerank_score || result.distance || 0).toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
