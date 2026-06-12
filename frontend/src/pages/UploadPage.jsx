import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { uploadPDF, indexChunks } from '../services/api'
import DropZone from '../components/Upload/DropZone'

export default function UploadPage() {
  const { fetchPapers } = useApp()
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleFile(file) {
    setStatus('uploading')
    setError(null)
    setResult(null)
    try {
      const uploadRes = await uploadPDF(file)
      const idxRes = await indexChunks(uploadRes.chunks)
      setResult({ filename: uploadRes.filename, pages: uploadRes.pages, chunks: idxRes.chunk_count })
      setStatus('success')
      fetchPapers()
    } catch (e) {
      setError(e.response?.data?.detail || e.message)
      setStatus('error')
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Upload Paper</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Upload a research paper in PDF format.</p>
      <DropZone onFile={handleFile} disabled={status === 'uploading'} status={status} />
      {status === 'uploading' && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Uploading and indexing...</p>
        </div>
      )}
      {status === 'success' && result && (
        <div className="mt-6 border dark:border-green-800 rounded-2xl p-5 bg-green-50 dark:bg-green-900/20 border-green-200 animate-fadeIn">
          <p className="font-semibold text-green-800 dark:text-green-300">{result.filename}</p>
          <p className="text-sm text-green-700 dark:text-green-400 mt-1">{result.pages} pages · {result.chunks} chunks indexed</p>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-6 border dark:border-red-800 rounded-2xl p-5 bg-red-50 dark:bg-red-900/20 border-red-200 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
