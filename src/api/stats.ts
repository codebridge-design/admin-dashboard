import type { StatCard } from '@/data/stats'
import { db } from '@/mocks/db'

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchStats(): Promise<StatCard[]> {
  if (import.meta.env.PROD) {
    await sleep(150)
    return db.stats
  }

  const res = await fetch('/api/stats')
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json()
}
