'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { ProductForm } from '@/components/admin/product-form'
import { Spinner } from '@/components/ui/spinner'
import type { Product } from '@/lib/types'

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(params.id as string)
        setProduct(data)
      } catch (err) {
        setError('Product not found')
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground">The product you are looking for does not exist.</p>
      </div>
    )
  }

  return <ProductForm product={product} mode="edit" />
}
