import type { StatCard } from '@/data/stats'
import type { RevenueDataPoint, ActivityDataPoint, CountryDataPoint } from '@/data/charts'

// ─── User types & data ────────────────────────────────────────────────────────

export type UserRole = 'Admin' | 'Editor' | 'Viewer' | 'Manager'
export type UserStatus = 'active' | 'inactive' | 'pending'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinDate: string
  revenue: number
  country: string
  avatar: string
}

const countries = ['USA', 'UK', 'Germany', 'France', 'Canada', 'Australia', 'Japan', 'Brazil', 'India', 'Spain']
const roles: UserRole[] = ['Admin', 'Editor', 'Viewer', 'Manager']
const statuses: UserStatus[] = ['active', 'inactive', 'pending']

const names = [
  'Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Davis',
  'Frank Miller', 'Grace Wilson', 'Henry Moore', 'Iris Taylor', 'Jack Anderson',
  'Karen Thomas', 'Liam Jackson', 'Mia White', 'Noah Harris', 'Olivia Martin',
  'Paul Thompson', 'Quinn Garcia', 'Rachel Martinez', 'Sam Robinson', 'Tara Clark',
  'Uma Rodriguez', 'Victor Lewis', 'Wendy Lee', 'Xavier Walker', 'Yara Hall',
  'Zoe Allen', 'Aaron Young', 'Bella Hernandez', 'Chris King', 'Diana Wright',
  'Ethan Lopez', 'Fiona Hill', 'George Scott', 'Hannah Green', 'Ian Adams',
  'Julia Baker', 'Kyle Gonzalez', 'Laura Nelson', 'Mike Carter', 'Nina Mitchell',
  'Oscar Perez', 'Penny Roberts', 'Quinn Turner', 'Rose Phillips', 'Steve Campbell',
  'Tina Parker', 'Ulysses Evans', 'Vera Edwards', 'Walter Collins', 'Xena Stewart',
]

function genEmail(name: string, id: number) {
  const [first, last] = name.toLowerCase().split(' ')
  return `${first}.${last}${id}@example.com`
}

function genDate(daysAgo: number) {
  const d = new Date(2026, 2, 18) // fixed base date for stable data
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('')
}


function seededVal(seed: number, max: number, min = 0) {
  return Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * (max - min)) + min
}

const seedUsers: User[] = names.map((name, i) => ({
  id: i + 1,
  name,
  email: genEmail(name, i + 1),
  role: roles[i % roles.length],
  status: i % 7 === 0 ? 'pending' : i % 4 === 0 ? 'inactive' : 'active',
  joinDate: genDate(seededVal(i + 1, 730)),
  revenue: seededVal(i + 31, 50000, 500),
  country: countries[i % countries.length],
  avatar: initials(name),
}))

// ─── Order types & seed data ─────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'fulfilled' | 'cancelled'

export interface Order {
  id: string
  customer: string
  email: string
  product: string
  amount: number
  status: OrderStatus
  date: string
}

const orderStatuses: OrderStatus[] = ['fulfilled', 'fulfilled', 'fulfilled', 'pending', 'cancelled']
const productNames = [
  'Pro Plan — Monthly', 'Pro Plan — Annual', 'Starter Pack', 'Enterprise License',
  'API Access', 'Data Export Add-on', 'Priority Support', 'White-label Bundle',
  'Team Seats (x5)', 'Analytics Module',
]

function generateOrders(): Order[] {
  return names.slice(0, 30).map((name, i) => {
    const [first, last] = name.toLowerCase().split(' ')
    return {
      id: `ORD-${String(i + 1).padStart(4, '0')}`,
      customer: name,
      email: `${first}.${last}${i + 1}@example.com`,
      product: productNames[i % productNames.length],
      amount: seededVal(i + 101, 4900, 49) + 0.99 - 0.01, // $49.98–$4999.98
      status: orderStatuses[i % orderStatuses.length],
      date: genDate(seededVal(i + 5, 90)),
    }
  })
}

// ─── Product types & seed data ───────────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: StockStatus
  sku: string
}

