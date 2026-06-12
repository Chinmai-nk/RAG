import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'

export default function DropZone({ onFile, disabled, status }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(files) {
    const file = files[0]
    if (file && file.name.endsWith('.pdf')) {
      onFile(file)
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
        dragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
      } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${status === 'success' ? 'border-green-400' : ''} ${status === 'error' ? 'border-red-400' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept=".pdf" hidden onChange={(e) => handleFiles(e.target.files)} disabled={disabled} />
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Upload size={24} className="text-blue-600 dark:text-blue-400" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">Drop PDF files here</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">or click to browse</p>
    </div>
  )
}
