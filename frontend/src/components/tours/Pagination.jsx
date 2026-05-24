export default function Pagination({ page, totalPages, onPageChange }) {
    // Only show if multiple pages
    if (totalPages <= 1) return null;
  
    return (
      <nav
        aria-label="Pagination"
        className="flex justify-center space-x-1.5"
      >
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50"
        >
          Prev
        </button>
  
        <span className="inline-flex items-center px-3 py-1.5 text-sm font-semibold text-slate-900">
          Page {page} of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 disabled:opacity-50 hover:bg-slate-50"
        >
          Next
        </button>
      </nav>
    );
  }