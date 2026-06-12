import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/chat', label: 'Chat' },
  { to: '/papers', label: 'Papers' },
  { to: '/literature', label: 'Literature Review' },
]

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
      <span className="text-lg font-bold">RAG Assistant</span>
      <div className="flex gap-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              isActive ? 'text-blue-400 underline' : 'text-gray-300 hover:text-white'
            }
            end={l.to === '/'}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
