// User types
export type UserRole = 'admin' | 'staff' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  ordersCount: number
  createdAt: string
  isDisabled: boolean
}

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  colors: string[]
  images: string[]
  stock: number
  createdAt: string
  updatedAt: string
}

// Order types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  color: string
}

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: OrderItem[]
  status: OrderStatus
  totalPrice: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentStatus: 'paid' | 'pending' | 'failed'
  createdAt: string
  updatedAt: string
}

// Payment types
export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded'

export interface Payment {
  id: string
  orderId: string
  userId: string
  userName: string
  amount: number
  status: PaymentStatus
  method: string
  createdAt: string
}

// Auth types
export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}
