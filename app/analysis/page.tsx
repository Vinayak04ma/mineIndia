"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, FileText, MapPin, Settings, Zap } from "lucide-react"

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Zap className="mr-2 h-4 w-4" />
              AI-Powered Analysis
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Life Cycle Assessment Analysis</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Choose your analysis method to get started with AI-powered LCA calculations
            </p>
          </div>

          {/* Analysis Options */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/analysis/manual">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    Manual Material Selection
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    Select materials manually and input your own process parameters for customized LCA analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Custom material selection
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Manual parameter input
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      AI parameter estimation for missing data
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                      Document upload & AI extraction
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/analysis/india-specific">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    India-Specific Mine Data
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    Use location-based data from Indian mines and ore deposits for region-specific analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Interactive mine mapping
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      GPS-based location data
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Regional environmental conditions
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                      Ore-specific processing data
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Features Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                What You'll Get
              </CardTitle>
              <CardDescription>Comprehensive analysis results powered by advanced AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Analysis Reports</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Conventional method analysis</li>
                    <li>• Sustainable method recommendations</li>
                    <li>• Detailed environmental impact assessment</li>
                    <li>• Circularity optimization suggestions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">AI Capabilities</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Automatic parameter estimation</li>
                    <li>• Document data extraction</li>
                    <li>• Waste generation analysis</li>
                    <li>• Resource efficiency optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
