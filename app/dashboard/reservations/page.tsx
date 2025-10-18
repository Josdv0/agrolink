"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_RESERVATIONS } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Calendar, DollarSign } from "lucide-react"

export default function ReservationsPage() {
  const { user } = useAuth()
  const myReservations = MOCK_RESERVATIONS.filter((item) => item.userId === user?.id)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
            <p className="text-muted-foreground">Gestiona tus rentas y transacciones</p>
          </div>

          {myReservations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">No tienes reservas activas</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {myReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{reservation.machineryTitle}</CardTitle>
                        <CardDescription>Reserva #{reservation.id}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          reservation.status === "confirmada"
                            ? "default"
                            : reservation.status === "pendiente"
                              ? "secondary"
                              : reservation.status === "completada"
                                ? "outline"
                                : "destructive"
                        }
                        className="capitalize"
                      >
                        {reservation.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Período de renta</p>
                          <p className="font-medium">{reservation.startDate.toLocaleDateString("es-MX")}</p>
                          {reservation.endDate && (
                            <p className="text-sm text-muted-foreground">
                              hasta {reservation.endDate.toLocaleDateString("es-MX")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Precio total</p>
                          <p className="font-medium text-lg">${reservation.totalPrice.toLocaleString("es-MX")}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {reservation.status === "pendiente" && (
                          <>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              Cancelar
                            </Button>
                            <Button size="sm" className="flex-1">
                              Confirmar
                            </Button>
                          </>
                        )}
                        {reservation.status === "confirmada" && (
                          <Button variant="outline" className="w-full bg-transparent">
                            Ver detalles
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
