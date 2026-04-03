import type { OrderStatus } from '../../types/order'

type OrderStatusSelectProps = {
  value: OrderStatus
  onChange: (value: OrderStatus) => void
}

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
]

export function OrderStatusSelect({
  value,
  onChange,
}: OrderStatusSelectProps) {
  return (
    <div>
      <label
        htmlFor="orderStatus"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Update status
      </label>

      <select
        id="orderStatus"
        value={value}
        onChange={(event) => onChange(event.target.value as OrderStatus)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
      >
        {ORDER_STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}