"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  MapPin, 
  Palette, 
  ChevronDown, 
  ChevronUp,
  HardHat,
  Menu,
  X
} from "lucide-react"
import { UserDashboard } from "./user-dashboard"

type NavItem = {
  name: string
  href?: string
  icon: React.ReactNode | null
  children?: NavItem[]
}

export function Navigation() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems: NavItem[] = [
    {
      name: "Analysis",
      icon: <BarChart3 className="h-4 w-4" />,
      children: [
        { 
          name: "Generate LCA Analysis", 
          href: "/analysis/generate",
          icon: null
        },
        { 
          name: "View Reports", 
          href: "/analysis/reports",
          icon: null
        },
      ],
    },
    {
      name: "Map",
      href: "/map",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      name: "Marketplace",
      icon: <Palette className="h-4 w-4" />,
      children: [
        { 
          name: "Scrap Metal", 
          children: [
            { 
              name: "Buyer", 
              href: "/marketplace/scrap/buyer",
              icon: null
            },
            { 
              name: "Seller", 
              href: "/marketplace/scrap/seller",
              icon: null
            },
          ]
        },
        { 
          name: "Junkyard", 
          children: [
            { 
              name: "Buyer", 
              href: "/marketplace/junkyard/buyer",
              icon: null
            },
            { 
              name: "Seller", 
              href: "/marketplace/junkyard/seller",
              icon: null
            },
          ]
        },
      ]
    },
  ]

  const isActive = (href?: string): boolean => {
    if (!href) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const toggleDropdown = (e: React.MouseEvent, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const closeAllDropdowns = () => {
    setOpenDropdown(null)
    setMobileMenuOpen(false)
  }

  const renderNavItems = (items: NavItem[], isMobile = false, level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      const isItemActive = hasChildren 
        ? item.children?.some(child => 
            child.href ? isActive(child.href) : 
            child.children?.some(subItem => subItem.href && isActive(subItem.href))
          )
        : isActive(item.href)

      const itemClass = isMobile 
        ? `flex w-full items-center justify-between px-4 py-2 text-sm ${isItemActive ? 'bg-accent' : 'hover:bg-accent/50'}`
        : 'flex items-center gap-1'

      return (
        <div key={`${item.name}-${level}`} className="relative">
          {hasChildren ? (
            <div>
              <Button
                variant={isItemActive ? 'default' : 'ghost'}
                className={itemClass}
                onClick={(e) => toggleDropdown(e, item.name)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                />
              </Button>
              
              {(openDropdown === item.name || isMobile) && (
                <div 
                  className={`${isMobile ? 'pl-6' : 'absolute left-0 mt-1 w-56 rounded-md border bg-popover p-1 shadow-md z-50'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.children.map((child) => (
                    <div key={child.name} className="relative">
                      {child.children ? (
                        <div className="relative">
                          <button
                            className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                            onClick={(e) => toggleDropdown(e, `${item.name}-${child.name}`)}
                          >
                            <span>{child.name}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </button>
                          
                          {openDropdown === `${item.name}-${child.name}` && (
                            <div 
                              className="absolute left-full top-0 ml-1 w-48 rounded-md border bg-popover p-1 shadow-md z-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {child.children.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href || '#'}
                                  className="block rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                                  onClick={closeAllDropdowns}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={child.href || '#'}
                          className="block rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                          onClick={closeAllDropdowns}
                        >
                          {child.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Button
              variant={isActive(item.href || '') ? 'default' : 'ghost'}
              asChild
              className={itemClass}
            >
              <Link href={item.href || '#'} onClick={closeAllDropdowns}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </Button>
          )}
        </div>
      )
    })
  }

  return (
    <header 
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2 p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link href="/" className="flex items-center space-x-2" onClick={closeAllDropdowns}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <HardHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Minecare</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {renderNavItems(navItems)}
        </nav>

        <div className="flex items-center">
          <UserDashboard />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden border-t ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-2 p-2">
          {renderNavItems(navItems, true)}
        </div>
      </div>
    </header>
  )
}
