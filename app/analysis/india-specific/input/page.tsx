"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Zap, Calculator, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function IndiaSpecificInputPage() {
  const [productionVolume, setProductionVolume] = useState("")
  const [processingMethod, setProcessingMethod] = useState("")
  const [energySource, setEnergySource] = useState("")
  const [transportDistance, setTransportDistance] = useState("")
  const [additionalInputs, setAdditionalInputs] = useState("")
  const searchParams = useSearchParams()

  // Build report link preserving context from the state-wise flow
  const qs = new URLSearchParams()
  qs.set("auto", "1")
  ;["state", "stateLabel", "mine", "mineName", "type"].forEach((k) => {
    const v = searchParams.get(k as any)
    if (v) qs.set(k, v)
  })
  const reportHref = `/analysis/manual?${qs.toString()}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/analysis/india-specific">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Mine Selection
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analysis Input Parameters</h1>
              <p className="text-muted-foreground">Configure your LCA analysis with location-specific data</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Pre-loaded Location Data
                  </CardTitle>
                  <CardDescription>Automatically configured from selected mine location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Label className="text-sm font-semibold text-primary">Selected Mine</Label>
                      <p className="text-sm">Bailadila Iron Ore Mine</p>
                      <p className="text-xs text-muted-foreground">Dantewada, Odisha</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/10">
                      <Label className="text-sm font-semibold text-accent-foreground">Climate Zone</Label>
                      <p className="text-sm">Tropical Monsoon</p>
                      <p className="text-xs text-muted-foreground">28°C avg, 1200mm rainfall</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Label className="text-sm font-semibold">Grid Carbon Intensity</Label>
                      <p className="text-sm">0.82 kg CO₂/kWh</p>
                      <p className="text-xs text-muted-foreground">Regional grid mix</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Label className="text-sm font-semibold text-primary">Ore Grade</Label>
                      <p className="text-sm">62% Fe</p>
                      <p className="text-xs text-muted-foreground">High-grade iron ore</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Production Parameters</CardTitle>
                  <CardDescription>Specify your production requirements and methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="production-volume">Annual Production Volume</Label>
                        <div className="relative">
                          <Input
                            id="production-volume"
                            placeholder="e.g., 50000"
                            value={productionVolume}
                            onChange={(e) => setProductionVolume(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">tonnes</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="processing-method">Processing Method</Label>
                        <Select value={processingMethod} onValueChange={setProcessingMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beneficiation">Beneficiation</SelectItem>
                            <SelectItem value="direct-shipping">Direct Shipping</SelectItem>
                            <SelectItem value="pelletization">Pelletization</SelectItem>
                            <SelectItem value="sintering">Sintering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="energy-source">Primary Energy Source</Label>
                        <Select value={energySource} onValueChange={setEnergySource}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select energy source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid-mix">Regional Grid Mix</SelectItem>
                            <SelectItem value="coal">Coal Power</SelectItem>
                            <SelectItem value="renewable">Renewable Energy</SelectItem>
                            <SelectItem value="hybrid">Hybrid (Grid + Renewable)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="transport-distance">Transport Distance to Port</Label>
                        <div className="relative">
                          <Input
                            id="transport-distance"
                            placeholder="e.g., 350"
                            value={transportDistance}
                            onChange={(e) => setTransportDistance(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">km</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="additional-inputs">Additional Process Inputs</Label>
                      <Textarea
                        id="additional-inputs"
                        placeholder="Specify any additional chemicals, water usage, or special processing requirements..."
                        value={additionalInputs}
                        onChange={(e) => setAdditionalInputs(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Configuration</CardTitle>
                  <CardDescription>Choose your LCA scope and comparison options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Impact Categories</Label>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="carbon" defaultChecked className="rounded" />
                          <Label htmlFor="carbon" className="text-sm">
                            Carbon Footprint (CO₂ eq)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="water" defaultChecked className="rounded" />
                          <Label htmlFor="water" className="text-sm">
                            Water Footprint
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="energy" defaultChecked className="rounded" />
                          <Label htmlFor="energy" className="text-sm">
                            Energy Consumption
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="land" className="rounded" />
                          <Label htmlFor="land" className="text-sm">
                            Land Use Impact
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="acidification" className="rounded" />
                          <Label htmlFor="acidification" className="text-sm">
                            Acidification Potential
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="eutrophication" className="rounded" />
                          <Label htmlFor="eutrophication" className="text-sm">
                            Eutrophication
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Comparison Scenarios</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="conventional" defaultChecked className="rounded" />
                          <Label htmlFor="conventional" className="text-sm">
                            Conventional Mining Methods
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sustainable" defaultChecked className="rounded" />
                          <Label htmlFor="sustainable" className="text-sm">
                            Sustainable/Green Mining Alternatives
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="renewable-energy" className="rounded" />
                          <Label htmlFor="renewable-energy" className="text-sm">
                            100% Renewable Energy Scenario
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calculator className="mr-2 h-5 w-5" />
                    Analysis Preview
                  </CardTitle>
                  <CardDescription>AI-powered LCA estimation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <h4 className="font-semibold text-primary text-sm mb-1">Location Advantage</h4>
                      <p className="text-xs text-muted-foreground">High-grade ore reduces processing energy by ~15%</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Estimated CO₂ Impact</span>
                        <Badge className="bg-accent text-accent-foreground">2.1 t CO₂/t ore</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Water Usage</span>
                        <Badge className="bg-secondary text-secondary-foreground">3.2 m³/t ore</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Energy Intensity</span>
                        <Badge className="bg-primary text-primary-foreground">45 kWh/t ore</Badge>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        * Preliminary estimates based on location data. Full analysis will provide detailed breakdown.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Ready to Analyze
                  </CardTitle>
                  <CardDescription>Generate comprehensive LCA report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-semibold text-accent-foreground text-sm mb-1">AI Analysis Features</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Location-specific impact factors</li>
                        <li>• Multi-scenario comparisons</li>
                        <li>• Optimization recommendations</li>
                        <li>• Regulatory compliance check</li>
                      </ul>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={reportHref}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Generate LCA Report
                      </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">Analysis typically takes 30-60 seconds</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
