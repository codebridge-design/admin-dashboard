import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchCountries } from '@/api/charts'

const COLORS = [
  'hsl(221.2, 83.2%, 53.3%)',
  'hsl(142.1, 70.6%, 45.3%)',
  'hsl(47.9, 95.8%, 53.1%)',
  'hsl(0, 84.2%, 60.2%)',
  'hsl(280, 65%, 60%)',
  'hsl(200, 80%, 50%)',
  'hsl(30, 90%, 55%)',
  'hsl(170, 60%, 45%)',
]

function CustomTooltip({ active, payload, total }: TooltipProps<any, any> & { total: number }) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  const name = String(entry?.name ?? '')
  const value = Number(entry?.value ?? 0)
  return (
    <div className="rounded-lg border bg-popover p-3 shadow-md text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-muted-foreground">
        {value.toLocaleString()} users ({total ? ((value / total) * 100).toFixed(1) : '0.0'}%)
      </p>
    </div>
  )
}

export function TopCountriesChart() {
  const { data: countryData, isLoading } = useQuery({
    queryKey: ['charts', 'countries'],
    queryFn: fetchCountries,
  })

  const total = countryData?.reduce((sum, d) => sum + d.users, 0) ?? 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by Country</CardTitle>
        <CardDescription>Geographic distribution of your user base</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || !countryData ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                dataKey="users"
                nameKey="country"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >
                {countryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={(props) => <CustomTooltip {...props} total={total} />} />
              <Legend
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
