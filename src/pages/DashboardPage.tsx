import { ordersMock } from '../data/orders'
import { formatCurrency } from '../lib/formatters'

export function DashboardPage() {
  const totalOrders = ordersMock.length
  const pendingOrders = ordersMock.filter(
    (order) => order.status === 'pending',
  ).length
  const shippedOrders = ordersMock.filter(
    (order) => order.status === 'shipped',
  ).length
  const revenue = ordersMock.reduce((sum, order) => sum + order.total_amount, 0)

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
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <p className="mt-2 text-sm text-slate-500">
          Orders activity preview will be added in the next step.
        </p>
      </section>
    </div>
  )
}