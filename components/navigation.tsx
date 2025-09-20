"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, MapPin, Palette, Zap } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Analysis",
      href: "/analysis",
      icon: BarChart3,
      description: "AI-powered LCA analysis",
    },
    {
      name: "Whiteboard",
      href: "/whiteboard",
      icon: Palette,
      description: "Interactive LCA mapping",
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: MapPin,
      description: "Circular economy platform",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">AI LCA Tool</span>
        </Link>

        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className="flex items-center space-x-2"
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
