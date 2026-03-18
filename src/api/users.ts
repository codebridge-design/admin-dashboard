import type { User, UserRole, UserStatus } from '@/mocks/db'
import { db } from '@/mocks/db'

export interface UsersFilters {
  search?: string
  role?: UserRole | 'all'
  status?: UserStatus | 'all'
}

export interface UsersResponse {
  users: User[]
  total: number
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchUsers(filters: UsersFilters = {}): Promise<UsersResponse> {
  if (import.meta.env.PROD) {
    await sleep(150)

    const search = filters.search?.toLowerCase() ?? ''
    const role = filters.role ?? 'all'
    const status = filters.status ?? 'all'

    let result = [...db.users]
    if (search) {
      result = result.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search),
      )
    }
    if (role !== 'all') result = result.filter((u) => u.role === role)
    if (status !== 'all') result = result.filter((u) => u.status === status)

    return { users: result, total: result.length }
  }

  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.role && filters.role !== 'all') params.set('role', filters.role)
  if (filters.status && filters.status !== 'all') params.set('status', filters.status)

  const res = await fetch(`/api/users?${params}`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function deleteUser(id: number): Promise<void> {
  if (import.meta.env.PROD) {
    await sleep(150)
    const idx = db.users.findIndex((u) => u.id === id)
    if (idx === -1) throw new Error('Failed to delete user')
    db.users.splice(idx, 1)
    return
  }

  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete user')
}
