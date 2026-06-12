import { useState } from 'react'
import { Send, Settings2 } from 'lucide-react'

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState('')
  const [topK, setTopK] = useState(5)
  const [useRerank, setUseRerank] = useState(true)
  const [showConfig, setShowConfig] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    onSend(input.trim(), topK, useRerank)
    setInput('')
  }

  return (
    <div className="space-y-2">
      {showConfig && (
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <label className="flex items-center gap-2">
            Top-K
            <select
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="border dark:border-gray-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              {[3, 5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useRerank}
              onChange={(e) => setUseRerank(e.target.checked)}
              className="accent-blue-600"
            />
            Reranking
          </label>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 transition-colors"
          placeholder="Ask a question about your papers..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="p-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
        >
          <Settings2 size={20} />
        </button>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
