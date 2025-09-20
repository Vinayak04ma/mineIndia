"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Zap, FileText, BarChart3, Leaf } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, LabelList } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ManualAnalysisPage() {
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [analysisStep, setAnalysisStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const searchParams = useSearchParams()

  // If arriving from India-specific flow with auto=1, open results directly
  useEffect(() => {
    const auto = searchParams.get("auto")
    if (auto) {
      // preselect a sensible default to avoid empty states
      if (!selectedMaterial) setSelectedMaterial("aluminum")
      setShowResults(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const comparisonData = [
    { metric: "Carbon Footprint (kg CO₂)", conventional: 15.2, sustainable: 8.7 },
    { metric: "Energy Consumption (MJ)", conventional: 52.3, sustainable: 31.2 },
    { metric: "Water Usage (L)", conventional: 1247, sustainable: 743 },
    { metric: "Waste Generation (kg)", conventional: 2.8, sustainable: 1.2 },
  ]

  const comparisonChartConfig = {
    conventional: {
      label: "Conventional",
      color: "hsl(var(--destructive))",
    },
    sustainable: {
      label: "Sustainable",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig

  // Shared palette for pie slices and additional series
  // Vibrant, accessible palette (no black)
  const chartColors = [
    "#6366F1", // indigo-500
    "#22C55E", // green-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#06B6D4", // cyan-500
    "#A855F7", // purple-500
  ]

  const conventionalProcessData = [
    { stage: "Bauxite Mining", percentage: 35, fill: "var(--color-bauxite)" },
    { stage: "Alumina Refining", percentage: 25, fill: "var(--color-alumina)" },
    { stage: "Aluminum Smelting", percentage: 30, fill: "var(--color-smelting)" },
    { stage: "Transportation", percentage: 10, fill: "var(--color-transport)" },
  ]

  const conventionalProcessChartConfig = {
    bauxite: {
      label: "Bauxite Mining",
      color: "hsl(var(--chart-1))",
    },
    alumina: {
      label: "Alumina Refining",
      color: "hsl(var(--chart-2))",
    },
    smelting: {
      label: "Aluminum Smelting",
      color: "hsl(var(--chart-3))",
    },
    transport: {
      label: "Transportation",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  const sustainableMetricsData = [
    { metric: "Material Circularity", value: 72, fill: "var(--color-circularity)" },
    { metric: "Resource Efficiency", value: 68, fill: "var(--color-efficiency)" },
    { metric: "End-of-Life Recovery", value: 89, fill: "var(--color-recovery)" },
  ]

  const sustainableMetricsChartConfig = {
    circularity: {
      label: "Material Circularity",
      color: "hsl(var(--chart-1))",
    },
    efficiency: {
      label: "Resource Efficiency",
      color: "hsl(var(--chart-2))",
    },
    recovery: {
      label: "End-of-Life Recovery",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  // Optional context forwarded from India-specific flow
  const mineName = searchParams.get("mineName") || ""
  const stateLabel = searchParams.get("stateLabel") || ""
  const mineType = searchParams.get("type") || ""

  const wasteCompositionData = [
    { waste: "Red Mud", percentage: 64, fill: "var(--color-red-mud)" },
    { waste: "Spent Pot Lining", percentage: 21, fill: "var(--color-spl)" },
    { waste: "Dross & Skimmings", percentage: 15, fill: "var(--color-dross)" },
  ]

  const wasteCompositionChartConfig = {
    "red-mud": {
      label: "Red Mud",
      color: "hsl(var(--chart-1))",
    },
    spl: {
      label: "Spent Pot Lining",
      color: "hsl(var(--chart-2))",
    },
    dross: {
      label: "Dross & Skimmings",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  const materials = [
    { value: "aluminum", label: "Aluminum", description: "Primary aluminum production" },
    { value: "copper", label: "Copper", description: "Copper extraction and refining" },
    { value: "steel", label: "Steel", description: "Iron ore to steel production" },
    { value: "lithium", label: "Lithium", description: "Lithium extraction for batteries" },
    { value: "rare-earth", label: "Rare Earth Elements", description: "Critical mineral extraction" },
  ]

  const handleRunAnalysis = () => {
    setShowResults(true)
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container py-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={() => setShowResults(false)} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Analysis
              </Button>
              <div>
                <h1 className="text-3xl font-bold">LCA Analysis Results</h1>
                <p className="text-muted-foreground">Aluminum Production Analysis</p>
              </div>
            </div>

            {(mineName || stateLabel || mineType) && (
              <Card className="mb-2">
                <CardContent className="p-4 flex flex-wrap items-center gap-3">
                  {mineName && <Badge variant="outline">Mine: {mineName}</Badge>}
                  {mineType && <Badge variant="secondary">Type: {mineType}</Badge>}
                  {stateLabel && <Badge>State: {stateLabel}</Badge>}
                  <span className="text-xs text-muted-foreground ml-auto">
                    Location-aware analysis generated automatically
                  </span>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="comparison" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="conventional">Conventional</TabsTrigger>
                <TabsTrigger value="sustainable">Sustainable</TabsTrigger>
                <TabsTrigger value="waste">Waste Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact Comparison</CardTitle>
                    <CardDescription>
                      Comparing conventional vs. sustainable methods across key metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={comparisonChartConfig} className="h-[360px] w-full">
                      <BarChart accessibilityLayer data={comparisonData} barCategoryGap="20%">
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="metric"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="conventional"
                          fill="#EF4444"
                          radius={[6,6,0,0]}
                          isAnimationActive
                          animationDuration={700}
                          animationBegin={100}
                        >
                          <LabelList dataKey="conventional" position="top" formatter={(v: number) => v.toFixed(1)} />
                        </Bar>
                        <Bar
                          dataKey="sustainable"
                          fill="#22C55E"
                          radius={[6,6,0,0]}
                          isAnimationActive
                          animationDuration={700}
                          animationBegin={150}
                        >
                          <LabelList dataKey="sustainable" position="top" formatter={(v: number) => v.toFixed(1)} />
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-destructive" />
                        Conventional Method
                      </CardTitle>
                      <CardDescription>Traditional aluminum production process</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Carbon Footprint</span>
                          <span className="font-medium">15.2 kg CO₂/kg Al</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energy Consumption</span>
                          <span className="font-medium">52.3 MJ/kg Al</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Water Usage</span>
                          <span className="font-medium">1,247 L/kg Al</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Waste Generation</span>
                          <span className="font-medium">2.8 kg/kg Al</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-accent" />
                        Sustainable Method
                      </CardTitle>
                      <CardDescription>AI-optimized sustainable production</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Carbon Footprint</span>
                          <span className="font-medium text-accent">8.7 kg CO₂/kg Al</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energy Consumption</span>
                          <span className="font-medium text-accent">31.2 MJ/kg Al</span>
                        </div>
                        <Progress value={52} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Water Usage</span>
                          <span className="font-medium text-accent">743 L/kg Al</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Waste Generation</span>
                          <span className="font-medium text-accent">1.2 kg/kg Al</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Recommendations</CardTitle>
                    <CardDescription>AI-generated suggestions for sustainability enhancement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 rounded-lg bg-accent/10">
                        <h4 className="font-semibold text-accent mb-2">Energy Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Switch to renewable energy sources for 40% reduction in carbon footprint
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10">
                        <h4 className="font-semibold text-primary mb-2">Recycling Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Incorporate 65% recycled aluminum to reduce primary extraction needs
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/10">
                        <h4 className="font-semibold text-secondary mb-2">Process Efficiency</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement advanced smelting technology for 25% energy savings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conventional">
                <Card>
                  <CardHeader>
                    <CardTitle>Conventional Method Detailed Analysis</CardTitle>
                    <CardDescription>Traditional aluminum production lifecycle assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-3">Environmental Impact Categories</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Climate Change</span>
                              <Badge variant="destructive">High</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Acidification</span>
                              <Badge variant="destructive">High</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Eutrophication</span>
                              <Badge variant="secondary">Medium</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Resource Depletion</span>
                              <Badge variant="destructive">High</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold mb-3 text-center">Process Stage Contribution</h4>
                          <ChartContainer
                            config={conventionalProcessChartConfig}
                            className="mx-auto h-[320px] w-full"
                          >
                            <PieChart>
                              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                              <Pie
                                data={conventionalProcessData}
                                dataKey="percentage"
                                nameKey="stage"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={2}
                                labelLine={false}
                                label={({ value }) => `${value}%`}
                                isAnimationActive
                                animationDuration={800}
                                animationBegin={100}
                              >
                                {conventionalProcessData.map((_, i) => (
                                  <Cell key={`c-${i}`} fill={chartColors[i % chartColors.length]} />
                                ))}
                              </Pie>
                              <ChartLegend
                                content={<ChartLegendContent nameKey="stage" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
                              />
                            </PieChart>
                          </ChartContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sustainable">
                <Card>
                  <CardHeader>
                    <CardTitle>Sustainable Method Analysis</CardTitle>
                    <CardDescription>AI-optimized sustainable aluminum production</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-3">Sustainability Improvements</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Renewable Energy Use</span>
                              <Badge className="bg-accent text-accent-foreground">85%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Recycled Content</span>
                              <Badge className="bg-accent text-accent-foreground">65%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Water Recycling</span>
                              <Badge className="bg-accent text-accent-foreground">78%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Waste Reduction</span>
                              <Badge className="bg-accent text-accent-foreground">57%</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold mb-3 text-center">Circular Economy Metrics</h4>
                          <ChartContainer
                            config={sustainableMetricsChartConfig}
                            className="mx-auto h-[320px] w-full"
                          >
                            <PieChart>
                              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                              <Pie
                                data={sustainableMetricsData}
                                dataKey="value"
                                nameKey="metric"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={2}
                                labelLine={false}
                                label={({ value }) => `${value}%`}
                                isAnimationActive
                                animationDuration={800}
                                animationBegin={120}
                              >
                                {sustainableMetricsData.map((_, i) => (
                                  <Cell key={`s-${i}`} fill={chartColors[i % chartColors.length]} />
                                ))}
                              </Pie>
                              <ChartLegend
                                content={<ChartLegendContent nameKey="metric" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
                              />
                            </PieChart>
                          </ChartContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="waste">
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Generation Analysis</CardTitle>
                    <CardDescription>
                      Comprehensive waste stream assessment and management recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-destructive/10">
                          <h4 className="font-semibold text-destructive mb-2">Red Mud (1.8 kg/kg Al)</h4>
                          <p className="text-sm text-muted-foreground">
                            Highly alkaline waste from alumina refining. Represents the largest waste stream.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary/10">
                          <h4 className="font-semibold text-secondary mb-2">Spent Pot Lining (0.6 kg/kg Al)</h4>
                          <p className="text-sm text-muted-foreground">
                            Carbon-based hazardous waste from smelting cells.
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/10">
                          <h4 className="font-semibold text-primary mb-2">Dross & Skimmings (0.4 kg/kg Al)</h4>
                          <p className="text-sm text-muted-foreground">
                            Recoverable aluminum-rich waste from casting.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold mb-3 text-center">Waste Composition</h4>
                        <ChartContainer
                          config={wasteCompositionChartConfig}
                          className="mx-auto h-[320px] w-full"
                        >
                          <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                              data={wasteCompositionData}
                              dataKey="percentage"
                              nameKey="waste"
                              innerRadius={70}
                              outerRadius={110}
                              paddingAngle={2}
                              labelLine={false}
                              label={({ value }) => `${value}%`}
                              isAnimationActive
                              animationDuration={800}
                              animationBegin={140}
                            >
                              {wasteCompositionData.map((_, i) => (
                                <Cell key={`w-${i}`} fill={chartColors[i % chartColors.length]} />
                              ))}
                            </Pie>
                            <ChartLegend
                              content={<ChartLegendContent nameKey="waste" />}
                              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
                            />
                          </PieChart>
                        </ChartContainer>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Waste Management Recommendations</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Red Mud Utilization</span>
                            <Badge className="bg-accent text-accent-foreground">High Priority</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Convert to construction materials, iron recovery, or soil amendment applications
                          </p>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">SPL Processing</span>
                            <Badge variant="secondary">Medium Priority</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Thermal treatment for fluoride recovery and carbon utilization
                          </p>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Dross Recovery</span>
                            <Badge className="bg-primary text-primary-foreground">Immediate</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Implement advanced dross processing for aluminum recovery
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/analysis">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Analysis
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Manual Material Selection</h1>
              <p className="text-muted-foreground">Configure your LCA analysis parameters</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Step 1: Material Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                    1
                  </div>
                  Select Material/Mineral
                </CardTitle>
                <CardDescription>Choose the primary material for your lifecycle assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {materials.map((material) => (
                    <Card
                      key={material.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMaterial === material.value ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedMaterial(material.value)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{material.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Input Parameters */}
            {selectedMaterial && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                      2
                    </div>
                    Input Parameters
                  </CardTitle>
                  <CardDescription>Provide process details or upload documents for AI extraction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="manual" className="space-y-6">
                    <TabsList>
                      <TabsTrigger value="manual">Manual Input</TabsTrigger>
                      <TabsTrigger value="upload">Document Upload</TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual" className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="production-volume">Production Volume (kg/year)</Label>
                            <Input id="production-volume" placeholder="e.g., 100000" />
                          </div>
                          <div>
                            <Label htmlFor="energy-source">Primary Energy Source</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select energy source" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="coal">Coal</SelectItem>
                                <SelectItem value="natural-gas">Natural Gas</SelectItem>
                                <SelectItem value="renewable">Renewable Energy</SelectItem>
                                <SelectItem value="mixed">Mixed Grid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="transport-distance">Transport Distance (km)</Label>
                            <Input id="transport-distance" placeholder="e.g., 500" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="recycled-content">Recycled Content (%)</Label>
                            <Input id="recycled-content" placeholder="e.g., 30" />
                          </div>
                          <div>
                            <Label htmlFor="water-source">Water Source</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select water source" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="freshwater">Freshwater</SelectItem>
                                <SelectItem value="seawater">Seawater</SelectItem>
                                <SelectItem value="recycled">Recycled Water</SelectItem>
                                <SelectItem value="mixed">Mixed Sources</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="end-of-life">End-of-Life Scenario</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select scenario" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="recycling">Recycling</SelectItem>
                                <SelectItem value="landfill">Landfill</SelectItem>
                                <SelectItem value="incineration">Incineration</SelectItem>
                                <SelectItem value="reuse">Reuse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="additional-notes">Additional Process Notes</Label>
                        <Textarea
                          id="additional-notes"
                          placeholder="Describe any specific process conditions, technologies, or constraints..."
                          className="mt-2"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="upload" className="space-y-6">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Upload Process Documents</h4>
                        <p className="text-muted-foreground mb-4">
                          Upload technical specifications, process flow diagrams, or environmental reports
                        </p>
                        <Button>
                          <Upload className="mr-2 h-4 w-4" />
                          Choose Files
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">Supported formats: PDF, DOC, XLS, PNG, JPG</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10">
                        <div className="flex items-start">
                          <Zap className="h-5 w-5 text-primary mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-semibold text-primary">AI Document Processing</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Our AI will automatically extract relevant parameters from your documents, including
                              energy consumption, material flows, and process conditions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Run Analysis */}
            {selectedMaterial && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                      3
                    </div>
                    Run Analysis
                  </CardTitle>
                  <CardDescription>Generate comprehensive LCA reports with AI-powered insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <h4 className="font-semibold">Ready to Analyze</h4>
                        <p className="text-sm text-muted-foreground">
                          Material: {materials.find((m) => m.value === selectedMaterial)?.label}
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleRunAnalysis} size="lg">
                      <Zap className="mr-2 h-4 w-4" />
                      Run LCA Analysis
                    </Button>
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-accent/10">
                    <h4 className="font-semibold text-accent mb-2">What happens next?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AI estimates missing parameters using industry databases</li>
                      <li>• Conventional and sustainable scenarios are calculated</li>
                      <li>• Environmental impact across 9 categories is assessed</li>
                      <li>• Waste generation and circularity metrics are analyzed</li>
                      <li>• Actionable recommendations are generated</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
