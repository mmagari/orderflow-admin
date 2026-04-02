type OrdersEmptyStateProps = {
  onReset: () => void
}

export function OrdersEmptyState({ onReset }: OrdersEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        No orders found
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Try changing your filters or clear them to see all orders.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Clear filters
      </button>
    </div>
  )
}