"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useVerification } from "~/contexts/VerificationContext";
import { fetchGrants } from "~/services/api";
import { GrantProgram } from "~/types/grants";

export default function Home() {
  const { isVerified } = useVerification();
  const [grants, setGrants] = useState<GrantProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const grantsPerPage = 12;

  useEffect(() => {
    loadGrants();
  }, [currentPage]);

  const loadGrants = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = (currentPage - 1) * grantsPerPage;
      const data = await fetchGrants(grantsPerPage, offset, "Active");
      setGrants(data.programs);
      setTotalCount(data.count);
    } catch (err) {
      setError("Failed to load grants. Please try again later.");
      console.error("Error loading grants:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / grantsPerPage);

  const getGrantIcon = (grant: GrantProgram): string => {
    const categories = grant.metadata.categories;
    if (categories.includes("DeFi")) return "DeFi";
    if (categories.includes("Infrastructure")) return "Infra";
    if (categories.includes("AI")) return "AI";
    if (categories.includes("Communities")) return "Community";
    if (categories.includes("Gaming") || categories.includes("GameFi"))
      return "Gaming";
    if (categories.includes("NFT")) return "NFT";
    return "Grant";
  };

  const formatBudget = (budget: number): string => {
    if (budget >= 1000000) return `$${(budget / 1000000).toFixed(1)}M`;
    if (budget >= 1000) return `$${(budget / 1000).toFixed(0)}K`;
    if (budget > 0) return `$${budget}`;
    return "Varied";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-lg bg-purple-900/50 border border-purple-500/30">
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

        {/* Error State */}
        {error && (
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
        )}

        {/* Loading State */}
        {loading && (
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
        )}

        {/* Grants Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {grants.map((grant) => (
                <div
                  key={grant._id.$oid}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 hover:border-purple-500/40 h-full flex flex-col"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="px-3 py-1 bg-purple-900/50 rounded-lg text-sm font-semibold text-purple-300 border border-purple-500/30">
                        {getGrantIcon(grant)}
                      </div>
                      <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg">
                        {formatBudget(grant.metadata.programBudget)}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {grant.metadata.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3 flex-1">
                      {grant.metadata.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {grant.metadata.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded border border-gray-700"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/grant/${grant.programId}`}
                      className="inline-flex items-center justify-center w-full px-5 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 border border-purple-500 text-sm"
                    >
                      <span>View Grant</span>
                      <svg
                        className="w-4 h-4 ml-2"
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
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum =
                      currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg font-semibold ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white border border-purple-500"
                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Info Card */}
        {!isVerified && !loading && (
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
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Quick Tip
                  </h3>
                  <p className="text-gray-300">
                    Click "View Grant" on any program to see full details.
                    Verify your student status to unlock application access to
                    all grants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
