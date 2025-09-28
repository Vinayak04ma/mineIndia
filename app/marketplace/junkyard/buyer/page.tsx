import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Search, Filter, RefreshCw, ArrowRight, Star, MapPin, TrendingUp, Clock, Shield, Truck, Zap, Heart } from "lucide-react";

type MaterialItem = {
  id: string;
  name: string;
  type: string;
  price: string;
  location: string;
  rating: number;
  image: string;
  description: string;
  distance: string;
};

const mockMaterials: MaterialItem[] = [
  {
    id: '1',
    name: 'Copper Wire Scrap',
    type: 'Copper',
    price: '$8.50/kg',
    location: 'Mumbai, Maharashtra',
    rating: 4.7,
    image: '/copper-wire-scrap.jpeg',
    description: 'High-grade copper wire scrap, 99.9% pure, ready for recycling',
    distance: '5.2 km away'
  },
  {
    id: '2',
    name: 'Aluminum Cans (Baled)',
    type: 'Aluminum',
    price: '$1.20/kg',
    location: 'Delhi, NCR',
    rating: 4.3,
    image: '/aluminium-cans.jpeg',
    description: 'Cleaned and baled aluminum cans, 500kg available',
    distance: '12.1 km away'
  },
  {
    id: '3',
    name: 'Steel Scrap (Heavy Melting)',
    type: 'Steel',
    price: '$0.45/kg',
    location: 'Chennai, Tamil Nadu',
    rating: 4.5,
    image: '/steel-scrap.jpeg',
    description: 'Heavy melting steel scrap, mixed grades, 2 tons available',
    distance: '8.7 km away'
  },
  {
    id: '4',
    name: 'E-Waste (Circuit Boards)',
    type: 'E-Waste',
    price: '$3.75/kg',
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    image: '/circuit-boards.jpeg',
    description: 'Used circuit boards from electronics, 100kg available',
    distance: '3.5 km away'
  },
];

export default function JunkyardBuyerPage() {
  const recommendedMaterials = mockMaterials.slice(0, 2);
  
  return (
    <div className="min-h-screen">
        {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-4xl">
            <Button 
              variant="ghost" 
              asChild 
              className="mb-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Link href="/marketplace/junkyard" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Marketplace
              </Link>
            </Button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-black" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-black border-white/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Live Marketplace
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Junkyard Marketplace
            </h1>
            <p className="text-xl text-black-100 mb-8 max-w-2xl">
              Discover premium scrap materials from verified sellers. Connect with local suppliers and find the best deals on recycled materials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-gradient-to-r from-primary to-primary shadow-lg">
                <Search className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" className="bg-white text-gradient-to-r from-primary to-primary shadow-lg">
                <Shield className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
            </div>
          </div>
        </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Find Materials</h2>
            <p className="text-slate-600 dark:text-slate-400">Search from {mockMaterials.length} verified listings</p>
          </div>
          <Button variant="outline" className="gap-2 hover:bg-gradient-to-r from-primary to-primary">
            <RefreshCw className="h-4 w-4" />
            Refresh Listings
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search for materials, types, or suppliers..." 
                  className="pl-12 h-12 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Enter location" 
                  className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  defaultValue="Mumbai, India"
                />
              </div>
              <Button className="gap-2 h-12 bg-gradient-to-r from-primary to-primary rounded-xl shadow-lg">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </Button>
            </div>
            
            {/* Quick Filter Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                <Zap className="h-3 w-3 mr-1" />
                Trending
              </Badge>
              <Badge variant="outline" className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                <Clock className="h-3 w-3 mr-1" />
                Recently Added
              </Badge>
              <Badge variant="outline" className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                <Shield className="h-3 w-3 mr-1" />
                Verified Sellers
              </Badge>
              <Badge variant="outline" className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                <MapPin className="h-3 w-3 mr-1" />
                Near Me
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">AI Recommended For You</h2>
              <p className="text-slate-600 dark:text-slate-400">Personalized suggestions based on your preferences</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recommendedMaterials.map((item) => (
              <Link 
                href={`/marketplace/junkyard/buyer/items/${item.id}`} 
                key={item.id} 
                className="block h-full"
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden h-full">
                  <CardContent className="p-0 flex h-full">
                    <div className="w-1/3 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="w-2/3 p-6 relative">
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                        <Heart className="h-3 w-3 inline mr-1" />
                        Recommended
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{item.name}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        {item.location} • {item.distance}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-3xl font-bold text-slate-900">{item.price}</span>
                          <span className="text-sm text-slate-500 ml-1">/ kg</span>
                        </div>
                        <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary shadow-lg">
                          View Details <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Listings */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Listings</h2>
              <p className="text-slate-600 dark:text-slate-400">Browse all available materials</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
                Showing {mockMaterials.length} results
              </div>
              <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:border-blue-200">
                <Filter className="h-4 w-4" />
                Sort & Filter
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {mockMaterials.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-32 rounded-2xl flex-shrink-0 relative overflow-hidden shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                          <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                            <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                            {item.rating}
                          </div>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        {item.location} • {item.distance}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-3xl font-bold text-slate-900">{item.price}</span>
                          <span className="text-sm text-slate-500 ml-1">/ kg</span>
                        </div>
                        <Link href={`/marketplace/junkyard/buyer/items/${item.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            View Details <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="gap-2 px-8 py-3 text-lg hover:bg-gradient-to-r from-primary to-primary">
              <RefreshCw className="h-5 w-5" />
              Load More Listings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
