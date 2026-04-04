import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { orderDetailsMock } from '../data/orderDetails'
import type { OrderDetails, OrderStatus } from '../types/order'

type OrdersStore = {
  orders: OrderDetails[]
  updateOrderStatus: (id: string, status: OrderStatus) => void
  resetOrders: () => void
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: orderDetailsMock,

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order,
          ),
        }))
      },

      resetOrders: () => {
        set({
          orders: orderDetailsMock,
        })
      },
    }),
    {
      name: 'orderflow-orders',
    },
  ),
)