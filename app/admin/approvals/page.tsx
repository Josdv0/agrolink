"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MOCK_MACHINERY } from "@/lib/mock-data"
import { Check, X, MapPin, Calendar } from "lucide-react"

export default function ApprovalsPage() {
  const [pendingPublications, setPendingPublications] = useState(MOCK_MACHINERY.filter((m) => m.status === "pendiente"))
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleApprove = (id: string) => {
    setPendingPublications((prev) => prev.filter((p) => p.id !== id))
    setActionMessage({ type: "success", text: "Publicación aprobada exitosamente" })
    setTimeout(() => setActionMessage(null), 3000)
  }

  const handleReject = (id: string) => {
    setPendingPublications((prev) => prev.filter((p) => p.id !== id))
    setActionMessage({ type: "error", text: "Publicación rechazada" })
    setTimeout(() => setActionMessage(null), 3000)
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Aprobaciones Pendientes</h1>
            <p className="text-muted-foreground">Revisa y aprueba nuevas publicaciones de maquinaria</p>
          </div>

          {actionMessage && (
            <Alert className={`mb-6 ${actionMessage.type === "success" ? "bg-primary/10 border-primary" : ""}`}>
              <AlertDescription>{actionMessage.text}</AlertDescription>
            </Alert>
          )}

          {pendingPublications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Check className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No hay aprobaciones pendientes</p>
                <p className="text-muted-foreground">Todas las publicaciones han sido revisadas</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingPublications.map((publication) => (
                <Card key={publication.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                      <img
                        src={publication.imageUrl || "/placeholder.svg"}
                        alt={publication.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold">{publication.title}</h3>
                            <Badge variant="outline" className="capitalize">
                              {publication.type}
                            </Badge>
                            <Badge className="capitalize">{publication.transactionType}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{publication.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Precio:</span>
                            <span className="font-bold text-primary text-lg">
                              ${publication.price.toLocaleString("es-MX")}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {publication.transactionType === "renta" ? "/ día" : "MXN"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{publication.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Publicado: {publication.createdAt.toLocaleDateString("es-MX")}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Condición: </span>
                            <span className="font-medium capitalize">{publication.condition}</span>
                          </div>
                          {publication.brand && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Marca: </span>
                              <span className="font-medium">
                                {publication.brand} {publication.model}
                              </span>
                            </div>
                          )}
                          {publication.year && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Año: </span>
                              <span className="font-medium">{publication.year}</span>
                            </div>
                          )}
                          <div className="text-sm">
                            <span className="text-muted-foreground">Publicado por: </span>
                            <span className="font-medium">{publication.ownerName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => handleApprove(publication.id)} className="flex-1 gap-2">
                          <Check className="w-4 h-4" />
                          Aprobar Publicación
                        </Button>
                        <Button
                          onClick={() => handleReject(publication.id)}
                          variant="outline"
                          className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
                        >
                          <X className="w-4 h-4" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
