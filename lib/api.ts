import type { User, Product, Order, Payment, OrderStatus, UserRole, PaymentStatus } from './types'
import { mockUsers, mockProducts, mockOrders, mockPayments, dashboardStats } from './mock-data'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory data stores (mutable copies)
let users = [...mockUsers]
let products = [...mockProducts]
let orders = [...mockOrders]
let payments = [...mockPayments]

// Dashboard API
export async function getDashboardStats() {
  await delay(300)
  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalUsers: users.filter(u => u.role === 'user').length,
    recentOrders: orders.slice(0, 5)
  }
}

// Products API
export async function getProducts(params?: { 
  search?: string
  category?: string
  page?: number
  limit?: number 
}) {
  await delay(300)
  let filtered = [...products]
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    )
  }
  
  if (params?.category) {
    filtered = filtered.filter(p => p.category === params.category)
  }
  
  const page = params?.page || 1
  const limit = params?.limit || 10
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}

export async function getProduct(id: string) {
  await delay(200)
  const product = products.find(p => p.id === id)
  if (!product) throw new Error('Product not found')
  return product
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  await delay(400)
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  products = [newProduct, ...products]
  return newProduct
}

export async function updateProduct(id: string, data: Partial<Product>) {
  await delay(400)
  const index = products.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Product not found')
  
  products[index] = {
    ...products[index],
    ...data,
    updatedAt: new Date().toISOString()
  }
  return products[index]
}

export async function deleteProduct(id: string) {
  await delay(300)
  const index = products.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Product not found')
  products = products.filter(p => p.id !== id)
  return { success: true }
}

// Orders API
export async function getOrders(params?: {
  search?: string
  status?: OrderStatus
  page?: number
  limit?: number
}) {
  await delay(300)
  let filtered = [...orders]
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(search) ||
      o.userName.toLowerCase().includes(search) ||
      o.userEmail.toLowerCase().includes(search)
    )
  }
  
  if (params?.status) {
    filtered = filtered.filter(o => o.status === params.status)
  }
  
  const page = params?.page || 1
  const limit = params?.limit || 10
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}

export async function getOrder(id: string) {
  await delay(200)
  const order = orders.find(o => o.id === id)
  if (!order) throw new Error('Order not found')
  return order
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await delay(400)
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) throw new Error('Order not found')
  
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString()
  }
  return orders[index]
}

// Users API
export async function getUsers(params?: {
  search?: string
  role?: UserRole
  page?: number
  limit?: number
}) {
  await delay(300)
  let filtered = [...users]
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    )
  }
  
  if (params?.role) {
    filtered = filtered.filter(u => u.role === params.role)
  }
  
  const page = params?.page || 1
  const limit = params?.limit || 10
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}

export async function getUser(id: string) {
  await delay(200)
  const user = users.find(u => u.id === id)
  if (!user) throw new Error('User not found')
  return user
}

export async function updateUserRole(id: string, role: UserRole) {
  await delay(400)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users[index] = { ...users[index], role }
  return users[index]
}

export async function toggleUserStatus(id: string) {
  await delay(400)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users[index] = { ...users[index], isDisabled: !users[index].isDisabled }
  return users[index]
}

// Payments API
export async function getPayments(params?: {
  search?: string
  status?: PaymentStatus
  page?: number
  limit?: number
}) {
  await delay(300)
  let filtered = [...payments]
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.id.toLowerCase().includes(search) ||
      p.userName.toLowerCase().includes(search)
    )
  }
  
  if (params?.status) {
    filtered = filtered.filter(p => p.status === params.status)
  }
  
  const page = params?.page || 1
  const limit = params?.limit || 10
  const start = (page - 1) * limit
  const end = start + limit
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}
