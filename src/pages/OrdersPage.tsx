import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/orders'
import { OrdersEmptyState } from '../components/orders/OrdersEmptyState'
import { OrdersFilters } from '../components/orders/OrdersFilters'
import { OrdersPagination } from '../components/orders/OrdersPagination'
import { OrdersTable } from '../components/orders/OrdersTable'
import { Skeleton } from '../components/ui/Skeleton'
import type {
  OrderStatusFilter,
  OrdersSortOption,
  PaymentMethodFilter,
} from '../types/order'

const ORDERS_PER_PAGE = 4

export function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatusFilter>('all')
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>('all')
  const [sortBy, setSortBy] = useState<OrdersSortOption>('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = orders.filter((order) => {
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
  }, [orders, search, status, paymentMethod, sortBy])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE),
  )
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedOrders = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ORDERS_PER_PAGE
    const endIndex = startIndex + ORDERS_PER_PAGE

    return filteredOrders.slice(startIndex, endIndex)
  }, [filteredOrders, safeCurrentPage])

  function handleSearchChange(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleStatusChange(value: OrderStatusFilter) {
    setStatus(value)
    setCurrentPage(1)
  }

  function handlePaymentMethodChange(value: PaymentMethodFilter) {
    setPaymentMethod(value)
    setCurrentPage(1)
  }

  function handleSortChange(value: OrdersSortOption) {
    setSortBy(value)
    setCurrentPage(1)
  }

  function handleResetFilters() {
    setSearch('')
    setStatus('all')
    setPaymentMethod('all')
    setSortBy('newest')
    setCurrentPage(1)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer orders, statuses, and details.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="space-y-0">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 border-t border-slate-200 p-6 first:border-t-0"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <header>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer orders, statuses, and details.
          </p>
        </header>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load data. Please try again later.
        </div>
      </div>
    )
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
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onPaymentMethodChange={handlePaymentMethodChange}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing{' '}
          <span className="font-medium text-slate-900">
            {paginatedOrders.length}
          </span>{' '}
          of{' '}
          <span className="font-medium text-slate-900">
            {filteredOrders.length}
          </span>{' '}
          {filteredOrders.length === 1 ? 'order' : 'orders'}
        </p>

        {filteredOrders.length > 0 && (
          <p className="text-sm text-slate-500">
            Current page:{' '}
            <span className="font-medium text-slate-900">
              {safeCurrentPage}
            </span>
          </p>
        )}
      </div>

      {filteredOrders.length > 0 ? (
        <>
          <OrdersTable orders={paginatedOrders} />
          <OrdersPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <OrdersEmptyState onReset={handleResetFilters} />
      )}
    </div>
  )
}