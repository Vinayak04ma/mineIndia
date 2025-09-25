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
  Link2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  Shield,
  HeartHandshake,
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
  const BASE_UI_ZOOM = 0.9
  
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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [expandedSection, setExpandedSection] = useState<'inputs' | 'outputs' | null>(null)
  const [newInput, setNewInput] = useState('')
  const [newOutput, setNewOutput] = useState('')


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
    // Raw Material Extraction
    {
      type: "iron_ore_mine",
      label: "Iron Ore Mine",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    {
      type: "bauxite_mine",
      label: "Bauxite Mine",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    {
      type: "copper_ore_mine",
      label: "Copper Ore Mine",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    {
      type: "coal_coke_supplier",
      label: "Coal / Coke Supplier",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    {
      type: "flux_supplier",
      label: "Flux Supplier (limestone, dolomite, quartz)",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    {
      type: "alloying_material_supplier",
      label: "Alloying Material Supplier (Ni, Cr, Zn)",
      icon: Factory,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      category: "Raw Material Extraction"
    },
    
    // Material Processing / Smelting
    {
      type: "smelting_plant",
      label: "Blast Furnace / Electric Arc Furnace / Hydrometallurgical Plant",
      icon: Settings,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      category: "Material Processing / Smelting"
    },
    {
      type: "secondary_refining",
      label: "Secondary Refining (alloying, purification)",
      icon: Settings,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      category: "Material Processing / Smelting"
    },
    {
      type: "casting_furnace",
      label: "Casting / Forming Furnace",
      icon: Settings,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      category: "Material Processing / Smelting"
    },
    
    // Shaping / Forming
    {
      type: "rolling_mill",
      label: "Rolling Mill",
      icon: Settings,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      category: "Shaping / Forming"
    },
    {
      type: "extrusion_forging",
      label: "Extrusion / Forging / Casting Unit",
      icon: Settings,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      category: "Shaping / Forming"
    },
    {
      type: "finishing_unit",
      label: "Finishing / Machining Unit",
      icon: Settings,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      category: "Shaping / Forming"
    },
    
    // Waste & Emissions
    {
      type: "air_emission",
      label: "Air Emission Node",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      category: "Waste & Emissions"
    },
    {
      type: "water_effluent",
      label: "Water Effluent Node",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      category: "Waste & Emissions"
    },
    {
      type: "solid_waste",
      label: "Solid Waste Node",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      category: "Waste & Emissions"
    },
    {
      type: "hazardous_waste",
      label: "Hazardous Waste Node",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      category: "Waste & Emissions"
    },
    
    // Circularity & End-of-Life
    {
      type: "scrap_collection",
      label: "Scrap Collection",
      icon: Recycle,
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      category: "Circularity & End-of-Life"
    },
    {
      type: "product_recycling",
      label: "Product Recycling / EAF Feed",
      icon: Recycle,
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      category: "Circularity & End-of-Life"
    },
    {
      type: "industrial_symbiosis",
      label: "Industrial Symbiosis Partner (slag → cement, fly ash → bricks)",
      icon: Recycle,
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      category: "Circularity & End-of-Life"
    },
    {
      type: "landfill_incineration",
      label: "Landfill / Incineration",
      icon: Recycle,
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      category: "Circularity & End-of-Life"
    },
    
    // Energy & Policy Compliance
    {
      type: "grid_electricity",
      label: "Grid Electricity Node (state-specific)",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      category: "Energy & Policy Compliance"
    },
    {
      type: "renewable_energy",
      label: "Onsite Renewable Energy Node",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      category: "Energy & Policy Compliance"
    },
    {
      type: "epr_compliance",
      label: "EPR Compliance Node",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      category: "Energy & Policy Compliance"
    },
    {
      type: "carbon_credit",
      label: "Carbon Credit Node",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      category: "Energy & Policy Compliance"
    },
    {
      type: "rpo_compliance",
      label: "RPO Compliance Node",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      category: "Energy & Policy Compliance"
    },
    
    // Socio-Economic & Human Health
    {
      type: "employment",
      label: "Employment Node",
      icon: Users,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      category: "Socio-Economic & Human Health"
    },
    {
      type: "workplace_safety",
      label: "Workplace Safety / Exposure Node",
      icon: Shield,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      category: "Socio-Economic & Human Health"
    },
    {
      type: "csr_impact",
      label: "CSR & Community Impact Node",
      icon: HeartHandshake,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      category: "Socio-Economic & Human Health"
    }
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
      const rawX = coords.x - dragOffset.x
      const rawY = coords.y - dragOffset.y

      // CHANGED: Clamp the node's position to stay within the canvas boundaries.
      const newX = Math.max(0, Math.min(rawX, CANVAS_WIDTH - BASE_NODE_WIDTH))
      const newY = Math.max(0, Math.min(rawY, CANVAS_HEIGHT - BASE_NODE_HEIGHT))
      
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
    const rawX = coords.x - dragOffset.x / zoomLevel
    const rawY = coords.y - dragOffset.y / zoomLevel

    // CHANGED: Clamp the dropped node's position as well
    const x = Math.max(0, Math.min(rawX, CANVAS_WIDTH - BASE_NODE_WIDTH))
    const y = Math.max(0, Math.min(rawY, CANVAS_HEIGHT - BASE_NODE_HEIGHT))

    const nodeTypeInfo = nodeTypes.find((nt) => nt.type === draggedNodeType)!

    const newNode: ProcessNode = {
      id: `node_${Date.now()}`,
      type: draggedNodeType,
      label: `New ${nodeTypeInfo.label}`,
      x: x,
      y: y,
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
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      <div className="flex h-[calc(100vh-4rem)] relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        {/* Left Sidebar Toggle Button */}
        <button 
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-gray-800 border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${leftSidebarOpen ? 'ml-64' : 'ml-0'}`}
        >
          {leftSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="sr-only">{leftSidebarOpen ? 'Collapse' : 'Expand'} left sidebar</span>
        </button>
        {/* Left Sidebar - Node Palette */}
        <div 
          className={`w-80 border-r bg-muted/10 dark:bg-gray-900/50 p-4 flex flex-col h-full transition-all duration-200 ease-in-out ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute'}`}
          style={{ zIndex: 10 }}
        >
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 -mr-2 py-1">
            <div className="bg-background/50 dark:bg-gray-800/30 rounded-lg p-4 border">
              <h2 className="text-lg font-semibold mb-4">Process Nodes</h2>
              <p className="text-xs text-muted-foreground mb-3">Drag nodes to canvas or click to add</p>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon
                    return (
                      <Card
                        key={nodeType.type}
                        className="cursor-grab hover:shadow-md transition-all p-3 active:cursor-grabbing border border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm"
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
              <div className="space-y-4 bg-background/50 dark:bg-gray-800/30 rounded-lg p-4 border">
                <h3 className="font-semibold text-sm">Scenario Management</h3>
                <Select defaultValue="scenario1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scenario1">Conventional Process</SelectItem>
                    <SelectItem value="scenario2">Sustainable Alternative</SelectItem>
                    <SelectItem value="scenario3">Circular Economy</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-background hover:bg-muted/50">
                    <Save className="mr-2 h-3 w-3" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-background hover:bg-muted/50">
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-background/50 dark:bg-gray-800/30 rounded-lg p-4 border">
              <h3 className="font-semibold text-sm mb-3">Real-time Calculation</h3>
              <div className="space-y-4">
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

        {/* Right Sidebar Toggle Button */}
        <button 
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-gray-800 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${rightSidebarOpen ? 'mr-80' : 'mr-0'}`}
        >
          {rightSidebarOpen ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">{rightSidebarOpen ? 'Collapse' : 'Expand'} right sidebar</span>
        </button>

        {/* Main Canvas Area */}
        <div className={`flex-1 relative overflow-hidden transition-all duration-200 ${leftSidebarOpen ? 'ml-0' : 'ml-0'} ${rightSidebarOpen ? 'mr-0' : 'mr-0'}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 dark:to-gray-900/30 pointer-events-none"></div>

          {/* Canvas Header */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-2 border border-gray-200/80 dark:border-gray-700/80 shadow-xl shadow-black/5 dark:shadow-black/20">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex-shrink-0 flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-100/50 dark:border-blue-800/30">
                  <Palette className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">Interactive LCA Mapping</span>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap">
                    <span className="font-medium text-foreground">{nodes.length}</span> nodes
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap">
                    <span className="font-medium text-foreground">{connections.length}</span> connections
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap">
                    <span className="font-medium text-foreground">{Math.round(zoomLevel * BASE_UI_ZOOM * 100)}%</span> zoom
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg p-1 border border-gray-100 dark:border-gray-700/50">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleZoomOut} 
                  disabled={zoomLevel <= 0.5}
                  className="h-8 w-8 p-0 flex-shrink-0 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700/50 text-muted-foreground hover:text-foreground"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                  <span className="sr-only">Zoom Out</span>
                </Button>
                <div className="relative flex items-center justify-center w-16">
                  <span className="text-xs font-medium text-muted-foreground">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleZoomIn} 
                  disabled={zoomLevel >= 2}
                  className="h-8 w-8 p-0 flex-shrink-0 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700/50 text-muted-foreground hover:text-foreground"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                  <span className="sr-only">Zoom In</span>
                </Button>
                {/* CHANGED: Reset View button now resets pan as well */}
                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                  className="h-8 px-3 text-xs font-medium flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-gray-200/60 dark:hover:bg-gray-700/50"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset View
                </Button>
                <Button
                  size="sm"
                  variant={isConnecting ? "default" : "ghost"}
                  onClick={() => {
                    setIsConnecting(!isConnecting)
                    setConnectionStart(null)
                    setTempConnection(null)
                  }}
                  className={`h-8 px-3 text-xs font-medium flex-shrink-0 ${isConnecting ? 'bg-blue-600 hover:bg-blue-700' : 'text-muted-foreground hover:text-foreground hover:bg-gray-200/60 dark:hover:bg-gray-700/50'}`}
                >
                  <Link2 className={`h-3.5 w-3.5 mr-1.5 ${isConnecting ? 'text-white' : 'text-current'}`} />
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const newNodeData: ProcessNode = {
                      id: `node_${Date.now()}`, 
                      type: "processing", 
                      label: "New Process", 
                      x: 0, y: 0,
                      inputs: ["Input 1"], 
                      outputs: ["Output 1"], 
                      impact: 50, 
                      category: "Processing & Manufacturing"
                    }
                    addNodeToView(newNodeData)
                  }}
                  className="h-8 px-3 text-xs font-medium flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-gray-200/60 dark:hover:bg-gray-700/50"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Node
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setNodes(INITIAL_NODES.map((n) => ({ ...n, inputs: [...n.inputs], outputs: [...n.outputs] })))
                    setConnections(INITIAL_CONNECTIONS.map((c) => ({ ...c })))
                    setSelectedNode(null)
                    setZoomLevel(1)
                    setPanOffset({ x: 0, y: 0 })
                  }}
                  className="h-8 px-3 text-xs font-medium flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-gray-200/60 dark:hover:bg-gray-700/50"
                >
                  <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset All
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-700/50 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="absolute inset-0 pt-24 pb-4 sm:pt-20">
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
                      className={`relative w-full transition-all duration-300 ease-out ${
                        selectedNode === node.id 
                          ? "ring-2 ring-primary shadow-xl scale-[1.02]" 
                          : "hover:shadow-lg border border-gray-200/80 dark:border-gray-700/80 hover:border-primary/30"
                      } bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl overflow-hidden border-t-0 relative group`}
                      style={{
                        boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
                        borderTop: '3px solid ' + (node.impact > 80 ? '#ef4444' : node.impact > 50 ? '#eab308' : '#22c55e'),
                        transform: selectedNode === node.id ? 'translateY(-1px)' : 'none'
                      }}
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
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground font-medium">Impact Score</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-muted-foreground">
                                    {node.impact > 80 ? 'High' : node.impact > 50 ? 'Medium' : 'Low'}
                                  </span>
                                  <Badge 
                                    variant={node.impact > 80 ? "destructive" : node.impact > 50 ? "secondary" : "default"} 
                                    className="text-xs font-mono font-bold px-2 py-0.5 h-5 min-w-[36px] flex items-center justify-center"
                                  >
                                    {node.impact}
                                  </Badge>
                                </div>
                              </div>
                              <div className="w-full bg-gray-100 dark:bg-gray-800/60 rounded-full h-2 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                                    node.impact > 80 ? 'bg-red-500' : node.impact > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`} 
                                  style={{ 
                                    width: `${node.impact}%`,
                                    boxShadow: `0 0 8px ${
                                      node.impact > 80 
                                        ? 'rgba(239, 68, 68, 0.5)' 
                                        : node.impact > 50 
                                          ? 'rgba(234, 179, 8, 0.5)' 
                                          : 'rgba(34, 197, 94, 0.5)'
                                    }`
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs opacity-0 h-0 pointer-events-none">
                            <div className="invisible">
                              <div className="invisible">
                                <span className="invisible"></span>
                              </div>
                              <div className="invisible">
                                {node.inputs.length}
                              </div>
                            </div>
                            <div className="invisible">
                              <div className="invisible">
                                <span className="invisible"></span>
                              </div>
                              <div className="invisible">
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
        <div 
          className={`w-80 border-l bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg flex flex-col h-full transition-all duration-200 ease-in-out ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}
          style={{ zIndex: 10 }}
        >
          <Tabs defaultValue="properties" className="h-full">
            <TabsList className="grid w-full grid-cols-2 m-4 bg-muted/50 p-1 h-10">
              <TabsTrigger 
                value="properties" 
                className="text-xs font-medium data-[state=active]:shadow-sm data-[state=active]:bg-background"
              >
                Properties
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="text-xs font-medium data-[state=active]:shadow-sm data-[state=active]:bg-background"
              >
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="p-4 space-y-6 flex-1 overflow-y-auto">
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

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <button 
                        className="w-full flex items-center justify-between p-3 text-left font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setExpandedSection(expandedSection === 'inputs' ? null : 'inputs')}
                      >
                        <div className="flex items-center">
                          <ChevronRight className={`h-4 w-4 mr-2 transition-transform ${expandedSection === 'inputs' ? 'rotate-90' : ''}`} />
                          <span>Inputs</span>
                          <Badge variant="outline" className="ml-2">
                            {nodes.find(n => n.id === selectedNode)?.inputs.length || 0}
                          </Badge>
                        </div>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {expandedSection === 'inputs' && (
                        <div className="p-3 border-t space-y-3">
                          <div className="space-y-2">
                            {nodes.find(n => n.id === selectedNode)?.inputs.map((input, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-800">
                                <span className="text-sm">{input}</span>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0 text-destructive"
                                  onClick={() => {
                                    setNodes(prev => 
                                      prev.map(node => 
                                        node.id === selectedNode
                                          ? { ...node, inputs: node.inputs.filter((_, i) => i !== index) }
                                          : node
                                      )
                                    )
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              value={newInput}
                              onChange={(e) => setNewInput(e.target.value)}
                              placeholder="New input name"
                              className="flex-1"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => {
                                if (newInput.trim()) {
                                  setNodes(prev => 
                                    prev.map(node => 
                                      node.id === selectedNode
                                        ? { ...node, inputs: [...node.inputs, newInput.trim()] }
                                        : node
                                    )
                                  )
                                  setNewInput('')
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <button 
                        className="w-full flex items-center justify-between p-3 text-left font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setExpandedSection(expandedSection === 'outputs' ? null : 'outputs')}
                      >
                        <div className="flex items-center">
                          <ChevronRight className={`h-4 w-4 mr-2 transition-transform ${expandedSection === 'outputs' ? 'rotate-90' : ''}`} />
                          <span>Outputs</span>
                          <Badge variant="outline" className="ml-2">
                            {nodes.find(n => n.id === selectedNode)?.outputs.length || 0}
                          </Badge>
                        </div>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {expandedSection === 'outputs' && (
                        <div className="p-3 border-t space-y-3">
                          <div className="space-y-2">
                            {nodes.find(n => n.id === selectedNode)?.outputs.map((output, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-800">
                                <span className="text-sm">{output}</span>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0 text-destructive"
                                  onClick={() => {
                                    setNodes(prev => 
                                      prev.map(node => 
                                        node.id === selectedNode
                                          ? { ...node, outputs: node.outputs.filter((_, i) => i !== index) }
                                          : node
                                      )
                                    )
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              value={newOutput}
                              onChange={(e) => setNewOutput(e.target.value)}
                              placeholder="New output name"
                              className="flex-1"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => {
                                if (newOutput.trim()) {
                                  setNodes(prev => 
                                    prev.map(node => 
                                      node.id === selectedNode
                                        ? { ...node, outputs: [...node.outputs, newOutput.trim()] }
                                        : node
                                    )
                                  )
                                  setNewOutput('')
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      )}
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

            <TabsContent value="results" className="p-4 space-y-6 flex-1 overflow-y-auto">
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