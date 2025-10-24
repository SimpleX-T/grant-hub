"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useVerification } from "~/contexts/VerificationContext";
import Link from "next/link";
import { fetchGrants } from "~/services/api";
import { GrantProgram } from "~/types/grants";

export default function GrantDetailPage() {
  const { isVerified } = useVerification();
  const router = useRouter();
  const { id: grantId } = useParams<{ id: string }>();
  const [grant, setGrant] = useState<GrantProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isVerified) {
      router.push("/verify");
    }
  }, [isVerified, router]);

  useEffect(() => {
    loadGrantDetails();
  }, [grantId]);

  const loadGrantDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchGrants(500, 0, "Active");
      const foundGrant = data.programs.find((g) => g.programId === grantId);
      setGrant(foundGrant || null);
    } catch (err) {
      console.error(err);
      setGrant(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isVerified) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 rounded-lg border border-purple-500/20 p-8 animate-pulse">
            <div className="h-8 bg-gray-800 rounded mb-4 w-3/4" />
            <div className="h-4 bg-gray-800 rounded mb-2 w-full" />
            <div className="h-4 bg-gray-800 rounded mb-8 w-5/6" />
            <div className="h-32 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!grant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 rounded-lg border border-red-500/30 p-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Grant Not Found
            </h1>
            <p className="text-gray-300 mb-8">
              The grant program you're looking for doesn't exist or is no longer
              active.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 border border-purple-500"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Grants</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatBudget = (budget: number): string => {
    if (budget >= 1000000) return `$${(budget / 1000000).toFixed(1)}M`;
    if (budget >= 1000) return `$${(budget / 1000).toFixed(0)}K`;
    if (budget > 0) return `$${budget.toLocaleString()}`;
    return "Not specified";
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Grants</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 p-6 border-b border-purple-500">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {grant.metadata.title}
                </h1>
                {grant.metadata.organizations.length > 0 && (
                  <p className="text-purple-100">
                    By {grant.metadata.organizations.join(", ")}
                  </p>
                )}
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-xs text-purple-100 uppercase font-semibold">
                  Budget
                </div>
                <div className="text-2xl font-bold text-white">
                  {formatBudget(grant.metadata.programBudget)}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                About This Grant
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {grant.metadata.description}
              </p>
            </div>

            {/* Key Information Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Grants Distributed
                </h3>
                <p className="text-3xl font-bold text-white">
                  {grant.metadata.grantsToDate || 0}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Amount Distributed
                </h3>
                <p className="text-3xl font-bold text-white">
                  {formatBudget(grant.metadata.amountDistributedToDate)}
                </p>
              </div>
            </div>

            {/* Categories & Grant Types */}
            {(grant.metadata.categories.length > 0 ||
              grant.metadata.grantTypes.length > 0) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Categories & Types
                </h2>
                <div className="flex flex-wrap gap-2">
                  {grant.metadata.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1.5 bg-purple-900/50 text-purple-300 font-semibold rounded-lg border border-purple-500/30"
                    >
                      {cat}
                    </span>
                  ))}
                  {grant.metadata.grantTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1.5 bg-blue-900/50 text-blue-300 font-semibold rounded-lg border border-blue-500/30"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {(grant.metadata.startsAt || grant.metadata.endsAt) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Timeline</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {grant.metadata.startsAt && (
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-sm text-purple-400 font-semibold uppercase mb-1">
                        Starts
                      </div>
                      <div className="text-white font-semibold">
                        {formatDate(grant.metadata.startsAt)}
                      </div>
                    </div>
                  )}
                  {grant.metadata.endsAt && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <div className="text-sm text-red-400 font-semibold uppercase mb-1">
                        Deadline
                      </div>
                      <div className="text-white font-semibold">
                        {formatDate(grant.metadata.endsAt)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ecosystems & Networks */}
            {(grant.metadata.ecosystems.length > 0 ||
              grant.metadata.networks.length > 0) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Ecosystems & Networks
                </h2>
                <div className="flex flex-wrap gap-2">
                  {grant.metadata.ecosystems.map((eco) => (
                    <span
                      key={eco}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-700"
                    >
                      {eco}
                    </span>
                  ))}
                  {grant.metadata.networks.map((net) => (
                    <span
                      key={net}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-700"
                    >
                      {net}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Important Links */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                Important Links
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {grant.metadata.socialLinks.grantsSite && (
                  <a
                    href={grant.metadata.socialLinks.grantsSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 border border-purple-500"
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span className="font-bold">Apply for Grant</span>
                  </a>
                )}
                {grant.metadata.socialLinks.orgWebsite && (
                  <a
                    href={grant.metadata.socialLinks.orgWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-700"
                  >
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
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="font-bold">Organization Website</span>
                  </a>
                )}
                {grant.metadata.projectTwitter && (
                  <a
                    href={grant.metadata.projectTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="font-bold">Follow on X</span>
                  </a>
                )}
                {grant.metadata.socialLinks.discord && (
                  <a
                    href={grant.metadata.socialLinks.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span className="font-bold">Join Discord</span>
                  </a>
                )}
              </div>
            </div>

            {/* Admin Info */}
            {grant.admins.length > 0 && (
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  Program Admins
                </h3>
                <div className="flex flex-wrap gap-2">
                  {grant.admins.map((admin) => (
                    <code
                      key={admin}
                      className="text-xs text-gray-300 bg-gray-900 px-2 py-1 rounded"
                    >
                      {admin.slice(0, 6)}...{admin.slice(-4)}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
