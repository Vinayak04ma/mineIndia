'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell } from 'recharts'
import dynamic from 'next/dynamic';

// Import the client-side charts
const PieChart = dynamic(
  () => import('@/components/charts/PieChartWrapper'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-64 flex items-center justify-center">Loading chart...</div>
  }
);

const BarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart),
  { 
    ssr: false,
    loading: () => <div className="w-full h-64 flex items-center justify-center">Loading chart...</div>
  }
);
import { Download, Leaf, Recycle, Factory, Trash2, Activity, Zap, Droplets, LandPlot, Users, FileText, Truck, MapPin } from "lucide-react"

export default function IndiaLCAResults() {
  // Mock data for demonstration
  const conventionalData = [
    { name: 'Global Warming Potential', value: 4.2, unit: 'kg CO₂-eq' },
    { name: 'Acidification Potential', value: 0.15, unit: 'kg SO₂-eq' },
    { name: 'Photochemical Ozone Creation', value: 0.08, unit: 'kg C₂H₄-eq' },
    { name: 'Particulate Matter Formation', value: 0.12, unit: 'kg PM₂.₅-eq' },
    { name: 'Ozone Depletion Potential', value: 0.0005, unit: 'kg CFC-11-eq' },
    { name: 'Eutrophication Potential', value: 0.25, unit: 'kg PO₄³⁻-eq' },
    { name: 'Freshwater Ecotoxicity', value: 1.8, unit: 'kg 1,4-DCB-eq' },
    { name: 'Marine Ecotoxicity', value: 2.3, unit: 'kg 1,4-DCB-eq' },
    { name: 'Water Scarcity', value: 3.5, unit: 'm³ water-eq' },
    { name: 'Human Toxicity Potential', value: 2.1, unit: 'kg 1,4-DCB-eq' },
    { name: 'Respiratory Inorganics', value: 0.0008, unit: 'DALYs' },
    { name: 'Mineral Resource Depletion', value: 0.0045, unit: 'kg Sb-eq' },
    { name: 'Fossil Fuel Depletion', value: 45.2, unit: 'MJ' },
    { name: 'Water Depletion', value: 2.8, unit: 'm³-eq' },
    { name: 'Land Use Impact', value: 0.15, unit: 'ha·year' },
    { name: 'Terrestrial Ecotoxicity', value: 1.2, unit: 'kg 1,4-DCB-eq' },
    { name: 'Land Use Change', value: 0.008, unit: 'PDF·m²·year' },
    { name: 'Habitat Alteration Score', value: 0.65, unit: '' },
  ]

  const circularityData: { name: string; value: string; unit?: string }[] = [
    { name: 'Recycled Content', value: '32', unit: '%' },
    { name: 'Virgin Material Input', value: '68', unit: '%' },
    { name: 'Recyclability at EOL', value: '85', unit: '%' },
    { name: 'Circular Recovery Rate', value: '72', unit: '%' },
    { name: 'Recycled Output Ratio (ROR)', value: '0.65', unit: '' },
    { name: 'Down/up-cycling Quality', value: '0.78', unit: '' },
    { name: 'Energy Saved by Recycling', value: '95', unit: '%' },
    { name: 'CO₂ Avoided', value: '12.4', unit: 't' },
    { name: 'Closed-loop Recycling Rate', value: '45', unit: '%' },
    { name: 'Value Retention Options', value: '3/5', unit: '' },
    { name: 'Landfilling Ratio', value: '8', unit: '%' },
    { name: 'Linear Flow Index (LFI)', value: '0.42', unit: '' },
    { name: 'Material Circularity Indicator (MCI)', value: '0.68', unit: '' },
    { name: 'Circular CO₂ Benefit', value: '-3.2', unit: 't CO₂-eq' },
    { name: 'Recycling Efficiency', value: '88', unit: '%' },
  ]

  const wasteData: Array<{ name: string; value: number }> = [
    { name: 'Hazardous Waste', value: 15 },
    { name: 'Inert Waste', value: 35 },
    { name: 'Recyclable', value: 25 },
    { name: 'Organic', value: 15 },
    { name: 'E-waste', value: 10 },
  ]

  const comparisonData: Array<{ name: string; conventional: number; sustainable: number }> = [
    { name: 'Resource Sourcing', conventional: 75, sustainable: 92 },
    { name: 'Material Flow', conventional: 60, sustainable: 85 },
    { name: 'Energy Usage', conventional: 45, sustainable: 78 },
    { name: 'Waste Generation', conventional: 30, sustainable: 82 },
    { name: 'Environmental Impact', conventional: 40, sustainable: 88 },
    { name: 'Economic Model', conventional: 65, sustainable: 90 },
    { name: 'Product Lifetime', conventional: 50, sustainable: 80 },
    { name: 'Material Circularity Index', conventional: 35, sustainable: 75 },
    { name: 'Supply Chain Dependence', conventional: 55, sustainable: 85 },
    { name: 'End-of-Life Strategy', conventional: 25, sustainable: 78 },
  ]

  // Define types for regional impact data
  type ImpactItem = { name: string; value: string; unit?: string }
  type ImpactCategory = {
    [key: string]: ImpactItem[]
  }

  const regionalImpactData: ImpactCategory = {
    energyClimate: [
      { name: 'Regional Carbon Intensity', value: '2.8', unit: 'kg CO₂/kWh' },
      { name: 'Captive Power Emission Factor', value: '0.85', unit: 'kg CO₂/kWh' },
      { name: 'Renewable Penetration', value: '22%' }
    ],
    waterScarcity: [
      { name: 'Water Stress Impact', value: 'High' },
      { name: 'Groundwater Depletion', value: '0.65' },
      { name: 'Seasonal Water Risk', value: 'Moderate' }
    ],
    landBiodiversity: [
      { name: 'Forest Diversion Impact', value: 'Significant' },
      { name: 'Biodiversity Risk', value: 'High' },
      { name: 'Rehabilitation Index', value: '0.45' }
    ],
    socioEconomic: [
      { name: 'Employment Intensity', value: '0.8' },
      { name: 'Community Benefit Index', value: '0.65' },
      { name: 'Health Impact', value: 'Moderate' }
    ],
    recyclingCircularity: [
      { name: 'Recycled Content Share', value: '32%' },
      { name: 'Informal Recycling Impact', value: 'High' },
      { name: 'MCI Score', value: '0.68' },
      { name: 'Recycling Credits', value: '12' }
    ],
    policyCompliance: [
      { name: 'EPR Compliance', value: '78%' },
      { name: 'Carbon Market Readiness', value: 'Medium' },
      { name: 'RPO Fulfillment', value: '65%' }
    ],
    logisticsTransport: [
      { name: 'Freight Carbon Footprint', value: '0.12', unit: 'kg CO₂/ton-km' },
      { name: 'Modal Shift Potential', value: 'High' }
    ]
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  // Function to handle back navigation
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">India-Specific LCA Report</h1>
          <p className="text-muted-foreground">Comprehensive Life Cycle Analysis for Talcher Coal Fields</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="conventional" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conventional">
            <Activity className="mr-2 h-4 w-4" />
            Conventional
          </TabsTrigger>
          <TabsTrigger value="circularity">
            <Recycle className="mr-2 h-4 w-4" />
            Circularity
          </TabsTrigger>
          <TabsTrigger value="waste">
            <Trash2 className="mr-2 h-4 w-4" />
            Waste Analysis
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <BarChart className="mr-2 h-4 w-4" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="regional">
            <MapPin className="mr-2 h-4 w-4" />
            Regional Impact
          </TabsTrigger>
        </TabsList>

        {/* Conventional Tab */}
        <TabsContent value="conventional">
          <Card>
            <CardHeader>
              <CardTitle>Conventional Impact Assessment</CardTitle>
              <CardDescription>Environmental impact metrics for conventional production methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {conventionalData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                    <div className="mt-1 text-xl font-semibold">
                      {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Circularity Tab */}
        <TabsContent value="circularity">
          <Card>
            <CardHeader>
              <CardTitle>Circularity Metrics</CardTitle>
              <CardDescription>Circular economy performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {circularityData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                    <div className="mt-1 text-xl font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Waste Analysis Tab */}
        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle>Waste Analysis</CardTitle>
              <CardDescription>Detailed waste composition and management insights</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Waste Composition</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Waste Management Recommendations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Implement source segregation to improve recycling rates by 30%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Partner with certified e-waste recyclers for proper disposal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Introduce on-site composting for organic waste</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Conduct waste audit quarterly to monitor progress</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Conventional vs Sustainable Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of production methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conventional" fill="#8884d8" name="Conventional" />
                    <Bar dataKey="sustainable" fill="#82ca9d" name="Sustainable" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Impact Tab */}
        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Regional Impact Analysis</CardTitle>
              <CardDescription>Location-specific environmental and social impacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Energy & Climate */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  Energy & Climate
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {regionalImpactData.energyClimate.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water & Regional Scarcity */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Droplets className="mr-2 h-5 w-5 text-blue-500" />
                  Water & Regional Scarcity
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {regionalImpactData.waterScarcity.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Land & Biodiversity */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <LandPlot className="mr-2 h-5 w-5 text-green-600" />
                  Land & Biodiversity
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {regionalImpactData.landBiodiversity.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socio-Economic */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-500" />
                  Socio-Economic Factors
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {regionalImpactData.socioEconomic.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recycling & Circularity */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Recycle className="mr-2 h-5 w-5 text-teal-500" />
                  Recycling & Circularity
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {regionalImpactData.recyclingCircularity.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy & Compliance */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-amber-500" />
                  Policy & Compliance
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {regionalImpactData.policyCompliance.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistics & Transport */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-gray-500" />
                  Logistics & Transport
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {regionalImpactData.logisticsTransport.map((item, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                      <div className="mt-1 text-xl font-semibold">
                        {item.value} {item.unit && <span className="text-sm text-muted-foreground">{item.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
