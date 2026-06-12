import ReactMarkdown from 'react-markdown'
import CitationChip from './CitationChip'

export default function Message({ msg, onSourcesClick }) {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div className={`max-w-[75%] ${isUser ? '' : 'w-full'}`}>
        {isUser ? (
          <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 text-sm">
            {msg.text}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-4 text-sm leading-relaxed transition-colors">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 dark:text-gray-200">{children}</p>,
              }}
            >
              {msg.text}
            </ReactMarkdown>
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t dark:border-gray-700 space-x-1.5">
                {msg.sources.map((s, i) => (
                  <CitationChip key={i} source={s} />
                ))}
                <button
                  onClick={onSourcesClick}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  View all
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
