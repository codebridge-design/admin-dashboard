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

function generateEmail(name: string, id: number): string {
  const [first, last] = name.toLowerCase().split(' ')
  return `${first}.${last}${id}@example.com`
}

function generateDate(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('')
}

export const users: User[] = names.map((name, i) => ({
  id: i + 1,
  name,
  email: generateEmail(name, i + 1),
  role: roles[i % roles.length],
  status: i % 7 === 0 ? 'pending' : i % 4 === 0 ? 'inactive' : 'active',
  joinDate: generateDate(Math.floor(Math.random() * 730)),
  revenue: Math.floor(Math.random() * 50000) + 500,
  country: countries[i % countries.length],
  avatar: getInitials(name),
}))
