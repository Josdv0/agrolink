"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { MachineryType, MachineryCondition, TransactionType } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddPublicationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "" as MachineryType,
    condition: "" as MachineryCondition,
    transactionType: "" as TransactionType,
    price: "",
    location: "",
    brand: "",
    model: "",
    year: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      router.push("/dashboard/my-publications")
    }, 2000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Volver al catálogo
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Publicar Maquinaria</CardTitle>
              <CardDescription>Completa el formulario para publicar tu equipo agrícola</CardDescription>
            </CardHeader>
            <CardContent>
              {success && (
                <Alert className="mb-6 bg-primary/10 border-primary">
                  <AlertDescription>
                    Publicación creada exitosamente. Será revisada por un administrador antes de aparecer en el
                    catálogo.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la publicación *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Tractor John Deere 5075E"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe las características, estado y detalles importantes de la maquinaria"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de maquinaria *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleChange("type", value)} required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tractor">Tractor</SelectItem>
                        <SelectItem value="cosechadora">Cosechadora</SelectItem>
                        <SelectItem value="sembradora">Sembradora</SelectItem>
                        <SelectItem value="pulverizador">Pulverizador</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condición *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleChange("condition", value)}
                      required
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Selecciona la condición" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="excelente">Excelente</SelectItem>
                        <SelectItem value="bueno">Bueno</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="usado">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionType">Tipo de transacción *</Label>
                    <Select
                      value={formData.transactionType}
                      onValueChange={(value) => handleChange("transactionType", value)}
                      required
                    >
                      <SelectTrigger id="transactionType">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venta">Venta</SelectItem>
                        <SelectItem value="renta">Renta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Precio * {formData.transactionType === "renta" && "(por día)"}</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    placeholder="Ej: Jalisco, México"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      placeholder="Ej: John Deere"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      placeholder="Ej: 5075E"
                      value={formData.model}
                      onChange={(e) => handleChange("model", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Publicando..." : "Publicar Maquinaria"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
