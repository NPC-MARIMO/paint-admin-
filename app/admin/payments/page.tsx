'use client'

import { useEffect, useState, useCallback } from 'react'
import { getPayments } from '@/lib/api'
import { DataTable, Column } from '@/components/admin/data-table'
import { TablePagination } from '@/components/admin/table-pagination'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import Link from 'next/link'
import type { Payment, PaymentStatus } from '@/lib/types'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const statusOptions: { value: PaymentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
]

const statusStyles: Record<PaymentStatus, string> = {
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  refunded: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const loadPayments = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getPayments({
        search,
        status: status as PaymentStatus || undefined,
        page,
        limit: 10
      })
      setPayments(result.data)
      setTotalPages(result.totalPages)
      setTotalItems(result.total)
    } catch (error) {
      toast.error('Failed to load payments')
    } finally {
      setIsLoading(false)
    }
  }, [search, status, page])

  useEffect(() => {
    loadPayments()
  }, [loadPayments])

  const columns: Column<Payment>[] = [
    {
      key: 'id',
      header: 'Transaction ID',
      cell: (payment) => (
        <span className="font-mono text-sm">{payment.id}</span>
      )
    },
    {
      key: 'order',
      header: 'Order',
      cell: (payment) => (
        payment.orderId ? (
          <Link
            href={`/admin/orders/${payment.orderId}`}
            className="text-primary hover:underline"
          >
            {payment.orderId}
          </Link>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      )
    },
    {
      key: 'user',
      header: 'Customer',
      cell: (payment) => (
        <span>{payment.userName}</span>
      )
    },
    {
      key: 'method',
      header: 'Method',
      cell: (payment) => (
        <Badge variant="secondary">{payment.method}</Badge>
      )
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (payment) => (
        <span className="font-medium">${payment.amount.toFixed(2)}</span>
      ),
      className: 'text-right'
    },
    {
      key: 'status',
      header: 'Status',
      cell: (payment) => (
        <Badge variant="outline" className={statusStyles[payment.status]}>
          {payment.status}
        </Badge>
      )
    },
    {
      key: 'date',
      header: 'Date',
      cell: (payment) => (
        <span className="text-muted-foreground">
          {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
        </span>
      )
    }
  ]

  // Calculate summary stats
  const completedTotal = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const pendingTotal = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground mt-1">
          View and track all payment transactions
        </p>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-500">${completedTotal.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">${pendingTotal.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
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
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={payments}
          isLoading={isLoading}
          emptyMessage="No payments found"
          emptyDescription="Payment transactions will appear here."
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
