import Link from "next/link";

export default function Hero({
  totalCount,
  isVerified,
}: {
  totalCount: number;
  isVerified: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-6">
        <div className="px-6 py-1 rounded-full bg-purple-900/50 border border-purple-500/30">
          <span className="text-sm font-semibold text-purple-300">
            Exclusive Student Grants
          </span>
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
        Discover Web3 Student Grants
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Verify your student status to unlock access to {totalCount}+ active
        grant programs
      </p>
      {!isVerified && (
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 border border-purple-500"
        >
          <span>Verify Student Status</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
