export default function SkeletonLoader() {
  return (
    <div className="space-y-3 animate-fadeIn">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
    </div>
  )
}
