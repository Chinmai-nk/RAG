import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [papers, setPapers] = useState([])
  const [selectedPapers, setSelectedPapers] = useState([])

  const fetchPapers = useCallback(async () => {
    try {
      const { data } = await axios.get('/papers')
      setPapers(data.papers || [])
    } catch {}
  }, [])

  useEffect(() => { fetchPapers() }, [fetchPapers])

  function togglePaper(name) {
    setSelectedPapers((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  return (
    <AppContext.Provider value={{ papers, selectedPapers, togglePaper, fetchPapers }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
