import ReactMarkdown from 'react-markdown'
import FloatingToolbar from './FloatingToolbar'

export default function ReviewContent({ review }) {
  return (
    <div className="mt-6 border dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 animate-fadeIn relative transition-colors">
      <FloatingToolbar content={review.review} />
      <div className="p-6 pt-4">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{review.review}</ReactMarkdown>
        </div>
        {review.sources && review.sources.length > 0 && (
          <div className="mt-6 pt-4 border-t dark:border-gray-700">
            <h3 className="font-semibold text-sm mb-2 dark:text-gray-200">Sources</h3>
            <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              {review.sources.map((s, i) => (
                <p key={i}>
                  <span className="font-medium">{s.paper_name}</span> — Page {s.page}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
