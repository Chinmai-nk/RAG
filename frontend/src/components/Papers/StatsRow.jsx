import { FileText, Layers, CheckCircle, BarChart3 } from 'lucide-react'

const stats = [
  { icon: FileText, label: 'Total Papers', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' },
  { icon: Layers, label: 'Total Chunks', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' },
  { icon: CheckCircle, label: 'Indexed', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' },
  { icon: BarChart3, label: 'Avg Chunks/Paper', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30' },
]

export default function StatsRow({ totalPapers, totalChunks, avgChunks }) {
  const values = [totalPapers, totalChunks, totalPapers, avgChunks]

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={s.label} className="border dark:border-gray-700 rounded-2xl p-4 bg-white dark:bg-gray-900 transition-colors">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
            <s.icon size={16} />
          </div>
          <p className="text-2xl font-bold mt-3 dark:text-gray-100">{values[i]}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
