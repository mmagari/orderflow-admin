import type {
  OrderStatusFilter,
  OrdersSortOption,
  PaymentMethodFilter,
} from '../../types/order'

type OrdersFiltersProps = {
  search: string
  status: OrderStatusFilter
  paymentMethod: PaymentMethodFilter
  sortBy: OrdersSortOption
  onSearchChange: (value: string) => void
  onStatusChange: (value: OrderStatusFilter) => void
  onPaymentMethodChange: (value: PaymentMethodFilter) => void
  onSortChange: (value: OrdersSortOption) => void
  onReset: () => void
}

export function OrdersFilters({
  search,
  status,
  paymentMethod,
  sortBy,
  onSearchChange,
  onStatusChange,
  onPaymentMethodChange,
  onSortChange,
  onReset,
}: OrdersFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by order number, name or email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as OrderStatusFilter)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Payment
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(event) =>
              onPaymentMethodChange(event.target.value as PaymentMethodFilter)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          >
            <option value="all">All methods</option>
            <option value="card">Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="sortBy"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sort by
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as OrdersSortOption)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="total-desc">Highest total</option>
            <option value="total-asc">Lowest total</option>
            <option value="customer-asc">Customer A-Z</option>
            <option value="customer-desc">Customer Z-A</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}