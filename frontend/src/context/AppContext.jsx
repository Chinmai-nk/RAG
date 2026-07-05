import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || ''

const AppContext = createContext()

export function AppProvider({ children }) {
  const [papers, setPapers] = useState([])
  const [selectedPapers, setSelectedPapers] = useState([])

  const fetchPapers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/papers`)
      setPapers(data.papers || [])
    } catch {}
  }, [])

  useEffect(() => { fetchPapers() }, [fetchPapers])

  function togglePaper(name) {
    setSelectedPapers((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  function removeSelectedPaper(name) {
    setSelectedPapers((prev) => prev.filter((p) => p !== name))
  }

  return (
    <AppContext.Provider value={{ papers, selectedPapers, togglePaper, removeSelectedPaper, fetchPapers }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
