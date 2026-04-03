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

export interface OrderItem {
  id: string
  product_name: string
  quantity: number
  unit_price: number
}

export interface OrderDetails extends Order {
  customer_phone: string
  shipping_address: string
  items: OrderItem[]
}

export type OrderStatusFilter = OrderStatus | 'all'
export type PaymentMethodFilter = PaymentMethod | 'all'

export type OrdersSortOption =
  | 'newest'
  | 'oldest'
  | 'total-desc'
  | 'total-asc'
  | 'customer-asc'
  | 'customer-desc'