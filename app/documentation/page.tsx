"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

// Component for individual endpoint rows
function EndpointRow({ method, path, description }: { method: string; path: string; description: string }) {
  const methodColors: { [key: string]: string } = {
    GET: 'bg-green-100 text-green-800',
    POST: 'bg-blue-100 text-blue-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800',
    PATCH: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-muted/5 transition-colors">
      <div className="flex items-center space-x-4">
        <span className={`px-2 py-1 text-xs font-mono rounded ${methodColors[method] || 'bg-gray-100 text-gray-800'}`}>
          {method}
        </span>
        <code className="text-sm font-mono text-muted-foreground">{path}</code>
      </div>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  );
}

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'technical-stack', title: 'Technical Stack' },
    { id: 'system-architecture', title: 'System Architecture' },
    { id: 'user-workflow', title: 'User Workflow' },
    { id: 'core-features', title: 'Core Features' },
    { id: 'data-model', title: 'Data Model' },
    { id: 'api-endpoints', title: 'API Endpoints' },
    { id: 'data-sources-privacy', title: 'Data Sources & Privacy' },
    { id: 'deployment', title: 'Deployment' },
    { id: 'limitations-disclaimers', title: 'Limitations & Disclaimers' },
    { id: 'future-enhancements', title: 'Future Enhancements' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r bg-muted/10 hidden md:flex flex-col fixed h-screen">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Documentation</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t">
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto md:ml-64">
        <div className="md:hidden mb-8 pt-4">
          <select 
            onChange={(e) => scrollToSection(e.target.value)}
            value={activeSection}
            className="w-full p-2 border rounded-md bg-background"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-8">MineCare - LCA Tool for Mineral Documentation</h1>
        
        <div id="introduction" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to MineCare, a platform designed to support the mining and materials industry with Life Cycle Assessment (LCA) tools and sustainability analysis. Our platform enables organizations to conduct preliminary environmental assessments, visualize material flows, and explore circular economy opportunities through data-driven analysis.
          </p>
          <p className="mb-4">
            The platform provides tools for global LCA analysis across various minerals, region-specific assessments for Indian mining operations, interactive process modeling through our Whiteboard feature, and a marketplace for industrial materials trading and e-waste assessment.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <p className="text-yellow-700">
              <strong>Note:</strong> All LCA analyses and environmental impact assessments provided by MineCare are indicative and for informational purposes only. Results should not be used as substitutes for formal regulatory compliance documentation or peer-reviewed scientific studies.
            </p>
          </div>
        </div>

        {/* Additional sections would be added here with the same pattern */}
        <div id="technical-stack" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-4">Technical Stack</h2>
          <h3 className="text-xl font-medium mb-3">Frontend</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Framework:</strong> Next.js 14 (App Router, Server Components)</li>
            <li><strong>Language:</strong> TypeScript (strict typing)</li>
            <li><strong>Styling:</strong> Tailwind CSS + Custom Design System</li>
            <li><strong>State Management:</strong> Zustand (global state) + React Query (server state)</li>
            <li><strong>Animations:</strong> Framer Motion (smooth transitions)</li>
            <li><strong>Visualization:</strong> React Flow (process modeling), Recharts (charts & graphs)</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3">Backend</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Core API:</strong> FastAPI (Python-based backend)</li>
            <li><strong>Authentication:</strong> JWT-based authentication with OAuth2 support</li>
            <li><strong>Data Processing:</strong> Pandas, NumPy, Scikit-learn</li>
            <li><strong>Search Engine:</strong> Elasticsearch (marketplace search, autocomplete)</li>
            <li><strong>Task Queue:</strong> Celery + Redis (background processing)</li>
            <li><strong>LCA Engine:</strong> Brightway2 (environmental impact calculations)</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 mt-8">Database and Storage</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Primary Database:</strong> PostgreSQL + PostGIS (geospatial data for mining locations)</li>
            <li><strong>Search Database:</strong> Elasticsearch (marketplace search and material catalogs)</li>
            <li><strong>Media Storage:</strong> Cloudinary (user uploads, generated reports, images)</li>
            <li><strong>Model Storage:</strong> MinIO (AI models, datasets, LCA databases)</li>
            <li><strong>ORM:</strong> Prisma (type-safe database access)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">External APIs</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Geospatial Data:</strong> OpenStreetMap API (mining location coordinates and mapping)</li>
            <li><strong>LCA Database:</strong> OpenLCA API (life cycle inventory data and impact assessment methodologies)</li>
            <li><strong>Media Management:</strong> Cloudinary API (image optimization and PDF report delivery)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">AI/ML Models & Libraries</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-3 text-left">Feature Category</th>
                  <th className="border p-3 text-left">Technology</th>
                  <th className="border p-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Document Processing</td>
                  <td className="border p-3">LayoutLMv3, Tesseract OCR</td>
                  <td className="border p-3">Extract data from uploaded documents</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Data Estimation</td>
                  <td className="border p-3">LightGBM, Random Forest</td>
                  <td className="border p-3">Estimate missing lifecycle parameters</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">LCA Calculations</td>
                  <td className="border p-3">Brightway2, OpenLCA</td>
                  <td className="border p-3">Environmental impact assessments</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Process Simulation</td>
                  <td className="border p-3">NetworkX, NumPy</td>
                  <td className="border p-3">Material flow modeling and analysis</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Image Analysis</td>
                  <td className="border p-3">YOLOv8, OpenCV</td>
                  <td className="border p-3">Basic e-waste device identification</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Marketplace Recommendations</td>
                  <td className="border p-3">SentenceTransformers, LightFM</td>
                  <td className="border p-3">User-based material suggestions</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Price Analysis</td>
                  <td className="border p-3">Prophet, ARIMA</td>
                  <td className="border p-3">Historical price trend analysis</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Report Generation</td>
                  <td className="border p-3">Jinja2, ReportLab</td>
                  <td className="border p-3">Automated PDF report creation</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="border p-3">Text Processing</td>
                  <td className="border p-3">LLaMA-3, Flan-T5</td>
                  <td className="border p-3">Summary generation and text analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Architecture Section */}
        <div id="system-architecture" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">System Architecture</h2>
          
          <div className="space-y-8">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">Frontend Layer</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Next.js Application:</span> Provides responsive user interface with server-side rendering
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Interactive Components:</span> React Flow for process modeling, Recharts for data visualization
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Real-time Updates:</span> WebSocket connections for live whiteboard collaboration
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">API Layer</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">FastAPI Backend:</span> Handles HTTP requests, authentication, and business logic
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Celery Workers:</span> Process computationally intensive tasks (LCA calculations, report generation)
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Redis Cache:</span> Stores session data and frequently accessed results
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">Data Processing Layer</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">LCA Engine:</span> Brightway2 integration for environmental impact calculations
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">ML Pipeline:</span> Document parsing, data estimation, and recommendation systems
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Simulation Engine:</span> NetworkX-based material flow modeling
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">Storage Layer</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">PostgreSQL:</span> User data, analysis results, marketplace listings
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Elasticsearch:</span> Full-text search for materials and marketplace items
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Cloudinary:</span> User-uploaded images and generated PDF reports
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">MinIO:</span> AI models, LCA databases, and large datasets
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">External Integration Layer</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">OpenLCA API:</span> Access to standardized LCA methodologies and inventory data
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">OpenStreetMap:</span> Mining location data and geographic information
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <div>
                    <span className="font-medium">Cloudinary API:</span> Media processing and content delivery
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Workflow Section */}
        <div id="user-workflow" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">User Workflow</h2>
          
          <div className="space-y-8">
            {/* Platform Entry */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">1. Platform Entry</h3>
              <p className="mb-4">Users access MineCare through the web interface and can choose from four main features:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>General LCA Analysis</strong></li>
                <li><strong>India-Specific LCA Analysis</strong></li>
                <li><strong>Interactive Whiteboard</strong></li>
                <li><strong>Materials Marketplace</strong></li>
              </ol>
            </div>

            {/* General LCA Analysis */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">2. General LCA Analysis</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Material Selection:</strong> Choose from available minerals in our database (Iron Ore, Aluminum, Lithium, etc.)
                </li>
                <li>
                  <strong>Data Input:</strong> Provide production data across nine categories (energy, emissions, water use, waste generation, etc.)
                </li>
                <li>
                  <strong>Processing:</strong> System processes inputs using Brightway2 LCA engine (typically 2-5 minutes)
                </li>
                <li>
                  <strong>Report Generation:</strong> Receive a comprehensive report covering:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Environmental impacts (GWP, acidification, eutrophication)</li>
                    <li>Circularity metrics (recycling rates, material efficiency)</li>
                    <li>Waste analysis and management recommendations</li>
                    <li>Comparative analysis with industry benchmarks</li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* India-Specific LCA Analysis */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">3. India-Specific LCA Analysis</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Location Selection:</strong> Choose mining location from interactive map of India
                </li>
                <li>
                  <strong>Enhanced Data Input:</strong> Provide general LCA data plus regional factors:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Local electricity grid mix</li>
                    <li>Water stress indicators</li>
                    <li>Regional transportation distances</li>
                    <li>Local socio-economic context</li>
                  </ul>
                </li>
                <li>
                  <strong>Regional Processing:</strong> Analysis incorporates India-specific impact factors
                </li>
                <li>
                  <strong>Comprehensive Reporting:</strong> Standard LCA report plus regional impact assessment
                </li>
              </ol>
            </div>

            {/* Interactive Whiteboard */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">4. Interactive Whiteboard</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Project Creation:</strong> Start new process modeling session</li>
                <li><strong>Node Management:</strong> Add process nodes (extraction, processing, transportation, waste management)</li>
                <li><strong>Flow Configuration:</strong> Connect nodes and define material/energy flows</li>
                <li><strong>Scenario Testing:</strong> Modify parameters to explore different process configurations</li>
                <li><strong>Results Analysis:</strong> View environmental impacts and performance metrics</li>
                <li><strong>Report Export:</strong> Generate comparative analysis reports</li>
              </ol>
            </div>

            {/* Materials Marketplace */}
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-4 text-primary">5. Materials Marketplace</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-muted-foreground">E-Waste Assessment</h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Image Upload:</strong> Submit photos of electronic waste items</li>
                  <li>
                    <strong>AI Analysis:</strong> System provides basic device identification and material composition estimates
                  </li>
                  <li>
                    <strong>Assessment Report:</strong> Receive preliminary analysis including:
                    <ul className="list-disc pl-6 mt-1 space-y-1">
                      <li>Device type and approximate age</li>
                      <li>Material composition estimates</li>
                      <li>Basic recycling recommendations</li>
                      <li>Estimated value ranges (informational only)</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-muted-foreground">Materials Trading Platform</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Buyer Interface:</strong> Browse listings, search materials, view seller information</li>
                  <li><strong>Seller Interface:</strong> Create listings, manage inventory, track sales analytics</li>
                  <li><strong>Recommendation System:</strong> AI-suggested materials based on user history and preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Section */}
        <div id="core-features" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Core Features</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* LCA Analysis Tools */}
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M12 2v4"/>
                    <path d="m16.24 7.76 2.83-2.83"/>
                    <path d="M17 12h4"/>
                    <path d="m16.24 16.24 2.83 2.83"/>
                    <path d="M12 18v4"/>
                    <path d="m7.76 16.24-2.83 2.83"/>
                    <path d="M6 12H2"/>
                    <path d="m7.76 7.76L4.93 4.93"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium">LCA Analysis Tools</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Material Database:</strong> Coverage of 20+ common minerals and metals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Impact Categories:</strong> 15+ environmental impact indicators</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Regional Customization:</strong> India-specific impact assessment factors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Benchmarking:</strong> Comparison with industry averages and best practices</span>
                </li>
              </ul>
            </div>

            {/* Process Modeling */}
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="M12 13v6"/>
                    <path d="M9 16h6"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Process Modeling</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Visual Interface:</strong> Drag-and-drop process flow creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Real-time Calculations:</strong> Live updates as parameters change</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Scenario Comparison:</strong> Side-by-side analysis of different process configurations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Export Capabilities:</strong> PDF reports and data export functionality</span>
                </li>
              </ul>
            </div>

            {/* Marketplace Platform */}
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Marketplace Platform</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Material Listings:</strong> Comprehensive catalog of industrial materials and e-waste</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Search & Filtering:</strong> Advanced search with multiple filter options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>User Management:</strong> Separate buyer and seller dashboards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Analytics Dashboard:</strong> Sales tracking and performance metrics for sellers</span>
                </li>
              </ul>
            </div>

            {/* Reporting System */}
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" x2="8" y1="13" y2="13"/>
                    <line x1="16" x2="8" y1="17" y2="17"/>
                    <line x1="10" x2="8" y1="9" y2="9"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium">Reporting System</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Automated Generation:</strong> AI-assisted report creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Multiple Formats:</strong> PDF export with charts and visualizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Customizable Content:</strong> Tailored reports based on user requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span><strong>Version Control:</strong> Track and compare different analysis versions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Model Section */}
        <div id="data-model" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Data Model</h2>
          
          <div className="space-y-12">
            {/* User Management */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium">User Management</h3>
                <p className="text-sm text-muted-foreground">Core user data and authentication</p>
              </div>
              <div className="p-6 bg-background">
                <pre className="text-sm bg-muted/10 p-4 rounded-md overflow-x-auto">
                  <code className="text-foreground">
                {`User {
                userId: UUID
                name: String
                email: String (unique)
                company: String
                industry: String
                role: Enum (buyer, seller, analyst)
                createdAt: Timestamp
                lastLogin: Timestamp
                }`}
                  </code>
                </pre>
              </div>
            </div>

            {/* LCA Analysis */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium">LCA Analysis Storage</h3>
                <p className="text-sm text-muted-foreground">Life Cycle Assessment data and results</p>
              </div>
              <div className="p-6 bg-background">
                <pre className="text-sm bg-muted/10 p-4 rounded-md overflow-x-auto">
                  <code className="text-foreground">
                    {`LCAAnalysis {
                    analysisId: UUID
                    userId: UUID (foreign key)
                    analysisType: Enum (general, india_specific)
                    mineralType: String
                    inputData: JSON
                    results: JSON
                    processingStatus: Enum (pending, processing, completed, failed)
                    createdAt: Timestamp
                    completedAt: Timestamp
                    }`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Whiteboard Projects */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium">Whiteboard Projects</h3>
                <p className="text-sm text-muted-foreground">Interactive process modeling data</p>
              </div>
              <div className="p-6 bg-background">
                <pre className="text-sm bg-muted/10 p-4 rounded-md overflow-x-auto">
                  <code className="text-foreground">
                    {`Whiteboard {
                    whiteboardId: UUID
                    userId: UUID (foreign key)
                    title: String
                    nodes: JSON Array
                    connections: JSON Array
                    lastModified: Timestamp
                    isPublic: Boolean
                    }`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Marketplace Listings */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium">Marketplace Listings</h3>
                <p className="text-sm text-muted-foreground">Material and resource marketplace data</p>
              </div>
              <div className="p-6 bg-background">
                <pre className="text-sm bg-muted/10 p-4 rounded-md overflow-x-auto">
                  <code className="text-foreground">
                    {`Listing {
                    listingId: UUID
                    sellerId: UUID (foreign key)
                    title: String
                    description: Text
                    materialCategory: String
                    quantity: String
                    location: String
                    price: Decimal
                    status: Enum (active, sold, expired)
                    createdAt: Timestamp
                    }`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints Section */}
        <div id="api-endpoints" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">API Endpoints</h2>
          
          <div className="space-y-8">
            {/* Authentication */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  Authentication
                </h3>
              </div>
              <div className="divide-y">
                <EndpointRow 
                  method="POST" 
                  path="/api/auth/register" 
                  description="User registration" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/auth/login" 
                  description="User authentication" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/auth/logout" 
                  description="Session termination" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/auth/profile" 
                  description="User profile retrieval" 
                />
              </div>
            </div>

            {/* LCA Analysis */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8H12"/>
                      <path d="M8 13H5"/>
                      <path d="M16 3v10"/>
                      <path d="M12 3v18"/>
                      <path d="M3 14h3"/>
                      <path d="M3 8h3"/>
                    </svg>
                  </span>
                  LCA Analysis
                </h3>
              </div>
              <div className="divide-y">
                <EndpointRow 
                  method="GET" 
                  path="/api/lca/materials" 
                  description="Available materials list" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/lca/analysis" 
                  description="Submit analysis request" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/lca/analysis/{id}" 
                  description="Retrieve analysis results" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/lca/analysis/{id}/report" 
                  description="Download PDF report" 
                />
              </div>
            </div>

            {/* Whiteboard Management */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M9 18h6"/>
                      <path d="M12 14v4"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    </svg>
                  </span>
                  Whiteboard Management
                </h3>
              </div>
              <div className="divide-y">
                <EndpointRow 
                  method="GET" 
                  path="/api/whiteboard" 
                  description="List user whiteboards" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/whiteboard" 
                  description="Create new whiteboard" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/whiteboard/{id}" 
                  description="Retrieve whiteboard data" 
                />
                <EndpointRow 
                  method="PUT" 
                  path="/api/whiteboard/{id}" 
                  description="Update whiteboard" 
                />
                <EndpointRow 
                  method="DELETE" 
                  path="/api/whiteboard/{id}" 
                  description="Delete whiteboard" 
                />
              </div>
            </div>

            {/* Marketplace Operations */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                      <path d="M3 6h18"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </span>
                  Marketplace Operations
                </h3>
              </div>
              <div className="divide-y">
                <EndpointRow 
                  method="GET" 
                  path="/api/marketplace/listings" 
                  description="Browse listings" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/marketplace/listings" 
                  description="Create new listing" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/marketplace/listings/{id}" 
                  description="Listing details" 
                />
                <EndpointRow 
                  method="PUT" 
                  path="/api/marketplace/listings/{id}" 
                  description="Update listing" 
                />
                <EndpointRow 
                  method="POST" 
                  path="/api/marketplace/search" 
                  description="Advanced search" 
                />
              </div>
            </div>

            {/* E-Waste Analysis */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                      <path d="M12 18h.01"/>
                    </svg>
                  </span>
                  E-Waste Analysis
                </h3>
              </div>
              <div className="divide-y">
                <EndpointRow 
                  method="POST" 
                  path="/api/ewaste/analyze" 
                  description="Submit image for analysis" 
                />
                <EndpointRow 
                  method="GET" 
                  path="/api/ewaste/analysis/{id}" 
                  description="Retrieve analysis results" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources & Privacy Section */}
        <div id="data-sources-privacy" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Data Sources & Privacy</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* LCA Data Sources */}
            <div className="border rounded-lg overflow-hidden h-full">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="M12 8v4"/>
                  <path d="M12 16h.01"/>
                </svg>
                <h3 className="text-lg font-medium">LCA Data Sources</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Primary Database</h4>
                      <p className="text-sm text-muted-foreground">ecoinvent 3.8+ (licensed LCA inventory database)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Secondary Sources</h4>
                      <p className="text-sm text-muted-foreground">OpenLCA community database, GREET model data</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Regional Data</h4>
                      <p className="text-sm text-muted-foreground">India-specific electricity grid data from CEA (Central Electricity Authority)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Mining Data</h4>
                      <p className="text-sm text-muted-foreground">Geological Survey of India publications and industry reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Privacy & Security */}
            <div className="border rounded-lg overflow-hidden h-full">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <h3 className="text-lg font-medium">Data Privacy & Security</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Encryption</h4>
                      <p className="text-sm text-muted-foreground">All data transmitted using TLS 1.3 encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Storage Security</h4>
                      <p className="text-sm text-muted-foreground">Database encryption at rest using AES-256</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Access Control</h4>
                      <p className="text-sm text-muted-foreground">Role-based permissions with audit logging</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Data Retention</h4>
                      <p className="text-sm text-muted-foreground">User data retained for 7 years, anonymized after deletion request</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Compliance</h4>
                      <p className="text-sm text-muted-foreground">GDPR-compliant data handling procedures</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <h4 className="font-medium">Industrial Data</h4>
                      <p className="text-sm text-muted-foreground">Uploaded production data is isolated per user account and not shared</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Content Policy - Full Width */}
            <div className="border rounded-lg overflow-hidden md:col-span-2">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <h3 className="text-lg font-medium">User Content Policy</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Uploaded Documents</h4>
                        <p className="text-sm text-muted-foreground">Automatically deleted after processing unless explicitly saved</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Analysis Results</h4>
                        <p className="text-sm text-muted-foreground">Stored encrypted and accessible only to the creating user</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Marketplace Data</h4>
                        <p className="text-sm text-muted-foreground">Public listings data retained according to platform terms</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Anonymization</h4>
                        <p className="text-sm text-muted-foreground">Research aggregation uses anonymized data only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Section */}
        <div id="deployment" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Deployment</h2>
          
          <div className="space-y-12">
            {/* Production Architecture */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="m7.5 4.27 9 5.15"/>
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <path d="m3.3 7 8.7 5 8.7-5"/>
                  <path d="M12 22V12"/>
                </svg>
                <h3 className="text-lg font-medium">Production Architecture</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Frontend Hosting</h4>
                        <p className="text-sm text-muted-foreground">Vercel (global CDN, automatic scaling)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Backend Infrastructure</h4>
                        <p className="text-sm text-muted-foreground">Railway (containerized FastAPI application)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Database Hosting</h4>
                        <p className="text-sm text-muted-foreground">Neon (managed PostgreSQL with PostGIS)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">AI Model Hosting</h4>
                        <p className="text-sm text-muted-foreground">Hugging Face Spaces (GPU-enabled inference)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Search Engine</h4>
                        <p className="text-sm text-muted-foreground">Bonsai (managed Elasticsearch service)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Media Storage</h4>
                        <p className="text-sm text-muted-foreground">Cloudinary (image processing and CDN)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Model Storage</h4>
                        <p className="text-sm text-muted-foreground">MinIO (self-hosted object storage)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Environment */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                  <path d="M12 18h.01"/>
                </svg>
                <h3 className="text-lg font-medium">Development Environment</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Local Development</h4>
                        <p className="text-sm text-muted-foreground">Docker Compose with PostgreSQL, Redis, Elasticsearch</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Testing</h4>
                        <p className="text-sm text-muted-foreground">Pytest for backend, Jest for frontend</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">CI/CD</h4>
                        <p className="text-sm text-muted-foreground">GitHub Actions with automated testing and deployment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Monitoring</h4>
                        <p className="text-sm text-muted-foreground">Sentry for error tracking, Prometheus for metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scalability Considerations */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="M3 3v18h18"/>
                  <path d="M18 17V9"/>
                  <path d="M13 17V5"/>
                  <path d="M8 17v-3"/>
                </svg>
                <h3 className="text-lg font-medium">Scalability Considerations</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Database</h4>
                        <p className="text-sm text-muted-foreground">Read replicas for improved performance</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Caching</h4>
                        <p className="text-sm text-muted-foreground">Redis for frequently accessed LCA results</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">Task Processing</h4>
                        <p className="text-sm text-muted-foreground">Horizontal scaling of Celery workers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                      <div>
                        <h4 className="font-medium">CDN</h4>
                        <p className="text-sm text-muted-foreground">Global content delivery through Cloudinary and Vercel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations & Disclaimers Section */}
        <div id="limitations-disclaimers" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Limitations & Disclaimers</h2>
          
          <div className="space-y-8">
            {/* LCA Analysis Limitations */}
            <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="M12 8v4"/>
                  <path d="M12 16h.01"/>
                </svg>
                <h3 className="text-lg font-medium">LCA Analysis Limitations</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Data Quality:</span>
                      <span className="text-muted-foreground"> Results depend on quality and completeness of user-provided data</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Methodology:</span>
                      <span className="text-muted-foreground"> Uses simplified LCA approaches suitable for preliminary assessments</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Regional Coverage:</span>
                      <span className="text-muted-foreground"> Detailed regional data currently limited to India</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Processing Time:</span>
                      <span className="text-muted-foreground"> Complex analyses may require 5-15 minutes for completion</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Accuracy:</span>
                      <span className="text-muted-foreground"> Results are estimates and may vary ±20-30% from detailed professional LCA studies</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* E-Waste Analysis Constraints */}
            <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                  <path d="M12 18h.01"/>
                </svg>
                <h3 className="text-lg font-medium">E-Waste Analysis Constraints</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Image Recognition:</span>
                      <span className="text-muted-foreground"> Device identification accuracy approximately 75-85%</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Material Estimation:</span>
                      <span className="text-muted-foreground"> Composition analysis based on device databases, not actual testing</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Value Estimates:</span>
                      <span className="text-muted-foreground"> Pricing information is indicative only and varies by market conditions</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Condition Assessment:</span>
                      <span className="text-muted-foreground"> Cannot determine device functionality or damage from images alone</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Marketplace Disclaimers */}
            <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <h3 className="text-lg font-medium">Marketplace Disclaimers</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Transaction Responsibility:</span>
                      <span className="text-muted-foreground"> Platform facilitates connections but does not guarantee transactions</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Material Quality:</span>
                      <span className="text-muted-foreground"> Buyers responsible for verifying material specifications and condition</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Price Accuracy:</span>
                      <span className="text-muted-foreground"> Listed prices are seller-determined and may not reflect market rates</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Legal Compliance:</span>
                      <span className="text-muted-foreground"> Users responsible for compliance with local regulations and permits</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* General Platform Limitations */}
            <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-primary">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                <h3 className="text-lg font-medium">General Platform Limitations</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Regulatory Use:</span>
                      <span className="text-muted-foreground"> Results not suitable for regulatory compliance or environmental permitting</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Professional Consultation:</span>
                      <span className="text-muted-foreground"> Complex projects should involve certified LCA practitioners</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Data Updates:</span>
                      <span className="text-muted-foreground"> LCA databases updated quarterly, may not reflect latest methodologies</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <div>
                      <span className="font-medium">Technical Support:</span>
                      <span className="text-muted-foreground"> Limited to platform functionality, not LCA methodology guidance</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Future Enhancements Section */}
        <div id="future-enhancements" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-8">Future Enhancements</h2>
          
          <div className="space-y-8">
            {/* Phase 1 */}
            <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phase 1 - Core Improvements</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Enhanced Data Sources:</span>
                      <span className="text-muted-foreground"> Integration with additional LCA databases (IDEMAT, GaBi)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Mobile Application:</span>
                      <span className="text-muted-foreground"> Native iOS/Android apps for field data collection</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Bulk Analysis:</span>
                      <span className="text-muted-foreground"> Batch processing capabilities for multiple materials/locations</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">API Access:</span>
                      <span className="text-muted-foreground"> Public API for third-party integrations</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                    <path d="M12 2v4"/>
                    <path d="m16 4-3 3"/>
                    <path d="M18 12h4"/>
                    <path d="m20 8-3-3"/>
                    <path d="M12 22v-4"/>
                    <path d="m16 20-3-3"/>
                    <path d="M2 12h4"/>
                    <path d="m4 8-3 3"/>
                    <path d="m4 16 3-3"/>
                    <path d="m12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phase 2 - Advanced Features</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Machine Learning:</span>
                      <span className="text-muted-foreground"> Improved data estimation using larger training datasets</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Blockchain Integration:</span>
                      <span className="text-muted-foreground"> Immutable audit trails for analysis results</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Collaboration Tools:</span>
                      <span className="text-muted-foreground"> Team workspaces and shared analysis projects</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Regulatory Templates:</span>
                      <span className="text-muted-foreground"> Pre-configured analyses for common compliance requirements</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <path d="m3.27 6.96 8 4.46a2 2 0 0 0 1.46.1l7.3-2.4"/>
                    <path d="M12 22.08V12"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Phase 3 - Enterprise Features</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Carbon Credit Calculation:</span>
                      <span className="text-muted-foreground"> Integration with carbon markets and offset programs</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Supply Chain Analysis:</span>
                      <span className="text-muted-foreground"> Multi-tier supply chain impact assessment</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Real-time Data Feeds:</span>
                      <span className="text-muted-foreground"> Integration with IoT sensors and production systems</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Custom Reporting:</span>
                      <span className="text-muted-foreground"> White-label solutions for consultancies and large enterprises</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Long-term Vision */}
            <div className="border rounded-lg overflow-hidden bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
              <div className="bg-muted/50 px-6 py-4 border-b flex items-center">
                <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                    <path d="M12 2v4"/>
                    <path d="m16.24 7.76 2.83-2.83"/>
                    <path d="M17 12h4"/>
                    <path d="m16.24 16.24 2.83 2.83"/>
                    <path d="M12 18v4"/>
                    <path d="m7.76 16.24-2.83 2.83"/>
                    <path d="M6 12H2"/>
                    <path d="m7.76 7.76L4.93 4.93"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Long-term Vision</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Global Expansion:</span>
                      <span className="text-muted-foreground"> Support for additional countries and regions</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Industry Specialization:</span>
                      <span className="text-muted-foreground"> Tailored modules for specific industries (construction, automotive, electronics)</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">AI-Powered Insights:</span>
                      <span className="text-muted-foreground"> Predictive analytics for environmental impact optimization</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-primary">•</div>
                    <div>
                      <span className="font-medium">Certification Integration:</span>
                      <span className="text-muted-foreground"> Direct links to ISO 14040/14044 certification processes</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Other sections */}
        {sections.slice(11).map((section) => (
          <div key={section.id} id={section.id} className="mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-muted-foreground">Content for {section.title} section will be displayed here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
