"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tractor, ShoppingCart, DollarSign, Shield, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/register")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Tractor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AgroLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Características
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              Cómo funciona
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Beneficios
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Button onClick={() => router.push("/dashboard")}>Ir al Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push("/login")}>
                  Iniciar sesión
                </Button>
                <Button onClick={() => router.push("/register")}>Registrarse</Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Conectamos agricultores con la <span className="text-primary">maquinaria que necesitan</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Compra, vende o renta equipos agrícolas de forma segura y confiable. La plataforma líder para maquinaria
              agrícola en tu región.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="text-base">
                Comenzar ahora
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/login")} className="text-base">
                Ver catálogo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Transacciones seguras</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Comunidad verificada</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Mejores precios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas en un solo lugar</h2>
            <p className="text-muted-foreground text-lg">
              Herramientas diseñadas para facilitar tus operaciones agrícolas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Compra y Venta</CardTitle>
                <CardDescription>
                  Encuentra la maquinaria perfecta o vende tu equipo usado a compradores verificados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Renta de Equipos</CardTitle>
                <CardDescription>
                  Accede a maquinaria especializada sin necesidad de comprarla. Ideal para proyectos temporales
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Transacciones Seguras</CardTitle>
                <CardDescription>
                  Sistema de verificación y protección para garantizar operaciones confiables
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Tractor className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Amplio Catálogo</CardTitle>
                <CardDescription>
                  Tractores, cosechadoras, sembradoras y más. Todo tipo de maquinaria agrícola
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Comunidad Activa</CardTitle>
                <CardDescription>Conecta con otros agricultores y profesionales del sector agrícola</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Mejores Precios</CardTitle>
                <CardDescription>Compara opciones y encuentra las mejores ofertas del mercado agrícola</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo funciona</h2>
            <p className="text-muted-foreground text-lg">Tres simples pasos para comenzar</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold">Regístrate</h3>
              <p className="text-muted-foreground">
                Crea tu cuenta gratis en minutos. Elige entre usuario o administrador según tus necesidades
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold">Explora o Publica</h3>
              <p className="text-muted-foreground">
                Navega por el catálogo de maquinaria o publica tus propios equipos para venta o renta
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold">Conecta y Cierra</h3>
              <p className="text-muted-foreground">
                Contacta con otros usuarios y realiza transacciones seguras directamente en la plataforma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Optimiza tus operaciones agrícolas</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  AgroLink te ayuda a reducir costos, acceder a equipos especializados y conectar con una comunidad de
                  profesionales del agro. Ya sea que necesites comprar, vender o rentar, tenemos la solución perfecta
                  para ti.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-foreground">Ahorra hasta un 40% en costos de maquinaria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-foreground">Acceso a equipos especializados cuando los necesites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-foreground">Red de usuarios verificados y confiables</span>
                  </li>
                </ul>
                <Button size="lg" onClick={handleGetStarted}>
                  Únete a AgroLink
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <Tractor className="w-48 h-48 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">¿Listo para comenzar?</h2>
            <p className="text-lg text-primary-foreground/90">
              Únete a cientos de agricultores que ya están optimizando sus operaciones con AgroLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" onClick={handleGetStarted} className="text-base">
                Crear cuenta gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/login")}
                className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Tractor className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">AgroLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plataforma líder para compra, venta y renta de maquinaria agrícola
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-primary transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-primary transition-colors">
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="hover:text-primary transition-colors">
                    Beneficios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Cuenta</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/register" className="hover:text-primary transition-colors">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-primary transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AgroLink. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
