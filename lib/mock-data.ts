import type { User, Product, Order, Payment } from './types'

// Paint categories
export const categories = [
  'Interior Paint',
  'Exterior Paint',
  'Primer',
  'Stain',
  'Specialty Paint',
  'Tools & Accessories'
]

// Paint colors available
export const paintColors = [
  'Classic White',
  'Ivory Cream',
  'Soft Gray',
  'Navy Blue',
  'Forest Green',
  'Terracotta',
  'Sunset Orange',
  'Deep Red',
  'Charcoal Black',
  'Sky Blue'
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    ordersCount: 5,
    createdAt: '2024-01-15T10:30:00Z',
    isDisabled: false
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    ordersCount: 12,
    createdAt: '2024-02-20T14:45:00Z',
    isDisabled: false
  },
  {
    id: 'user-3',
    name: 'Mike Williams',
    email: 'mike.w@example.com',
    role: 'staff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    ordersCount: 0,
    createdAt: '2024-03-10T09:00:00Z',
    isDisabled: false
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    ordersCount: 8,
    createdAt: '2024-01-05T16:20:00Z',
    isDisabled: true
  },
  {
    id: 'user-5',
    name: 'David Brown',
    email: 'david.b@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    ordersCount: 3,
    createdAt: '2024-04-01T11:15:00Z',
    isDisabled: false
  },
  {
    id: 'user-6',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    ordersCount: 0,
    createdAt: '2023-12-01T08:00:00Z',
    isDisabled: false
  },
  {
    id: 'user-7',
    name: 'James Wilson',
    email: 'james.w@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    ordersCount: 15,
    createdAt: '2024-02-14T13:30:00Z',
    isDisabled: false
  },
  {
    id: 'user-8',
    name: 'Jennifer Taylor',
    email: 'jennifer.t@example.com',
    role: 'staff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    ordersCount: 0,
    createdAt: '2024-03-25T10:45:00Z',
    isDisabled: false
  }
]

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Interior Matte Paint',
    description: 'High-quality interior matte finish paint with excellent coverage and durability. Perfect for living rooms, bedrooms, and hallways.',
    price: 45.99,
    category: 'Interior Paint',
    colors: ['Classic White', 'Ivory Cream', 'Soft Gray', 'Sky Blue'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 150,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-04-15T14:30:00Z'
  },
  {
    id: 'prod-2',
    name: 'Weatherproof Exterior Paint',
    description: 'Durable exterior paint designed to withstand harsh weather conditions. UV resistant and long-lasting protection.',
    price: 59.99,
    category: 'Exterior Paint',
    colors: ['Classic White', 'Charcoal Black', 'Navy Blue', 'Forest Green'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 85,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-04-10T09:15:00Z'
  },
  {
    id: 'prod-3',
    name: 'Multi-Surface Primer',
    description: 'Universal primer suitable for various surfaces. Provides excellent adhesion and prepares surfaces for topcoat application.',
    price: 32.99,
    category: 'Primer',
    colors: ['Classic White'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 200,
    createdAt: '2024-02-01T09:30:00Z',
    updatedAt: '2024-04-12T16:45:00Z'
  },
  {
    id: 'prod-4',
    name: 'Wood Stain - Semi-Transparent',
    description: 'Beautiful semi-transparent wood stain that enhances natural wood grain while providing protection.',
    price: 38.99,
    category: 'Stain',
    colors: ['Terracotta', 'Deep Red', 'Charcoal Black'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 65,
    createdAt: '2024-02-10T14:00:00Z',
    updatedAt: '2024-04-08T11:20:00Z'
  },
  {
    id: 'prod-5',
    name: 'Chalkboard Paint',
    description: 'Transform any surface into a writable chalkboard. Perfect for kitchens, kids rooms, and creative spaces.',
    price: 24.99,
    category: 'Specialty Paint',
    colors: ['Charcoal Black', 'Forest Green', 'Navy Blue'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 45,
    createdAt: '2024-02-20T10:15:00Z',
    updatedAt: '2024-04-05T13:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Professional Paint Brush Set',
    description: 'Set of 5 professional-grade paint brushes in various sizes. Suitable for all paint types.',
    price: 29.99,
    category: 'Tools & Accessories',
    colors: [],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 120,
    createdAt: '2024-03-01T08:45:00Z',
    updatedAt: '2024-04-14T10:30:00Z'
  },
  {
    id: 'prod-7',
    name: 'Satin Finish Interior Paint',
    description: 'Elegant satin finish paint with a subtle sheen. Easy to clean and perfect for high-traffic areas.',
    price: 49.99,
    category: 'Interior Paint',
    colors: ['Classic White', 'Ivory Cream', 'Soft Gray', 'Sunset Orange'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 95,
    createdAt: '2024-03-10T12:00:00Z',
    updatedAt: '2024-04-16T15:45:00Z'
  },
  {
    id: 'prod-8',
    name: 'Anti-Mold Bathroom Paint',
    description: 'Specially formulated paint for bathrooms and high-moisture areas. Prevents mold and mildew growth.',
    price: 54.99,
    category: 'Specialty Paint',
    colors: ['Classic White', 'Sky Blue', 'Soft Gray'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 70,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-04-11T14:15:00Z'
  },
  {
    id: 'prod-9',
    name: 'Paint Roller Kit',
    description: 'Complete paint roller kit including frame, covers, and tray. Essential for any painting project.',
    price: 19.99,
    category: 'Tools & Accessories',
    colors: [],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 180,
    createdAt: '2024-03-20T11:30:00Z',
    updatedAt: '2024-04-13T09:45:00Z'
  },
  {
    id: 'prod-10',
    name: 'Textured Wall Paint',
    description: 'Create stunning textured finishes with this specialty wall paint. Adds depth and character to any room.',
    price: 62.99,
    category: 'Specialty Paint',
    colors: ['Classic White', 'Ivory Cream', 'Terracotta'],
    images: ['/placeholder.svg?height=200&width=200'],
    stock: 35,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-17T11:00:00Z'
  }
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    items: [
      { productId: 'prod-1', productName: 'Premium Interior Matte Paint', quantity: 3, price: 45.99, color: 'Classic White' },
      { productId: 'prod-6', productName: 'Professional Paint Brush Set', quantity: 1, price: 29.99, color: '' }
    ],
    status: 'delivered',
    totalPrice: 167.96,
    shippingAddress: {
      street: '123 Oak Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA'
    },
    paymentStatus: 'paid',
    createdAt: '2024-04-01T10:30:00Z',
    updatedAt: '2024-04-05T14:00:00Z'
  },
  {
    id: 'ORD-002',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    items: [
      { productId: 'prod-2', productName: 'Weatherproof Exterior Paint', quantity: 5, price: 59.99, color: 'Navy Blue' },
      { productId: 'prod-3', productName: 'Multi-Surface Primer', quantity: 2, price: 32.99, color: 'Classic White' }
    ],
    status: 'shipped',
    totalPrice: 365.93,
    shippingAddress: {
      street: '456 Maple Avenue',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    paymentStatus: 'paid',
    createdAt: '2024-04-10T14:45:00Z',
    updatedAt: '2024-04-12T09:30:00Z'
  },
  {
    id: 'ORD-003',
    userId: 'user-5',
    userName: 'David Brown',
    userEmail: 'david.b@example.com',
    items: [
      { productId: 'prod-5', productName: 'Chalkboard Paint', quantity: 2, price: 24.99, color: 'Charcoal Black' }
    ],
    status: 'pending',
    totalPrice: 49.98,
    shippingAddress: {
      street: '789 Pine Road',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      country: 'USA'
    },
    paymentStatus: 'pending',
    createdAt: '2024-04-15T11:00:00Z',
    updatedAt: '2024-04-15T11:00:00Z'
  },
  {
    id: 'ORD-004',
    userId: 'user-7',
    userName: 'James Wilson',
    userEmail: 'james.w@example.com',
    items: [
      { productId: 'prod-7', productName: 'Satin Finish Interior Paint', quantity: 4, price: 49.99, color: 'Soft Gray' },
      { productId: 'prod-9', productName: 'Paint Roller Kit', quantity: 2, price: 19.99, color: '' },
      { productId: 'prod-6', productName: 'Professional Paint Brush Set', quantity: 1, price: 29.99, color: '' }
    ],
    status: 'processing',
    totalPrice: 269.93,
    shippingAddress: {
      street: '321 Elm Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    paymentStatus: 'paid',
    createdAt: '2024-04-14T09:15:00Z',
    updatedAt: '2024-04-15T10:00:00Z'
  },
  {
    id: 'ORD-005',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    items: [
      { productId: 'prod-8', productName: 'Anti-Mold Bathroom Paint', quantity: 2, price: 54.99, color: 'Classic White' }
    ],
    status: 'delivered',
    totalPrice: 109.98,
    shippingAddress: {
      street: '456 Maple Avenue',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    paymentStatus: 'paid',
    createdAt: '2024-03-28T16:30:00Z',
    updatedAt: '2024-04-02T11:45:00Z'
  },
  {
    id: 'ORD-006',
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john.smith@example.com',
    items: [
      { productId: 'prod-4', productName: 'Wood Stain - Semi-Transparent', quantity: 3, price: 38.99, color: 'Terracotta' },
      { productId: 'prod-10', productName: 'Textured Wall Paint', quantity: 1, price: 62.99, color: 'Ivory Cream' }
    ],
    status: 'pending',
    totalPrice: 179.96,
    shippingAddress: {
      street: '123 Oak Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA'
    },
    paymentStatus: 'pending',
    createdAt: '2024-04-16T08:00:00Z',
    updatedAt: '2024-04-16T08:00:00Z'
  }
]

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-001',
    userId: 'user-1',
    userName: 'John Smith',
    amount: 167.96,
    status: 'completed',
    method: 'Credit Card',
    createdAt: '2024-04-01T10:35:00Z'
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-002',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    amount: 365.93,
    status: 'completed',
    method: 'PayPal',
    createdAt: '2024-04-10T14:50:00Z'
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-003',
    userId: 'user-5',
    userName: 'David Brown',
    amount: 49.98,
    status: 'pending',
    method: 'Credit Card',
    createdAt: '2024-04-15T11:05:00Z'
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-004',
    userId: 'user-7',
    userName: 'James Wilson',
    amount: 269.93,
    status: 'completed',
    method: 'Debit Card',
    createdAt: '2024-04-14T09:20:00Z'
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-005',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    amount: 109.98,
    status: 'completed',
    method: 'Credit Card',
    createdAt: '2024-03-28T16:35:00Z'
  },
  {
    id: 'PAY-006',
    orderId: 'ORD-006',
    userId: 'user-1',
    userName: 'John Smith',
    amount: 179.96,
    status: 'pending',
    method: 'Bank Transfer',
    createdAt: '2024-04-16T08:05:00Z'
  },
  {
    id: 'PAY-007',
    orderId: '',
    userId: 'user-4',
    userName: 'Emily Davis',
    amount: 89.99,
    status: 'refunded',
    method: 'Credit Card',
    createdAt: '2024-03-20T12:00:00Z'
  },
  {
    id: 'PAY-008',
    orderId: '',
    userId: 'user-7',
    userName: 'James Wilson',
    amount: 124.50,
    status: 'failed',
    method: 'Credit Card',
    createdAt: '2024-04-05T15:30:00Z'
  }
]

// Dashboard stats
export const dashboardStats = {
  totalProducts: mockProducts.length,
  totalOrders: mockOrders.length,
  totalRevenue: mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0),
  totalUsers: mockUsers.filter(u => u.role === 'user').length
}
