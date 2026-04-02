import { OrdersTable } from '../components/orders/OrdersTable'
import { ordersMock } from '../data/orders'

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage customer orders, statuses, and details.
        </p>
      </header>

      <OrdersTable orders={ordersMock} />
    </div>
  )
}