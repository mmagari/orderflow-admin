import { create } from 'zustand'
import { orderDetailsMock } from '../data/orderDetails'
import type { OrderDetails, OrderStatus } from '../types/order'

type OrdersStore = {
  orders: OrderDetails[]
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: orderDetailsMock,

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    }))
  },
}))