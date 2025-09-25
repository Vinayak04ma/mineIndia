import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw, ArrowRight, Star, MapPin } from "lucide-react";

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
    image: '/materials/copper-wire.jpg',
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
    image: '/materials/aluminum-cans.jpg',
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
    image: '/materials/steel-scrap.jpg',
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
    image: '/materials/circuit-boards.jpg',
    description: 'Used circuit boards from electronics, 100kg available',
    distance: '3.5 km away'
  },
];

export default function JunkyardBuyerPage() {
  const recommendedMaterials = mockMaterials.slice(0, 2);
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Junkyard Marketplace</h1>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Listings
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search for materials..." 
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Location" 
                className="pl-10"
                defaultValue="Mumbai, India"
              />
            </div>
            <Button className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-blue-600">✨</span> AI Recommended For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedMaterials.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0 flex h-full">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                    {item.type} Image
                  </div>
                </div>
                <div className="w-2/3 p-6 relative">
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location} • {item.distance}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                      <span className="text-sm text-gray-500"> / kg</span>
                    </div>
                    <Button size="sm" className="gap-1">
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Listings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Listings</h2>
          <div className="text-sm text-gray-500">
            Showing {mockMaterials.length} results
          </div>
        </div>
        
        <div className="space-y-4">
          {mockMaterials.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-md mr-4 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">
                    {item.type} Image
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                        {item.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{item.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location} • {item.distance}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">{item.price}</span>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="gap-2">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
