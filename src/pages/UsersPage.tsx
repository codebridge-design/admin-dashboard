import { UsersTable } from '@/components/users/UsersTable'

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage your platform users, roles, and permissions.</p>
      </div>

      <UsersTable />
    </div>
  )
}
