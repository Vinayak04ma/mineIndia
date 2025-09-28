"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ResearchResourcesPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Research & Resources</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive collection of research papers, standards, and resources on sustainable mining and material lifecycle
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Circular Economy in Mining</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Explore the principles and applications of circular economy in earth and planetary sciences.
              </p>
              <a 
                href="https://www.sciencedirect.com/topics/earth-and-planetary-sciences/circular-economy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on ScienceDirect →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Cradle to Cradle Certification</h3>
                <p className="text-sm text-muted-foreground mb-2">A globally recognized measure of safer, more sustainable products made for the circular economy.</p>
                <a 
                  href="https://venturewell.org/tools_for_design/measuring-sustainability/cradle-to-cradle/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Learn more about Cradle to Cradle →
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">EPEAT Certification</h3>
                <p className="text-sm text-muted-foreground mb-2">The definitive global registry for greener electronics and other products.</p>
                <a 
                  href="https://www.epeat.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Visit EPEAT →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Life Cycle Assessment (LCA) Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">ISO 14040</h3>
                <p className="text-sm text-muted-foreground mb-2">International standard for Life Cycle Assessment principles and framework.</p>
                <a 
                  href="https://www.iso.org/obp/ui/en/#iso:std:iso:14040:ed-2:v1:en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View ISO 14040 Standard →
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">LCA Stages</h3>
                <p className="text-sm text-muted-foreground mb-2">Comprehensive research on Life Cycle Assessment stages and methodologies.</p>
                <a 
                  href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0101298#pone.0101298-Classen1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read Research Paper →
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">LCA Reference Tables</h3>
                <p className="text-sm text-muted-foreground mb-2">Comprehensive LCA reference tables for various materials and processes.</p>
                <a 
                  href="https://venturewell.org/wp-content/uploads/Ecolizer-2.0-LCA-tables.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Download LCA Tables (PDF) →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mining & Metallurgy Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Metal Recycling Potential</h3>
                <p className="text-sm text-muted-foreground mb-2">Latest research on the potential and challenges of metal recycling.</p>
                <a 
                  href="https://www.mattech-journal.org/articles/mattech/full_html/2024/05/mt20240007/mt20240007.html#S1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Research Article →
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Metallurgical Waste Management</h3>
                <p className="text-sm text-muted-foreground mb-2">Sustainable approaches to metallurgical waste processing and utilization.</p>
                <a 
                  href="https://www.mdpi.com/2071-1050/14/9/5488" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read Full Paper →
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Design & Waste Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Whole Systems Mapping</h3>
                <p className="text-sm text-muted-foreground mb-2">Tools and methodologies for comprehensive system design and analysis.</p>
                <a 
                  href="https://venturewell.org/tools_for_design/whole-systems-mapping/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Explore System Mapping Tools →
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Mineral Processing Wastes</h3>
                <p className="text-sm text-muted-foreground mb-2">Research and resources on sustainable mineral waste processing.</p>
                <a 
                  href="https://rmrc.wisc.edu/mineral-processing-wastes/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Learn about Waste Processing →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>All external links open in a new tab. The content is provided for informational purposes only.</p>
        </div>
      </div>
    </div>
  )
}
