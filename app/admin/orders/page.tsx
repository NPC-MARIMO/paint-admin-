'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getOrders } from '@/lib/api'
import { DataTable, Column } from '@/components/admin/data-table'
import { TablePagination } from '@/components/admin/table-pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Eye } from 'lucide-react'
import Link from 'next/link'
import type { Order, OrderStatus } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const statusOptions: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const paymentStyles: Record<string, string> = {
  paid: 'bg-green-500/10 text-green-500 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const loadOrders = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getOrders({
        search,
        status: status as OrderStatus || undefined,
        page,
        limit: 10
      })
      setOrders(result.data)
      setTotalPages(result.totalPages)
      setTotalItems(result.total)
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }, [search, status, page])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const columns: Column<Order>[] = [
    {
      key: 'id',
      header: 'Order ID',
      cell: (order) => (
        <Link
          href={`/admin/orders/${order.id}`}
          className="font-medium text-primary hover:underline"
        >
          {order.id}
        </Link>
      )
    },
    {
      key: 'customer',
      header: 'Customer',
      cell: (order) => (
        <div>
          <p className="font-medium">{order.userName}</p>
          <p className="text-xs text-muted-foreground">{order.userEmail}</p>
        </div>
      )
    },
    {
      key: 'items',
      header: 'Items',
      cell: (order) => (
        <span className="text-muted-foreground">
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: (order) => (
        <Badge variant="outline" className={statusStyles[order.status]}>
          {order.status}
        </Badge>
      )
    },
    {
      key: 'payment',
      header: 'Payment',
      cell: (order) => (
        <Badge variant="outline" className={paymentStyles[order.paymentStatus]}>
          {order.paymentStatus}
        </Badge>
      )
    },
    {
      key: 'total',
      header: 'Total',
      cell: (order) => (
        <span className="font-medium">${order.totalPrice.toFixed(2)}</span>
      ),
      className: 'text-right'
    },
    {
      key: 'date',
      header: 'Date',
      cell: (order) => (
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      cell: (order) => (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/orders/${order.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
      className: 'w-12'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track customer orders
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
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value === 'all' ? '' : value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
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
          data={orders}
          isLoading={isLoading}
          emptyMessage="No orders found"
          emptyDescription="Orders will appear here when customers make purchases."
          onRowClick={(order) => router.push(`/admin/orders/${order.id}`)}
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
    </div>
  )
}
