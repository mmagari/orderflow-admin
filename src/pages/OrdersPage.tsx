import { useMemo, useState } from 'react'
import { OrdersEmptyState } from '../components/orders/OrdersEmptyState'
import { OrdersFilters } from '../components/orders/OrdersFilters'
import { OrdersTable } from '../components/orders/OrdersTable'
import { ordersMock } from '../data/orders'
import type { OrderStatusFilter, PaymentMethodFilter } from '../types/order'

export function OrdersPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatusFilter>('all')
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>('all')

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return ordersMock.filter((order) => {
      const matchesSearch =
        normalizedSearch === '' ||
        order.order_number.toLowerCase().includes(normalizedSearch) ||
        order.customer_name.toLowerCase().includes(normalizedSearch) ||
        order.customer_email.toLowerCase().includes(normalizedSearch)

      const matchesStatus = status === 'all' || order.status === status
      const matchesPayment =
        paymentMethod === 'all' || order.payment_method === paymentMethod

      return matchesSearch && matchesStatus && matchesPayment
    })
  }, [search, status, paymentMethod])

  function handleResetFilters() {
    setSearch('')
    setStatus('all')
    setPaymentMethod('all')
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage customer orders, statuses, and details.
        </p>
      </header>

      <OrdersFilters
        search={search}
        status={status}
        paymentMethod={paymentMethod}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentMethodChange={setPaymentMethod}
        onReset={handleResetFilters}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-900">{filteredOrders.length}</span>{' '}
          {filteredOrders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      {filteredOrders.length > 0 ? (
        <OrdersTable orders={filteredOrders} />
      ) : (
        <OrdersEmptyState onReset={handleResetFilters} />
      )}
    </div>
  )
}