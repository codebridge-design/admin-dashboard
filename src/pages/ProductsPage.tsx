import { ProductsTable } from '@/components/products/ProductsTable'

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">Manage your product catalog, pricing, and inventory.</p>
      </div>

      <ProductsTable />
    </div>
  )
}
