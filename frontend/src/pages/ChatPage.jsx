import { useState, useRef, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { chatQuery } from '../services/api'
import SourcesDrawer from '../components/Layout/SourcesDrawer'
import Message from '../components/Chat/Message'
import ChatInput from '../components/Chat/ChatInput'
import EmptyState from '../components/common/EmptyState'
import SkeletonLoader from '../components/common/SkeletonLoader'

export default function ChatPage() {
  const { selectedPapers } = useApp()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [sources, setSources] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(async (query, top_k, use_rerank) => {
    const userMsg = { role: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const paper_names = selectedPapers.length > 0 ? selectedPapers : null
      const res = await chatQuery(query, top_k, paper_names, use_rerank)
      setMessages((prev) => [...prev, { role: 'assistant', text: res.answer, sources: res.sources }])
      setSources(res.sources)
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }, [selectedPapers])

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        {messages.length === 0 && !loading && (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon="MessageSquare"
              title="Ask a question"
              description="Ask questions about your uploaded research papers."
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <Message key={i} msg={m} onSourcesClick={() => setDrawerOpen(true)} />
          ))}
          {loading && <SkeletonLoader />}
          <div ref={bottomRef} />
        </div>
        <div className="border-t dark:border-gray-800 p-4 bg-white dark:bg-gray-900 transition-colors">
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>
      <SourcesDrawer sources={sources} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
