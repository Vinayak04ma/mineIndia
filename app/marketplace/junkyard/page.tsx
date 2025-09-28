"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Package, Users } from "lucide-react"
import Link from "next/link"

export default function JunkyardMarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
          <div className="my-12 mx-110">
              <h1 className="text-3xl font-bold">
                Junkyard Marketplace
                </h1>
              <p className="text-muted-foreground mx-16">
                Choose your role to get started
                </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12 my-16 mx-auto">
            <Link href="/marketplace/junkyard/buyer" className="block">
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="ml-130 h-7 w-7" />
                  <CardTitle>I'm a Buyer</CardTitle>
                  <CardDescription>
                    Looking for recycled materials and industrial byproducts for my business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Browse verified material listings
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      AI-powered material recommendations
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Real-time market pricing
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Secure transaction processing
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/marketplace/junkyard/seller" className="block">
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <ArrowRight className="ml-130 h-7 w-7" />
                  <CardTitle>I'm a Seller</CardTitle>
                  <CardDescription>I have recycled materials or industrial waste to sell</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Create and manage your listings
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Reach thousands of verified buyers
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Real-time pricing analytics
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Secure payment processing
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
