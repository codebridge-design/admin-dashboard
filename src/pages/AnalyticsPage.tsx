import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { TopCountriesChart } from '@/components/dashboard/TopCountriesChart'
import { StatsCards } from '@/components/dashboard/StatsCards'

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Deep dive into your platform metrics and trends.</p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <TopCountriesChart />
      </div>
      <ActivityChart />
    </div>
  )
}
