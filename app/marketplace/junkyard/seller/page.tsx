import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, LineChart, PlusCircle, AlertCircle, CheckCircle, Clock, TrendingUp, DollarSign, Eye, MessageSquare, Calendar, ArrowRight, Star, Zap, Shield, Target } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`} />
            <span className="font-semibold">{change}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
        <div className="h-16 w-16 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

type ListingItem = {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'sold' | 'rejected';
  price: string;
  views: number;
  inquiries: number;
  date: string;
  image: string;
};

const recentListings: ListingItem[] = [
  {
    id: '1',
    title: 'Copper Wire Scrap - 500kg',
    status: 'active',
    price: '$4,250',
    views: 124,
    inquiries: 8,
    date: '2023-11-15',
    image: '/listings/copper-wire.jpg'
  },
  {
    id: '2',
    title: 'Aluminum Cans (Baled) - 1 Ton',
    status: 'pending',
    price: '$1,200',
    views: 87,
    inquiries: 5,
    date: '2023-11-10',
    image: '/listings/aluminum-cans.jpg'
  },
  {
    id: '3',
    title: 'Steel Scrap - 2 Tons',
    status: 'sold',
    price: '$900',
    views: 210,
    inquiries: 12,
    date: '2023-11-05',
    image: '/listings/steel-scrap.jpg'
  },
];

type ActivityItem = {
  id: string;
  type: 'sale' | 'inquiry' | 'listing' | 'payment';
  title: string;
  description: string;
  time: string;
  isNew: boolean;
};

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    title: 'Sale Completed',
    description: 'Your listing "Steel Scrap - 2 Tons" has been sold for $900',
    time: '2 hours ago',
    isNew: true
  },
  {
    id: '2',
    type: 'inquiry',
    title: 'New Inquiry',
    description: 'You have a new inquiry for "Copper Wire Scrap" from TechRecycle Inc.',
    time: '5 hours ago',
    isNew: true
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment of $1,200 has been processed for your recent sale',
    time: '1 day ago',
    isNew: false
  },
  {
    id: '4',
    type: 'listing',
    title: 'Listing Approved',
    description: 'Your listing "Aluminum Cans (Baled)" is now live',
    time: '2 days ago',
    isNew: false
  },
];

const statusBadge = (status: string) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  
  switch (status) {
    case 'active':
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
    case 'pending':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
    case 'sold':
      return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Sold</span>;
    case 'rejected':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
  }
};

const activityIcon = (type: string) => {
  const iconClass = 'h-5 w-5';
  
  switch (type) {
    case 'sale':
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    case 'inquiry':
      return <AlertCircle className={`${iconClass} text-blue-500`} />;
    case 'listing':
      return <Package className={`${iconClass} text-purple-500`} />;
    case 'payment':
      return <CheckCircle className={`${iconClass} text-green-500`} />;
    default:
      return <Clock className={`${iconClass} text-gray-400`} />;
  }
};

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Star className="h-3 w-3 mr-1" />
                Seller Dashboard
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome Back, Seller!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Track your sales performance, manage listings, and grow your recycling business with powerful analytics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/marketplace/junkyard/seller/create-listing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create New Listing
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700">
                <LineChart className="h-5 w-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Business Overview</h2>
            <p className="text-slate-600 dark:text-slate-400">Your performance metrics and key insights</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$6,350"
            change="+12.5%"
            isPositive={true}
            icon={<DollarSign className="h-6 w-6" />}
          />
          <StatCard
            title="Active Listings"
            value="8"
            change="+2"
            isPositive={true}
            icon={<Package className="h-6 w-6" />}
          />
          <StatCard
            title="Pending Orders"
            value="3"
            change="-1"
            isPositive={false}
            icon={<Clock className="h-6 w-6" />}
          />
          <StatCard
            title="New Inquiries"
            value="5"
            change="+3"
            isPositive={true}
            icon={<MessageSquare className="h-6 w-6" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Listings */}
          <Card className="lg:col-span-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Recent Listings</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Your most recent material listings</CardDescription>
                </div>
                <Link href="/marketplace/junkyard/seller/my-listings">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="group flex items-center p-4 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-gray-100 dark:border-slate-600">
                    <div className="h-20 w-20 bg-gray-100 dark:bg-slate-600 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center">
                      <div className="text-center">
                        <Package className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">{listing.title.split(' ')[0]}</p>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{listing.title}</h3>
                        {statusBadge(listing.status)}
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{listing.price}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-blue-500" />
                          <span>{listing.views} views</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-green-500" />
                          <span>{listing.inquiries} inquiries</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                          <span>{listing.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Latest updates on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="relative pb-4 group">
                    {activity.isNew && (
                      <div className="absolute left-0 top-1 h-2 w-2 bg-blue-500 rounded-full"></div>
                    )}
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="mt-1">
                        {activityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900">
                  View All Activity <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/marketplace/junkyard/seller/my-listings">
            <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-200">
                  <Package className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">My Listings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all your listings</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/marketplace/junkyard/seller/analytics">
            <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-green-300 dark:hover:border-green-600">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors duration-200">
                  <LineChart className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View sales and performance metrics</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/marketplace/junkyard/seller/create-listing">
            <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-200">
                  <PlusCircle className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Create Listing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add a new item to your inventory</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/marketplace/junkyard/seller/transactions">
            <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-300 dark:hover:border-amber-600">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors duration-200">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Transactions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View your sales and payments</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
