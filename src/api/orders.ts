import { supabase } from '../lib/supabase'
import type { OrderDetails, OrderStatus } from '../types/order'

export async function fetchOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function fetchOrderById(id: string): Promise<OrderDetails> {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (orderError) {
    throw orderError
  }

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id)

  if (itemsError) {
    throw itemsError
  }

  return {
    ...order,
    items,
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}