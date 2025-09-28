"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Camera, ChevronLeft, MapPin, Recycle, Smartphone, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 pt-6">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Link href="/" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Recycle className="mr-2 h-4 w-4" />
              Circular Economy Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Sustainable Materials Marketplace</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              AI-powered platform for e-waste services and recycled material trading
            </p>
          </div>

          {/* Service Options */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/marketplace/e-waste">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    E-Waste Service
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    AI-powered device identification and precious metal value estimation from e-waste images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Camera className="w-4 h-4 mr-3 text-primary" />
                      Upload e-waste images for analysis
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Zap className="w-4 h-4 mr-3 text-primary" />
                      AI device identification & counting
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-primary font-bold">$</div>
                      Real-time precious metal value calculation
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-primary font-bold">📊</div>
                      Environmental impact metrics
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-primary/10">
                    <p className="text-sm text-primary font-medium">
                      Get instant estimates for gold, silver, copper, and rare earth elements
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/marketplace/junkyard">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    Junkyard Marketplace
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    Comprehensive circular economy marketplace for recycled materials and industrial byproducts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-accent font-bold">🏭</div>
                      Industrial byproducts trading
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-accent font-bold">🔍</div>
                      AI-powered material recommendations
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-accent font-bold">📈</div>
                      Real-time market analytics
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-4 h-4 mr-3 text-center text-accent font-bold">🤝</div>
                      Secure transaction processing
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-accent/10">
                    <p className="text-sm text-accent font-medium">
                      Connect buyers and sellers of recycled materials globally
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning models for device identification, material classification, and value
                  estimation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-2">
                  <div className="text-accent font-bold">$</div>
                </div>
                <CardTitle className="text-lg">Real-Time Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Live market data integration for accurate precious metal and material pricing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 mb-2">
                  <Recycle className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Sustainability Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Environmental impact tracking and circular economy optimization for all transactions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Impact</CardTitle>
              <CardDescription>Real-time statistics from our circular economy marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.3M kg</div>
                  <p className="text-sm text-muted-foreground">Materials Recycled</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">₹45.2L</div>
                  <p className="text-sm text-muted-foreground">Value Recovered</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">1,847</div>
                  <p className="text-sm text-muted-foreground">Active Traders</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <p className="text-sm text-muted-foreground">Waste Diverted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
