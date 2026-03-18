import { http, HttpResponse, delay } from 'msw'
import { db } from './db'
import type { UserRole, UserStatus, OrderStatus } from './db'

export const handlers = [
  // ─── Stats ─────────────────────────────────────────────────────────────────
  http.get('/api/stats', async () => {
    await delay(150)
    return HttpResponse.json(db.stats)
  }),

  // ─── Charts ────────────────────────────────────────────────────────────────
  http.get('/api/charts/revenue', async () => {
    await delay(150)
    return HttpResponse.json(db.revenue)
  }),

  http.get('/api/charts/activity', async () => {
    await delay(150)
    return HttpResponse.json(db.activity)
  }),

  http.get('/api/charts/countries', async () => {
    await delay(150)
    return HttpResponse.json(db.countries)
  }),

  // ─── Users ─────────────────────────────────────────────────────────────────
  http.get('/api/users', async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''
    const role = url.searchParams.get('role') as UserRole | 'all' | null
    const status = url.searchParams.get('status') as UserStatus | 'all' | null

    let result = [...db.users]

    if (search) {
      result = result.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search),
      )
    }
    if (role && role !== 'all') result = result.filter((u) => u.role === role)
    if (status && status !== 'all') result = result.filter((u) => u.status === status)

    return HttpResponse.json({ users: result, total: result.length })
  }),

  http.delete('/api/users/:id', async ({ params }) => {
    await delay(300)
    const id = Number(params.id)
    const idx = db.users.findIndex((u) => u.id === id)
    if (idx === -1) return new HttpResponse(null, { status: 404 })
    db.users.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  http.post('/api/users', async ({ request }) => {
    await delay(400)
    const body = await request.json() as Omit<import('./db').User, 'id'>
    const newUser = { ...body, id: Math.max(0, ...db.users.map((u) => u.id)) + 1 }
    db.users.push(newUser)
    return HttpResponse.json(newUser, { status: 201 })
  }),

  // ─── Orders ────────────────────────────────────────────────────────────────
  http.get('/api/orders', async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''
    const status = url.searchParams.get('status') as OrderStatus | 'all' | null

    let result = [...db.orders]

    if (search) {
      result = result.filter(
        (o) => o.customer.toLowerCase().includes(search) || o.id.toLowerCase().includes(search),
      )
    }
    if (status && status !== 'all') result = result.filter((o) => o.status === status)

    return HttpResponse.json({ orders: result, total: result.length })
  }),

  // ─── Products ──────────────────────────────────────────────────────────────
  http.get('/api/products', async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''
    const category = url.searchParams.get('category') ?? 'all'

    let result = [...db.products]

    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search))
    }
    if (category !== 'all') result = result.filter((p) => p.category === category)

    return HttpResponse.json({ products: result, total: result.length })
  }),
]
