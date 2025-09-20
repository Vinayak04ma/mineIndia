"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Filter, MapPin, Star, TrendingUp, Package, Users, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function JunkyardMarketplacePage() {
  const [userRole, setUserRole] = useState<"buyer" | "seller" | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const materials = [
    {
      id: 1,
      title: "High-Grade Copper Wire Scrap",
      seller: "MetalCorp Industries",
      location: "Mumbai, Maharashtra",
      price: "₹650/kg",
      quantity: "2,500 kg",
      purity: "99.9%",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300&text=Copper+Wire",
      category: "Copper",
      sustainability: 92,
      verified: true,
    },
    {
      id: 2,
      title: "Aluminum Extrusion Offcuts",
      seller: "GreenRecycle Solutions",
      location: "Pune, Maharashtra",
      price: "₹180/kg",
      quantity: "1,800 kg",
      purity: "6061 Alloy",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300&text=Aluminum+Scrap",
      category: "Aluminum",
      sustainability: 88,
      verified: true,
    },
    {
      id: 3,
      title: "Steel Fabrication Waste",
      seller: "Industrial Metals Ltd",
      location: "Chennai, Tamil Nadu",
      price: "₹45/kg",
      quantity: "5,000 kg",
      purity: "Mild Steel",
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=300&text=Steel+Scrap",
      category: "Steel",
      sustainability: 85,
      verified: false,
    },
    {
      id: 4,
      title: "Electronic Component Boards",
      seller: "TechRecovery Inc",
      location: "Bangalore, Karnataka",
      price: "₹2,400/kg",
      quantity: "150 kg",
      purity: "Mixed PCBs",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300&text=PCB+Boards",
      category: "Electronics",
      sustainability: 95,
      verified: true,
    },
  ]

  const categories = ["All", "Copper", "Aluminum", "Steel", "Electronics", "Mixed Metals"]

  if (!userRole) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container py-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center mb-6">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/marketplace">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Marketplace
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Junkyard Marketplace</h1>
                <p className="text-muted-foreground">Choose your role to get started</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <Card
                className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setUserRole("buyer")}
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
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

              <Card
                className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setUserRole("seller")}
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>I'm a Seller</CardTitle>
                  <CardDescription>I have recycled materials or industrial waste to sell</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      List materials with rich media
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      AI pricing optimization
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Quality verification badges
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Direct buyer communication
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Features */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Market Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time pricing trends, supply-demand analytics, and market forecasting
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-2">
                    <Star className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Verification badges, user ratings, and third-party quality certifications
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 mb-2">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Secure Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Escrow services, digital contracts, and dispute resolution system
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => setUserRole(null)} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Role
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{userRole === "buyer" ? "Browse Materials" : "Seller Dashboard"}</h1>
                <p className="text-muted-foreground">
                  {userRole === "buyer" ? "Find recycled materials for your business" : "Manage your material listings"}
                </p>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              {userRole === "buyer" ? "Buyer" : "Seller"} Mode
            </Badge>
          </div>

          {userRole === "buyer" && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="search">Search Materials</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search by material type, location, or seller..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Material Listings */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                  <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted">
                      <img
                        src={material.image || "/placeholder.svg"}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {material.location}
                          </CardDescription>
                        </div>
                        {material.verified && (
                          <Badge className="bg-accent text-accent-foreground text-xs">Verified</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{material.price}</span>
                          <span className="text-sm text-muted-foreground">{material.quantity} available</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Purity: {material.purity}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span>{material.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Seller: {material.seller}</span>
                          <Badge variant="outline" className="text-xs">
                            {material.sustainability}% Sustainable
                          </Badge>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1" size="sm">
                            Contact Seller
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {userRole === "seller" && (
            <Tabs defaultValue="listings" className="space-y-6">
              <TabsList>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="create">Create Listing</TabsTrigger>
              </TabsList>

              <TabsContent value="listings">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">My Material Listings</h2>
                    <Button>
                      <Package className="mr-2 h-4 w-4" />
                      Add New Listing
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {materials.slice(0, 2).map((material) => (
                      <Card key={material.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-muted rounded-lg"></div>
                              <div>
                                <h3 className="font-semibold">{material.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {material.quantity} • {material.price}
                                </p>
                                <div className="flex items-center mt-1">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span className="text-sm">{material.rating} rating</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-accent text-accent-foreground">Active</Badge>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Sales Analytics</h2>

                  <div className="grid gap-6 md:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary">₹2.4L</div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-accent">47</div>
                        <p className="text-sm text-muted-foreground">Active Listings</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-secondary">156</div>
                        <p className="text-sm text-muted-foreground">Total Inquiries</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary">4.7</div>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Communication with potential buyers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h4 className="font-semibold">TechCorp Industries</h4>
                          <p className="text-sm text-muted-foreground">Interested in your copper wire scrap...</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                          <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h4 className="font-semibold">GreenManufacturing Ltd</h4>
                          <p className="text-sm text-muted-foreground">Can you provide quality certificates...</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Listing</CardTitle>
                    <CardDescription>Add a new material to the marketplace</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="title">Material Title</Label>
                          <Input id="title" placeholder="e.g., High-Grade Copper Wire Scrap" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="copper">Copper</SelectItem>
                              <SelectItem value="aluminum">Aluminum</SelectItem>
                              <SelectItem value="steel">Steel</SelectItem>
                              <SelectItem value="electronics">Electronics</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity (kg)</Label>
                          <Input id="quantity" placeholder="e.g., 2500" />
                        </div>
                        <div>
                          <Label htmlFor="price">Price per kg (₹)</Label>
                          <Input id="price" placeholder="e.g., 650" />
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Upload Material Images</h4>
                        <p className="text-muted-foreground mb-4">Add high-quality photos to showcase your materials</p>
                        <Button>Choose Images</Button>
                      </div>

                      <div className="flex gap-4">
                        <Button className="flex-1">Create Listing</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Save as Draft
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
