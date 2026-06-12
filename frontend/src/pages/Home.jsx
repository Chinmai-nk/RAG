import { Link } from 'react-router-dom'
import { MessageSquare, BookOpen, Search, Library, Upload } from 'lucide-react'

const cards = [
  { to: '/chat', icon: MessageSquare, title: 'Chat with Papers', desc: 'Ask questions and get citation-backed answers from your research papers.' },
  { to: '/search', icon: Search, title: 'Semantic Search', desc: 'Search across all your uploaded papers semantically.' },
  { to: '/literature', icon: BookOpen, title: 'Literature Review', desc: 'Generate structured literature reviews automatically.' },
  { to: '/papers', icon: Library, title: 'Paper Library', desc: 'Browse, manage, and organize your uploaded papers.' },
  { to: '/upload', icon: Upload, title: 'Upload', desc: 'Upload new research papers (PDF) to index and query.' },
]

export default function Home() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Research Paper Assistant</h1>
        <p className="text-gray-500 dark:text-gray-400">Upload, search, and analyze academic papers using AI-powered RAG.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="flex items-start gap-4 border dark:border-gray-700 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 bg-white dark:bg-gray-900"
          >
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
              <c.icon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-semibold dark:text-gray-100">{c.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
