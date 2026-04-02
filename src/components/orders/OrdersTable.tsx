import { formatCurrency, formatDate } from '../../lib/formatters'
import type { Order } from '../../types/order'
import { OrderStatusBadge } from './OrderStatusBadge'

type OrdersTableProps = {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Order
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Payment
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Total
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-slate-200 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {order.order_number}
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {order.customer_name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {order.customer_email}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(order.created_at)}
                </td>

                <td className="px-6 py-4 text-sm capitalize text-slate-600">
                  {order.payment_method}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {formatCurrency(order.total_amount)}
                </td>

                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}