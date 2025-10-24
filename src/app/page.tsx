"use client";

import { useEffect, useState } from "react";
import { useVerification } from "~/contexts/VerificationContext";
import { fetchGrants } from "~/services/api";
import { GrantProgram } from "~/types/grants";
import Pagination from "~/components/grants/pagination";
import InfoCard from "~/components/grants/info-card";
import GrantCard from "~/components/grants/grant-card";
import ErrorState from "~/components/grants/states/error";
import LoadingState from "~/components/grants/states/loading";
import Hero from "~/components/grants/hero";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <Hero totalCount={totalCount} isVerified={isVerified} />

        {/* Error State */}
        {error && <ErrorState error={error} loadGrants={loadGrants} />}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Grants Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {grants.map((grant) => (
                <GrantCard key={grant._id.$oid} grant={grant} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}

        {/* Info Card */}
        {!isVerified && !loading && <InfoCard />}
      </div>
    </div>
  );
}
