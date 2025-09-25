"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Upload, Trash2, ChevronDown } from "lucide-react";

type FormData = {
  title: string;
  description: string;
  category: string;
  materialType: string;
  condition: string;
  price: string;
  priceType: 'fixed' | 'negotiable' | 'auction';
  quantity: string;
  unit: string;
  location: string;
  isLocationPrivate: boolean;
  images: File[];
  certifications: string[];
  specifications: {
    key: string;
    value: string;
  }[];
  shippingOptions: {
    type: string;
    cost: string;
    details: string;
  }[];
};

const categories = [
  'Copper',
  'Aluminum',
  'Steel',
  'Brass',
  'Stainless Steel',
  'Lead',
  'Zinc',
  'Nickel',
  'E-Waste',
  'Batteries',
  'Other'
];

const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor',
  'Scrap'
];

const units = [
  'kg',
  'g',
  'lb',
  'ton',
  'piece',
  'lot',
  'container'
];

const shippingTypes = [
  'Pickup',
  'Seller Arranged',
  'Buyer Arranged',
  'Freight',
  'Courier'
];

export default function CreateListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    materialType: '',
    condition: '',
    price: '',
    priceType: 'fixed',
    quantity: '',
    unit: 'kg',
    location: '',
    isLocationPrivate: false,
    images: [],
    certifications: [''],
    specifications: [{ key: '', value: '' }],
    shippingOptions: [{ type: '', cost: '', details: '' }],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...formData.images, ...files].slice(0, 10); // Limit to 10 images
      
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));

      // Create image previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    
    setImagePreviews(newPreviews);
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = value;
    
    setFormData(prev => ({
      ...prev,
      certifications: newCerts
    }));
  };

  const removeCertification = (index: number) => {
    const newCerts = formData.certifications.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      certifications: newCerts
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const addShippingOption = () => {
    setFormData(prev => ({
      ...prev,
      shippingOptions: [...prev.shippingOptions, { type: '', cost: '', details: '' }]
    }));
  };

  const updateShippingOption = (index: number, field: 'type' | 'cost' | 'details', value: string) => {
    const newOptions = [...formData.shippingOptions];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      shippingOptions: newOptions
    }));
  };

  const removeShippingOption = (index: number) => {
    const newOptions = formData.shippingOptions.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      shippingOptions: newOptions
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would handle form submission here
    router.push('/marketplace/junkyard/seller');
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex flex-col items-center">
          <div 
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step === stepNum 
                ? 'bg-primary text-primary-foreground' 
                : step > stepNum 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            {step > stepNum ? '✓' : stepNum}
          </div>
          <span className="text-sm mt-2">
            {stepNum === 1 ? 'Basic Info' : 
             stepNum === 2 ? 'Details' : 
             stepNum === 3 ? 'Pricing' : 'Review'}
          </span>
        </div>
      ))}
      <div className="flex-1 h-1 bg-gray-200 mx-2">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
        <p className="text-muted-foreground">Fill in the details of the material you want to sell</p>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepIndicator()}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {step === 1 ? 'Basic Information' : 
               step === 2 ? 'Material Details' : 
               step === 3 ? 'Pricing & Shipping' : 'Review Your Listing'}
            </CardTitle>
            <CardDescription>
              {step === 1 ? 'Provide basic information about your listing' : 
               step === 2 ? 'Add detailed specifications and certifications' : 
               step === 3 ? 'Set your price and shipping options' : 
               'Please review all the information before submitting'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Listing Title *</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="e.g., High-Quality Copper Wire Scrap" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Provide a detailed description of the material, including any relevant details about quality, origin, processing, etc." 
                    rows={5} 
                    required 
                  />
                </div>

                <div className="space-y-4">
                  <Label>Photos *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {imagePreviews.length < 10 && (
                      <label className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 mb-1" />
                        <span className="text-sm text-gray-500">Add Photo</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          multiple 
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload up to 10 photos. Include multiple angles and any relevant details.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Material Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="materialType">Material Type / Grade</Label>
                    <Input 
                      id="materialType" 
                      name="materialType" 
                      value={formData.materialType} 
                      onChange={handleInputChange} 
                      placeholder="e.g., Copper Millberry, 6061 Aluminum" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select 
                      value={formData.condition} 
                      onValueChange={(value) => handleSelectChange('condition', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Specifications</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={addSpecification}
                    >
                      <Plus className="h-4 w-4" />
                      Add Specification
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.specifications.map((spec, index) => (
                      <div key={index} className="grid grid-cols-5 gap-3 items-start">
                        <div className="col-span-2">
                          <Input 
                            placeholder="Property (e.g., Purity)" 
                            value={spec.key}
                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input 
                            placeholder="Value (e.g., 99.9%)" 
                            value={spec.value}
                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => removeSpecification(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Certifications</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={addCertification}
                    >
                      <Plus className="h-4 w-4" />
                      Add Certification
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.certifications.map((cert, index) => (
                      <div key={index} className="flex gap-3">
                        <Input 
                          placeholder="e.g., ISO 14001, R2, e-Stewards" 
                          value={cert}
                          onChange={(e) => updateCertification(index, e.target.value)}
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => removeCertification(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Shipping */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={formData.price} 
                        onChange={handleInputChange} 
                        className="pl-8"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priceType">Price Type *</Label>
                    <Select 
                      value={formData.priceType} 
                      onValueChange={(value: 'fixed' | 'negotiable' | 'auction') => 
                        handleSelectChange('priceType', value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                        <SelectItem value="auction">Auction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity *</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="quantity" 
                        name="quantity" 
                        type="number" 
                        min="1" 
                        value={formData.quantity} 
                        onChange={handleInputChange} 
                        required 
                      />
                      <Select 
                        value={formData.unit} 
                        onValueChange={(value) => handleSelectChange('unit', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Shipping Options</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={addShippingOption}
                    >
                      <Plus className="h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.shippingOptions.map((option, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                        <div className="md:col-span-3">
                          <Select 
                            value={option.type}
                            onValueChange={(value) => updateShippingOption(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Shipping Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {shippingTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              placeholder="Cost" 
                              value={option.cost}
                              onChange={(e) => updateShippingOption(index, 'cost', e.target.value)}
                              className="pl-8"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-6">
                          <Input 
                            placeholder="Details (e.g., 'Free for orders over $500')" 
                            value={option.details}
                            onChange={(e) => updateShippingOption(index, 'details', e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => removeShippingOption(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Location</Label>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Enter your location" 
                      value={formData.location}
                      onChange={(e) => handleSelectChange('location', e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="isLocationPrivate" 
                        checked={formData.isLocationPrivate}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, isLocationPrivate: checked }))
                        }
                      />
                      <Label htmlFor="isLocationPrivate">
                        Hide exact location (only show city/region)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">Basic Information</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Title</p>
                        <p>{formData.title || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p>{formData.category || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Material Type</p>
                        <p>{formData.materialType || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p>{formData.condition || '-'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="whitespace-pre-line">{formData.description || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">Pricing & Quantity</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p>{formData.price ? `$${formData.price}` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price Type</p>
                        <p className="capitalize">{formData.priceType || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Available Quantity</p>
                        <p>{formData.quantity ? `${formData.quantity} ${formData.unit}` : '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.specifications.some(spec => spec.key || spec.value) && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Specifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.specifications.map((spec, index) => (
                          spec.key || spec.value ? (
                            <div key={index}>
                              <p className="text-sm text-gray-500">{spec.key || 'Property'}</p>
                              <p>{spec.value || '-'}</p>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {formData.certifications.some(cert => cert.trim() !== '') && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Certifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {formData.certifications
                          .filter(cert => cert.trim() !== '')
                          .map((cert, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              {cert}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">Shipping & Location</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {formData.shippingOptions.map((option, index) => (
                        <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Type</p>
                              <p>{option.type || '-'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Cost</p>
                              <p>{option.cost ? `$${option.cost}` : 'Free'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Details</p>
                              <p>{option.details || '-'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p>{formData.location || '-'}</p>
                        {formData.isLocationPrivate && (
                          <p className="text-sm text-gray-500">
                            (Exact location will be hidden from buyers)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">Photos</h3>
                  </div>
                  <div className="p-4">
                    {imagePreviews.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={preview} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No photos added</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.title || !formData.category || !formData.description || formData.images.length === 0)) ||
                  (step === 2 && !formData.condition) ||
                  (step === 3 && (!formData.price || !formData.quantity))
                }
              >
                Next
              </Button>
            ) : (
              <Button type="submit">
                Publish Listing
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
