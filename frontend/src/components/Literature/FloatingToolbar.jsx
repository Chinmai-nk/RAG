import { useState } from 'react'
import { Copy, Download } from 'lucide-react'

export default function FloatingToolbar({ content }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleExport() {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'literature-review.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center justify-end gap-2 px-6 py-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl transition-colors">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Copy size={14} />
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Download size={14} />
        Export Markdown
      </button>
    </div>
  )
}
