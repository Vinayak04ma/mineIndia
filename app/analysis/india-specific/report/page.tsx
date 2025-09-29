'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import dynamic from 'next/dynamic';
import { 
  Bar, LineChart, Line, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

type Metric = {
  name: string
  value: string
  unit: string
}

// Import the client-side charts
const PieChart = dynamic(
  () => import('@/components/charts/PieChartWrapper'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-64 flex items-center justify-center">Loading chart...</div>
  }
);

// Timeline data
const timelineData = [
  { year: '2023', impact: 100, target: 90 },
  { year: '2024', impact: 90, target: 75 },
  { year: '2025', impact: 75, target: 60 },
  { year: '2026', impact: 60, target: 45 },
  { year: '2027', impact: 45, target: 30 },
];

const BarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart),
  { 
    ssr: false,
    loading: () => <div className="w-full h-64 flex items-center justify-center">Loading chart...</div>
  }
);
import { Download, Leaf, Recycle, Factory, Trash2, Activity, Zap, Droplets, LandPlot, Users, FileText, Truck, MapPin, GitCompare, RefreshCw, BarChart2 } from "lucide-react"

export default function IndiaLCAResults() {
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

  const circularProgressMetrics = [
    { name: 'Material Circularity', value: '42', unit: '%' },
    { name: 'Energy Recovery', value: '65', unit: '%' },
    { name: 'Recycling Rate', value: '78', unit: '%' },
  ];

  // Data for radar chart
  const radarData = [
    { subject: 'Carbon', A: 85, B: 45, fullMark: 100 },
    { subject: 'Water', A: 75, B: 35, fullMark: 100 },
    { subject: 'Energy', A: 90, B: 40, fullMark: 100 },
    { subject: 'Waste', A: 80, B: 30, fullMark: 100 },
    { subject: 'Materials', A: 70, B: 40, fullMark: 100 },
    { subject: 'Circularity', A: 40, B: 80, fullMark: 100 },
  ];

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

  const wasteData: Array<{ name: string; value: number; description?: string }> = [
    { 
      name: 'Hazardous Waste', 
      value: 15,
      description: 'Includes lead-acid batteries, mercury-containing waste, and chemical byproducts' 
    },
    { 
      name: 'Inert Waste', 
      value: 35,
      description: 'Includes rock waste, overburden, and tailings from mining operations'
    },
    { 
      name: 'Recyclable Materials', 
      value: 25,
      description: 'Includes scrap metal, paper, plastics, and glass that can be recycled'
    },
    { 
      name: 'Organic Waste', 
      value: 15,
      description: 'Includes food waste, green waste, and other biodegradable materials'
    },
    { 
      name: 'E-waste', 
      value: 10,
      description: 'Includes discarded electrical and electronic equipment'
    }
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

  interface WasteItem {
    name: string;
    value: number;
    description: string;
  }

  // Data for the pie chart (only name and value)
  const wasteCompositionData = [
    { name: 'Hazardous Waste', value: 15 },
    { name: 'Inert Waste', value: 35 },
    { name: 'Recyclable Materials', value: 25 },
    { name: 'Organic Waste', value: 15 },
    { name: 'E-waste', value: 10 }
  ];

  // Extended data for the table view
  const wasteComposition: WasteItem[] = [
    { 
      name: 'Hazardous Waste', 
      value: 15,
      description: 'Includes lead-acid batteries, mercury-containing waste, and chemical byproducts' 
    },
    { 
      name: 'Inert Waste', 
      value: 35,
      description: 'Includes rock waste, overburden, and tailings from mining operations'
    },
    { 
      name: 'Recyclable Materials', 
      value: 25,
      description: 'Includes scrap metal, paper, plastics, and glass that can be recycled'
    },
    { 
      name: 'Organic Waste', 
      value: 15,
      description: 'Includes food waste, green waste, and other biodegradable materials'
    },
    { 
      name: 'E-waste', 
      value: 10,
      description: 'Includes discarded electrical and electronic equipment'
    }
  ]

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

      <Tabs defaultValue="conventional" className="w-full">
        <TabsList className="grid w-full h-14 grid-cols-5 gap-2 p-1.5 rounded-xl bg-muted/50 mb-8 shadow-sm">
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
          <TabsTrigger 
            value="regional" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:shadow-primary/10 data-[state=active]:border data-[state=active]:border-primary/10 hover:bg-muted/30"
          >
            <GitCompare className="h-4 w-4 text-primary" />
            <span className="font-medium">Regional Impact</span>
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
                 <CardContent className="space-y-8">
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                       <span className="h-1 w-6 bg-primary/70 mr-2 rounded-full"></span>
                       Waste Generation Summary
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
                   
                   {/* START: MODIFIED SECTION */}
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary/90 flex items-center">
                       <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                       Waste Composition
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                       {/* Left Column: Descriptive Blocks */}
                       <div className="space-y-4">
                         {wasteComposition.map((item, index) => (
                           <div key={index} className="p-4 rounded-lg border bg-muted/20">
                             <h4 className="font-semibold text-primary mb-1">{item.name} ({item.value}%)</h4>
                             <p className="text-sm text-muted-foreground">
                               {item.description}
                             </p>
                           </div>
                         ))}
                       </div>
     
                       {/* Right Column: Pie Chart */}
                       <div className="h-80 w-full">
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
                               nameKey="name"
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
                   </div>
                   {/* END: MODIFIED SECTION */}
     
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

        {/* Regional Impact Tab */}
        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>
              <h4 className="text-xl font-semibold mb-4 text-foreground/90 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                <span className="h-1 w-8 bg-primary/70 mr-2 rounded-full"></span>
                Regional Impact Analysis
              </h4>
              </CardTitle>
              <CardDescription>Location-specific environmental and social impacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Energy & Climate */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
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
