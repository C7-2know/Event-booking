export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1 border rounded disabled:opacity-40">
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`px-3 py-1 rounded ${n === page ? "bg-green-800 text-white" : "border"}`}
        >
          {n}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-1 border rounded disabled:opacity-40">
        ›
      </button>
    </div>
  );
}