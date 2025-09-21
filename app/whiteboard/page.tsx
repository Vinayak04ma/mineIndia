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
      x: 450,
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
      x: 800,
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
  
  // Canvas (content) zoom. Base UI is already at 80% via CSS zoom
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [connectionStartSide, setConnectionStartSide] = useState<'left' | 'right' | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // NEW: State for panning the canvas
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })


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

  // CHANGED: Unified function to convert screen coordinates to canvas coordinates
  const screenToCanvasCoords = (screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (screenX - rect.left - panOffset.x) / zoomLevel
    const y = (screenY - rect.top - panOffset.y) / zoomLevel
    return { x, y }
  }
  
  const handleZoom = (delta: number, mouseX: number, mouseY: number) => {
    const newZoom = Math.max(0.5, Math.min(2, zoomLevel + delta));
    
    const worldPos = screenToCanvasCoords(mouseX, mouseY);
    
    const newPanOffsetX = mouseX - worldPos.x * newZoom;
    const newPanOffsetY = mouseY - worldPos.y * newZoom;
    
    setZoomLevel(newZoom);
    setPanOffset({ x: newPanOffsetX, y: newPanOffsetY });
  }

  const handleZoomIn = () => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    handleZoom(0.2, width / 2, height / 2);
  }

  const handleZoomOut = () => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    handleZoom(-0.2, width / 2, height / 2);
  }
  
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.ctrlKey) {
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta, event.clientX, event.clientY);
    } else {
      // Pan with wheel
      setPanOffset(prev => ({
        x: prev.x - event.deltaX,
        y: prev.y - event.deltaY,
      }));
    }
  };

  const handleStartConnection = (nodeId: string, event: React.MouseEvent, side?: 'left' | 'right') => {
    event.stopPropagation()
    setIsConnecting(true)
    setConnectionStart(nodeId)
    if (side) setConnectionStartSide(side)
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
    }
    setIsConnecting(false)
    setConnectionStart(null)
    setConnectionStartSide(null)
    setTempConnection(null)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent) => {
    const coords = screenToCanvasCoords(event.clientX, event.clientY)

    if (isPanning) {
      const dx = event.clientX - panStart.x
      const dy = event.clientY - panStart.y
      setPanOffset({ x: panOffset.x + dx, y: panOffset.y + dy })
      setPanStart({ x: event.clientX, y: event.clientY })
      return
    }

    if (isDraggingNode) {
      const newX = coords.x - dragOffset.x
      const newY = coords.y - dragOffset.y
      
      setNodes((prev) =>
        prev.map((n) =>
          n.id === isDraggingNode ? { ...n, x: newX, y: newY } : n
        )
      )
    } else if (isConnecting && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect()
      // Temp connection line should be in screen space, not canvas space
      setTempConnection({
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      })
    }
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
    // Offset is relative to the element, so it's independent of pan/zoom
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  // NEW: Handle starting a pan
  const handleCanvasMouseDown = (event: React.MouseEvent) => {
    // Start panning if left-clicking on the background or middle-clicking anywhere
    if (event.button === 1 || (event.button === 0 && event.target === event.currentTarget)) {
      setIsPanning(true)
      setPanStart({ x: event.clientX, y: event.clientY })
      // Change cursor style for panning feedback
      if(canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    }
  }
  
  const handleNodeMouseDown = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // Only drag with the left mouse button
    if (event.button !== 0) return

    setSelectedNode(nodeId)
    setIsDraggingNode(nodeId)

    const coords = screenToCanvasCoords(event.clientX, event.clientY)
    const node = nodes.find((n) => n.id === nodeId)!

    setDragOffset({
      x: coords.x - node.x,
      y: coords.y - node.y,
    })
  }
  
  const handleMouseUp = () => {
    setIsDraggingNode(null)
    if (isPanning && canvasRef.current) {
      canvasRef.current.style.cursor = 'grab'
    }
    setIsPanning(false)
  }
  
  // CHANGED: Smarter node placement on drop
  const handleCanvasDrop = (event: React.MouseEvent) => {
    if (!draggedNodeType || !canvasRef.current) return

    const coords = screenToCanvasCoords(event.clientX, event.clientY)
    const x = coords.x - dragOffset.x / zoomLevel
    const y = coords.y - dragOffset.y / zoomLevel

    const nodeTypeInfo = nodeTypes.find((nt) => nt.type === draggedNodeType)!

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

  // CHANGED: Add node to the center of the current view
  const addNodeToView = (nodeType: ProcessNode) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const viewCenter = screenToCanvasCoords(rect.left + rect.width / 2, rect.top + rect.height / 2)
    
    const newNode = {
      ...nodeType,
      x: viewCenter.x - (BASE_NODE_WIDTH / 2),
      y: viewCenter.y - (BASE_NODE_HEIGHT / 2) + Math.random() * 40 - 20, // Add some jitter
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
                          const newNodeData: ProcessNode = {
                            id: `node_${Date.now()}`,
                            type: nodeType.type,
                            label: `New ${nodeType.label}`,
                            x: 0, y: 0, // Placeholder, will be replaced
                            inputs: ["Input 1"], outputs: ["Output 1"],
                            impact: Math.floor(Math.random() * 100),
                            category: nodeType.label,
                          }
                          addNodeToView(newNodeData)
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
        <div className="flex-1 relative overflow-hidden"> {/* CHANGED: overflow-hidden on the parent */}
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
                {/* CHANGED: Reset View button now resets pan as well */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                >
                  Reset View
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newNodeData: ProcessNode = {
                      id: `node_${Date.now()}`, type: "processing", label: "New Process", x: 0, y: 0,
                      inputs: ["Input 1"], outputs: ["Output 1"], impact: 50, category: "Processing & Manufacturing"
                    }
                    addNodeToView(newNodeData)
                  }}
                >
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
                    setZoomLevel(1)
                    setPanOffset({ x: 0, y: 0 })
                  }}
                >
                  <RefreshCcw className="mr-2 h-3 w-3" />
                  Reset All
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
              className={`relative w-full h-full cursor-grab ${isPanning ? 'cursor-grabbing' : ''}`}
              onMouseDown={handleCanvasMouseDown}
              onMouseUp={(e) => {
                handleCanvasDrop(e)
                handleMouseUp()
              }}
              onMouseLeave={() => {
                setDraggedNodeType(null)
                setIsConnecting(false)
                setConnectionStart(null)
                setTempConnection(null)
                handleMouseUp()
              }}
              onMouseMove={handleCanvasMouseMove}
              onWheel={handleWheel}
            >
              {/* NEW: This is the transformed container for all canvas elements */}
              <div
                className="absolute top-0 left-0"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'top left',
                  willChange: 'transform',
                }}
              >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                <style>{`
                  @keyframes dash {
                    to { stroke-dashoffset: -56; }
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
                  }
                `}</style>
                {/* Render connections */}
                {connections.map((connection) => {
                  const fromNode = nodes.find((n) => n.id === connection.from)
                  const toNode = nodes.find((n) => n.id === connection.to)
                  if (!fromNode || !toNode) return null
                  
                  const fromX = fromNode.x + BASE_NODE_WIDTH
                  const toX = toNode.x
                  const fromY = fromNode.y + BASE_NODE_HEIGHT / 2
                  const toY = toNode.y + BASE_NODE_HEIGHT / 2
                  
                  const dx = Math.abs(toX - fromX)
                  const curveIntensity = Math.min(dx * 0.5, 100)
                  const controlX1 = fromX + curveIntensity
                  const controlX2 = toX - curveIntensity
                  const path = `M${fromX},${fromY} C${controlX1},${fromY} ${controlX2},${toY} ${toX},${toY}`
                  
                  const midX = (fromX + toX) / 2
                  const midY = (fromY + toY) / 2
                  
                  return (
                    <g key={connection.id} className="connection-group">
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
                      <g transform={`translate(${midX}, ${midY})`}>
                        <foreignObject 
                          x="-50" y="-16" width="100" height="64"
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

                {/* Arrow marker and effects */}
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" /><stop offset="50%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <marker id="arrowheadPrimary" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L12,4 L0,8 Z" fill="url(#flowGradient)" />
                  </marker>
                </defs>
              </svg>

              {/* Temp connection line - must be outside the transformed container */}
              {isConnecting && connectionStart && tempConnection && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <line
                        x1={(nodes.find(n => n.id === connectionStart)!.x * zoomLevel + panOffset.x) + (BASE_NODE_WIDTH * zoomLevel)}
                        y1={(nodes.find(n => n.id === connectionStart)!.y * zoomLevel + panOffset.y) + (BASE_NODE_HEIGHT * zoomLevel / 2)}
                        x2={tempConnection.x}
                        y2={tempConnection.y}
                        stroke="url(#flowGradient)" strokeWidth="2" strokeDasharray="5,5"
                        markerEnd="url(#arrowheadPrimary)"
                    />
                </svg>
                )}

              {/* Render nodes */}
              {nodes.map((node) => {
                const Icon = getNodeIcon(node.type)
                return (
                  <div
                    key={node.id}
                    className={`absolute select-none ${isDraggingNode === node.id ? "transition-none shadow-xl z-50" : "transition-transform duration-150 ease-out"} ${isDraggingNode === node.id ? "ring-2 ring-primary scale-105" : selectedNode === node.id ? "ring-2 ring-primary" : "hover:shadow-lg"} ${isDraggingNode === node.id ? "cursor-grabbing z-50" : "cursor-grab"} ${isConnecting ? "cursor-pointer" : ""} transform-gpu will-change-transform`}
                    style={{
                      left: 0,
                      top: 0,
                      transform: `translate(${node.x}px, ${node.y}px)`,
                      width: `${BASE_NODE_WIDTH}px`,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      if (isConnecting) {
                        if (!connectionStart) handleStartConnection(node.id, e)
                        else handleEndConnection(node.id, e)
                      } else {
                        handleNodeMouseDown(node.id, e)
                      }
                    }}
                  >
                    <Card
                      className={`relative w-full transition-all duration-200 ease-out ${selectedNode === node.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-lg border border-gray-200 dark:border-gray-700"} bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl overflow-hidden`}
                    >
                      {/* Left connection handle (green) */}
                      <button
                        title="Connect to this node"
                        className="absolute -left-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-green-500 shadow-md border-2 border-white dark:border-gray-800 hover:scale-110 transition-all z-10"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (isConnecting && connectionStart && connectionStart !== node.id) {
                            handleEndConnection(node.id, e as unknown as React.MouseEvent, 'left')
                          }
                        }}
                      />
                      
                      {/* Right connection handle (blue) */}
                      <button
                        title="Start connection from this node"
                        className="absolute -right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md border-2 border-white dark:border-gray-800 hover:scale-110 transition-all z-10"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (!isConnecting) {
                            handleStartConnection(node.id, e as unknown as React.MouseEvent, 'right')
                          }
                        }}
                      />

                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getNodeColor(node.type)} shadow-inner`}>
                              <Icon className="h-4 w-4" />
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
                              size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10"
                              onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }} aria-label="Delete node"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground font-medium">Impact Score</span>
                              <Badge variant={node.impact > 80 ? "destructive" : node.impact > 50 ? "secondary" : "default"} className="text-xs font-mono font-bold px-2 py-0.5">
                                {node.impact}%
                              </Badge>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                              <div className={`h-full rounded-full ${node.impact > 80 ? 'bg-red-500' : node.impact > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${node.impact}%` }} />
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
              </div> {/* End of transformed container */}
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