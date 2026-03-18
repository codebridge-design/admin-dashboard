import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { TopCountriesChart } from '@/components/dashboard/TopCountriesChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const recentActivity = [
  { user: 'Alice Johnson', action: 'Signed up', time: '2 min ago', type: 'signup' },
  { user: 'Bob Smith', action: 'Upgraded to Pro', time: '15 min ago', type: 'upgrade' },
  { user: 'Carol Williams', action: 'Submitted report', time: '1 hr ago', type: 'report' },
  { user: 'David Brown', action: 'Deactivated account', time: '3 hr ago', type: 'deactivate' },
  { user: 'Eva Davis', action: 'Signed up', time: '5 hr ago', type: 'signup' },
]

const typeColor: Record<string, 'success' | 'default' | 'secondary' | 'danger'> = {
  signup: 'success',
  upgrade: 'default',
  report: 'secondary',
  deactivate: 'danger',
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <StatsCards />

          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueChart />
            <ActivityChart />
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">{item.user}</p>
                        <p className="text-xs text-muted-foreground">{item.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={typeColor[item.type]} className="text-xs capitalize">
                        {item.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueChart />
            <TopCountriesChart />
          </div>
          <ActivityChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
