export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lg shadow-purple-500/10 border border-purple-500/20 p-8 animate-pulse"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl" />
            <div className="px-4 py-2 bg-gray-800 rounded-full w-20 h-8" />
          </div>
          <div className="h-6 bg-gray-800 rounded mb-3 w-3/4" />
          <div className="h-4 bg-gray-800 rounded mb-2 w-full" />
          <div className="h-4 bg-gray-800 rounded mb-6 w-5/6" />
          <div className="h-12 bg-gray-800 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
}
