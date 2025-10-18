"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_MACHINERY } from "@/lib/mock-data"
import type { PublicationStatus } from "@/lib/types"
import { Search, MapPin, Trash2, Eye } from "lucide-react"

export default function PublicationsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | "all">("all")

  const filteredPublications = MOCK_MACHINERY.filter((item) => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (statusFilter !== "all" && item.status !== statusFilter) return false
    return true
  })

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gestión de Publicaciones</h1>
            <p className="text-muted-foreground">Administra todas las publicaciones de maquinaria</p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar publicaciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as PublicationStatus | "all")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="aprobada">Aprobada</SelectItem>
                    <SelectItem value="rechazada">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredPublications.length} de {MOCK_MACHINERY.length} publicaciones
            </p>
          </div>

          {/* Publications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((publication) => (
              <Card key={publication.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={publication.imageUrl || "/placeholder.svg"}
                    alt={publication.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={
                        publication.status === "aprobada"
                          ? "default"
                          : publication.status === "pendiente"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {publication.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">{publication.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{publication.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{publication.location}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">${publication.price.toLocaleString("es-MX")}</span>
                    <span className="text-sm text-muted-foreground">
                      {publication.transactionType === "renta" ? "/ día" : "MXN"}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Propietario: </span>
                    <span className="font-medium">{publication.ownerName}</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Eye className="w-4 h-4" />
                    Ver
                  </Button>
                  <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron publicaciones</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
