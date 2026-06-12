import { useApp } from '../context/AppContext'
import StatsRow from '../components/Papers/StatsRow'
import PaperCard from '../components/Papers/PaperCard'
import EmptyState from '../components/common/EmptyState'

export default function PapersPage() {
  const { papers } = useApp()
  const totalChunks = papers.reduce((s, p) => s + p.chunks, 0)

  if (papers.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Paper Library</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Manage your uploaded research papers.</p>
        <EmptyState icon="Library" title="No papers yet" description="Upload your first paper to get started." />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Paper Library</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Manage your uploaded research papers.</p>
      <StatsRow totalPapers={papers.length} totalChunks={totalChunks} avgChunks={Math.round(totalChunks / papers.length)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {papers.map((p) => (
          <PaperCard key={p.name} paper={p} />
        ))}
      </div>
    </div>
  )
}
