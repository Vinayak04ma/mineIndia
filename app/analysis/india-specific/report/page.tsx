"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer, BarChart2, RefreshCw, Trash2, GitCompare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

type Metric = {
  name: string
  value: string
  unit: string
}

type ChartData = {
  name: string
  conventional: number
  sustainable: number
}

export default function AnalysisReportPage() {
  // Sample data - in a real app, this would come from your API
  const conventionalMetrics: Metric[] = [
    { name: "Global Warming Potential", value: "2.5", unit: "kg CO₂-eq" },
    { name: "Acidification Potential", value: "0.5", unit: "kg SO₂-eq" },
    { name: "Photochemical Ozone Creation", value: "0.3", unit: "kg C₂H₄-eq" },
    { name: "Particulate Matter Formation", value: "0.15", unit: "kg PM₂.₅-eq" },
    { name: "Ozone Depletion Potential", value: "0.002", unit: "kg CFC-11-eq" },
    { name: "Eutrophication Potential", value: "0.4", unit: "kg PO₄³⁻-eq" },
    { name: "Freshwater Ecotoxicity", value: "1.2", unit: "kg 1,4-DCB-eq" },
    { name: "Marine Ecotoxicity", value: "0.8", unit: "kg 1,4-DCB-eq" },
    { name: "Water Scarcity", value: "5.2", unit: "m³ water-eq" },
    { name: "Human Toxicity Potential", value: "2.1", unit: "kg 1,4-DCB-eq" },
    { name: "Respiratory Inorganics", value: "0.0005", unit: "DALYs" },
    { name: "Mineral Resource Depletion", value: "0.03", unit: "kg Sb-eq" },
    { name: "Fossil Fuel Depletion", value: "45", unit: "MJ" },
    { name: "Water Depletion", value: "3.8", unit: "m³-eq" },
    { name: "Land Use Impact", value: "0.12", unit: "ha·year" },
  ]

  const circularityMetrics: Metric[] = [
    { name: "Recycled content", value: "35", unit: "%" },
    { name: "Virgin material input", value: "65", unit: "%" },
    { name: "Recyclability at EOL", value: "78", unit: "%" },
    { name: "Circular Recovery Rate", value: "62", unit: "%" },
    { name: "Recycled Output Ratio", value: "45", unit: "%" },
    { name: "Down/up-cycling quality", value: "0.8", unit: "factor" },
    { name: "Energy saved by recycling", value: "1200", unit: "MJ/t" },
    { name: "CO₂ avoided", value: "1.8", unit: "t CO₂e/t" },
    { name: "Closed-loop recycling rate", value: "28", unit: "%" },
    { name: "Landfilling ratio", value: "12", unit: "%" },
    { name: "Linear Flow Index", value: "0.65", unit: "" },
    { name: "Material Circularity Indicator", value: "0.42", unit: "" },
    { name: "Circular CO₂ benefit", value: "-1.2", unit: "t CO₂e/t" },
    { name: "Recycling efficiency", value: "82", unit: "%" },
  ]

  const wasteComposition = [
    { name: "Mineral waste", value: 45 },
    { name: "Metal scraps", value: 25 },
    { name: "Chemicals", value: 15 },
    { name: "Packaging", value: 10 },
    { name: "Other", value: 5 },
  ]

  const comparisonData: ChartData[] = [
    { name: "Resource Sourcing", conventional: 85, sustainable: 45 },
    { name: "Material Flow", conventional: 75, sustainable: 35 },
    { name: "Energy Usage", conventional: 90, sustainable: 40 },
    { name: "Waste Generation", conventional: 80, sustainable: 30 },
    { name: "Environmental Impact", conventional: 85, sustainable: 35 },
    { name: "Economic Model", conventional: 70, sustainable: 40 },
    { name: "Product Lifetime", conventional: 60, sustainable: 85 },
    { name: "Material Circularity", conventional: 40, sustainable: 80 },
    { name: "Supply Chain Dependence", conventional: 75, sustainable: 40 },
    { name: "End-of-Life Strategy", conventional: 30, sustainable: 85 },
  ]

  // Data for radar chart
  const radarData = [
    { subject: 'Carbon', A: 85, B: 45, fullMark: 100 },
    { subject: 'Water', A: 75, B: 35, fullMark: 100 },
    { subject: 'Energy', A: 90, B: 40, fullMark: 100 },
    { subject: 'Waste', A: 80, B: 30, fullMark: 100 },
    { subject: 'Materials', A: 70, B: 40, fullMark: 100 },
    { subject: 'Circularity', A: 40, B: 80, fullMark: 100 },
  ];
  
  // Timeline data
  const timelineData = [
    { year: '2023', impact: 100, target: 90 },
    { year: '2024', impact: 90, target: 75 },
    { year: '2025', impact: 75, target: 60 },
    { year: '2026', impact: 60, target: 45 },
    { year: '2027', impact: 45, target: 30 },
  ];
  
  // **FIXED**: Renamed this constant to `circularProgressMetrics` to avoid conflict with the `circularityMetrics: Metric[]` array defined earlier.
  const circularProgressMetrics = [
    { name: 'Material Circularity', value: '42', unit: '%' },
    { name: 'Energy Recovery', value: '65', unit: '%' },
    { name: 'Recycling Rate', value: '78', unit: '%' },
  ];

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading report...")
  }

  const handlePrint = () => {
    window.print()
  }

  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            LCA Analysis Report
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="conventional" className="w-full">
        <TabsList className="grid w-full h-14 grid-cols-4 gap-2 p-1.5 rounded-xl bg-muted/50 mb-8 shadow-sm">
          <TabsTrigger 
            value="conventional" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-primary/10 hover:bg-muted/30"
          >
            <BarChart2 className="h-4 w-4 text-primary" />
            <span className="font-medium">Conventional</span>
          </TabsTrigger>
          <TabsTrigger 
            value="circularity" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-primary/10 hover:bg-muted/30"
          >
            <RefreshCw className="h-4 w-4 text-primary" />
            <span className="font-medium">Circularity</span>
          </TabsTrigger>
          <TabsTrigger 
            value="waste" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-primary/10 hover:bg-muted/30"
          >
            <Trash2 className="h-4 w-4 text-primary" />
            <span className="font-medium">Waste</span>
          </TabsTrigger>
          <TabsTrigger 
            value="comparison" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-primary/10 hover:bg-muted/30"
          >
            <GitCompare className="h-4 w-4 text-primary" />
            <span className="font-medium">Compare</span>
          </TabsTrigger>
        </TabsList>

        {/* Section 1: Conventional */}
        <TabsContent value="conventional">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">Conventional LCA Metrics</CardTitle>
              <CardDescription className="text-base">
                Environmental impact metrics for conventional production methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {conventionalMetrics.map((metric, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                    <p className="text-xl font-bold">
                      {metric.value} <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 2: Circularity */}
        <TabsContent value="circularity">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">Circularity Metrics</CardTitle>
              <CardDescription className="text-base">
                Indicators of material circularity and resource efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* **FIXED**: Using the corrected `circularProgressMetrics` constant here */}
                  {circularProgressMetrics.map((metric, index) => (
                    <div key={`metric-${index}`} className="border rounded-lg p-4 bg-gradient-to-br from-background to-muted/10">
                      <div className="flex flex-col items-center justify-center h-40">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2 text-center">
                          {metric.name}
                        </h3>
                        <div className="relative w-24 h-24">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                              className="text-gray-200"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="45"
                              cx="50"
                              cy="50"
                            />
                            {/* Progress circle */}
                            <circle
                              className="text-primary"
                              strokeWidth="10"
                              strokeDasharray={`${(parseFloat(metric.value) / 100) * 2 * Math.PI * 45}, ${2 * Math.PI * 45}`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="45"
                              cx="50"
                              cy="50"
                              transform="rotate(-90 50 50)"
                            />
                            <text x="50" y="52" fontFamily="Verdana" fontSize="20" textAnchor="middle" alignmentBaseline="middle" className="font-bold fill-current text-foreground">
                              {metric.value}{metric.unit}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                    <span className="h-1 w-6 bg-primary/70 mr-2 rounded-full"></span>
                    Circular Performance Radar
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Conventional"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Sustainable"
                          dataKey="B"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.6}
                        />
                        <Legend />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                    <span className="h-1 w-6 bg-primary/70 mr-2 rounded-full"></span>
                    Detailed Circularity Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {circularityMetrics.map((metric, index) => (
                      <div key={index} className="rounded-lg border p-4 hover:bg-accent/10 transition-colors">
                        <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                        <p className="text-xl font-bold">
                          {metric.value} <span className="text-sm text-muted-foreground">{metric.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 3: Waste Analysis */}
        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">Waste Analysis</CardTitle>
              <CardDescription className="text-base">
                Comprehensive waste generation and management analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                  <span className="h-1 w-6 bg-primary/70 mr-2 rounded-full"></span>
                  Waste Generation Analysis
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Waste Generated</h4>
                    <p className="text-2xl font-bold">1,250 t/yr</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Hazardous Waste</h4>
                    <p className="text-2xl font-bold">15%</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Recycling Rate</h4>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                </div>
              </div>

              <div>
              <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                  Waste Composition
              </h3>
                <div className="h-86 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteComposition}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteComposition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
              <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                  Waste Management Recommendations
              </h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">1. Implement Waste Segregation</h4>
                    <p className="text-sm text-muted-foreground">
                      Separate waste at source to improve recycling rates and reduce contamination.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">2. Explore Waste-to-Energy Options</h4>
                    <p className="text-sm text-muted-foreground">
                      Convert non-recyclable waste into energy through incineration or gasification.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">3. Optimize Material Use</h4>
                    <p className="text-sm text-muted-foreground">
                      Redesign processes to minimize material waste during production.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 4: Comparison */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Conventional vs Sustainable Methods
              </CardTitle>
              <CardDescription className="text-base mt-2 text-muted-foreground">
                Comparative analysis of environmental impact across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-12">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-foreground/90 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                    Environmental Impact Comparison
                  </h4>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          scale="band" 
                          width={150}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="conventional" fill="#8884d8" name="Conventional" />
                        <Bar dataKey="sustainable" fill="#82ca9d" name="Sustainable" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="pt-8">
                  <h4 className="text-xl font-semibold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    Improvement Potential Analysis
                  </h4>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={comparisonData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          interval={0}
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={data => Math.round((1 - data.sustainable / data.conventional) * 100)}
                          name="Improvement %"
                          stroke="#ff7300"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          unit="%"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                    <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                    Impact Reduction Timeline
                  </h3>
                  <div className="h-88 py-4 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'Impact Score', angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="impact"
                          name="Actual Impact"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Impact"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="space-y-6 pt-8 ">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                      <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                      Key Findings
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Carbon Footprint Reduction</h4>
                        <p className="text-2xl font-bold text-green-600">45%</p>
                        <p className="text-sm text-muted-foreground">Potential reduction with sustainable methods</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Material Efficiency</h4>
                        <p className="text-2xl font-bold text-green-600">+35%</p>
                        <p className="text-sm text-muted-foreground">Improvement in material utilization</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                      <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                      Detailed Comparison
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-medium">Parameter</th>
                            <th className="text-right p-3 font-medium">Conventional</th>
                            <th className="text-right p-3 font-medium">Sustainable</th>
                            <th className="text-right p-3 font-medium">Improvement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3 font-medium">{item.name}</td>
                              <td className="text-right p-3">{item.conventional}</td>
                              <td className="text-right p-3">{item.sustainable}</td>
                              <td className="text-right p-3">
                                <span className="font-semibold text-green-600">
                                  {Math.round((1 - item.sustainable / item.conventional) * 100)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}