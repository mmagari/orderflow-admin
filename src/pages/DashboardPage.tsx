import { Link } from 'react-router-dom'
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge'
import { ordersMock } from '../data/orders'
import { formatCurrency, formatDate } from '../lib/formatters'

export function DashboardPage() {
  const totalOrders = ordersMock.length
  const pendingOrders = ordersMock.filter(
    (order) => order.status === 'pending',
  ).length
  const shippedOrders = ordersMock.filter(
    (order) => order.status === 'shipped',
  ).length
  const revenue = ordersMock.reduce((sum, order) => sum + order.total_amount, 0)

  const recentOrders = [...ordersMock]
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 4)

  const stats = [
    { label: 'Total Orders', value: totalOrders },
    { label: 'Pending', value: pendingOrders },
    { label: 'Shipped', value: shippedOrders },
    { label: 'Revenue', value: formatCurrency(revenue) },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Overview of orders and store activity.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <p className="mt-1 text-sm text-slate-500">
              Latest order activity overview.
            </p>
          </div>

          <Link
            to="/orders"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{order.order_number}</p>
                <p className="text-sm text-slate-500">{order.customer_name}</p>
              </div>

              <div className="text-sm text-slate-500">{formatDate(order.created_at)}</div>

              <div className="text-sm font-medium text-slate-900">
                {formatCurrency(order.total_amount)}
              </div>

              <OrderStatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}