'use client'

import { useEffect, useState } from 'react'
import { getDashboardStats } from '@/lib/api'
import { StatsCard } from '@/components/admin/stats-card'
import { RecentOrders } from '@/components/admin/recent-orders'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, ShoppingCart, DollarSign, Users, Plus, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import type { Order } from '@/lib/types'
import { motion } from 'framer-motion'

interface DashboardData {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  recentOrders: Order[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await getDashboardStats()
        setData(stats)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your paint shop performance
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={data?.totalProducts ?? 0}
          description="in inventory"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Orders"
          value={data?.totalOrders ?? 0}
          description="this month"
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Revenue"
          value={data ? `$${data.totalRevenue.toFixed(2)}` : '$0.00'}
          description="from completed orders"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          isLoading={isLoading}
        />
        <StatsCard
          title="Active Users"
          value={data?.totalUsers ?? 0}
          description="registered customers"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Orders - Takes up more space */}
        <div className="lg:col-span-4">
          <RecentOrders
            orders={data?.recentOrders ?? []}
            isLoading={isLoading}
          />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/products/create">
                    <Plus className="mr-3 h-4 w-4" />
                    Add New Product
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/orders">
                    <FileText className="mr-3 h-4 w-4" />
                    View All Orders
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/users">
                    <Users className="mr-3 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/payments">
                    <TrendingUp className="mr-3 h-4 w-4" />
                    View Payment History
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending Orders</span>
                    <span className="font-medium text-yellow-500">
                      {data?.recentOrders.filter(o => o.status === 'pending').length ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing</span>
                    <span className="font-medium text-blue-500">
                      {data?.recentOrders.filter(o => o.status === 'processing').length ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Shipped</span>
                    <span className="font-medium text-purple-500">
                      {data?.recentOrders.filter(o => o.status === 'shipped').length ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Delivered</span>
                    <span className="font-medium text-green-500">
                      {data?.recentOrders.filter(o => o.status === 'delivered').length ?? 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
