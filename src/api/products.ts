import type { Product } from '@/mocks/db'
import { db } from '@/mocks/db'

export interface ProductsFilters {
  search?: string
  category?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchProducts(filters: ProductsFilters = {}): Promise<ProductsResponse> {
  if (import.meta.env.PROD) {
    await sleep(150)

    const search = filters.search?.toLowerCase() ?? ''
    const category = filters.category ?? 'all'

    let result = [...db.products]
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search))
    if (category !== 'all') result = result.filter((p) => p.category === category)

    return { products: result, total: result.length }
  }

  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.category && filters.category !== 'all') params.set('category', filters.category)

  const res = await fetch(`/api/products?${params}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
