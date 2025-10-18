"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_MACHINERY } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function MyPublicationsPage() {
  const { user } = useAuth()
  const myPublications = MOCK_MACHINERY.filter((item) => item.ownerId === user?.id)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mis Publicaciones</h1>
              <p className="text-muted-foreground">Gestiona tu maquinaria publicada</p>
            </div>
            <Link href="/dashboard/add-publication">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Nueva Publicación
              </Button>
            </Link>
          </div>

          {myPublications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg mb-4">No tienes publicaciones aún</p>
                <Link href="/dashboard/add-publication">
                  <Button>Crear primera publicación</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPublications.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        variant={
                          item.status === "aprobada"
                            ? "default"
                            : item.status === "pendiente"
                              ? "secondary"
                              : "destructive"
                        }
                        className="capitalize"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${item.price.toLocaleString("es-MX")}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.transactionType === "renta" ? "/ día" : "MXN"}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
