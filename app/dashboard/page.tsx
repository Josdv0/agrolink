"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MOCK_MACHINERY } from "@/lib/mock-data"
import type { Machinery, MachineryType, TransactionType } from "@/lib/types"
import { MapPin, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<MachineryType | "all">("all")
  const [transactionFilter, setTransactionFilter] = useState<TransactionType | "all">("all")

  const filteredMachinery = MOCK_MACHINERY.filter((item) => {
    if (item.status !== "aprobada") return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (typeFilter !== "all" && item.type !== typeFilter) return false
    if (transactionFilter !== "all" && item.transactionType !== transactionFilter) return false
    return true
  })

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Catálogo de Maquinaria</h1>
              <p className="text-muted-foreground">Explora y encuentra el equipo perfecto para tu operación</p>
            </div>
            <Link href="/dashboard/add-publication">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Publicar Maquinaria
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar maquinaria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as MachineryType | "all")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de maquinaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="tractor">Tractor</SelectItem>
                    <SelectItem value="cosechadora">Cosechadora</SelectItem>
                    <SelectItem value="sembradora">Sembradora</SelectItem>
                    <SelectItem value="pulverizador">Pulverizador</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={transactionFilter}
                  onValueChange={(value) => setTransactionFilter(value as TransactionType | "all")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de transacción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las transacciones</SelectItem>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="renta">Renta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredMachinery.length} de {MOCK_MACHINERY.filter((m) => m.status === "aprobada").length}{" "}
              resultados
            </p>
          </div>

          {/* Machinery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachinery.map((item) => (
              <MachineryCard key={item.id} machinery={item} />
            ))}
          </div>

          {filteredMachinery.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron resultados</p>
              <p className="text-sm text-muted-foreground mt-2">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

function MachineryCard({ machinery }: { machinery: Machinery }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={machinery.imageUrl || "/placeholder.svg"}
          alt={machinery.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground capitalize">{machinery.transactionType}</Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-1">{machinery.title}</CardTitle>
          <Badge variant="outline" className="capitalize flex-shrink-0">
            {machinery.type}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{machinery.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{machinery.location}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">${machinery.price.toLocaleString("es-MX")}</span>
          <span className="text-sm text-muted-foreground">
            {machinery.transactionType === "renta" ? "/ día" : "MXN"}
          </span>
        </div>
        {machinery.brand && (
          <div className="text-sm">
            <span className="text-muted-foreground">Marca: </span>
            <span className="font-medium">
              {machinery.brand} {machinery.model}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/machinery/${machinery.id}`} className="w-full">
          <Button className="w-full">Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
