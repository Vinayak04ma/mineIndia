import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, LineChart, PlusCircle, AlertCircle, CheckCircle, Clock } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {change}
            <span className="text-gray-500 ml-1">vs last month</span>
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>
        <Link href="/marketplace/junkyard/seller/create-listing">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Listing
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="$6,350"
          change="+12.5%"
          isPositive={true}
          icon={<LineChart className="h-6 w-6" />}
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
          icon={<AlertCircle className="h-6 w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Listings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Listings</CardTitle>
                <CardDescription>Your most recent material listings</CardDescription>
              </div>
              <Link href="/marketplace/junkyard/seller/my-listings">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-16 w-16 bg-gray-100 rounded-md mr-4 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">
                    Image
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{listing.title}</h3>
                      {statusBadge(listing.status)}
                    </div>
                    <p className="text-lg font-bold text-gray-900">{listing.price}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>{listing.views} views</span>
                      <span>•</span>
                      <span>{listing.inquiries} inquiries</span>
                      <span>•</span>
                      <span>Listed on {listing.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative pb-4">
                  {activity.isNew && (
                    <div className="absolute left-0 top-1 h-2 w-2 bg-blue-500 rounded-full"></div>
                  )}
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {activityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/marketplace/junkyard/seller/my-listings">
          <Card className="h-full cursor-pointer hover:border-blue-300 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-medium">My Listings</h3>
              <p className="text-sm text-gray-500 mt-1">View and manage all your listings</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/marketplace/junkyard/seller/analytics">
          <Card className="h-full cursor-pointer hover:border-blue-300 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">View sales and performance metrics</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/marketplace/junkyard/seller/create-listing">
          <Card className="h-full cursor-pointer hover:border-blue-300 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-3">
                <PlusCircle className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Create Listing</h3>
              <p className="text-sm text-gray-500 mt-1">Add a new item to your inventory</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/marketplace/junkyard/seller/transactions">
          <Card className="h-full cursor-pointer hover:border-blue-300 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 10H2" />
                  <path d="M7 14h.01" />
                  <path d="M11 14h.01" />
                  <path d="M15 14h.01" />
                  <path d="M7 18h.01" />
                  <path d="M11 18h.01" />
                  <path d="M15 18h.01" />
                </svg>
              </div>
              <h3 className="font-medium">Transactions</h3>
              <p className="text-sm text-gray-500 mt-1">View your sales and payments</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
