"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MOCK_MACHINERY } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { MapPin, Calendar, ArrowLeft, User, DollarSign } from "lucide-react"
import Link from "next/link"

export default function MachineryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const machinery = MOCK_MACHINERY.find((m) => m.id === params.id)

  const [showReservationForm, setShowReservationForm] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [success, setSuccess] = useState(false)

  if (!machinery) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <DashboardNav />
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">Maquinaria no encontrada</p>
                <Link href="/dashboard">
                  <Button className="mt-4">Volver al catálogo</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || (machinery.transactionType === "renta" && !endDate)) {
      return
    }

    // Calculate total price for rentals
    let totalPrice = machinery.price
    if (machinery.transactionType === "renta" && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      totalPrice = machinery.price * Math.max(1, days)
    }

    setSuccess(true)
    setTimeout(() => {
      router.push("/dashboard/reservations")
    }, 2000)
  }

  const calculateTotal = () => {
    if (machinery.transactionType === "venta") {
      return machinery.price
    }

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return machinery.price * Math.max(1, days)
    }

    return machinery.price
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image and Details */}
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden bg-muted rounded-lg">
                <img
                  src={machinery.imageUrl || "/placeholder.svg"}
                  alt={machinery.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Especificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                      <p className="font-medium capitalize">{machinery.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Condición</p>
                      <p className="font-medium capitalize">{machinery.condition}</p>
                    </div>
                    {machinery.brand && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Marca</p>
                        <p className="font-medium">{machinery.brand}</p>
                      </div>
                    )}
                    {machinery.model && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Modelo</p>
                        <p className="font-medium">{machinery.model}</p>
                      </div>
                    )}
                    {machinery.year && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Año</p>
                        <p className="font-medium">{machinery.year}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                      <p className="font-medium">{machinery.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Propietario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{machinery.ownerName}</p>
                      <p className="text-sm text-muted-foreground">Miembro verificado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{machinery.title}</CardTitle>
                      <CardDescription className="text-base">{machinery.description}</CardDescription>
                    </div>
                    <Badge className="capitalize flex-shrink-0">{machinery.transactionType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-baseline gap-2 pb-4 border-b">
                    <span className="text-4xl font-bold text-primary">${machinery.price.toLocaleString("es-MX")}</span>
                    <span className="text-muted-foreground">
                      {machinery.transactionType === "renta" ? "/ día" : "MXN"}
                    </span>
                  </div>

                  {success ? (
                    <Alert className="bg-primary/10 border-primary">
                      <AlertDescription>
                        {machinery.transactionType === "renta" ? "Reserva" : "Solicitud"} creada exitosamente.
                        Redirigiendo...
                      </AlertDescription>
                    </Alert>
                  ) : showReservationForm ? (
                    <form onSubmit={handleReservation} className="space-y-4">
                      {machinery.transactionType === "renta" ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Fecha de inicio *</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="endDate">Fecha de fin *</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate || new Date().toISOString().split("T")[0]}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>

                          {startDate && endDate && (
                            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Precio por día:</span>
                                <span className="font-medium">${machinery.price.toLocaleString("es-MX")}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Días:</span>
                                <span className="font-medium">
                                  {Math.max(
                                    1,
                                    Math.ceil(
                                      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                                        (1000 * 60 * 60 * 24),
                                    ),
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t">
                                <span className="font-medium">Total:</span>
                                <span className="text-xl font-bold text-primary">
                                  ${calculateTotal().toLocaleString("es-MX")}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span className="font-medium">Precio de compra</span>
                          </div>
                          <div className="text-3xl font-bold text-primary">
                            ${machinery.price.toLocaleString("es-MX")}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1">
                          {machinery.transactionType === "renta" ? "Confirmar Reserva" : "Solicitar Compra"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowReservationForm(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <Button onClick={() => setShowReservationForm(true)} className="w-full" size="lg">
                      {machinery.transactionType === "renta" ? "Reservar Ahora" : "Solicitar Compra"}
                    </Button>
                  )}

                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Ubicado en {machinery.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Publicado el {machinery.createdAt.toLocaleDateString("es-MX")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <p className="font-medium">Información importante:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>
                          {machinery.transactionType === "renta"
                            ? "La reserva será confirmada por el propietario"
                            : "El propietario se pondrá en contacto contigo"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>Verifica el estado del equipo antes de la transacción</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>Todas las transacciones están protegidas por AgroLink</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
