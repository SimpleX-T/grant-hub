export default function InfoCard() {
  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Tip</h3>
            <p className="text-gray-300">
              Click "View Grant" on any program to see full details. Verify your
              student status to unlock application access to all grants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
