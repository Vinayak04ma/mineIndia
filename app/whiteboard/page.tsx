"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Palette,
  Plus,
  Save,
  Download,
  Zap,
  Factory,
  Truck,
  Recycle,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Play,
  ZoomIn,
  ZoomOut,
  Link,
} from "lucide-react"

interface ProcessNode {
  id: string
  type: string
  label: string
  x: number
  y: number
  inputs: string[]
  outputs: string[]
  impact: number
  category: string
}

interface Connection {
  id: string
  from: string
  to: string
  material: string
  quantity: number
  unit: string
}

export default function WhiteboardPage() {
  const [nodes, setNodes] = useState<ProcessNode[]>([
    {
      id: "1",
      type: "extraction",
      label: "Bauxite Mining",
      x: 100,
      y: 200,
      inputs: ["Energy", "Water"],
      outputs: ["Bauxite Ore", "Waste Rock"],
      impact: 85,
      category: "Raw Material Extraction",
    },
    {
      id: "2",
      type: "processing",
      label: "Alumina Refining",
      x: 350,
      y: 200,
      inputs: ["Bauxite Ore", "Caustic Soda"],
      outputs: ["Alumina", "Red Mud"],
      impact: 78,
      category: "Processing & Manufacturing",
    },
    {
      id: "3",
      type: "manufacturing",
      label: "Aluminum Smelting",
      x: 600,
      y: 200,
      inputs: ["Alumina", "Carbon Anodes"],
      outputs: ["Primary Aluminum", "CO2"],
      impact: 92,
      category: "Processing & Manufacturing",
    },
  ])

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "c1",
      from: "1",
      to: "2",
      material: "Bauxite Ore",
      quantity: 4,
      unit: "tonnes",
    },
    {
      id: "c2",
      from: "2",
      to: "3",
      material: "Alumina",
      quantity: 2,
      unit: "tonnes",
    },
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const nodeTypes = [
    {
      type: "extraction",
      label: "Raw Material Extraction",
      icon: Factory,
      color: "bg-destructive/10 text-destructive",
    },
    { type: "processing", label: "Processing & Manufacturing", icon: Settings, color: "bg-primary/10 text-primary" },
    { type: "transport", label: "Transportation", icon: Truck, color: "bg-secondary/10 text-secondary" },
    { type: "use", label: "Use Phase", icon: CheckCircle, color: "bg-accent/10 text-accent" },
    { type: "eol", label: "End-of-Life", icon: Recycle, color: "bg-muted/50 text-muted-foreground" },
    { type: "energy", label: "Energy Systems", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
    { type: "waste", label: "Waste Treatment", icon: AlertTriangle, color: "bg-orange-100 text-orange-700" },
  ]

  const impactCategories = [
    { name: "Climate Change", value: 87, unit: "kg CO₂ eq" },
    { name: "Acidification", value: 72, unit: "kg SO₂ eq" },
    { name: "Eutrophication", value: 45, unit: "kg PO₄ eq" },
    { name: "Ozone Depletion", value: 23, unit: "kg CFC-11 eq" },
    { name: "Human Toxicity", value: 68, unit: "CTUh" },
    { name: "Ecotoxicity", value: 54, unit: "CTUe" },
    { name: "Resource Depletion", value: 91, unit: "kg Sb eq" },
    { name: "Land Use", value: 38, unit: "m² year" },
    { name: "Water Use", value: 76, unit: "m³ depriv." },
  ]

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleWheel = (event: React.WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault()
      const delta = event.deltaY > 0 ? -0.1 : 0.1
      setZoomLevel((prev) => Math.max(0.5, Math.min(2, prev + delta)))
    }
  }

  const handleStartConnection = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setIsConnecting(true)
    setConnectionStart(nodeId)
    console.log("[v0] Starting connection from node:", nodeId)
  }

  const handleEndConnection = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      const newConnection: Connection = {
        id: `c_${Date.now()}`,
        from: connectionStart,
        to: nodeId,
        material: "Material Flow",
        quantity: 1,
        unit: "unit",
      }
      setConnections((prev) => [...prev, newConnection])
      console.log("[v0] Created connection:", newConnection)
    }
    setIsConnecting(false)
    setConnectionStart(null)
    setTempConnection(null)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent) => {
    if (isConnecting && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect()
      setTempConnection({
        x: (event.clientX - canvasRect.left) / zoomLevel,
        y: (event.clientY - canvasRect.top - 80) / zoomLevel,
      })
    }

    if (!isDraggingNode || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const newX = Math.max(0, Math.min((event.clientX - dragStartPos.x) / zoomLevel, canvasRect.width / zoomLevel - 200))
    const newY = Math.max(
      0,
      Math.min((event.clientY - dragStartPos.y - canvasRect.top - 80) / zoomLevel, canvasRect.height / zoomLevel - 150),
    )

    setNodes((prev) => prev.map((node) => (node.id === isDraggingNode ? { ...node, x: newX, y: newY } : node)))
  }

  const handleRunCalculation = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 2500)
  }

  const handleNodeDragStart = (nodeType: string, event: React.MouseEvent) => {
    setDraggedNodeType(nodeType)
    const rect = event.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleNodeMouseDown = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setIsDraggingNode(nodeId)
    setDragStartPos({
      x: event.clientX - node.x * zoomLevel,
      y: event.clientY - node.y * zoomLevel,
    })
    setSelectedNode(nodeId)
  }

  const handleNodeMouseUp = () => {
    setIsDraggingNode(null)
  }

  const handleCanvasDrop = (event: React.MouseEvent) => {
    if (!draggedNodeType || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = (event.clientX - canvasRect.left - dragOffset.x) / zoomLevel
    const y = (event.clientY - canvasRect.top - dragOffset.y - 80) / zoomLevel

    const nodeTypeInfo = nodeTypes.find((nt) => nt.type === draggedNodeType)
    if (!nodeTypeInfo) return

    const newNode: ProcessNode = {
      id: `node_${Date.now()}`,
      type: draggedNodeType,
      label: `New ${nodeTypeInfo.label}`,
      x: Math.max(0, x),
      y: Math.max(0, y),
      inputs: ["Input 1"],
      outputs: ["Output 1"],
      impact: Math.floor(Math.random() * 100),
      category: nodeTypeInfo.label,
    }

    setNodes((prev) => [...prev, newNode])
    setDraggedNodeType(null)
  }

  const handleAddNode = () => {
    const newNode: ProcessNode = {
      id: `node_${Date.now()}`,
      type: "processing",
      label: "New Process Node",
      x: 200 + Math.random() * 300,
      y: 150 + Math.random() * 200,
      inputs: ["Input 1"],
      outputs: ["Output 1"],
      impact: Math.floor(Math.random() * 100),
      category: "Processing & Manufacturing",
    }

    setNodes((prev) => [...prev, newNode])
  }

  const getNodeIcon = (type: string) => {
    const nodeType = nodeTypes.find((nt) => nt.type === type)
    return nodeType?.icon || Factory
  }

  const getNodeColor = (type: string) => {
    const nodeType = nodeTypes.find((nt) => nt.type === type)
    return nodeType?.color || "bg-muted/50"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Node Palette */}
        <div className="w-80 border-r bg-muted/20 p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Process Nodes</h2>
              <p className="text-xs text-muted-foreground mb-3">Drag nodes to canvas or click to add</p>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon
                    return (
                      <Card
                        key={nodeType.type}
                        className="cursor-grab hover:shadow-sm transition-shadow p-3 active:cursor-grabbing"
                        onMouseDown={(e) => handleNodeDragStart(nodeType.type, e)}
                        onClick={() => {
                          const newNode: ProcessNode = {
                            id: `node_${Date.now()}`,
                            type: nodeType.type,
                            label: `New ${nodeType.label}`,
                            x: 200 + Math.random() * 300,
                            y: 150 + Math.random() * 200,
                            inputs: ["Input 1"],
                            outputs: ["Output 1"],
                            impact: Math.floor(Math.random() * 100),
                            category: nodeType.label,
                          }
                          setNodes((prev) => [...prev, newNode])
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${nodeType.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{nodeType.label}</h4>
                            <p className="text-xs text-muted-foreground">Click or drag to add</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Scenario Management</h3>
              <div className="space-y-3">
                <Select defaultValue="scenario1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scenario1">Conventional Process</SelectItem>
                    <SelectItem value="scenario2">Sustainable Alternative</SelectItem>
                    <SelectItem value="scenario3">Circular Economy</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Save className="mr-2 h-3 w-3" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Real-time Calculation</h3>
              <div className="space-y-3">
                <Button className="w-full" onClick={handleRunCalculation} disabled={isCalculating}>
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run LCA Calculation
                    </>
                  )}
                </Button>
                {showResults && (
                  <div className="p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Total Impact</span>
                      <Badge className="bg-accent text-accent-foreground">Updated</Badge>
                    </div>
                    <div className="text-lg font-bold text-accent">847 kg CO₂ eq</div>
                    <p className="text-xs text-muted-foreground">Per tonne aluminum</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          {/* Canvas Header */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="flex items-center justify-between bg-background/95 backdrop-blur rounded-lg p-3 border">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  <Palette className="mr-2 h-3 w-3" />
                  Interactive LCA Mapping
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {nodes.length} nodes • {connections.length} connections • {Math.round(zoomLevel * 100)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomIn} disabled={zoomLevel >= 2}>
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant={isConnecting ? "default" : "outline"}
                  onClick={() => {
                    setIsConnecting(!isConnecting)
                    setConnectionStart(null)
                    setTempConnection(null)
                  }}
                >
                  <Link className="mr-2 h-3 w-3" />
                  {isConnecting ? "Cancel" : "Connect"}
                </Button>
                <Button size="sm" variant="outline" onClick={handleAddNode}>
                  <Plus className="mr-2 h-3 w-3" />
                  Add Node
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="mr-2 h-3 w-3" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="absolute inset-0 pt-20 pb-4">
            <div
              ref={canvasRef}
              className={`relative w-full h-full overflow-auto ${isConnecting ? "cursor-crosshair" : "cursor-default"}`}
              onMouseUp={handleCanvasDrop}
              onMouseLeave={() => {
                setDraggedNodeType(null)
                setIsConnecting(false)
                setConnectionStart(null)
                setTempConnection(null)
              }}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleNodeMouseUp}
              onWheel={handleWheel}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Render connections */}
                {connections.map((connection) => {
                  const fromNode = nodes.find((n) => n.id === connection.from)
                  const toNode = nodes.find((n) => n.id === connection.to)
                  if (!fromNode || !toNode) return null

                  return (
                    <g key={connection.id}>
                      <line
                        x1={fromNode.x + 120}
                        y1={fromNode.y + 40}
                        x2={toNode.x}
                        y2={toNode.y + 40}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x={(fromNode.x + toNode.x + 120) / 2}
                        y={(fromNode.y + toNode.y) / 2 + 35}
                        textAnchor="middle"
                        className="fill-muted-foreground text-xs"
                      >
                        {connection.material}
                      </text>
                    </g>
                  )
                })}

                {isConnecting && connectionStart && tempConnection && (
                  <line
                    x1={nodes.find((n) => n.id === connectionStart)!.x + 120}
                    y1={nodes.find((n) => n.id === connectionStart)!.y + 40}
                    x2={tempConnection.x}
                    y2={tempConnection.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                )}

                {/* Arrow marker definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
                  </marker>
                </defs>
              </svg>

              {/* Render nodes */}
              {nodes.map((node) => {
                const Icon = getNodeIcon(node.type)
                return (
                  <div
                    key={node.id}
                    className={`absolute transition-all hover:shadow-lg ${
                      selectedNode === node.id ? "ring-2 ring-primary" : ""
                    } ${isDraggingNode === node.id ? "cursor-grabbing z-10" : "cursor-grab"}
                    ${isConnecting ? "cursor-pointer" : ""}`}
                    style={{ left: node.x, top: node.y }}
                    onMouseDown={(e) => {
                      if (isConnecting) {
                        if (!connectionStart) {
                          handleStartConnection(node.id, e)
                        } else {
                          handleEndConnection(node.id, e)
                        }
                      } else {
                        handleNodeMouseDown(node.id, e)
                      }
                    }}
                  >
                    <Card
                      className={`w-48 ${isConnecting && connectionStart === node.id ? "ring-2 ring-primary" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${getNodeColor(node.type)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{node.label}</h4>
                            <p className="text-xs text-muted-foreground">{node.category}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Environmental Impact</span>
                            <Badge
                              variant={node.impact > 80 ? "destructive" : node.impact > 50 ? "secondary" : "default"}
                              className="text-xs"
                            >
                              {node.impact}%
                            </Badge>
                          </div>

                          <div className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Inputs:</span>
                              <span>{node.inputs.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Outputs:</span>
                              <span>{node.outputs.length}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties & Results */}
        <div className="w-80 border-l bg-muted/20">
          <Tabs defaultValue="properties" className="h-full">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="p-4 space-y-6">
              {selectedNode ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Node Properties</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="node-label">Label</Label>
                        <Input id="node-label" value={nodes.find((n) => n.id === selectedNode)?.label || ""} />
                      </div>
                      <div>
                        <Label htmlFor="node-category">Category</Label>
                        <Select value={nodes.find((n) => n.id === selectedNode)?.category}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Raw Material Extraction">Raw Material Extraction</SelectItem>
                            <SelectItem value="Processing & Manufacturing">Processing & Manufacturing</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Use Phase">Use Phase</SelectItem>
                            <SelectItem value="End-of-Life">End-of-Life</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Input/Output Management</h4>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">Inputs</Label>
                        <div className="space-y-2 mt-2">
                          {nodes
                            .find((n) => n.id === selectedNode)
                            ?.inputs.map((input, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded border">
                                <span className="text-sm">{input}</span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  ×
                                </Button>
                              </div>
                            ))}
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Plus className="mr-2 h-3 w-3" />
                            Add Input
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm">Outputs</Label>
                        <div className="space-y-2 mt-2">
                          {nodes
                            .find((n) => n.id === selectedNode)
                            ?.outputs.map((output, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded border">
                                <span className="text-sm">{output}</span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  ×
                                </Button>
                              </div>
                            ))}
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Plus className="mr-2 h-3 w-3" />
                            Add Output
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-2">No Node Selected</h4>
                  <p className="text-sm text-muted-foreground">Click on a process node to edit its properties</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="results" className="p-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Impact Assessment</h3>
                {showResults ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">System Status</span>
                        <Badge className="bg-accent text-accent-foreground">Calculated</Badge>
                      </div>
                      <div className="text-lg font-bold text-primary">3 Process Nodes</div>
                      <p className="text-xs text-muted-foreground">2 Material Flows</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Environmental Impact Categories</h4>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {impactCategories.map((category, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{category.name}</span>
                                <span className="font-medium">
                                  {category.value} {category.unit}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div
                                  className="bg-primary h-1.5 rounded-full transition-all"
                                  style={{ width: `${category.value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Hotspot Analysis</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded border-l-4 border-l-destructive bg-destructive/10">
                          <div className="text-sm font-medium">Aluminum Smelting</div>
                          <div className="text-xs text-muted-foreground">Highest impact: 92% contribution</div>
                        </div>
                        <div className="p-2 rounded border-l-4 border-l-secondary bg-secondary/10">
                          <div className="text-sm font-medium">Bauxite Mining</div>
                          <div className="text-xs text-muted-foreground">High impact: 85% contribution</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h4 className="font-semibold mb-2">No Results Yet</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Run LCA calculation to see environmental impact results
                    </p>
                    <Button size="sm" onClick={handleRunCalculation}>
                      <Play className="mr-2 h-3 w-3" />
                      Calculate Now
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
