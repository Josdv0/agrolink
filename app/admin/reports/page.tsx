"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_MACHINERY, MOCK_RESERVATIONS } from "@/lib/mock-data"
import { TrendingUp, DollarSign, Package, Calendar, BarChart3 } from "lucide-react"

export default function ReportsPage() {
  const totalPublications = MOCK_MACHINERY.length
  const approvedPublications = MOCK_MACHINERY.filter((m) => m.status === "aprobada").length
  const pendingPublications = MOCK_MACHINERY.filter((m) => m.status === "pendiente").length

  const totalReservations = MOCK_RESERVATIONS.length
  const confirmedReservations = MOCK_RESERVATIONS.filter((r) => r.status === "confirmada").length
  const totalRevenue = MOCK_RESERVATIONS.reduce((sum, r) => sum + r.totalPrice, 0)

  const publicationsByType = MOCK_MACHINERY.reduce(
    (acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const publicationsByTransaction = MOCK_MACHINERY.reduce(
    (acc, m) => {
      acc[m.transactionType] = (acc[m.transactionType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Reportes y Estadísticas</h1>
            <p className="text-muted-foreground">Análisis detallado de la plataforma</p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales</CardTitle>
                <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">${totalRevenue.toLocaleString("es-MX")}</div>
                <p className="text-xs text-muted-foreground">De {totalReservations} transacciones</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Publicaciones</CardTitle>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{totalPublications}</div>
                <p className="text-xs text-muted-foreground">
                  {approvedPublications} aprobadas, {pendingPublications} pendientes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Reservas</CardTitle>
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{totalReservations}</div>
                <p className="text-xs text-muted-foreground">{confirmedReservations} confirmadas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Publications by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Publicaciones por Tipo</CardTitle>
                <CardDescription>Distribución de maquinaria en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(publicationsByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium capitalize">{type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(count / totalPublications) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Publications by Transaction Type */}
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Transacción</CardTitle>
                <CardDescription>Venta vs Renta de maquinaria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(publicationsByTransaction).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium capitalize">{type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(count / totalPublications) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reservations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Reservas Recientes</CardTitle>
                <CardDescription>Últimas transacciones en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_RESERVATIONS.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{reservation.machineryTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.userName} • {reservation.startDate.toLocaleDateString("es-MX")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${reservation.totalPrice.toLocaleString("es-MX")}</p>
                        <p className="text-xs text-muted-foreground capitalize">{reservation.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
