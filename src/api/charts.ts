import type { RevenueDataPoint, ActivityDataPoint, CountryDataPoint } from '@/data/charts'
import { db } from '@/mocks/db'

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchRevenue(): Promise<RevenueDataPoint[]> {
  if (import.meta.env.PROD) {
    await sleep(150)
    return db.revenue
  }

  const res = await fetch('/api/charts/revenue')
  if (!res.ok) throw new Error('Failed to fetch revenue data')
  return res.json()
}

export async function fetchActivity(): Promise<ActivityDataPoint[]> {
  if (import.meta.env.PROD) {
    await sleep(150)
    return db.activity
  }

  const res = await fetch('/api/charts/activity')
  if (!res.ok) throw new Error('Failed to fetch activity data')
  return res.json()
}

export async function fetchCountries(): Promise<CountryDataPoint[]> {
  if (import.meta.env.PROD) {
    await sleep(150)
    return db.countries
  }

  const res = await fetch('/api/charts/countries')
  if (!res.ok) throw new Error('Failed to fetch countries data')
  return res.json()
}
