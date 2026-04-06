import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/orders'
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge'
import { formatCurrency, formatDate } from '../lib/formatters'
import { Skeleton } from '../components/ui/Skeleton'

export function DashboardPage() {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Overview of orders and store activity.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-8 w-20" />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-52" />

          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Overview of orders and store activity.
          </p>
        </header>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load data. Please try again later.
        </div>
      </div>
    )
  }

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === 'pending').length
  const shippedOrders = orders.filter((order) => order.status === 'shipped').length
  const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0)

  const recentOrders = [...orders]
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
                {formatCurrency(Number(order.total_amount))}
              </div>

              <OrderStatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}