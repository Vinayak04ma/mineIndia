import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, BarChart3, LineChart, PieChart, ArrowUpDown, Filter, ChevronDown, ArrowLeft, TrendingUp, DollarSign, Package, Clock } from "lucide-react";

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 3800 },
  { name: 'Oct', value: 4300 },
  { name: 'Nov', value: 5200 },
  { name: 'Dec', value: 4800 },
];

const salesByCategory = [
  { name: 'Copper', value: 35, color: '#E6B05F' },
  { name: 'Aluminum', value: 25, color: '#8E8E8E' },
  { name: 'Steel', value: 20, color: '#A9A9A9' },
  { name: 'Brass', value: 10, color: '#B8860B' },
  { name: 'E-Waste', value: 10, color: '#32CD32' },
];

const topListings = [
  { id: 1, name: 'Copper Wire Scrap', sales: 45, revenue: 3825 },
  { id: 2, name: 'Aluminum Cans (Baled)', sales: 32, revenue: 1200 },
  { id: 3, name: 'Steel Scrap (Heavy Melting)', sales: 28, revenue: 900 },
  { id: 4, name: 'Brass Scrap (Clean)', sales: 15, revenue: 630 },
  { id: 5, name: 'E-Waste (Circuit Boards)', sales: 12, revenue: 450 },
];

const performanceMetrics = [
  { name: 'Total Listings', value: '24', change: '+12%', isPositive: true },
  { name: 'Active Listings', value: '18', change: '+5%', isPositive: true },
  { name: 'Conversion Rate', value: '3.2%', change: '+0.8%', isPositive: true },
  { name: 'Avg. Response Time', value: '2.4h', change: '-15%', isPositive: true },
];

const recentTransactions = [
  { id: 1, customer: 'MetalWorks Inc.', amount: 1200, status: 'completed', date: '2023-11-15' },
  { id: 2, customer: 'Green Recycling Co.', amount: 850, status: 'completed', date: '2023-11-14' },
  { id: 3, customer: 'TechScrap Solutions', amount: 450, status: 'pending', date: '2023-11-13' },
  { id: 4, customer: 'EcoMetals Ltd.', amount: 630, status: 'completed', date: '2023-11-12' },
  { id: 5, customer: 'Urban Mining Co.', amount: 320, status: 'failed', date: '2023-11-11' },
];

// Simple chart components (in a real app, you'd use a charting library)
const SimpleLineChart = ({ data }: { data: { name: string; value: number }[] }) => (
  <div className="h-64 w-full relative">
    <div className="absolute bottom-0 left-0 right-0 h-3/4 flex items-end justify-between px-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center" style={{ width: `${100 / data.length}%` }}>
          <div 
            className="w-3/4 bg-blue-500 rounded-t-sm" 
            style={{ height: `${(item.value / 6000) * 100}%` }}
          ></div>
          <span className="text-xs text-gray-500 mt-1">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SimplePieChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => (
  <div className="h-48 w-full flex items-center justify-center">
    <div className="relative h-40 w-40">
      {data.map((item, index) => {
        const rotation = data.slice(0, index).reduce((sum, d) => sum + (d.value / 100) * 360, 0);
        return (
          <div 
            key={index}
            className="absolute inset-0 rounded-full border-8"
            style={{
              borderColor: item.color,
              clipPath: `polygon(50% 50%, 100% 50%, 100% 0%, 50% 0%)`,
              transform: `rotate(${rotation}deg)`,
              borderWidth: '16px',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              [`border${['Top', 'Right', 'Bottom', 'Left'][index % 4]}Color`]: item.color,
            }}
          />
        );
      })}
    </div>
    <div className="ml-8">
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
          <span className="text-sm">{item.name} ({item.value}%)</span>
        </div>
      ))}
    </div>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/marketplace/junkyard/seller" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your marketplace performance and gain insights</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">$52,000</span> total revenue
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-green-600">+12.5%</span> vs last month
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600">24</span> active listings
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <Calendar className="h-4 w-4" />
                    Last 12 Months
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                  <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
                  <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
                  <DropdownMenuItem>Custom Range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</CardDescription>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-sm flex items-center ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${metric.isPositive ? 'rotate-0' : 'rotate-180'}`} />
                  {metric.change} from last period
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-100 dark:bg-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
              <LineChart className="h-4 w-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
              <PieChart className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">Revenue Overview</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <SimpleLineChart data={revenueData} />
                </CardContent>
              </Card>
              <Card className="col-span-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart data={salesByCategory} />
                </CardContent>
              </Card>
            </div>
          
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Top Performing Listings</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Your best-selling items this period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topListings.map((item) => (
                      <div key={item.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.sales} sales</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">${item.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Latest customer purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">{transaction.customer}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">${transaction.amount.toLocaleString()}</div>
                          <Badge variant={
                            transaction.status === 'completed' ? 'default' : 
                            transaction.status === 'pending' ? 'secondary' : 'destructive'
                          } className="text-xs">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
        </TabsContent>
        
          <TabsContent value="revenue">
            <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Revenue Analytics</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Revenue analytics and charts would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Inventory Analytics</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Inventory levels and stock movement</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Inventory analytics and charts would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between items-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Data is updated every 24 hours. Last updated: {new Date().toLocaleString()}
          </p>
          <Button variant="outline" className="gap-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
            <Download className="h-4 w-4" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}
