'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getProducts, deleteProduct } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { DataTable, Column } from '@/components/admin/data-table'
import { TablePagination } from '@/components/admin/table-pagination'
import { ConfirmModal } from '@/components/admin/confirm-modal'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Package } from 'lucide-react'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { categories } from '@/lib/mock-data'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function ProductsPage() {
  const router = useRouter()
  const { hasPermission } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getProducts({
        search,
        category: category || undefined,
        page,
        limit: 10
      })
      setProducts(result.data)
      setTotalPages(result.totalPages)
      setTotalItems(result.total)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }, [search, category, page])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleDelete = async () => {
    if (!productToDelete) return
    
    setIsDeleting(true)
    try {
      await deleteProduct(productToDelete.id)
      toast.success('Product deleted successfully')
      setDeleteModalOpen(false)
      setProductToDelete(null)
      loadProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    } finally {
      setIsDeleting(false)
    }
  }

  const columns: Column<Product>[] = [
    {
      key: 'image',
      header: 'Image',
      cell: (product) => (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
          <Package className="h-6 w-6 text-muted-foreground" />
        </div>
      ),
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Name',
      cell: (product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      cell: (product) => (
        <Badge variant="secondary">{product.category}</Badge>
      )
    },
    {
      key: 'price',
      header: 'Price',
      cell: (product) => (
        <span className="font-medium">${product.price.toFixed(2)}</span>
      ),
      className: 'text-right'
    },
    {
      key: 'stock',
      header: 'Stock',
      cell: (product) => (
        <Badge
          variant={product.stock > 50 ? 'default' : product.stock > 10 ? 'secondary' : 'destructive'}
          className={
            product.stock > 50
              ? 'bg-green-500/10 text-green-500 border-green-500/20'
              : product.stock > 10
              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              : ''
          }
        >
          {product.stock} units
        </Badge>
      ),
      className: 'text-right'
    },
    {
      key: 'actions',
      header: '',
      cell: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/admin/products/${product.id}/edit`)
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            {hasPermission('delete') && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setProductToDelete(product)
                  setDeleteModalOpen(true)
                }}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'w-12'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your paint inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
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
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value === 'all' ? '' : value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
          data={products}
          isLoading={isLoading}
          emptyMessage="No products found"
          emptyDescription="Try adjusting your search or add a new product."
          onRowClick={(product) => router.push(`/admin/products/${product.id}/edit`)}
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={isDeleting}
        variant="destructive"
      />
    </div>
  )
}
