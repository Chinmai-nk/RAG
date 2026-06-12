import { Sparkles } from 'lucide-react'

export default function ConfigPanel({ topic, onTopicChange, topK, onTopKChange, useRerank, onRerankChange, loading, onGenerate }) {
  return (
    <div className="border dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-900 space-y-4 transition-colors">
      <input
        className="w-full border dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 transition-colors"
        placeholder="e.g., Deepfake Audio Detection"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        disabled={loading}
      />
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <label className="flex items-center gap-2">
          Top-K
          <select value={topK} onChange={(e) => onTopKChange(Number(e.target.value))} className="border dark:border-gray-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-200">
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useRerank} onChange={(e) => onRerankChange(e.target.checked)} className="accent-blue-600" />
          Reranking
        </label>
      </div>
      <button
        onClick={onGenerate}
        disabled={loading || !topic.trim()}
        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2 text-sm"
      >
        <Sparkles size={16} />
        {loading ? 'Generating...' : 'Generate Literature Review'}
      </button>
    </div>
  )
}
