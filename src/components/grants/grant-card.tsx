import Link from "next/link";
import { formatBudget, getGrantIcon } from "../../lib/helpers";
import { GrantProgram } from "~/types/grants";

export default function GrantCard({ grant }: { grant: GrantProgram }) {
  return (
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
  );
}
