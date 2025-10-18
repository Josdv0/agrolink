"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Tractor, LogOut, LayoutDashboard, Package, Calendar, User, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Catálogo", icon: LayoutDashboard },
    { href: "/dashboard/my-publications", label: "Mis Publicaciones", icon: Package },
    { href: "/dashboard/reservations", label: "Mis Reservas", icon: Calendar },
    { href: "/dashboard/profile", label: "Perfil", icon: User },
  ]

  if (user?.role === "admin") {
    navItems.push({ href: "/admin", label: "Panel Admin", icon: Settings })
  }

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Tractor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AgroLink</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("gap-2", isActive && "bg-primary/10 text-primary hover:bg-primary/20")}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-1 mt-3 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("gap-2 whitespace-nowrap", isActive && "bg-primary/10 text-primary")}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
