import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronUp, ChevronDown, ChevronsUpDown, Download } from 'lucide-react'
import type { Product, StockStatus } from '@/mocks/db'
import { fetchProducts } from '@/api/products'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortKey = keyof Pick<Product, 'name' | 'category' | 'price' | 'stock' | 'status'>
type SortDir = 'asc' | 'desc' | null

const PAGE_SIZE = 10

const statusVariant: Record<StockStatus, 'success' | 'warning' | 'danger'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
}

const statusLabel: Record<StockStatus, string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
}

const categories = ['SaaS Plans', 'Add-ons', 'Support', 'Bundles']

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== column) return <ChevronsUpDown className="ml-1 h-3 w-3 opacity-40" />
  if (sortDir === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />
  return <ChevronDown className="ml-1 h-3 w-3" />
}

function StockBar({ stock }: { stock: number }) {
  if (stock === 0) return <span className="text-sm text-muted-foreground">—</span>
  const pct = Math.min(100, (stock / 200) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-20 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground tabular-nums">{stock}</span>
    </div>
  )
}

export function ProductsTable() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebouncedValue(search, 300)

  const { data, isLoading } = useQuery({
    queryKey: ['products', { search: debouncedSearch, category: categoryFilter }],
    queryFn: () => fetchProducts({ search: debouncedSearch, category: categoryFilter }),
    placeholderData: (prev) => prev,
  })

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'))
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sorted = useMemo(() => {
    let result = data?.products ?? []
    if (sortKey && sortDir) {
      result = [...result].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return result
  }, [data, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const cols: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
  ]

  if (isLoading && !data) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>{sorted.length} of {data?.total ?? 0} products</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="flex-1 h-9 text-sm md:text-sm"
          />
          <Select
            value={categoryFilter}
            onValueChange={(v) => { setCategoryFilter(v); setPage(1) }}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                {cols.map(({ key, label }) => (
                  <TableHead
                    key={key}
                    className="h-11 px-3 cursor-pointer select-none whitespace-nowrap"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      {label}
                      <SortIcon column={key} sortKey={sortKey} sortDir={sortDir} />
                    </div>
                  </TableHead>
                ))}
                <TableHead className="h-11 px-3">SKU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="px-3 py-3">
                      <p className="text-sm font-medium">{product.name}</p>
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <Badge variant="outline">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-3 text-sm font-medium whitespace-nowrap">
                      ${product.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <StockBar stock={product.stock} />
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <Badge variant={statusVariant[product.status]} className="whitespace-nowrap">
                        {statusLabel[product.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-3 font-mono text-sm text-muted-foreground">
                      {product.sku}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, sorted.length)}–
            {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} products
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
