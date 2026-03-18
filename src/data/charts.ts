export interface RevenueDataPoint {
  month: string
  revenue: number
  expenses: number
}

export interface ActivityDataPoint {
  day: string
  sessions: number
  signups: number
}

export interface CountryDataPoint {
  country: string
  users: number
}

export const revenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 65000, expenses: 42000 },
  { month: 'Feb', revenue: 72000, expenses: 45000 },
  { month: 'Mar', revenue: 68000, expenses: 40000 },
  { month: 'Apr', revenue: 85000, expenses: 52000 },
  { month: 'May', revenue: 92000, expenses: 58000 },
  { month: 'Jun', revenue: 110000, expenses: 63000 },
  { month: 'Jul', revenue: 98000, expenses: 59000 },
  { month: 'Aug', revenue: 125000, expenses: 71000 },
  { month: 'Sep', revenue: 118000, expenses: 68000 },
  { month: 'Oct', revenue: 135000, expenses: 75000 },
  { month: 'Nov', revenue: 142000, expenses: 80000 },
  { month: 'Dec', revenue: 148200, expenses: 85000 },
]

export const activityData: ActivityDataPoint[] = [
  { day: 'Mon', sessions: 1200, signups: 45 },
  { day: 'Tue', sessions: 1850, signups: 72 },
  { day: 'Wed', sessions: 2200, signups: 95 },
  { day: 'Thu', sessions: 1950, signups: 68 },
  { day: 'Fri', sessions: 2800, signups: 110 },
  { day: 'Sat', sessions: 1500, signups: 38 },
  { day: 'Sun', sessions: 980, signups: 22 },
]

export const countryData: CountryDataPoint[] = [
  { country: 'USA', users: 8420 },
  { country: 'UK', users: 3210 },
  { country: 'Germany', users: 2850 },
  { country: 'France', users: 2100 },
  { country: 'Canada', users: 1980 },
  { country: 'Australia', users: 1650 },
  { country: 'Japan', users: 1420 },
  { country: 'Brazil', users: 1100 },
]
