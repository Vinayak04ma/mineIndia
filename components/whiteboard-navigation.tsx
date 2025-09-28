"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft,
  Save,
  Download,
  Share2,
  Settings,
  HelpCircle
} from "lucide-react"

export function WhiteboardNavigation() {
  return (
    <header className="sticky top-0 z-[10000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
          
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Process Whiteboard</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive LCA Modeling</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm" className="h-9">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
          
          <Button variant="ghost" size="sm" className="h-9">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-9">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
