import { OrdersTable } from '@/components/orders/OrdersTable'

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Track and manage customer purchases and transactions.</p>
      </div>

      <OrdersTable />
    </div>
  )
}
