"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Search } from "lucide-react"
import { useState } from "react"

const MOCK_USERS = [
  { id: "1", name: "Admin User", email: "admin@agrolink.com", role: "admin", publications: 0, reservations: 0 },
  { id: "2", name: "John Farmer", email: "user@agrolink.com", role: "user", publications: 6, reservations: 2 },
  { id: "3", name: "María González", email: "maria@example.com", role: "user", publications: 3, reservations: 1 },
  { id: "4", name: "Carlos Ruiz", email: "carlos@example.com", role: "user", publications: 2, reservations: 0 },
]

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Administra los usuarios de la plataforma</p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios por nombre o email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredUsers.length} de {MOCK_USERS.length} usuarios
            </p>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{user.name}</CardTitle>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Publicaciones: </span>
                            <span className="font-medium">{user.publications}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reservas: </span>
                            <span className="font-medium">{user.reservations}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Ver perfil
                      </Button>
                      {user.role !== "admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-transparent"
                        >
                          Suspender
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
