import { useEffect, useMemo, useState } from 'react'
import { OrdersEmptyState } from '../components/orders/OrdersEmptyState'
import { OrdersFilters } from '../components/orders/OrdersFilters'
import { OrdersPagination } from '../components/orders/OrdersPagination'
import { OrdersTable } from '../components/orders/OrdersTable'
import { ordersMock } from '../data/orders'
import type {
  OrderStatusFilter,
  OrdersSortOption,
  PaymentMethodFilter,
} from '../types/order'

const ORDERS_PER_PAGE = 4

export function OrdersPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatusFilter>('all')
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>('all')
  const [sortBy, setSortBy] = useState<OrdersSortOption>('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = ordersMock.filter((order) => {
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

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        case 'oldest':
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        case 'total-desc':
          return b.total_amount - a.total_amount
        case 'total-asc':
          return a.total_amount - b.total_amount
        case 'customer-asc':
          return a.customer_name.localeCompare(b.customer_name)
        case 'customer-desc':
          return b.customer_name.localeCompare(a.customer_name)
        default:
          return 0
      }
    })
  }, [search, status, paymentMethod, sortBy])

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE
    const endIndex = startIndex + ORDERS_PER_PAGE

    return filteredOrders.slice(startIndex, endIndex)
  }, [filteredOrders, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, status, paymentMethod, sortBy])

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  function handleResetFilters() {
    setSearch('')
    setStatus('all')
    setPaymentMethod('all')
    setSortBy('newest')
    setCurrentPage(1)
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
        sortBy={sortBy}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentMethodChange={setPaymentMethod}
        onSortChange={setSortBy}
        onReset={handleResetFilters}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-900">{paginatedOrders.length}</span>{' '}
          of <span className="font-medium text-slate-900">{filteredOrders.length}</span>{' '}
          {filteredOrders.length === 1 ? 'order' : 'orders'}
        </p>

        {filteredOrders.length > 0 && (
          <p className="text-sm text-slate-500">
            Current page:{' '}
            <span className="font-medium text-slate-900">{currentPage}</span>
          </p>
        )}
      </div>

      {filteredOrders.length > 0 ? (
        <>
          <OrdersTable orders={paginatedOrders} />
          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <OrdersEmptyState onReset={handleResetFilters} />
      )}
    </div>
  )
}