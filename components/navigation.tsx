"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Palette, 
  ChevronDown, 
  Menu,
  X,
  LampDeskIcon,
  LineChart,
  Map,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  User as UserIcon
} from "lucide-react"
import { UserDashboard } from "./user-dashboard"
import React from "react"

type NavItem = {
  name: string
  href?: string
  icon: React.ReactNode | null
  children?: NavItem[]
}

export function Navigation() {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdowns({})
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems: NavItem[] = [
    {
      name: "Analysis",
      icon: <LineChart className="h-4 w-4" />,
      children: [
        { 
          name: "General LCA Analysis", 
          href: "/analysis/generate",
          icon: <BarChart3 className="h-3.5 w-3.5" />
        },
        { 
          name: "India Specific LCA", 
          href: "/analysis/india-specific",
          icon: <Map className="h-3.5 w-3.5" />
        },
      ],
    },
    {
      name: "Whiteboard",
      href: "/whiteboard",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      name: "Marketplace",
      icon: <ShoppingCart className="h-4 w-4" />,
      children: [
        { 
          name: "E-Waste (Urban Mining)", 
          href: "/marketplace/e-waste",
          icon: <LampDeskIcon className="h-3.5 w-3.5" />
        },
        { 
          name: "Junkyard",
          icon: <Users className="h-3.5 w-3.5" />,
          children: [
            { 
              name: "Buyer Dashboard", 
              href: "/marketplace/junkyard/buyer",
              icon: <UserIcon className="h-3 w-3" />
            },
            { 
              name: "Seller Portal", 
              href: "/marketplace/junkyard/seller",
              icon: <Settings className="h-3 w-3" />
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

  const toggleDropdown = (e: React.MouseEvent, name: string, parentPath: string = '') => {
    e.preventDefault()
    e.stopPropagation()
    
    const dropdownId = parentPath ? `${parentPath}-${name}` : name
    
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }))
  }

  const isDropdownOpen = (name: string, parentPath: string = '') => {
    const dropdownId = parentPath ? `${parentPath}-${name}` : name
    return !!openDropdowns[dropdownId]
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns({})
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

      const itemClass = cn(
        'group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg',
        isMobile 
          ? `w-full justify-between ${isItemActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent/50'}`
          : `hover:bg-accent/50 ${isItemActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`,
        level > 0 && 'text-sm',
        level > 1 && 'pl-8 text-sm',
      )

      return (
        <div key={`${item.name}-${level}`} className="relative">
          {hasChildren ? (
            <div className="relative">
              <Button
                variant="ghost"
                size={isMobile ? 'default' : 'sm'}
                className={cn(
                  'group relative w-full justify-between overflow-hidden transition-all',
                  isItemActive && 'bg-primary/5 font-medium',
                  !isMobile && 'px-3 py-1.5 text-sm'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setOpenDropdowns(prev => ({
                    ...prev,
                    [item.name]: !prev[item.name]
                  }))
                }}
              >
                <div className="flex items-center gap-2">
                  {item.icon && React.cloneElement(item.icon as React.ReactElement, {
                    className: cn(
                      'h-4 w-4 transition-colors',
                      isItemActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )
                  })}
                  <span>{item.name}</span>
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen(item.name) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </motion.div>
                {isItemActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    layoutId="activeNavIndicator"
                    initial={false}
                    transition={{ duration: 0.3, type: 'spring' }}
                    style={{ width: '100%' }}
                  />
                )}
              </Button>
              
              <AnimatePresence>
                {(isDropdownOpen(item.name) || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={cn(
                      'overflow-hidden',
                      isMobile ? 'pl-4 border-l-2 border-border/20' : 'absolute left-0 mt-1 min-w-[200px] rounded-lg border bg-popover p-1.5 shadow-lg z-50'
                    )}
                  >
                    {item.children?.map((child) => {
                      const hasGrandChildren = child.children && child.children.length > 0
                      const isChildActive = hasGrandChildren
                        ? child.children?.some(subItem => subItem.href && isActive(subItem.href))
                        : child.href ? isActive(child.href) : false

                      return (
                        <div key={child.name} className="relative">
                          {hasGrandChildren ? (
                            <>
                              <button
                                className={cn(
                                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                                  isChildActive ? 'bg-accent/50 text-foreground' : 'hover:bg-accent/30',
                                  'group'
                                )}
                                onClick={(e) => toggleDropdown(e, child.name, item.name)}
                              >
                                <div className="flex items-center gap-2">
                                  {child.icon}
                                  <span>{child.name}</span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isDropdownOpen(child.name, item.name) ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                </motion.div>
                              </button>
                              
                              <AnimatePresence>
                                {(isDropdownOpen(child.name, item.name) || isMobile) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                      'overflow-hidden',
                                      isMobile ? 'pl-4 ml-2 border-l-2 border-border/20' : 'mt-1 rounded-md bg-popover shadow-sm'
                                    )}
                                  >
                                    {child.children?.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href || '#'}
                                        onClick={closeAllDropdowns}
                                        className={cn(
                                          'flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md',
                                          isActive(subItem.href || '') 
                                            ? 'bg-primary/10 text-primary font-medium' 
                                            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                                        )}
                                      >
                                        {subItem.icon}
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={child.href || '#'}
                              onClick={closeAllDropdowns}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                                isActive(child.href || '') 
                                  ? 'bg-primary/10 text-primary font-medium' 
                                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                              )}
                            >
                              {child.icon}
                              {child.name}
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              variant="ghost"
              size={isMobile ? 'default' : 'sm'}
              asChild
              className={cn(
                'group relative w-full justify-start transition-colors',
                isActive(item.href || '') ? 'bg-primary/5 font-medium' : '',
                !isMobile && 'px-3 py-1.5 text-sm'
              )}
            >
              <Link href={item.href || '#'} onClick={closeAllDropdowns}>
                {item.icon && React.cloneElement(item.icon as React.ReactElement, {
                  className: cn(
                    'h-4 w-4 transition-colors',
                    isActive(item.href || '') ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )
                })}
                <span className="ml-2">{item.name}</span>
                {isActive(item.href || '') && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    layoutId="activeNavIndicator"
                    initial={false}
                    transition={{ duration: 0.3, type: 'spring' }}
                    style={{ width: '100%' }}
                  />
                )}
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
      className="sticky top-0 z-10 w-full "
      style={{
        position: 'sticky',
        isolation: 'isolate',
        willChange: 'transform',
      }}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 group" 
            onClick={closeAllDropdowns}
          >
            <motion.div 
              className="relative overflow-hidden rounded-lg border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/logo.jpg" 
                alt="Minecare Logo" 
                className="w-9 h-7 object-cover"
              />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Minecare
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {renderNavItems(navItems)}
        </nav>

        <div className="flex items-center space-x-2">
          <UserDashboard />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t bg-background/95 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="space-y-1 p-2">
              {renderNavItems(navItems, true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
