export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="flex-shrink-0 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-50 text-sm disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <div className="flex gap-2 overflow-x-auto">
        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
          if (pageNum > totalPages) return null;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg font-semibold ${
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
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="flex-shrink-0 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-50 text-sm disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
