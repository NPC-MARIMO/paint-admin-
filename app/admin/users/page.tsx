'use client'

import { useEffect, useState, useCallback } from 'react'
import { getUsers, updateUserRole, toggleUserStatus } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { DataTable, Column } from '@/components/admin/data-table'
import { TablePagination } from '@/components/admin/table-pagination'
import { ConfirmModal } from '@/components/admin/confirm-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreHorizontal, Shield, ShieldOff, UserCog } from 'lucide-react'
import type { User, UserRole } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const roleOptions: { value: UserRole | 'all'; label: string }[] = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'user', label: 'User' },
]

const roleStyles: Record<UserRole, string> = {
  admin: 'bg-red-500/10 text-red-500 border-red-500/20',
  staff: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  user: 'bg-green-500/10 text-green-500 border-green-500/20',
}

export default function UsersPage() {
  const { hasPermission } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [disableModalOpen, setDisableModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState<UserRole>('user')
  const [isUpdating, setIsUpdating] = useState(false)

  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getUsers({
        search,
        role: role as UserRole || undefined,
        page,
        limit: 10
      })
      setUsers(result.data)
      setTotalPages(result.totalPages)
      setTotalItems(result.total)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setIsLoading(false)
    }
  }, [search, role, page])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleRoleChange = async () => {
    if (!selectedUser) return
    
    setIsUpdating(true)
    try {
      await updateUserRole(selectedUser.id, newRole)
      toast.success('User role updated')
      setRoleModalOpen(false)
      setSelectedUser(null)
      loadUsers()
    } catch (error) {
      toast.error('Failed to update user role')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleToggleStatus = async () => {
    if (!selectedUser) return
    
    setIsUpdating(true)
    try {
      await toggleUserStatus(selectedUser.id)
      toast.success(`User ${selectedUser.isDisabled ? 'enabled' : 'disabled'}`)
      setDisableModalOpen(false)
      setSelectedUser(null)
      loadUsers()
    } catch (error) {
      toast.error('Failed to update user status')
    } finally {
      setIsUpdating(false)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const columns: Column<User>[] = [
    {
      key: 'user',
      header: 'User',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium flex items-center gap-2">
              {user.name}
              {user.isDisabled && (
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">
                  Disabled
                </Badge>
              )}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user) => (
        <Badge variant="outline" className={roleStyles[user.role]}>
          {user.role}
        </Badge>
      )
    },
    {
      key: 'orders',
      header: 'Orders',
      cell: (user) => (
        <span className="text-muted-foreground">{user.ordersCount}</span>
      ),
      className: 'text-center'
    },
    {
      key: 'joined',
      header: 'Joined',
      cell: (user) => (
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      cell: (user) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {hasPermission('manage_roles') && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user)
                  setNewRole(user.role)
                  setRoleModalOpen(true)
                }}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Change Role
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(user)
                setDisableModalOpen(true)
              }}
            >
              {user.isDisabled ? (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Enable User
                </>
              ) : (
                <>
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Disable User
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'w-12'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage user accounts and permissions
        </p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={role}
          onValueChange={(value) => {
            setRole(value === 'all' ? '' : value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          emptyMessage="No users found"
          emptyDescription="Users will appear here when they register."
        />
        
        {totalPages > 1 && (
          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        )}
      </motion.div>

      {/* Change Role Modal */}
      {selectedUser && (
        <ConfirmModal
          open={roleModalOpen}
          onOpenChange={setRoleModalOpen}
          title="Change User Role"
          description={
            <div className="space-y-4">
              <p>Change role for {selectedUser.name}</p>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
          confirmText="Save Changes"
          onConfirm={handleRoleChange}
          isLoading={isUpdating}
        />
      )}

      {/* Disable/Enable Modal */}
      <ConfirmModal
        open={disableModalOpen}
        onOpenChange={setDisableModalOpen}
        title={selectedUser?.isDisabled ? 'Enable User' : 'Disable User'}
        description={
          selectedUser?.isDisabled
            ? `Are you sure you want to enable ${selectedUser?.name}? They will be able to access their account again.`
            : `Are you sure you want to disable ${selectedUser?.name}? They will not be able to access their account.`
        }
        confirmText={selectedUser?.isDisabled ? 'Enable' : 'Disable'}
        onConfirm={handleToggleStatus}
        isLoading={isUpdating}
        variant={selectedUser?.isDisabled ? 'default' : 'destructive'}
      />
    </div>
  )
}
