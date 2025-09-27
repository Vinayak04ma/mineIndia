"use client"

import { useState, useEffect, useRef } from "react"
import { User, LogOut, Settings, UserCircle, UserRound, UserPlus, UserPlus2, UserCog, UserCog2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type IndustryDetail = {
  id: string
  name: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

type UserData = {
  name: string
  email: string
  avatar: string
  industryDetails: IndustryDetail[]
  memberSince: string
}

// Mock data for the user dashboard
const mockUserData: UserData = {
  name: "Suryansh Shrivastava",
  email: "suryanshshrivastava9575@gmail.com",
  avatar: "",
  memberSince: "January 2023",
  industryDetails: [
    {
      id: "1",
      name: "GreenTech Solutions",
      role: "Sustainability Manager",
      status: "active",
      joinDate: "2023-02-15"
    },
    {
      id: "2",
      name: "EcoMine Corp",
      role: "Consultant",
      status: "active",
      joinDate: "2023-05-22"
    },
    {
      id: "3",
      name: "Renewable Resources Ltd",
      role: "Advisor",
      status: "inactive",
      joinDate: "2022-11-10"
    }
  ]
}

export function UserDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { name, email, industryDetails, memberSince } = mockUserData
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'pending':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-10 w-10 flex items-center justify-center"
      >
        <User className="h-6 w-6" />
        <span className="sr-only">User menu</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-background rounded-md shadow-lg border z-50">
          <Card className="border-0 shadow-none">
            <CardHeader className="bg-muted/20 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{email}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-1">
                    Member since {memberSince}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Industry Affiliations</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {industryDetails.map((industry) => (
                          <TableRow key={industry.id}>
                            <TableCell className="font-medium">{industry.name}</TableCell>
                            <TableCell>{industry.role}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={getStatusVariant(industry.status)}>
                                {industry.status.charAt(0).toUpperCase() + industry.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
