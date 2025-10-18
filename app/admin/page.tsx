"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_MACHINERY, MOCK_RESERVATIONS } from "@/lib/mock-data"
import { FileCheck, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const pendingApprovals = MOCK_MACHINERY.filter((m) => m.status === "pendiente").length
  const totalPublications = MOCK_MACHINERY.length
  const totalReservations = MOCK_RESERVATIONS.length
  const totalRevenue = MOCK_RESERVATIONS.reduce((sum, r) => sum + r.totalPrice, 0)

  const stats = [
    {
      title: "Aprobaciones Pendientes",
      value: pendingApprovals,
      icon: AlertCircle,
      description: "Publicaciones esperando revisión",
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
      href: "/admin/approvals",
    },
    {
      title: "Total Publicaciones",
      value: totalPublications,
      icon: FileCheck,
      description: "Maquinaria en la plataforma",
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/admin/publications",
    },
    {
      title: "Reservas Activas",
      value: totalReservations,
      icon: Users,
      description: "Transacciones en proceso",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      href: "/admin/reports",
    },
    {
      title: "Ingresos Totales",
      value: `$${totalRevenue.toLocaleString("es-MX")}`,
      icon: DollarSign,
      description: "Valor de transacciones",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      href: "/admin/reports",
    },
  ]

  const recentActivity = [
    {
      action: "Nueva publicación",
      description: "Tractor New Holland T6.180 pendiente de aprobación",
      time: "Hace 2 horas",
      status: "pendiente",
    },
    {
      action: "Reserva confirmada",
      description: "Cosechadora Case IH - Reserva #1",
      time: "Hace 5 horas",
      status: "confirmada",
    },
    {
      action: "Usuario registrado",
      description: "Nuevo usuario: María González",
      time: "Hace 1 día",
      status: "nuevo",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona la plataforma AgroLink</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Tareas administrativas comunes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/approvals">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-transparent">
                    <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Revisar Aprobaciones</p>
                      <p className="text-xs text-muted-foreground">{pendingApprovals} publicaciones pendientes</p>
                    </div>
                  </Button>
                </Link>

                <Link href="/admin/publications">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-transparent">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Gestionar Publicaciones</p>
                      <p className="text-xs text-muted-foreground">Ver todas las publicaciones</p>
                    </div>
                  </Button>
                </Link>

                <Link href="/admin/users">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-transparent">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Administrar Usuarios</p>
                      <p className="text-xs text-muted-foreground">Ver y gestionar usuarios</p>
                    </div>
                  </Button>
                </Link>

                <Link href="/admin/reports">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-transparent">
                    <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Ver Reportes</p>
                      <p className="text-xs text-muted-foreground">Análisis y estadísticas</p>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
