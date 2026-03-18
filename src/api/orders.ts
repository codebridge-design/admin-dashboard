import type { Order, OrderStatus } from '@/mocks/db'
import { db } from '@/mocks/db'

export interface OrdersFilters {
  search?: string
  status?: OrderStatus | 'all'
}

export interface OrdersResponse {
  orders: Order[]
  total: number
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchOrders(filters: OrdersFilters = {}): Promise<OrdersResponse> {
  if (import.meta.env.PROD) {
    await sleep(150)

    const search = filters.search?.toLowerCase() ?? ''
    const status = filters.status ?? 'all'

    let result = [...db.orders]
    if (search) {
      result = result.filter(
        (o) => o.customer.toLowerCase().includes(search) || o.id.toLowerCase().includes(search),
      )
    }
    if (status !== 'all') result = result.filter((o) => o.status === status)

    return { orders: result, total: result.length }
  }

  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.status && filters.status !== 'all') params.set('status', filters.status)

  const res = await fetch(`/api/orders?${params}`)
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}
