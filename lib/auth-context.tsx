"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "user" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: User[] = [
  { id: "1", email: "admin@agrolink.com", name: "Admin User", role: "admin" },
  { id: "2", email: "user@agrolink.com", name: "John Farmer", role: "user" },
]

const MOCK_PASSWORDS: Record<string, string> = {
  "admin@agrolink.com": "admin123",
  "user@agrolink.com": "user123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("agrolink_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = MOCK_USERS.find((u) => u.email === email)

    if (!foundUser || MOCK_PASSWORDS[email] !== password) {
      return { success: false, error: "Credenciales inválidas" }
    }

    setUser(foundUser)
    localStorage.setItem("agrolink_user", JSON.stringify(foundUser))
    return { success: true }
  }

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    if (MOCK_USERS.find((u) => u.email === email)) {
      return { success: false, error: "El correo ya está registrado" }
    }

    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email,
      name,
      role,
    }

    MOCK_USERS.push(newUser)
    MOCK_PASSWORDS[email] = password

    setUser(newUser)
    localStorage.setItem("agrolink_user", JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("agrolink_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
