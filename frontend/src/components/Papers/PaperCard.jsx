import { useState } from 'react'
import { FileText, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { deletePaper } from '../../services/api'
import ConfirmModal from '../common/ConfirmModal'

export default function PaperCard({ paper }) {
  const { removeSelectedPaper, fetchPapers } = useApp()
  const [showDelete, setShowDelete] = useState(false)

  async function handleDelete() {
    try {
      await deletePaper(paper.name)
      removeSelectedPaper(paper.name)
      fetchPapers()
    } catch {}
    setShowDelete(false)
  }

  return (
    <>
      <div className="border dark:border-gray-700 rounded-2xl p-4 bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-gray-800 transition-shadow group relative">
        <button
          onClick={() => setShowDelete(true)}
          className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
        >
          <Trash2 size={16} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
        </button>
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
      <ConfirmModal
        isOpen={showDelete}
        title={`Delete "${paper.name}"?`}
        message="This will remove all its chunks from the vector store and delete the uploaded PDF file. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  )
}
