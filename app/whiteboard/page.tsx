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
  const CANVAS_WIDTH = 10000
  const CANVAS_HEIGHT = 5000
  const BASE_NODE_WIDTH = 192
  const BASE_NODE_HEIGHT = 120
  const BASE_UI_ZOOM = 0.9
  
  const getNodeScale = (zoom: number) => {
    return Math.max(0.5, Math.min(2, zoom));
  }
  const INITIAL_NODES: ProcessNode[] = [
    {
      id: "1",
      type: "bauxite_mine",
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
      type: "smelting_plant",
      label: "Alumina Refining",
      x: 450,
      y: 200,
      inputs: ["Bauxite Ore", "Caustic Soda"],
      outputs: ["Alumina", "Red Mud"],
      impact: 78,
      category: "Material Processing / Smelting",
    },
    {
      id: "3",
      type: "smelting_plant",
      label: "Aluminum Smelting",
      x: 800,
      y: 200,
      inputs: ["Alumina", "Carbon Anodes"],
      outputs: ["Primary Aluminum", "CO2"],
      impact: 92,
      category: "Material Processing / Smelting",
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
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [connectionStartSide, setConnectionStartSide] = useState<'left' | 'right' | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [expandedSection, setExpandedSection] = useState<'inputs' | 'outputs' | null>(null)
  const [newInput, setNewInput] = useState('')
  const [newOutput, setNewOutput] = useState('')


  const deleteNode = (nodeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isInitial = INITIAL_NODES.some((n) => n.id === nodeId);
    if (isInitial) return;
    
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) => prev.filter((c) => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) setSelectedNode(null);
    if (isDraggingNode === nodeId) setIsDraggingNode(null);
  }

  const nodeTypes = [
    { type: "bauxite_mine", label: "Bauxite Mine", icon: Factory, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", category: "Raw Material Extraction" },
    { type: "smelting_plant", label: "Smelting Plant", icon: Settings, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300", category: "Material Processing / Smelting" },
    { type: "rolling_mill", label: "Rolling Mill", icon: Settings, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300", category: "Shaping / Forming" },
    { type: "air_emission", label: "Air Emission", icon: AlertTriangle, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", category: "Waste & Emissions" },
    { type: "scrap_collection", label: "Scrap Collection", icon: Recycle, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", category: "Circularity & End-of-Life" },
    { type: "grid_electricity", label: "Grid Electricity", icon: Zap, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300", category: "Energy & Policy Compliance" },
    { type: "employment", label: "Employment", icon: Users, color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300", category: "Socio-Economic & Human Health" },
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

  const screenToCanvasCoords = (screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (screenX - rect.left - panOffset.x) / zoomLevel
    const y = (screenY - rect.top - panOffset.y) / zoomLevel
    return { x, y }
  }
  
  const handleZoom = (delta: number, mouseX: number, mouseY: number) => {
    const currentX = (mouseX - panOffset.x) / zoomLevel;
    const currentY = (mouseY - panOffset.y) / zoomLevel;
    const newZoom = Math.max(0.5, Math.min(2, zoomLevel + delta));
    const newPanOffsetX = mouseX - currentX * newZoom;
    const newPanOffsetY = mouseY - currentY * newZoom;
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
    const zoomFactor = event.ctrlKey ? 0.05 : 0.01;
    const delta = event.deltaY > 0 ? -zoomFactor : zoomFactor;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    handleZoom(delta, mouseX, mouseY);
    if (event.ctrlKey) {
      event.stopPropagation();
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
      const newX = Math.max(0, Math.min(rawX, CANVAS_WIDTH - BASE_NODE_WIDTH))
      const newY = Math.max(0, Math.min(rawY, CANVAS_HEIGHT - BASE_NODE_HEIGHT))
      setNodes((prev) => prev.map((n) => n.id === isDraggingNode ? { ...n, x: newX, y: newY } : n))
    } else if (isConnecting && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect()
      setTempConnection({ x: event.clientX - canvasRect.left, y: event.clientY - canvasRect.top, })
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
    setDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top, })
  }

  const handleCanvasMouseDown = (event: React.MouseEvent) => {
    if (event.button === 1 || (event.button === 0 && event.target === event.currentTarget)) {
      setIsPanning(true)
      setPanStart({ x: event.clientX, y: event.clientY })
      if(canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    }
  }
  
  const handleNodeMouseDown = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (event.button !== 0) return
    setSelectedNode(nodeId)
    setIsDraggingNode(nodeId)
    const coords = screenToCanvasCoords(event.clientX, event.clientY)
    const node = nodes.find((n) => n.id === nodeId)!
    setDragOffset({ x: coords.x - node.x, y: coords.y - node.y, })
  }
  
  const handleMouseUp = () => {
    setIsDraggingNode(null)
    if (isPanning && canvasRef.current) {
      canvasRef.current.style.cursor = 'grab'
    }
    setIsPanning(false)
  }
  
  const handleCanvasDrop = (event: React.MouseEvent) => {
    if (!draggedNodeType || !canvasRef.current) return
    const coords = screenToCanvasCoords(event.clientX, event.clientY)
    const rawX = coords.x - dragOffset.x / zoomLevel
    const rawY = coords.y - dragOffset.y / zoomLevel
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
      category: nodeTypeInfo.category,
    }
    setNodes((prev) => [...prev, newNode])
    setDraggedNodeType(null)
  }

  const addNodeToView = (nodeType: ProcessNode) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const viewCenter = screenToCanvasCoords(rect.left + rect.width / 2, rect.top + rect.height / 2)
    const newNode = { ...nodeType, x: viewCenter.x - (BASE_NODE_WIDTH / 2), y: viewCenter.y - (BASE_NODE_HEIGHT / 2) + Math.random() * 40 - 20, }
    setNodes((prev) => [...prev, newNode])
  }

  const getNodeIcon = (type: string) => {
    const nodeType = nodeTypes.find((nt) => nt.type === type)
    return nodeType?.icon || Factory
  }

  const getNodeColor = (type: string) => {
    const nodeType = nodeTypes.find((nt) => nt.type === type)
    return nodeType?.color || "bg-slate-100 dark:bg-slate-800"
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Navigation />

      <div className="flex h-[calc(100vh-4rem)] relative">
        <button 
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className={`absolute left-0 top-1/2 z-30 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-y border-r border-slate-200 dark:border-slate-700 rounded-r-lg p-2 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out ${leftSidebarOpen ? 'translate-x-80' : 'translate-x-0'}`}
        >
          {leftSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        
        <aside 
          className={`w-80 border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg p-4 flex flex-col h-full transition-transform duration-300 ease-in-out absolute z-20 ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 -mr-2 py-1">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-3 text-slate-800 dark:text-slate-200">
                Process Nodes
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Drag to canvas or click to add.</p>
            </div>
            
            <ScrollArea className="h-[calc(100%-4rem)]">
              <div className="space-y-3 pr-2">
                {nodeTypes.map((nodeType) => {
                  const Icon = nodeType.icon
                  return (
                    <Card
                      key={nodeType.type}
                      className="cursor-grab hover:shadow-lg transition-all duration-200 p-3 active:cursor-grabbing border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-600 hover:scale-[1.02] group"
                      onMouseDown={(e) => handleNodeDragStart(nodeType.type, e)}
                      onClick={() => addNodeToView({
                        id: `node_${Date.now()}`,
                        type: nodeType.type,
                        label: `New ${nodeType.label}`,
                        x: 0, y: 0,
                        inputs: ["Input 1"], outputs: ["Output 1"],
                        impact: Math.floor(Math.random() * 100),
                        category: nodeType.category,
                      })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${nodeType.color} shadow-sm group-hover:shadow-md transition-all duration-200`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{nodeType.label}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{nodeType.category}</p>
                        </div>
                        <Plus className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </div>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </aside>

        <button 
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className={`absolute right-0 top-1/2 z-30 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-y border-l border-slate-200 dark:border-slate-700 rounded-l-lg p-2 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out ${rightSidebarOpen ? '-translate-x-80' : 'translate-x-0'}`}
        >
          {rightSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950"></div>
          <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0), radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px'
          }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#f1f5f9)] dark:bg-[radial-gradient(ellipse_at_center,transparent_60%,#020617)] pointer-events-none"></div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center justify-center gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-1.5 border border-slate-200/80 dark:border-slate-700/80 shadow-lg">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap">
                    <span className="font-medium text-foreground">{nodes.length}</span> nodes
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800/50 whitespace-nowrap">
                    <span className="font-medium text-foreground">{connections.length}</span> connections
                  </span>
              
             
                </div>
                <Button size="icon" variant="ghost" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}><ZoomOut className="h-4 w-4" /></Button>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-16 text-center cursor-pointer" onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}>{Math.round(zoomLevel * 100)}%</div>
                <Button size="icon" variant="ghost" onClick={handleZoomIn} disabled={zoomLevel >= 2}><ZoomIn className="h-4 w-4" /></Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant={isConnecting ? "default" : "ghost"} size="sm" onClick={() => setIsConnecting(!isConnecting)}><Link2 className="h-4 w-4 mr-2" /> Connect</Button>
                <Button variant="ghost" size="sm" onClick={() => addNodeToView({ id: `node_${Date.now()}`, type: "smelting_plant", label: "New Process", x: 0, y: 0, inputs: ["Input"], outputs: ["Output"], impact: 50, category: "Material Processing / Smelting" })}><Plus className="h-4 w-4 mr-2" /> Add</Button>
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
                  className="h-10 px-3 text-s font-medium flex-shrink-0  "
                >
                  <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reset All
                </Button>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 z-10 text-xs text-slate-500">
            {nodes.length} Nodes • {connections.length} Connections
          </div>

          <div
            ref={canvasRef}
            className={`relative w-full h-full cursor-grab ${isPanning ? 'cursor-grabbing' : ''}`}
            onMouseDown={handleCanvasMouseDown}
            onMouseUp={(e) => { handleCanvasDrop(e); handleMouseUp(); }}
            onMouseLeave={() => { setDraggedNodeType(null); setIsConnecting(false); setConnectionStart(null); setTempConnection(null); handleMouseUp(); }}
            onMouseMove={handleCanvasMouseMove}
            onWheel={handleWheel}
          >
            <div className="absolute top-0 left-0" style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`, transformOrigin: 'top left', willChange: 'transform' }}>
              <svg className="absolute inset-0 pointer-events-none" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="url(#flowGradient)" /></marker>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
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
                  const path = `M${fromX},${fromY} C${fromX + curveIntensity},${fromY} ${toX - curveIntensity},${toY} ${toX},${toY}`
                  const midX = (fromX + toX) / 2
                  const midY = (fromY + toY) / 2
                  return (
                    <g key={connection.id} className="connection-group hover:opacity-100 opacity-80 transition-opacity">
                      <path d={path} fill="none" stroke="url(#flowGradient)" strokeWidth="8" strokeLinecap="round" className="opacity-0" />
                      <path d={path} fill="none" stroke="url(#flowGradient)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowhead)" style={{ filter: 'url(#glow)' }}/>
                      <g transform={`translate(${midX}, ${midY})`}>
                        <foreignObject x="-60" y="-20" width="120" height="40" className="pointer-events-none">
                          <div className="flex flex-col items-center justify-center p-1 rounded-md backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                            <div className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">{connection.material}</div>
                            <div className="text-[9px] text-slate-500 dark:text-slate-400">{connection.quantity} {connection.unit}</div>
                          </div>
                        </foreignObject>
                      </g>
                    </g>
                  )
                })}
              </svg>
              {isConnecting && connectionStart && tempConnection && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <line
                        x1={(nodes.find(n => n.id === connectionStart)!.x * zoomLevel + panOffset.x) + (BASE_NODE_WIDTH * zoomLevel)}
                        y1={(nodes.find(n => n.id === connectionStart)!.y * zoomLevel + panOffset.y) + (BASE_NODE_HEIGHT * zoomLevel / 2)}
                        x2={tempConnection.x} y2={tempConnection.y}
                        stroke="url(#flowGradient)" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"
                    />
                </svg>
              )}
              {nodes.map((node) => {
                const Icon = getNodeIcon(node.type)
                const impactColor = node.impact > 80 ? '#ef4444' : node.impact > 50 ? '#f59e0b' : '#10b981';
                return (
                  <div
                    key={node.id}
                    className={`absolute select-none group/node transition-transform duration-150 ease-out will-change-transform ${isDraggingNode === node.id ? "cursor-grabbing z-50" : "cursor-grab"} ${isConnecting ? "cursor-crosshair" : ""}`}
                    style={{ left: 0, top: 0, transform: `translate(${node.x}px, ${node.y}px)`, width: `${BASE_NODE_WIDTH}px` }}
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
                    <Card className={`relative w-full transition-all duration-300 ease-out bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-700/80 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 ${selectedNode === node.id ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-950 shadow-2xl scale-[1.03] -translate-y-1" : "shadow-lg"}`}
                          style={{ boxShadow: selectedNode === node.id ? `0 0 20px -5px ${impactColor}, 0 4px 6px -2px rgba(0,0,0,0.1)` : '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: impactColor, filter: `drop-shadow(0 0 3px ${impactColor})`}}></div>
                      <button title="Connect input" className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 hover:scale-125 hover:bg-green-400 transition-all duration-200 z-20 group-hover/node:opacity-100 opacity-0"
                              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); if (isConnecting && connectionStart && connectionStart !== node.id) handleEndConnection(node.id, e as any, 'left')}} />
                      <button title="Start connection" className="absolute -right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 hover:scale-125 hover:bg-blue-400 transition-all duration-200 z-20 group-hover/node:opacity-100 opacity-0"
                              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); if (!isConnecting) handleStartConnection(node.id, e as any, 'right') }} />
                      
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2.5">
                            <div className={`p-2 rounded-md ${getNodeColor(node.type)} shadow-inner`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="space-y-0">
                              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 leading-tight">{node.label}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{node.category}</p>
                            </div>
                          </div>
                          {!INITIAL_NODES.some((n) => n.id === node.id) && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-red-500 opacity-0 group-hover/node:opacity-100 transition-opacity" onClick={(e) => deleteNode(node.id, e)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          )}
                        </div>
                        <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Impact Score</span>
                              <Badge style={{ backgroundColor: `${impactColor}20`, color: impactColor, borderColor: `${impactColor}40` }} className="font-mono font-bold">{node.impact}</Badge>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${node.impact}%`, background: impactColor, filter: `drop-shadow(0 0 2px ${impactColor})` }} />
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
        
        <aside 
          className={`w-80 border-l border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg flex flex-col h-full transition-transform duration-300 ease-in-out absolute right-0 z-20 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <Tabs defaultValue="properties" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2 m-3 bg-slate-200/70 dark:bg-slate-800/70 p-1 h-10 rounded-lg">
              <TabsTrigger value="properties" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md">Properties</TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md rounded-md">Results</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="properties" className="p-4 pt-0 space-y-6">
                {selectedNode ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Settings className="h-4 w-4 text-blue-500"/> Node Properties</h3>
                      <div className="space-y-4 rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-slate-800/30">
                        <div>
                          <Label htmlFor="node-label">Label</Label>
                          <Input id="node-label" value={nodes.find((n) => n.id === selectedNode)?.label || ""} onChange={(e) => setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, label: e.target.value } : n))} />
                        </div>
                        <div>
                          <Label htmlFor="node-category">Category</Label>
                          <Select value={nodes.find((n) => n.id === selectedNode)?.category}><SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {Array.from(new Set(nodeTypes.map(nt => nt.category))).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {['inputs', 'outputs'].map(type => (
                        <div key={type} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/30">
                          <button className="w-full flex items-center justify-between p-3 text-left font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setExpandedSection(expandedSection === type ? null : type as 'inputs' | 'outputs')}>
                            <div className="flex items-center gap-2 capitalize">{type}<Badge variant="secondary">{nodes.find(n => n.id === selectedNode)?.[type as 'inputs' | 'outputs'].length || 0}</Badge></div>
                            <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === type ? 'rotate-90' : ''}`} />
                          </button>
                          {expandedSection === type && (
                            <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                              <div className="space-y-2">
                                {nodes.find(n => n.id === selectedNode)?.[type as 'inputs' | 'outputs'].map((item, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 rounded border bg-white dark:bg-slate-800/50">
                                    <span className="text-sm">{item}</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, [type]: n[type as 'inputs' | 'outputs'].filter((_, i) => i !== index) } : n))}><Trash2 className="h-3.5 w-3.5"/></Button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input value={type === 'inputs' ? newInput : newOutput} onChange={(e) => type === 'inputs' ? setNewInput(e.target.value) : setNewOutput(e.target.value)} placeholder={`New ${type.slice(0, -1)}...`} />
                                <Button onClick={() => {
                                  const value = (type === 'inputs' ? newInput : newOutput).trim();
                                  if (value) {
                                    setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, [type]: [...n[type as 'inputs' | 'outputs'], value] } : n));
                                    type === 'inputs' ? setNewInput('') : setNewOutput('');
                                  }
                                }}>Add</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <Settings className="mx-auto h-12 w-12 mb-4" />
                    <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">No Node Selected</h4>
                    <p className="text-sm">Click on a process node to edit its properties.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="results" className="p-4 pt-0 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-4 w-4 text-blue-500"/> Impact Assessment</h3>
                  {showResults ? (
                    <div className="space-y-6">
                       <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-800 dark:text-green-300">
                          <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold">System Status</span>
                              <Badge className="bg-green-500/80 text-white">Calculated</Badge>
                          </div>
                          <div className="text-lg font-bold">{nodes.length} Nodes • {connections.length} Flows</div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">Environmental Impact</h4>
                        <div className="space-y-3">
                          {impactCategories.map((category) => (
                            <div key={category.name} className="space-y-1">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-600 dark:text-slate-300">{category.name}</span>
                                <span className="text-slate-500 dark:text-slate-400">{category.value} {category.unit}</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2.5 rounded-full transition-all" style={{ width: `${category.value}%`, filter: 'drop-shadow(0 0 2px #60a5fa)' }}/></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">Hotspot Analysis</h4>
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg border-l-4 border-red-500 bg-red-500/10"><div className="text-sm font-semibold text-red-800 dark:text-red-300">Aluminum Smelting</div><div className="text-xs text-red-600 dark:text-red-400">Highest impact: 92% contribution</div></div>
                          <div className="p-3 rounded-lg border-l-4 border-orange-500 bg-orange-500/10"><div className="text-sm font-semibold text-orange-800 dark:text-orange-300">Bauxite Mining</div><div className="text-xs text-orange-600 dark:text-orange-400">High impact: 85% contribution</div></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">No Results Yet</h4>
                      <p className="text-sm text-slate-500 mb-4">Run calculation to see impact results.</p>
                      <Button onClick={handleRunCalculation} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"><Play className="mr-2 h-4 w-4" />{isCalculating ? 'Calculating...' : 'Run Calculation'}</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}