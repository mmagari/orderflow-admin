export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentMethod = 'card' | 'paypal' | 'cash'

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  status: OrderStatus
  payment_method: PaymentMethod
  total_amount: number
  created_at: string
}

export type OrderStatusFilter = OrderStatus | 'all'
export type PaymentMethodFilter = PaymentMethod | 'all'