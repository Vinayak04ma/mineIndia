import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, Leaf, MapPin, Palette, Recycle, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-2 h-4 w-4" />
              AI-Powered Sustainability
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              AI-Driven Life Cycle Assessment for <span className="text-primary">Metallurgy & Mining</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Advanced AI platform enabling metallurgists and engineers to perform automated LCAs with emphasis on
              circularity, sustainability, and resource efficiency.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/analysis">
                  Start Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/whiteboard">Try Whiteboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-balance">Comprehensive LCA Platform</h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Three powerful modules designed for complete lifecycle assessment and circular economy optimization
            </p>
          </div>

          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
              <div className="w-full max-w-sm">
            <Card className="relative overflow-hidden h-full w-full">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analysis Module</CardTitle>
                <CardDescription>
                  AI-powered LCA analysis with manual material selection or India-specific mine data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Manual material selection</li>
                  <li>• India-specific mine mapping</li>
                  <li>• AI parameter estimation</li>
                  <li>• Conventional vs sustainable reports</li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/analysis">
                    Explore Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
              </div>

              <div className="w-full max-w-sm">
            <Card className="relative overflow-hidden h-full w-full">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Palette className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Whiteboard</CardTitle>
                <CardDescription>
                  Interactive LCA mapping with drag-and-drop process nodes and real-time calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Visual process mapping</li>
                  <li>• Real-time impact calculations</li>
                  <li>• Scenario comparison</li>
                  <li>• Export capabilities</li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/whiteboard">
                    Try Whiteboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
              </div>

              <div className="w-full max-w-sm">
            <Card className="relative overflow-hidden h-full w-full">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>
                  Circular economy platform for e-waste services and recycled material trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• E-waste value estimation</li>
                  <li>• Recycled material trading</li>
                  <li>• AI device identification</li>
                  <li>• Real-time market pricing</li>
                </ul>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/marketplace">
                    Visit Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-balance">Driving Sustainable Impact</h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Empowering the metals sector with data-driven choices for environmental sustainability and circular
                resource systems
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Environmental Impact</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Comprehensive assessment across 9 standard LCA categories
                </p>
              </div>

              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold">Circularity Focus</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Optimize for reuse, recycling, and closed-loop systems
                </p>
              </div>

              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-4">
                  <Brain className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Machine learning models for parameter estimation and optimization
                </p>
              </div>

              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Real-time Results</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Instant calculations and actionable recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance">Ready to Transform Your LCA Process?</h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Join the future of sustainable metallurgy with our AI-powered platform
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/analysis">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
