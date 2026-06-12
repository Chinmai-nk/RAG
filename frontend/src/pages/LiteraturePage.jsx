import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { literatureReview } from '../services/api'
import ConfigPanel from '../components/Literature/ConfigPanel'
import ReviewContent from '../components/Literature/ReviewContent'
import EmptyState from '../components/common/EmptyState'

export default function LiteraturePage() {
  const { selectedPapers } = useApp()
  const [topic, setTopic] = useState('')
  const [topK, setTopK] = useState(20)
  const [useRerank, setUseRerank] = useState(true)
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState(null)
  const [error, setError] = useState(null)

  async function handleGenerate(e) {
    e.preventDefault()
    if (!topic.trim()) return
    setLoading(true)
    setError(null)
    setReview(null)
    try {
      const paper_names = selectedPapers.length > 0 ? selectedPapers : null
      const res = await literatureReview(topic, topK, paper_names, useRerank)
      setReview(res)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Literature Review Generator</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Generate structured literature reviews from your research papers.</p>

      <ConfigPanel
        topic={topic}
        onTopicChange={setTopic}
        topK={topK}
        onTopKChange={setTopK}
        useRerank={useRerank}
        onRerankChange={setUseRerank}
        loading={loading}
        onGenerate={handleGenerate}
      />

      {loading && (
        <div className="mt-6 space-y-3 animate-fadeIn">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
      )}

      {error && (
        <div className="mt-6 border dark:border-red-800 rounded-2xl p-5 bg-red-50 dark:bg-red-900/20 border-red-200 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !review && !error && (
        <div className="mt-12">
          <EmptyState icon="BookOpen" title="Generate a review" description="Enter a topic and click Generate." />
        </div>
      )}

      {review && <ReviewContent review={review} />}
    </div>
  )
}
