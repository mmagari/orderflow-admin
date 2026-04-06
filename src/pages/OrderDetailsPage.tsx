import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchOrderById, updateOrderStatus } from '../api/orders'
import { OrderStatusBadge } from '../components/orders/OrderStatusBadge'
import { OrderStatusSelect } from '../components/orders/OrderStatusSelect'
import { formatCurrency, formatDate, formatStatusLabel } from '../lib/formatters'
import type { OrderStatus } from '../types/order'
import { Skeleton } from '../components/ui/Skeleton'

export function OrderDetailsPage() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: OrderStatus
    }) => updateOrderStatus(id, status),

    onSuccess: async (updatedOrder, variables) => {
      toast.success(
        `Order status updated to ${formatStatusLabel(variables.status)}`,
      )

      queryClient.setQueryData(['order', id], (oldData: typeof updatedOrder | undefined) => {
        if (!oldData) {
          return oldData
        }

        return {
          ...oldData,
          status: updatedOrder.status,
        }
      })

      queryClient.setQueryData(['orders'], (oldData: typeof updatedOrder[] | undefined) => {
        if (!oldData) {
          return oldData
        }

        return oldData.map((order) =>
          order.id === updatedOrder.id
            ? { ...order, status: updatedOrder.status }
            : order,
        )
      })

      await queryClient.invalidateQueries({
        queryKey: ['orders'],
        refetchType: 'all',
      })

      await queryClient.invalidateQueries({
        queryKey: ['order', id],
        refetchType: 'all',
      })
    },

    onError: () => {
      toast.error('Failed to update order status')
    },
  })

  function handleStatusChange(value: OrderStatus) {
    if (!order) {
      return
    }

    if (order.status === value) {
      toast('Status is already set to this value')
      return
    }

    mutation.mutate({
      id: order.id,
      status: value,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-48" />
          </div>

          <Skeleton className="h-10 w-24" />
        </div>

        <section className="grid gap-4 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-5 w-32" />
              <Skeleton className="mt-4 h-4 w-40" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="mt-2 h-4 w-52" />

          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order not found</h2>
          <p className="mt-1 text-sm text-slate-500">
            We could not find the requested order.
          </p>
        </div>

        <Link
          to="/orders"
          className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Back to orders
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Order details</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">
            {order.order_number}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Created on {formatDate(order.created_at)}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/orders"
            className="inline-flex rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </Link>
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Customer</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            {order.customer_name}
          </h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>{order.customer_email}</p>
            <p>{order.customer_phone}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Shipping address</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {order.shipping_address}
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Order summary</p>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex items-center justify-between">
                <span>Payment</span>
                <span className="capitalize">{order.payment_method}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(order.total_amount)}
                </span>
              </div>
            </div>
          </div>

          <OrderStatusSelect
            value={order.status}
            onChange={handleStatusChange}
            disabled={mutation.isPending}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Items</h3>
          <p className="mt-1 text-sm text-slate-500">
            Products included in this order.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Product
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Quantity
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Unit price
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Line total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    {item.product_name}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {formatCurrency(item.unit_price)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">
                    {formatCurrency(item.quantity * item.unit_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}