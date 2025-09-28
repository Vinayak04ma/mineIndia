import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Shield, Truck, MessageSquare, Phone, Mail, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  seller: {
    name: string;
    rating: number;
    totalSales: number;
    memberSince: string;
    verified: boolean;
    image: string;
  };
  specifications: {
    key: string;
    value: string;
  }[];
  images: string[];
};

// Mock data - in a real app, this would come from an API
const getItemById = (id: string): MaterialItem | undefined => {
  const items: MaterialItem[] = [
    {
      id: '1',
      name: 'Copper Wire Scrap',
      type: 'Copper',
      price: '$8.50/kg',
      location: 'Mumbai, Maharashtra',
      rating: 4.7,
      image: '/copper-wire-scrap.jpeg',
      description: 'High-grade copper wire scrap, 99.9% pure, ready for recycling. This premium quality copper wire has been carefully stripped and sorted to ensure maximum value. Ideal for smelting and recycling purposes. Each batch is tested for purity and comes with a certificate of authenticity.',
      distance: '5.2 km away',
      seller: {
        name: 'GreenTech Recycling',
        rating: 4.8,
        totalSales: 245,
        memberSince: '2020',
        verified: true,
        image: '/seller-avatar-1.png'
      },
      specifications: [
        { key: 'Material', value: 'Copper' },
        { key: 'Purity', value: '99.9%' },
        { key: 'Minimum Order', value: '100 kg' },
        { key: 'Availability', value: 'In Stock' },
        { key: 'Processing Time', value: '1-2 business days' },
        { key: 'Payment Terms', value: '50% advance, 50% before delivery' },
      ],
      images: [
        '/copper-wire-scrap-1.jpeg',
        '/copper-wire-scrap-2.jpeg',
        '/copper-wire-scrap-3.jpeg'
      ]
    },
    {
      id: '2',
      name: 'Aluminum Cans (Baled)',
      type: 'Aluminum',
      price: '$1.20/kg',
      location: 'Delhi, NCR',
      rating: 4.3,
      image: '/aluminium-cans.jpeg',
      description: 'Cleaned and baled aluminum cans, 500kg available. These cans have been thoroughly cleaned, crushed, and baled for easy transportation and recycling. Perfect for aluminum smelting and manufacturing. Each bale weighs approximately 500kg and is securely wrapped for protection.',
      distance: '12.1 km away',
      seller: {
        name: 'EcoMetals Solutions',
        rating: 4.5,
        totalSales: 189,
        memberSince: '2019',
        verified: true,
        image: '/seller-avatar-1.png'
      },
      specifications: [
        { key: 'Material', value: 'Aluminum' },
        { key: 'Form', value: 'Baled Cans' },
        { key: 'Purity', value: '98%' },
        { key: 'Minimum Order', value: '200 kg' },
        { key: 'Availability', value: 'In Stock' },
        { key: 'Processing Time', value: '2-3 business days' },
      ],
      images: [
        '/aluminium-cans-1.jpeg',
        '/aluminium-cans-2.jpeg'
      ]
    },
    {
      id: '3',
      name: 'Steel Scrap (Heavy Melting)',
      type: 'Steel',
      price: '$0.45/kg',
      location: 'Chennai, Tamil Nadu',
      rating: 4.5,
      image: '/steel-scrap.jpeg',
      description: 'Heavy melting steel scrap, mixed grades, 2 tons available. Collected from industrial sources and processed for recycling. Ideal for foundries and steel mills. Material has been sorted and prepared to meet industry standards for recycling.',
      distance: '8.7 km away',
      seller: {
        name: 'SteelCycle Industries',
        rating: 4.6,
        totalSales: 312,
        memberSince: '2018',
        verified: true,
        image: '/seller-avatar-1.png'
      },
      specifications: [
        { key: 'Material', value: 'Steel' },
        { key: 'Type', value: 'Heavy Melting Scrap' },
        { key: 'Quantity Available', value: '2 tons' },
        { key: 'Minimum Order', value: '500 kg' },
        { key: 'Processing Time', value: '3-5 business days' },
      ],
      images: [
        '/steel-scrap-1.jpeg',
        '/steel-scrap-2.jpeg'
      ]
    },
    {
      id: '4',
      name: 'E-Waste (Circuit Boards)',
      type: 'E-Waste',
      price: '$3.75/kg',
      location: 'Bangalore, Karnataka',
      rating: 4.8,
      image: '/circuit-boards.jpeg',
      description: 'Used circuit boards from electronics, 100kg available. Collected from end-of-life electronics and IT equipment. Contains valuable metals including gold, silver, and copper. Processed and ready for precious metal recovery.',
      distance: '3.5 km away',
      seller: {
        name: 'TechRecycle Solutions',
        rating: 4.9,
        totalSales: 178,
        memberSince: '2021',
        verified: true,
        image: '/seller-avatar-1.png'
      },
      specifications: [
        { key: 'Material', value: 'Circuit Boards' },
        { key: 'Source', value: 'Electronics Waste' },
        { key: 'Quantity Available', value: '100 kg' },
        { key: 'Precious Metal Content', value: 'Gold, Silver, Copper' },
        { key: 'Minimum Order', value: '20 kg' },
        { key: 'Processing Time', value: '1-2 business days' },
      ],
      images: [
        '/circuit-boards-1.jpeg',
        '/circuit-boards-2.jpeg'
      ]
    }
  ];
  
  return items.find(item => item.id === id);
};

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item not found</h1>
          <Link href="/marketplace/junkyard/buyer">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/marketplace/junkyard/buyer">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Listings
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative aspect-square w-full bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {item.images.map((img, index) => (
                  <div key={index} className="aspect-square bg-slate-100 rounded-md overflow-hidden">
                    <Image
                      src={img}
                      alt={`${item.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Item Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl">{item.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">•</span>
                  <span className="text-sm text-slate-500">{item.distance}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-slate-700">{item.description}</p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {item.specifications.map((spec, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-slate-500">{spec.key}</p>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Seller Info & Actions */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold">{item.price}</p>
                    <p className="text-sm text-slate-500">per kilogram</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90">
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    Make an Offer
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-slate-500">Available for orders above 500kg</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                      {item.seller.image ? (
                        <img 
                          src={item.seller.image} 
                          alt={item.seller.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-slate-400">
                          {item.seller.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.seller.name}</h3>
                      {item.seller.verified && (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm">{item.seller.rating} ({item.seller.totalSales} sales)</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-blue-50 border-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Safety Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Meet in a safe, public location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Inspect the item before purchasing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use secure payment methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Trust your instincts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
