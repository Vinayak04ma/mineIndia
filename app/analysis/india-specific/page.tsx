"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Zap, FileText, MapPin } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const IndiaMiningMap = dynamic(
  () => import('@/components/india-mining-map'),
  { ssr: false }
);

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
        coordinates: "18.6, 81.3",
        lat: 18.6,
        lng: 81.3
      },
      {
        id: "keonjhar",
        name: "Keonjhar Iron Ore Complex",
        type: "Iron Ore",
        location: "Keonjhar",
        coordinates: "21.6, 85.6",
        lat: 21.6,
        lng: 85.6
      },
      { 
        id: "talcher", 
        name: "Talcher Coal Fields", 
        type: "Coal", 
        location: "Angul", 
        coordinates: "20.9, 85.2",
        lat: 20.9,
        lng: 85.2
      },
    ],
    jharkhand: [
      {
        id: "noamundi",
        name: "Noamundi Iron Ore Mine",
        type: "Iron Ore",
        location: "West Singhbhum",
        coordinates: "22.2, 85.5",
        lat: 22.2,
        lng: 85.5
      },
      { 
        id: "jharia", 
        name: "Jharia Coal Fields", 
        type: "Coal", 
        location: "Dhanbad", 
        coordinates: "23.7, 86.4",
        lat: 23.7,
        lng: 86.4
      },
      { 
        id: "bokaro", 
        name: "Bokaro Coal Fields", 
        type: "Coal", 
        location: "Bokaro", 
        coordinates: "23.8, 86.0",
        lat: 23.8,
        lng: 86.0
      },
    ],
    chhattisgarh: [
      { 
        id: "korba", 
        name: "Korba Coal Fields", 
        type: "Coal", 
        location: "Korba", 
        coordinates: "22.3, 82.7",
        lat: 22.3,
        lng: 82.7
      },
      { 
        id: "raigarh", 
        name: "Raigarh Coal Basin", 
        type: "Coal", 
        location: "Raigarh", 
        coordinates: "21.9, 83.4",
        lat: 21.9,
        lng: 83.4
      },
    ],
    karnataka: [
      {
        id: "bellary",
        name: "Bellary Iron Ore Belt",
        type: "Iron Ore",
        location: "Bellary",
        coordinates: "15.1, 76.9",
        lat: 15.1,
        lng: 76.9
      },
      {
        id: "kudremukh",
        name: "Kudremukh Iron Ore Mine",
        type: "Iron Ore",
        location: "Chikkamagaluru",
        coordinates: "13.3, 75.0",
        lat: 13.3,
        lng: 75.0
      },
    ],
    rajasthan: [
      {
        id: "khetri",
        name: "Khetri Copper Complex",
        type: "Copper",
        location: "Jhunjhunu",
        coordinates: "28.0, 75.8",
        lat: 28.0,
        lng: 75.8
      },
      {
        id: "zawar",
        name: "Zawar Lead-Zinc Mines",
        type: "Lead-Zinc",
        location: "Udaipur",
        coordinates: "24.3, 73.7",
        lat: 24.3,
        lng: 73.7
      },
    ],
  }

  const currentMines = useMemo(() => {
    // If a specific mine is selected, show only that mine
    if (selectedMine) {
      const allMines = Object.values(mines).flat();
      return allMines.filter(mine => mine.id === selectedMine);
    }

    // If a state is selected, show only mines from that state
    if (selectedState) {
      return mines[selectedState as keyof typeof mines] || [];
    }

    // If no state selected, show all mines from all states
    return Object.values(mines).flat();
  }, [selectedState, selectedMine]);

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
                  <CardDescription>
                    {selectedMine
                      ? `Showing selected mine: ${currentMines.find(m => m.id === selectedMine)?.name}`
                      : selectedState
                      ? `Showing mines in ${states.find(s => s.value === selectedState)?.label}`
                      : "Showing all mines across India. Select a state to filter by region."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="absolute inset-0">
                      <IndiaMiningMap 
                        mines={currentMines}
                        selectedMine={selectedMine}
                        onMineSelect={setSelectedMine}
                      />
                    </div>
                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-lg shadow-lg z-[1000] border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-100">Mine Types</h4>
                      <div className="space-y-1.5 text-xs text-gray-800 dark:text-gray-200">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2 border border-white dark:border-gray-800"></div>
                          <span>Iron Ore</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full mr-2 border border-white dark:border-gray-800"></div>
                          <span>Coal</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2 border border-white dark:border-gray-800"></div>
                          <span>Copper</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-600 rounded-full mr-2 border border-white dark:border-gray-800"></div>
                          <span>Lead-Zinc</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedMine ? "Showing 1 selected mine" : `${currentMines.length} mines displayed`}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 z-[1000]">
                      <div className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedMine
                            ? "Selected mine highlighted on map"
                            : selectedState
                            ? "Click markers to select specific mine"
                            : "Click markers to select mine and state"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search & Filter</CardTitle>
                  <CardDescription>
                    {selectedState
                      ? `Showing mines in ${states.find(s => s.value === selectedState)?.label}. Select different state to view other regions.`
                      : "Select a state to view mines in that region, or leave unselected to see all mines across India."
                    }
                  </CardDescription>
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

                    {/* Show all mines when no state selected */}
                    {!selectedState && currentMines.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">All Mines Across India</h4>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {currentMines.map((mine) => (
                            <Card
                              key={mine.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                selectedMine === mine.id ? "ring-2 ring-primary" : ""
                              }`}
                              onClick={() => {
                                // When clicking a mine from all mines view, also select the state
                                const mineState = Object.keys(mines).find(state =>
                                  mines[state as keyof typeof mines]?.some(m => m.id === mine.id)
                                );
                                if (mineState) setSelectedState(mineState);
                                setSelectedMine(mine.id);
                              }}
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
                    <h4 className="font-semibold mb-2">
                      {selectedState ? "Select a Mine Location" : "Select a State or Mine"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedState
                        ? "Choose a mine from the map or search results to view location-specific data and proceed with analysis"
                        : "Choose a state to view mines in that region, or click any mine marker on the map to get started"
                      }
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
