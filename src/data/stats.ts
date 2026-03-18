export interface StatCard {
  title: string
  value: string
  change: number
  icon: string
  description: string
}

export const stats: StatCard[] = [
  {
    title: 'Total Users',
    value: '24,521',
    change: 12.5,
    icon: 'Users',
    description: 'vs last month',
  },
  {
    title: 'Monthly Revenue',
    value: '$148,200',
    change: 8.2,
    icon: 'DollarSign',
    description: 'vs last month',
  },
  {
    title: 'Active Sessions',
    value: '3,847',
    change: -3.1,
    icon: 'Activity',
    description: 'right now',
  },
  {
    title: 'Conversion Rate',
    value: '5.24%',
    change: 1.8,
    icon: 'TrendingUp',
    description: 'vs last month',
  },
]
