type OrdersPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function OrdersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OrdersPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-900">{currentPage}</span> of{' '}
        <span className="font-medium text-slate-900">{totalPages}</span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}