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
  RefreshCcw,
  Trash2,
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
  fromSide?: 'left' | 'right'
  toSide?: 'left' | 'right'
}

export default function WhiteboardPage() {
  // Node visual constants (match styles): w-48 => 192px; approx height ~120px
  const CANVAS_WIDTH = 10000
  const CANVAS_HEIGHT = 5000
  const BASE_NODE_WIDTH = 192
  const BASE_NODE_HEIGHT = 120
  const BASE_UI_ZOOM = 0.8
  
  // Calculate node scale based on zoom level (0.5 to 2.0)
  const getNodeScale = (zoom: number) => {
    return Math.max(0.5, Math.min(2, zoom));
  }
  const INITIAL_NODES: ProcessNode[] = [
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
  ]

  const INITIAL_CONNECTIONS: Connection[] = [
    {
      id: "c1",
      from: "1",
      to: "2",
      material: "Bauxite Ore",
      quantity: 4,
      unit: "tonnes",
      fromSide: 'right',
      toSide: 'left',
    },
    {
      id: "c2",
      from: "2",
      to: "3",
      material: "Alumina",
      quantity: 2,
      unit: "tonnes",
      fromSide: 'right',
      toSide: 'left',
    },
  ]

  const [nodes, setNodes] = useState<ProcessNode[]>(() => INITIAL_NODES.map((n) => ({ ...n, inputs: [...n.inputs], outputs: [...n.outputs] })))

  const [connections, setConnections] = useState<Connection[]>(() => INITIAL_CONNECTIONS.map((c) => ({ ...c })))

  const [selectedNode, setSelectedNode] = useState<string | null>("2")
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null)
  const [potentialDragNode, setPotentialDragNode] = useState<string | null>(null)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  // Canvas (content) zoom. Base UI is already at 80% via CSS zoom
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [connectionStartSide, setConnectionStartSide] = useState<'left' | 'right' | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const deleteNode = (nodeId: string) => {
    // Prevent deleting initial nodes
    const isInitial = INITIAL_NODES.some((n) => n.id === nodeId)
    if (isInitial) return
    setNodes((prev) => prev.filter((n) => n.id !== nodeId))
    setConnections((prev) => prev.filter((c) => c.from !== nodeId && c.to !== nodeId))
    if (selectedNode === nodeId) setSelectedNode(null)
    if (isDraggingNode === nodeId) setIsDraggingNode(null)
  }

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
    } else if (event.shiftKey) {
      // Allow horizontal scrolling with shift + wheel
      event.preventDefault()
      const container = event.currentTarget as HTMLElement
      container.scrollLeft += event.deltaY
    }
  }

  const handleStartConnection = (nodeId: string, event: React.MouseEvent, side?: 'left' | 'right') => {
    event.stopPropagation()
    setIsConnecting(true)
    setConnectionStart(nodeId)
    if (side) setConnectionStartSide(side)
    console.log("[v0] Starting connection from node:", nodeId)
  }

  const handleEndConnection = (nodeId: string, event: React.MouseEvent, endSide?: 'left' | 'right') => {
    event.stopPropagation()
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      const newConnection: Connection = {
        id: `c_${Date.now()}`,
        from: connectionStart,
        to: nodeId,
        material: "Material Flow",
        quantity: 1,
        unit: "unit",
        fromSide: connectionStartSide || 'right',
        toSide: endSide || 'left',
      }
      setConnections((prev) => [...prev, newConnection])
      console.log("[v0] Created connection:", newConnection)
    }
    setIsConnecting(false)
    setConnectionStart(null)
    setConnectionStartSide(null)
    setTempConnection(null)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent) => {
    // Handle node dragging with requestAnimationFrame for smoother updates
    if (isDraggingNode) {
      const node = nodes.find((n) => n.id === isDraggingNode)
      if (!node) return

      const scale = getNodeScale(zoomLevel)
      // Allow nodes to be dragged anywhere within the canvas bounds
      const newX = Math.max(0, Math.min(event.clientX - dragOffset.x * scale, CANVAS_WIDTH - BASE_NODE_WIDTH * scale))
      const newY = Math.max(0, Math.min(event.clientY - dragOffset.y * scale, CANVAS_HEIGHT - BASE_NODE_HEIGHT * scale))

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === isDraggingNode
              ? { ...n, x: newX, y: newY }
              : n
          )
        )
      })
    }
    // Handle connection preview
    else if (isConnecting && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect()
      setTempConnection({
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      })
    }

    if (!isDraggingNode || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - canvasRect.left - dragOffset.x
    const y = event.clientY - canvasRect.top - dragOffset.y

    setNodes((prev) => prev.map((node) => (node.id === isDraggingNode ? { ...node, x: Math.max(0, x), y: Math.max(0, y) } : node)))
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

    // Only set dragging if it's a left click
    if (event.button === 0) { // Left mouse button
      // Clear any existing drag states
      setIsDraggingNode(null)
      setPotentialDragNode(null)
      
      // Store initial position for drag detection
      const startPos = { x: event.clientX, y: event.clientY }
      setDragStartPos(startPos)
      
      // Set the node as selected
      setSelectedNode(nodeId)
      
      // Store the node ID for potential drag start
      setPotentialDragNode(nodeId)
      
      const scale = getNodeScale(zoomLevel)
      setDragOffset({
        x: (event.clientX - node.x) / scale,
        y: (event.clientY - node.y) / scale,
      })
      
      // Add document-wide event listeners for better drag handling
      const onMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x
        const dy = e.clientY - startPos.y
        const dragThreshold = 4 // pixels
        
        if (!isDragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
          setIsDragging(true)
          document.body.style.cursor = 'grabbing'
        }
        
        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (canvasRect) {
          const x = e.clientX - canvasRect.left - dragOffset.x
          const y = e.clientY - canvasRect.top - dragOffset.y
          setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, x: Math.max(0, x), y: Math.max(0, y) } : node)))
        }
      }
      
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        handleNodeMouseUp()
      }
      
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp, { once: true })
    }  
  }

  const handleNodeMouseUp = (event?: React.MouseEvent) => {
    event?.stopPropagation?.()
    // Reset all drag states
    setIsDraggingNode(null)
    setPotentialDragNode(null)
    setIsDragging(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  const handleCanvasDrop = (event: React.MouseEvent) => {
    if (!draggedNodeType || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - canvasRect.left - dragOffset.x
    const y = event.clientY - canvasRect.top - dragOffset.y

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
    <div
      className="min-h-screen bg-background"
      style={{ transform: `scale(${BASE_UI_ZOOM})`, transformOrigin: "top left", width: `${100 / BASE_UI_ZOOM}%` }}
    >
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
                  {nodes.length} nodes • {connections.length} connections • {Math.round(zoomLevel * BASE_UI_ZOOM * 100)}%
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
                  variant="outline"
                  onClick={() => setZoomLevel(1)}>Reset</Button>
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNodes(INITIAL_NODES.map((n) => ({ ...n, inputs: [...n.inputs], outputs: [...n.outputs] })))
                    setConnections(INITIAL_CONNECTIONS.map((c) => ({ ...c })))
                    setSelectedNode(null)
                    setIsConnecting(false)
                    setConnectionStart(null)
                    setTempConnection(null)
                  }}
                >
                  <RefreshCcw className="mr-2 h-3 w-3" />
                  Reset
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
              className={`relative w-full h-full overflow-auto ${
                isConnecting ? "cursor-crosshair" : "cursor-default"
              } ${isDraggingNode ? "select-none" : ""}`}
              onMouseUp={(e) => {
                handleCanvasDrop(e)
                handleNodeMouseUp()
              }}
              onMouseLeave={() => {
                setDraggedNodeType(null)
                setIsConnecting(false)
                setConnectionStart(null)
                setTempConnection(null)
              }}
              onMouseMove={handleCanvasMouseMove}
              onWheel={handleWheel}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <style>{`
                  @keyframes dash {
                    to { stroke-dashoffset: -56; }
                  }
                  @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                  }
                  .flow-line {
                    stroke-dasharray: 8 8;
                    stroke-dashoffset: 0;
                    animation: dash 2s linear infinite;
                    transition: all 0.3s ease;
                    marker-end: url(#arrowheadPrimary);
                  }
                  .flow-line:hover {
                    stroke-width: 4px;
                    filter: url(#glowHover);
                  }
                  .connection-label {
                    font-size: 12px;
                    font-weight: 500;
                    fill: #fff;
                    paint-order: stroke;
                    stroke: rgba(0,0,0,0.5);
                    stroke-width: 3px;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    pointer-events: none;
                  }
                  .connection-badge {
                    animation: pulse 2s ease-in-out infinite;
                  }
                `}</style>
                {/* Render connections */}
                {connections.map((connection) => {
                  const fromNode = nodes.find((n) => n.id === connection.from)
                  const toNode = nodes.find((n) => n.id === connection.to)
                  if (!fromNode || !toNode) return null
                  
                  // Calculate control points for a curved path
                  const fromScale = getNodeScale(zoomLevel)
                  const toScale = getNodeScale(zoomLevel)
                  
                  // Always start from right side (blue dot) of source node
                  const fromX = fromNode.x + BASE_NODE_WIDTH * fromScale
                  // Always end at left side (green dot) of target node
                  const toX = toNode.x
                  
                  // Center vertically on the nodes
                  const fromY = fromNode.y + BASE_NODE_HEIGHT * fromScale / 2
                  const toY = toNode.y + BASE_NODE_HEIGHT * toScale / 2
                  
                  // Calculate control points for a smooth curve
                  const dx = Math.abs(toX - fromX)
                  const dy = toY - fromY
                  const curveIntensity = Math.min(dx * 0.5, 100)
                  const controlX1 = fromX + curveIntensity
                  const controlX2 = toX - curveIntensity
                  
                  // Create a smooth curve path
                  const path = `M${fromX},${fromY} C${controlX1},${fromY} ${controlX2},${toY} ${toX},${toY}`
                  
                  // Calculate position for the label
                  const midX = (fromX + toX) / 2
                  const midY = (fromY + toY) / 2
                  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI)
                  
                  return (
                    <g key={connection.id} className="connection-group">
                      {/* Connection line with gradient */}
                      <path
                        key={connection.id}
                        d={path}
                        fill="none"
                        stroke="url(#flowGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerEnd="url(#arrowheadPrimary)"
                        className="flow-line opacity-90"
                      />
                      
                      {/* Animated flow effect */}
                      <path
                        d={path}
                        fill="none"
                        stroke="url(#flowGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="10 15"
                        strokeDashoffset="0"
                        style={{ animation: 'dash 1.5s linear infinite' }}
                        opacity="0.7"
                      />
                      
                      {/* Connection label with improved styling */}
                      <g transform={`translate(${midX}, ${midY})`}>
                        <foreignObject 
                          x="-50" 
                          y="-16" 
                          width="100" 
                          height="64"
                          className="pointer-events-none"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-xs font-medium text-center px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                              {connection.material}
                            </div>
                            {connection.quantity > 0 && (
                              <div className="text-[10px] mt-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary-foreground">
                                {connection.quantity} {connection.unit || 'units'}
                              </div>
                            )}
                          </div>
                        </foreignObject>
                      </g>
                    </g>
                  )
                })}

                {isConnecting && connectionStart && tempConnection && (
                  <line
                    x1={(connectionStartSide === 'left'
                      ? nodes.find((n) => n.id === connectionStart)!.x
                      : nodes.find((n) => n.id === connectionStart)!.x + BASE_NODE_WIDTH)}
                    y1={nodes.find((n) => n.id === connectionStart)!.y + BASE_NODE_HEIGHT / 2}
                    x2={tempConnection.x}
                    y2={tempConnection.y}
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8,8"
                    opacity="0.7"
                    markerEnd="url(#arrowheadPrimary)"
                  />
                )}

                {/* Arrow marker and effects */}
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="#3B82F6" floodOpacity="0.5" result="glowColor" />
                    <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glowHover" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feFlood floodColor="#38BDF8" floodOpacity="0.8" result="glowColor" />
                    <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <marker
                    id="arrowheadPrimary"
                    markerWidth="12"
                    markerHeight="8"
                    refX="10"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L12,4 L0,8 Z" fill="url(#flowGradient)" />
                  </marker>
                </defs>
              </svg>

              {/* Render nodes */}
              {nodes.map((node) => {
                const Icon = getNodeIcon(node.type)
                return (
                  <div
                    key={node.id}
                    className={`absolute select-none ${
                      isDraggingNode === node.id 
                        ? "transition-none shadow-xl z-50" 
                        : "transition-all duration-150 ease-out"
                    } ${
                      isDraggingNode === node.id 
                        ? "ring-2 ring-primary scale-105" 
                        : selectedNode === node.id 
                          ? "ring-2 ring-primary" 
                          : "hover:shadow-lg"
                    } ${isDraggingNode === node.id ? "cursor-grabbing z-50" : "cursor-grab"}
                    ${isConnecting ? "cursor-pointer" : ""}
                    transform-gpu will-change-transform`}
                    style={{
                      left: 0,
                      top: 0,
                      transform: `translate(${node.x}px, ${node.y}px) scale(${getNodeScale(zoomLevel)})`,
                      transformOrigin: 'top left',
                      width: `${BASE_NODE_WIDTH}px`,
                      height: `${BASE_NODE_HEIGHT}px`,
                      willChange: "transform",
                    }}
                    // Removed onClick handler as we're handling selection in onMouseDown
                    onMouseDown={(e) => {
                      // prevent text selection on drag start
                      e.stopPropagation()
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
                      className={`relative w-64 transition-all duration-200 ease-out ${
                        isConnecting && connectionStart === node.id 
                          ? "ring-2 ring-primary shadow-lg" 
                          : selectedNode === node.id 
                            ? "ring-2 ring-primary shadow-lg" 
                            : "hover:shadow-lg border border-gray-200 dark:border-gray-700"
                      } bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl overflow-hidden`}
                      style={{
                        boxShadow: selectedNode === node.id 
                          ? '0 0 0 2px #3b82f6, 0 4px 20px -5px rgba(0,0,0,0.1)' 
                          : '0 4px 20px -5px rgba(0,0,0,0.05)'
                      }}
                    >
                      {/* Left connection handle (green) - for incoming connections */}
                      <button
                        title="Connect to this node"
                        className="absolute -left-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-green-500 shadow-md border-2 border-white dark:border-gray-800 hover:scale-110 transition-all duration-200 ease-out z-10"
                        style={{
                          boxShadow: '0 2px 10px -2px rgba(34, 197, 94, 0.5)'
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (isConnecting && connectionStart && connectionStart !== node.id) {
                            // Only allow connecting to this node's left handle (incoming connection)
                            handleEndConnection(node.id, e as unknown as React.MouseEvent)
                          }
                        }}
                      />
                      
                      {/* Right connection handle (blue) - for outgoing connections */}
                      <button
                        title="Start connection from this node"
                        className="absolute -right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md border-2 border-white dark:border-gray-800 hover:scale-110 transition-all duration-200 ease-out z-10"
                        style={{
                          boxShadow: '0 2px 10px -2px rgba(14, 165, 233, 0.5)'
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (!isConnecting) {
                            // Start a new connection from this node's right handle
                            setIsConnecting(true)
                            setConnectionStart(node.id)
                          }
                        }}
                      />

                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getNodeColor(node.type)} shadow-inner`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                                {node.label}
                              </h4>
                              <p className="text-xs text-muted-foreground font-medium">
                                {node.category}
                              </p>
                            </div>
                          </div>
                          {!INITIAL_NODES.some((n) => n.id === node.id) && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNode(node.id)
                              }}
                              aria-label="Delete node"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Impact Score</span>
                              <Badge
                                variant={node.impact > 80 ? "destructive" : node.impact > 50 ? "secondary" : "default"}
                                className="text-xs font-mono font-bold px-2 py-0.5"
                              >
                                {node.impact}%
                              </Badge>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                              <div 
                                className={`h-full rounded-full ${
                                  node.impact > 80 ? 'bg-red-500' : 
                                  node.impact > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${node.impact}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                              <div className="text-muted-foreground font-medium">Inputs</div>
                              <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                                {node.inputs.length}
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                              <div className="text-muted-foreground font-medium">Outputs</div>
                              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                {node.outputs.length}
                              </div>
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
        <div className="w-80 border-l bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
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
                        <Input 
                          id="node-label" 
                          value={nodes.find((n) => n.id === selectedNode)?.label || ""} 
                          onChange={(e) => {
                            const newLabel = e.target.value
                            setNodes(prev => 
                              prev.map(node => 
                                node.id === selectedNode 
                                  ? { ...node, label: newLabel } 
                                  : node
                              )
                            )
                          }}
                        />
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
