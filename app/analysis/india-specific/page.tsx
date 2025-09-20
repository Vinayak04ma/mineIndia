"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search, Zap, FileText } from "lucide-react"
import Link from "next/link"

export default function IndiaSpecificAnalysisPage() {
  const [selectedState, setSelectedState] = useState("")
  const [selectedMine, setSelectedMine] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const states = [
    { value: "odisha", label: "Odisha" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "karnataka", label: "Karnataka" },
    { value: "rajasthan", label: "Rajasthan" },
  ]

  const mines = {
    odisha: [
      {
        id: "bailadila",
        name: "Bailadila Iron Ore Mine",
        type: "Iron Ore",
        location: "Dantewada",
        coordinates: "18.6°N, 81.3°E",
      },
      {
        id: "keonjhar",
        name: "Keonjhar Iron Ore Complex",
        type: "Iron Ore",
        location: "Keonjhar",
        coordinates: "21.6°N, 85.6°E",
      },
      { id: "talcher", name: "Talcher Coal Fields", type: "Coal", location: "Angul", coordinates: "20.9°N, 85.2°E" },
    ],
    jharkhand: [
      {
        id: "noamundi",
        name: "Noamundi Iron Ore Mine",
        type: "Iron Ore",
        location: "West Singhbhum",
        coordinates: "22.2°N, 85.5°E",
      },
      { id: "jharia", name: "Jharia Coal Fields", type: "Coal", location: "Dhanbad", coordinates: "23.7°N, 86.4°E" },
      { id: "bokaro", name: "Bokaro Coal Fields", type: "Coal", location: "Bokaro", coordinates: "23.8°N, 86.0°E" },
    ],
    chhattisgarh: [
      { id: "korba", name: "Korba Coal Fields", type: "Coal", location: "Korba", coordinates: "22.3°N, 82.7°E" },
      { id: "raigarh", name: "Raigarh Coal Basin", type: "Coal", location: "Raigarh", coordinates: "21.9°N, 83.4°E" },
    ],
    karnataka: [
      {
        id: "bellary",
        name: "Bellary Iron Ore Belt",
        type: "Iron Ore",
        location: "Bellary",
        coordinates: "15.1°N, 76.9°E",
      },
      {
        id: "kudremukh",
        name: "Kudremukh Iron Ore Mine",
        type: "Iron Ore",
        location: "Chikkamagaluru",
        coordinates: "13.3°N, 75.0°E",
      },
    ],
    rajasthan: [
      {
        id: "khetri",
        name: "Khetri Copper Complex",
        type: "Copper",
        location: "Jhunjhunu",
        coordinates: "28.0°N, 75.8°E",
      },
      {
        id: "zawar",
        name: "Zawar Lead-Zinc Mines",
        type: "Lead-Zinc",
        location: "Udaipur",
        coordinates: "24.3°N, 73.7°E",
      },
    ],
  }

  const currentMines = selectedState ? mines[selectedState as keyof typeof mines] || [] : []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/analysis">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Analysis
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">India-Specific Mine Analysis</h1>
              <p className="text-muted-foreground">Select location-based data for region-specific LCA</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Map and Search */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Interactive Mine Map
                  </CardTitle>
                  <CardDescription>Select a mine location to access regional environmental data</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mock Map Interface */}
                  <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10">
                      {/* Mock India Map with Mine Locations */}
                      <div className="relative h-full w-full">
                        <img
                          src="/india-map-with-mining-locations-marked.jpg"
                          alt="India Mining Map"
                          className="w-full h-full object-cover opacity-80"
                        />

                        {/* Mock Mine Markers */}
                        <div
                          className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse cursor-pointer"
                          title="Odisha Mines"
                        ></div>
                        <div
                          className="absolute top-1/3 left-2/5 w-3 h-3 bg-accent rounded-full animate-pulse cursor-pointer"
                          title="Jharkhand Mines"
                        ></div>
                        <div
                          className="absolute top-2/5 left-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse cursor-pointer"
                          title="Chhattisgarh Mines"
                        ></div>
                        <div
                          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse cursor-pointer"
                          title="Karnataka Mines"
                        ></div>
                        <div
                          className="absolute top-1/4 left-1/5 w-3 h-3 bg-accent rounded-full animate-pulse cursor-pointer"
                          title="Rajasthan Mines"
                        ></div>
                      </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button size="sm" variant="secondary">
                        +
                      </Button>
                      <Button size="sm" variant="secondary">
                        -
                      </Button>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-background/90 p-3 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Mine Types</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          <span>Iron Ore</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                          <span>Coal</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                          <span>Copper/Others</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search & Filter</CardTitle>
                  <CardDescription>Find specific mines or ore types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="search">Search Mines</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="search"
                            placeholder="Search by mine name, location, or ore type..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={selectedState} onValueChange={setSelectedState}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Mine Results */}
                    {selectedState && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">
                          Available Mines in {states.find((s) => s.value === selectedState)?.label}
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {currentMines.map((mine) => (
                            <Card
                              key={mine.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                selectedMine === mine.id ? "ring-2 ring-primary" : ""
                              }`}
                              onClick={() => setSelectedMine(mine.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-semibold text-sm">{mine.name}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {mine.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-1">{mine.location}</p>
                                <p className="text-xs text-muted-foreground">{mine.coordinates}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mine Details & Analysis */}
            <div className="space-y-6">
              {selectedMine && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mine Details</CardTitle>
                      <CardDescription>{currentMines.find((m) => m.id === selectedMine)?.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Location Data</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Climate Zone</span>
                              <span>Tropical Monsoon</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Avg. Temperature</span>
                              <span>28°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Annual Rainfall</span>
                              <span>1,200mm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Elevation</span>
                              <span>450m ASL</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Environmental Factors</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Water Availability</span>
                              <Badge className="bg-accent text-accent-foreground text-xs">High</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Grid Carbon Intensity</span>
                              <span>0.82 kg CO₂/kWh</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transport Access</span>
                              <Badge className="bg-primary text-primary-foreground text-xs">Good</Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Ore Characteristics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Grade</span>
                              <span>62% Fe</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Hardness</span>
                              <span>Medium</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Processing Method</span>
                              <span>Beneficiation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Zap className="mr-2 h-5 w-5" />
                        AI Analysis Ready
                      </CardTitle>
                      <CardDescription>Location-specific parameters loaded</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <h4 className="font-semibold text-primary text-sm mb-1">Auto-Configured</h4>
                          <p className="text-xs text-muted-foreground">
                            Climate, transport, and regional energy data automatically applied
                          </p>
                        </div>

                        <Button className="w-full" asChild>
                          <Link
                            href={`/analysis/india-specific/input?state=${selectedState}&stateLabel=${encodeURIComponent(
                              states.find((s) => s.value === selectedState)?.label || ""
                            )}&mine=${selectedMine}&mineName=${encodeURIComponent(
                              (currentMines.find((m) => m.id === selectedMine)?.name) || ""
                            )}&type=${encodeURIComponent(
                              (currentMines.find((m) => m.id === selectedMine)?.type) || ""
                            )}`}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Proceed to Analysis
                          </Link>
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          Location data will be pre-filled in the analysis form
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!selectedMine && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h4 className="font-semibold mb-2">Select a Mine Location</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose a mine from the map or search results to view location-specific data and proceed with
                      analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
