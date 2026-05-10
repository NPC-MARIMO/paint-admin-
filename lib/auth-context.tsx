'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AuthUser, UserRole } from './types'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (action: 'delete' | 'settings' | 'manage_roles') => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock credentials
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@paintshop.com',
    role: 'admin',
    password: 'admin123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    id: 'staff-1',
    name: 'Staff Member',
    email: 'staff@paintshop.com',
    role: 'staff',
    password: 'staff123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Staff'
  }
]

const AUTH_STORAGE_KEY = 'admin_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...authUser } = foundUser
      setUser(authUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const hasPermission = (action: 'delete' | 'settings' | 'manage_roles'): boolean => {
    if (!user) return false
    
    // Admin has full access
    if (user.role === 'admin') return true
    
    // Staff has limited access
    if (user.role === 'staff') {
      return action !== 'delete' && action !== 'settings' && action !== 'manage_roles'
    }
    
    return false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
