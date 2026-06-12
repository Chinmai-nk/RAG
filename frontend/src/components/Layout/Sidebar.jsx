import { NavLink } from 'react-router-dom'
import { MessageSquare, BookOpen, Search, Library, Upload, Home, Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/literature', label: 'Literature Review', icon: BookOpen },
  { to: '/papers', label: 'Papers', icon: Library },
]

export default function Sidebar() {
  const { papers, selectedPapers, togglePaper } = useApp()
  const [dark, setDark] = useState(true)

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm flex flex-col h-full transition-colors">
      <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Search size={16} className="text-white" />
          </div>
          <span className="font-semibold text-base dark:text-gray-100">Research Assistant</span>
        </div>
        <button onClick={toggleDark} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {dark ? <Sun size={16} className="text-gray-400" /> : <Moon size={16} className="text-gray-400" />}
        </button>
      </div>

      <nav className="p-3 space-y-1 border-b dark:border-gray-800">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
            end={l.to === '/'}
          >
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
          Papers
        </h3>
        {papers.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 px-3">No papers uploaded yet.</p>
        )}
        {papers.map((p) => (
          <label
            key={p.name}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-sm transition-colors ${
              selectedPapers.includes(p.name)
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedPapers.includes(p.name)}
              onChange={() => togglePaper(p.name)}
              className="accent-blue-600"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate">{p.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{p.pages} pages · {p.chunks} chunks</p>
            </div>
          </label>
        ))}
      </div>

      <div className="p-3 border-t dark:border-gray-800">
        <NavLink
          to="/upload"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Upload size={16} />
          Upload Paper
        </NavLink>
      </div>
    </aside>
  )
}
