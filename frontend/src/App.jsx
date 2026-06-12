import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import SearchPage from './pages/SearchPage'
import PapersPage from './pages/PapersPage'
import UploadPage from './pages/UploadPage'
import LiteraturePage from './pages/LiteraturePage'

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/literature" element={<LiteraturePage />} />
      </Route>
    </Routes>
  )
}
