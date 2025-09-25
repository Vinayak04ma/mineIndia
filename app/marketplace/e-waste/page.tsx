"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Upload, Zap, DollarSign, Leaf, Smartphone, Laptop, Tablet } from "lucide-react"
import Link from "next/link"

export default function EWasteServicePage() {
  const [uploadedImage, setUploadedImage] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleImageUpload = () => {
    setUploadedImage(true)
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const detectedDevices = [
    { type: "Smartphone", count: 3, model: "Various Android/iPhone", confidence: 95 },
    { type: "Laptop", count: 1, model: "Dell Latitude", confidence: 92 },
    { type: "Tablet", count: 2, model: "iPad/Android Tablet", confidence: 88 },
    { type: "Circuit Boards", count: 5, model: "Mixed PCBs", confidence: 97 },
  ]

  const preciousMetals = [
    { metal: "Gold", amount: "2.3g", value: "₹14,720", percentage: 35 },
    { metal: "Silver", amount: "18.7g", value: "₹1,496", percentage: 15 },
    { metal: "Copper", amount: "245g", value: "₹2,205", percentage: 25 },
    { metal: "Palladium", amount: "0.8g", value: "₹3,840", percentage: 20 },
    { metal: "Rare Earth", amount: "12g", value: "₹960", percentage: 5 },
  ]

  const hazardElements = [
    { 
      name: "Lead (Pb)", 
      source: "Solder, CRT glass, batteries", 
      risk: "High",
      amount: "1.2g",
      healthImpact: "Neurological damage, kidney failure"
    },
    { 
      name: "Mercury (Hg)", 
      source: "Switches, flat screens", 
      risk: "Critical",
      amount: "0.15g",
      healthImpact: "Brain and kidney damage"
    },
    { 
      name: "Cadmium (Cd)", 
      source: "Batteries, chip resistors", 
      risk: "High",
      amount: "0.05g",
      healthImpact: "Lung damage, kidney disease"
    },
    { 
      name: "Beryllium (Be)", 
      source: "Motherboards, connectors", 
      risk: "Medium",
      amount: "0.02g",
      healthImpact: "Lung cancer, chronic beryllium disease"
    },
    { 
      name: "Brominated Flame Retardants (BFRs)", 
      source: "Plastic casings, circuit boards", 
      risk: "Medium",
      amount: "4.5g",
      healthImpact: "Hormone disruption, developmental issues"
    },
    { 
      name: "Hexavalent Chromium (Cr-VI)", 
      source: "Metal coatings", 
      risk: "High",
      amount: "0.3g",
      healthImpact: "DNA damage, lung cancer"
    }
  ]

  const totalValue = preciousMetals.reduce(
    (sum, metal) => sum + Number.parseInt(metal.value.replace("₹", "").replace(",", "")),
    0,
  )

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
              <h1 className="text-3xl font-bold">E-Waste Analysis Service</h1>
              <p className="text-muted-foreground">AI-powered device identification and value estimation</p>
            </div>
          </div>

          {!uploadedImage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Upload E-Waste Image
                </CardTitle>
                <CardDescription>Upload a clear image of your electronic waste for AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
                  <h3 className="text-xl font-semibold mb-2">Drop your e-waste image here</h3>
                  <p className="text-muted-foreground mb-6">Supported formats: JPG, PNG, WEBP (Max 10MB)</p>
                  <Button size="lg" onClick={handleImageUpload}>
                    <Camera className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary mb-2" />
                    <h4 className="font-semibold text-primary">AI Detection</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identifies devices, components, and materials automatically
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10">
                    <DollarSign className="h-6 w-6 text-accent mb-2" />
                    <h4 className="font-semibold text-accent">Value Estimation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Calculates precious metal content and market value
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <Leaf className="h-6 w-6 text-secondary mb-2" />
                    <h4 className="font-semibold text-secondary">Impact Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">Environmental benefits of proper recycling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadedImage && analyzing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 animate-pulse text-primary" />
                  Analyzing E-Waste Image
                </CardTitle>
                <CardDescription>AI is processing your image and identifying devices...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center py-8">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Device Detection</span>
                      <span className="text-sm font-medium">Processing...</span>
                    </div>
                    <Progress value={75} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Material Analysis</span>
                      <span className="text-sm font-medium">In Progress...</span>
                    </div>
                    <Progress value={45} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Value Calculation</span>
                      <span className="text-sm font-medium">Pending...</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {analysisComplete && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-primary" />
                      Analysis Complete
                    </span>
                    <Badge className="bg-accent text-accent-foreground">
                      Total Value: ₹{totalValue.toLocaleString()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    AI has successfully identified devices and calculated precious metal content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Detected Devices</h4>
                      {detectedDevices.map((device, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center">
                            {device.type === "Smartphone" && <Smartphone className="h-5 w-5 text-primary mr-3" />}
                            {device.type === "Laptop" && <Laptop className="h-5 w-5 text-primary mr-3" />}
                            {device.type === "Tablet" && <Tablet className="h-5 w-5 text-primary mr-3" />}
                            {device.type === "Circuit Boards" && (
                              <div className="h-5 w-5 bg-primary rounded mr-3"></div>
                            )}
                            <div>
                              <p className="font-medium">
                                {device.count}x {device.type}
                              </p>
                              <p className="text-sm text-muted-foreground">{device.model}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{device.confidence}% confidence</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Precious Metal Content</h4>
                      {preciousMetals.map((metal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{metal.metal}</span>
                            <span className="font-medium">
                              {metal.amount} • {metal.value}
                            </span>
                          </div>
                          <Progress value={metal.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="breakdown" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="breakdown">Value Breakdown</TabsTrigger>
                  <TabsTrigger value="hazards">Hazards</TabsTrigger>
                  <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="breakdown">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Value Analysis</CardTitle>
                      <CardDescription>Market-based pricing for recovered materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="font-semibold mb-3">Current Market Prices</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Gold (per gram)</span>
                                <span className="font-medium">₹6,400</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Silver (per gram)</span>
                                <span className="font-medium">₹80</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Copper (per gram)</span>
                                <span className="font-medium">₹9</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Palladium (per gram)</span>
                                <span className="font-medium">₹4,800</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Recovery Efficiency</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Gold Recovery</span>
                                <span className="font-medium">85-95%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Silver Recovery</span>
                                <span className="font-medium">80-90%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Copper Recovery</span>
                                <span className="font-medium">90-95%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Processing Cost</span>
                                <span className="font-medium">15-20%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-accent/10">
                          <h4 className="font-semibold text-accent mb-2">Net Recovery Value</h4>
                          <p className="text-2xl font-bold text-accent">₹{(totalValue * 0.8).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            After processing costs and recovery efficiency
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="environmental">
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Impact</CardTitle>
                      <CardDescription>Benefits of proper e-waste recycling</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-4">Avoided Environmental Impact</h4>
                          <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">CO₂ Emissions Avoided</span>
                                <span className="text-lg font-bold text-primary">45.2 kg</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Compared to primary metal extraction</p>
                            </div>
                            <div className="p-3 rounded-lg bg-accent/10">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Water Saved</span>
                                <span className="text-lg font-bold text-accent">1,247 L</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Mining and processing water usage</p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/10">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Energy Saved</span>
                                <span className="text-lg font-bold text-secondary">234 kWh</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Equivalent to 3 months of household use</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4">Circular Economy Benefits</h4>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                              <span>Reduces need for virgin material extraction</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                              <span>Prevents toxic materials from landfills</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                              <span>Creates jobs in recycling industry</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                              <span>Supports sustainable manufacturing</span>
                            </div>
                          </div>

                          <div className="mt-6 p-4 rounded-lg bg-muted/50">
                            <h5 className="font-semibold mb-2">Sustainability Score</h5>
                            <div className="flex items-center">
                              <Progress value={87} className="flex-1 mr-3" />
                              <span className="text-lg font-bold text-accent">87/100</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Based on material recovery and environmental impact
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recycling Recommendations</CardTitle>
                      <CardDescription>
                        Optimize your e-waste processing for maximum value and sustainability
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="p-4 rounded-lg border">
                            <h4 className="font-semibold text-primary mb-2">Immediate Actions</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Separate circuit boards for specialized processing</li>
                              <li>• Remove batteries safely before recycling</li>
                              <li>• Clean devices to improve recovery rates</li>
                              <li>• Sort by device type for batch processing</li>
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg border">
                            <h4 className="font-semibold text-accent mb-2">Processing Partners</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Certified e-waste recyclers in your area</li>
                              <li>• Precious metal refineries for high-value items</li>
                              <li>• Component recovery specialists</li>
                              <li>• Sustainable disposal for non-recoverable parts</li>
                            </ul>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-primary/10">
                          <h4 className="font-semibold text-primary mb-2">Maximize Value</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Based on your e-waste composition, here are the best strategies:
                          </p>
                          <div className="grid gap-3 md:grid-cols-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">+25%</div>
                              <p className="text-xs text-muted-foreground">Value increase with proper sorting</p>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">+15%</div>
                              <p className="text-xs text-muted-foreground">Recovery rate with cleaning</p>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">+30%</div>
                              <p className="text-xs text-muted-foreground">Environmental benefit optimization</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button className="flex-1">Find Recycling Partners</Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="hazards">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Hazardous Elements</CardTitle>
                          <CardDescription>Potentially dangerous substances detected in your e-waste</CardDescription>
                        </div>
                        <Badge variant="destructive" className="px-3 py-1">
                          Handle with Care
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-6 text-sm font-medium text-muted-foreground pb-2 border-b">
                          <div>Element</div>
                          <div>Source</div>
                          <div>Risk Level</div>
                          <div>Amount</div>
                          <div className="col-span-2">Health Impact</div>
                        </div>
                        {hazardElements.map((element, index) => (
                          <div key={index} className="grid grid-cols-6 items-center text-sm">
                            <div className="font-medium">{element.name}</div>
                            <div className="text-muted-foreground">{element.source}</div>
                            <div>
                              <Badge 
                                variant={
                                  element.risk === 'Critical' ? 'destructive' : 
                                  element.risk === 'High' ? 'default' : 'secondary'
                                }
                                className={
                                  element.risk === 'Critical' ? 'bg-red-600' :
                                  element.risk === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                                }
                              >
                                {element.risk}
                              </Badge>
                            </div>
                            <div>{element.amount}</div>
                            <div className="col-span-2 text-muted-foreground">{element.healthImpact}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex">
                          <svg className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Safety Notice</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              This e-waste contains hazardous materials. Please handle with appropriate protective equipment and dispose of at authorized e-waste recycling facilities only.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
