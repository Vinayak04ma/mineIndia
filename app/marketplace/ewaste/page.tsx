import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, FileText, AlertTriangle, Sparkles } from "lucide-react";

export default function EwastePage() {
  // Mock data
  const deviceInfo = {
    type: "Smartphone",
    model: "iPhone 12 Pro",
    manufacturer: "Apple",
    year: 2020
  };

  const materialComposition = [
    { material: "Aluminum", percentage: 14 },
    { material: "Glass", percentage: 28 },
    { material: "Battery", percentage: 15 },
    { material: "Circuit Board", percentage: 23 },
    { material: "Other", percentage: 20 },
  ];

  const hazardClassification = [
    { type: "Battery", level: "High", description: "Lithium-ion battery - risk of fire" },
    { type: "Screen", level: "Medium", description: "Contains mercury and other heavy metals" },
  ];

  const preciousMetals = [
    { metal: "Gold", amount: "0.034g", value: "$2.10" },
    { metal: "Silver", amount: "0.34g", value: "$0.27" },
    { metal: "Palladium", amount: "0.015g", value: "$1.50" },
    { metal: "Copper", amount: "12.5g", value: "$0.45" },
  ];

  const recommendations = [
    "Consider professional recycling due to battery hazard",
    "Estimated resale value in current condition: $120-180",
    "Potential refurbishment value: $250-300"
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">E-waste Analysis</h1>
      
      {/* Image Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            <span>Upload Device Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">Drag and drop an image or click to browse</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG up to 10MB</p>
            <Button className="mt-4">Select File</Button>
          </div>
        </CardContent>
      </Card>

      {/* Device Detection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Device Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Device Type</p>
              <p className="font-medium">{deviceInfo.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-medium">{deviceInfo.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Manufacturer</p>
              <p className="font-medium">{deviceInfo.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{deviceInfo.year}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Material Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Material Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materialComposition.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.material}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hazard Classification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Hazard Classification</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hazardClassification.map((hazard, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex justify-between">
                    <span className="font-medium">{hazard.type}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      hazard.level === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {hazard.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{hazard.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Precious Metal Content */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Precious Metal Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {preciousMetals.map((metal, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold text-amber-500">{metal.amount}</p>
                <p className="text-gray-600">{metal.metal}</p>
                <p className="text-sm text-gray-500">~ {metal.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="mt-6 border-blue-100">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Sparkles className="h-5 w-5" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
            View Detailed Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
