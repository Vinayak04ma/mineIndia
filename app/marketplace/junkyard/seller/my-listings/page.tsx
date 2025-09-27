import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Search, PlusCircle, Filter, Eye, Pencil, Trash2, ArrowUpDown, Package, TrendingUp, MessageSquare, Calendar, ArrowLeft } from "lucide-react";

type Status = 'active' | 'pending' | 'sold' | 'draft' | 'rejected';

type Listing = {
  id: string;
  title: string;
  category: string;
  price: string;
  quantity: number;
  status: Status;
  views: number;
  inquiries: number;
  date: string;
  image: string;
};

const listings: Listing[] = [
  {
    id: '1',
    title: 'Copper Wire Scrap',
    category: 'Copper',
    price: '$8.50',
    quantity: 500,
    status: 'active',
    views: 124,
    inquiries: 8,
    date: '2023-11-15',
    image: '/listings/copper-wire.jpg'
  },
  {
    id: '2',
    title: 'Aluminum Cans (Baled)',
    category: 'Aluminum',
    price: '$1.20',
    quantity: 1000,
    status: 'pending',
    views: 87,
    inquiries: 5,
    date: '2023-11-10',
    image: '/listings/aluminum-cans.jpg'
  },
  {
    id: '3',
    title: 'Steel Scrap (Heavy Melting)',
    category: 'Steel',
    price: '$0.45',
    quantity: 2000,
    status: 'sold',
    views: 210,
    inquiries: 12,
    date: '2023-11-05',
    image: '/listings/steel-scrap.jpg'
  },
  {
    id: '4',
    title: 'E-Waste (Circuit Boards)',
    category: 'E-Waste',
    price: '$3.75',
    quantity: 100,
    status: 'draft',
    views: 0,
    inquiries: 0,
    date: '2023-11-20',
    image: '/listings/circuit-boards.jpg'
  },
  {
    id: '5',
    title: 'Brass Scrap (Clean)',
    category: 'Brass',
    price: '$4.20',
    quantity: 300,
    status: 'active',
    views: 92,
    inquiries: 4,
    date: '2023-11-18',
    image: '/listings/brass-scrap.jpg'
  },
  {
    id: '6',
    title: 'Lead Acid Batteries',
    category: 'Batteries',
    price: '$0.65',
    quantity: 50,
    status: 'rejected',
    views: 45,
    inquiries: 2,
    date: '2023-11-12',
    image: '/listings/batteries.jpg'
  },
];

const statusVariant = (status: Status) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'sold':
      return 'outline';
    case 'draft':
      return 'outline';
    case 'rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function MyListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/marketplace/junkyard/seller" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Listings</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your material listings and track their performance</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{listings.length}</span> total listings
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-green-600">{listings.filter(l => l.status === 'active').length}</span> active
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600">{listings.filter(l => l.status === 'sold').length}</span> sold
              </div>
            </div>
            <Link href="/marketplace/junkyard/seller/create-listing">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="h-4 w-4" />
                Add New Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">

        <Card className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search listings..." 
                  className="pl-10 w-full border-gray-300 dark:border-slate-600 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Listings</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Sold</DropdownMenuItem>
                    <DropdownMenuItem>Drafts</DropdownMenuItem>
                    <DropdownMenuItem>Rejected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                    <DropdownMenuItem>Most Inquiries</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-slate-700">
                  <TableHead className="w-[300px] text-gray-700 dark:text-gray-300">Item</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Quantity</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Views</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Inquiries</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id} className="border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-100 dark:bg-slate-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <span className="line-clamp-1 text-gray-900 dark:text-white font-semibold">{listing.title}</span>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{listing.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{listing.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-gray-900 dark:text-white">${listing.price}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700 dark:text-gray-300">{listing.quantity.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(listing.status)} className="capitalize">
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">{listing.views}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{listing.inquiries}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">{new Date(listing.date).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-slate-600">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-slate-700">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-slate-700">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <CardFooter className="flex flex-col items-center justify-between gap-4 p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 md:flex-row">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing <strong className="text-gray-900 dark:text-white">1-{listings.length}</strong> of <strong className="text-gray-900 dark:text-white">{listings.length}</strong> listings
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="border-gray-300 dark:border-slate-600">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled className="border-gray-300 dark:border-slate-600">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
