import { X } from 'lucide-react'

export default function SourcesDrawer({ sources, open, onClose }) {
  if (!open) return null

  return (
    <div className="w-96 bg-white dark:bg-gray-900 border-l dark:border-gray-800 shadow-lg flex flex-col animate-slideIn transition-colors">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h2 className="font-semibold dark:text-gray-100">Sources</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
          <X size={18} className="dark:text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sources.map((s, i) => (
          <div key={i} className="border dark:border-gray-700 rounded-xl p-3 text-sm space-y-1 transition-colors">
            <p className="font-medium truncate dark:text-gray-200">{s.paper_name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Page {s.page}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
