export default function ErrorState({
  error,
  loadGrants,
}: {
  error: string;
  loadGrants: () => void;
}) {
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="bg-red-950/50 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-300 mb-1">
              Error Loading Grants
            </h3>
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadGrants}
              className="mt-3 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
