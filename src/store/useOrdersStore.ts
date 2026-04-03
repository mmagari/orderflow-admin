import { create } from 'zustand'
import { orderDetailsMock } from '../data/orderDetails'
import type { Order, OrderDetails, OrderStatus } from '../types/order'

type OrdersStore = {
  orders: OrderDetails[]
  getOrders: () => Order[]
  getOrderById: (id: string) => OrderDetails | undefined
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: orderDetailsMock,

  getOrders: () => {
    return get().orders.map(
      ({
        id,
        order_number,
        customer_name,
        customer_email,
        status,
        payment_method,
        total_amount,
        created_at,
      }) => ({
        id,
        order_number,
        customer_name,
        customer_email,
        status,
        payment_method,
        total_amount,
        created_at,
      }),
    )
  },

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id)
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    }))
  },
}))