const categories = ['SaaS Plans', 'Add-ons', 'Support', 'Bundles']
const productData = [
  { name: 'Pro Plan — Monthly', category: 'SaaS Plans', price: 49, stock: 999 },
  { name: 'Pro Plan — Annual', category: 'SaaS Plans', price: 490, stock: 999 },
  { name: 'Starter Pack', category: 'SaaS Plans', price: 19, stock: 999 },
  { name: 'Enterprise License', category: 'SaaS Plans', price: 1200, stock: 12 },
  { name: 'API Access', category: 'Add-ons', price: 29, stock: 45 },
  { name: 'Data Export Add-on', category: 'Add-ons', price: 15, stock: 0 },
  { name: 'Analytics Module', category: 'Add-ons', price: 39, stock: 8 },
  { name: 'White-label Bundle', category: 'Bundles', price: 299, stock: 5 },
  { name: 'Team Seats (x5)', category: 'Bundles', price: 199, stock: 27 },
  { name: 'Priority Support', category: 'Support', price: 99, stock: 50 },
  { name: 'Dedicated Support', category: 'Support', price: 249, stock: 3 },
  { name: 'Onboarding Package', category: 'Support', price: 149, stock: 0 },
  { name: 'Growth Bundle', category: 'Bundles', price: 399, stock: 14 },
  { name: 'Storage Expansion', category: 'Add-ons', price: 10, stock: 200 },
  { name: 'Custom Domain Add-on', category: 'Add-ons', price: 12, stock: 75 },
  { name: 'SSO Integration', category: 'Add-ons', price: 79, stock: 0 },
  { name: 'Audit Log Access', category: 'Add-ons', price: 49, stock: 6 },
  { name: 'Business Plan — Annual', category: 'SaaS Plans', price: 990, stock: 999 },
  { name: 'Compliance Pack', category: 'Bundles', price: 599, stock: 2 },
  { name: 'Migration Service', category: 'Support', price: 499, stock: 4 },
]

function stockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out_of_stock'
  if (stock <= 10) return 'low_stock'
  return 'in_stock'
}

function generateProducts(): Product[] {
  return productData.map((p, i) => ({
    id: i + 1,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
    status: stockStatus(p.stock),
    sku: `SKU-${categories.indexOf(p.category) + 1}${String(i + 1).padStart(3, '0')}`,
  }))
}


export const db = {
  users: [...seedUsers] as User[],

  // ─── Stats ──────────────────────────────────────────────────────────────────
  stats: [
    { title: 'Total Users', value: '24,521', change: 12.5, icon: 'Users', description: 'vs last month' },
    { title: 'Monthly Revenue', value: '$148,200', change: 8.2, icon: 'DollarSign', description: 'vs last month' },
    { title: 'Active Sessions', value: '3,847', change: -3.1, icon: 'Activity', description: 'right now' },
    { title: 'Conversion Rate', value: '5.24%', change: 1.8, icon: 'TrendingUp', description: 'vs last month' },
  ] as StatCard[],

  // ─── Charts ─────────────────────────────────────────────────────────────────
  revenue: [
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
  ] as RevenueDataPoint[],

  activity: [
    { day: 'Mon', sessions: 1200, signups: 45 },
    { day: 'Tue', sessions: 1850, signups: 72 },
    { day: 'Wed', sessions: 2200, signups: 95 },
    { day: 'Thu', sessions: 1950, signups: 68 },
    { day: 'Fri', sessions: 2800, signups: 110 },
    { day: 'Sat', sessions: 1500, signups: 38 },
    { day: 'Sun', sessions: 980, signups: 22 },
  ] as ActivityDataPoint[],

  countries: [
    { country: 'USA', users: 8420 },
    { country: 'UK', users: 3210 },
    { country: 'Germany', users: 2850 },
    { country: 'France', users: 2100 },
    { country: 'Canada', users: 1980 },
    { country: 'Australia', users: 1650 },
    { country: 'Japan', users: 1420 },
    { country: 'Brazil', users: 1100 },
  ] as CountryDataPoint[],

  // ─── Orders ─────────────────────────────────────────────────────────────────
  orders: generateOrders(),

  // ─── Products ───────────────────────────────────────────────────────────────
  products: generateProducts(),
}

