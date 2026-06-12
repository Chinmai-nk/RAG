import { MessageSquare, BookOpen, Search, Library, Upload } from 'lucide-react'

const iconMap = { MessageSquare, BookOpen, Search, Library, Upload }

export default function EmptyState({ icon = 'Search', title, description }) {
  const Icon = iconMap[icon] || Search

  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={24} className="text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{title}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{description}</p>
    </div>
  )
}
