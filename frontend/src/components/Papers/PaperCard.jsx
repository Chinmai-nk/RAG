import { FileText } from 'lucide-react'

export default function PaperCard({ paper }) {
  return (
    <div className="border dark:border-gray-700 rounded-2xl p-4 bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-gray-800 transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <FileText size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold truncate dark:text-gray-200">{paper.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{paper.pages} pages · {paper.chunks} chunks</p>
        </div>
      </div>
    </div>
  )
}
