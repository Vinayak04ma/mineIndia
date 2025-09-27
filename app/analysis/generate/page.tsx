"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, Check, ArrowLeft, Info, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

// Constants
const MINERALS = [
  "Iron ore", "Aluminium", "Coal", "Mica", "Manganese", "Limestone", "Chromite", "Diamonds", "Copper", "Zinc",
  "Lead", "Gypsum", "Dolomite", "Graphite", "Steel", "Lithium", "Gold", "Silver", "Iron", "Nickel"
] as const

// Types
type FormData = {
  // Section 1: Select Minerals
  selectedMineral: string

  // Section 2: Production & Operational Data
  annualProduction: string
  operatingHours: string
  yieldEfficiency: string
  technologyType: string
  oreGrade: string
  functionalUnit: string

  // Section 3: Energy Inputs
  gridElectricity: string
  gridEmissionFactor: string
  fuelOilConsumption: string
  coalCokeInput: string
  naturalGasInput: string
  renewableEnergyShare: string
  onsiteElectricity: string
  energyRecovery: string

  // Section 4: Raw Material Inputs
  oreMined: string
  concentratesUsed: string
  fluxes: string
  scrapRecycledInput: string
  alloyingElements: string
  chemicalReductants: string
  additives: string

  // Section 5: Air Emissions
  co2Direct: string
  co2FromFuels: string
  ch4Emissions: string
  n2oEmissions: string
  so2Emissions: string
  noxEmissions: string
  coEmissions: string
  pmEmissions: string
  vocsEmissions: string
  heavyMetalsAir: string
  pfcsSf6: string

  // Section 6: Water Inputs & Emissions
  waterWithdrawn: string
  waterConsumed: string
  coolingWater: string
  wastewaterGenerated: string
  wastewaterCodBod: string
  heavyMetalsWater: string
  nitratesPhosphates: string
  phEffluent: string

  // Section 7: Solid Waste & By-products
  overburdenWasteRock: string
  tailingsGenerated: string
  slagGeneration: string
  redMud: string
  dustCollected: string
  hazardousWaste: string
  recyclableByProducts: string

  // Section 8: Resource Use & Land
  landAreaOccupied: string
  landDisturbed: string
  biodiversityImpact: string
  waterSourceType: string
  mineralDepletion: string
  fossilFuelDepletion: string

  // Section 9: Toxicity & Human Health
  workplaceDust: string
  workplaceHeavyMetals: string
  toxicAirPollutants: string
  toxicEffluents: string

  // Section 10: Circularity & End-of-Life
  recycledInputShare: string
  byProductsReuse: string
  wasteDiverted: string
  recyclingCredit: string
  productLifetime: string
  productRecyclability: string
  industrialSymbiosis: string

  // Section 11: Circularity Metrics
  mVirgin: string
  mRecycledIn: string
  mEol: string
  mRecoverable: string
  mReused: string
  mRecycledOutput: string
  mLandfill: string
  ePrimary: string
  eRecycled: string
  gwpPrimary: string
  gwpSecondary: string
  v: string
  w: string
  tActual: string
  tRef: string
  useIntensity: string
  processLosses: string
}

// Define section keys
type SectionKey = 
  | 'mineral' 
  | 'production' 
  | 'energy' 
  | 'materials' 
  | 'airEmissions' 
  | 'water' 
  | 'waste' 
  | 'resource' 
  | 'toxicity' 
  | 'circularity'
  | 'circularityMetrics'

export default function GenerateLCAPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDraftSaving, setIsDraftSaving] = useState(false)
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const [currentSection, setCurrentSection] = useState<SectionKey>('mineral');
  
  // Define section order for navigation and tabs
  const sectionOrder: { key: SectionKey; label: string }[] = [
    { key: 'mineral', label: 'Mineral' },
    { key: 'production', label: 'Production' },
    { key: 'energy', label: 'Energy' },
    { key: 'materials', label: 'Materials' },
    { key: 'airEmissions', label: 'Air Emissions' },
    { key: 'water', label: 'Water' },
    { key: 'waste', label: 'Waste' },
    { key: 'resource', label: 'Resource Use' },
    { key: 'toxicity', label: 'Toxicity' },
    { key: 'circularity', label: 'Circularity' },
    { key: 'circularityMetrics', label: 'Circularity Metrics' },
  ];

  const goToNextSection = () => {
    const currentIndex = sectionOrder.findIndex(s => s.key === currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1].key);
    }
  };

  const goToPrevSection = () => {
    const currentIndex = sectionOrder.findIndex(s => s.key === currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1].key);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    selectedMineral: '',
    annualProduction: '', operatingHours: '', yieldEfficiency: '', technologyType: '', oreGrade: '', functionalUnit: '1 tonne',
    gridElectricity: '', gridEmissionFactor: '0.5', fuelOilConsumption: '', coalCokeInput: '', naturalGasInput: '', renewableEnergyShare: '', onsiteElectricity: '', energyRecovery: '',
    oreMined: '', concentratesUsed: '', fluxes: '', scrapRecycledInput: '', alloyingElements: '', chemicalReductants: '', additives: '',
    co2Direct: '', co2FromFuels: '', ch4Emissions: '', n2oEmissions: '', so2Emissions: '', noxEmissions: '', coEmissions: '', pmEmissions: '', vocsEmissions: '', heavyMetalsAir: '', pfcsSf6: '',
    waterWithdrawn: '', waterConsumed: '', coolingWater: '', wastewaterGenerated: '', wastewaterCodBod: '', heavyMetalsWater: '', nitratesPhosphates: '', phEffluent: '',
    overburdenWasteRock: '', tailingsGenerated: '', slagGeneration: '', redMud: '', dustCollected: '', hazardousWaste: '', recyclableByProducts: '',
    landAreaOccupied: '', landDisturbed: '', biodiversityImpact: '', waterSourceType: 'surface', mineralDepletion: '', fossilFuelDepletion: '',
    workplaceDust: '', workplaceHeavyMetals: '', toxicAirPollutants: '', toxicEffluents: '',
    recycledInputShare: '', byProductsReuse: '', wasteDiverted: '', recyclingCredit: '', productLifetime: '', productRecyclability: '', industrialSymbiosis: '',
    mVirgin: '', mRecycledIn: '', mEol: '', mRecoverable: '', mReused: '', mRecycledOutput: '', mLandfill: '', ePrimary: '', eRecycled: '', gwpPrimary: '', gwpSecondary: '', v: '', w: '', tActual: '', tRef: '', useIntensity: '', processLosses: ''
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const saveDraft = async () => {
    setIsDraftSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('lcaDraft', JSON.stringify(formData))
      setIsDraftSaved(true)
      toast({ title: "Draft saved", description: "Your progress has been saved." })
      setTimeout(() => setIsDraftSaved(false), 3000)
    } catch (error) {
      console.error('Error saving draft:', error)
      toast({ title: "Error", description: "Failed to save draft.", variant: "destructive" })
    } finally {
      setIsDraftSaving(false)
    }
  }
  
  useEffect(() => {
    const savedDraft = localStorage.getItem('lcaDraft')
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft))
      } catch (error) {
        console.error('Error parsing saved draft:', error)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.selectedMineral) {
      toast({ title: "Error", description: "Please select a mineral.", variant: "destructive" })
      setCurrentSection('mineral');
      return
    }
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Form submitted:', formData)
      localStorage.setItem('lcaFormData', JSON.stringify(formData))
      toast({ title: "Success!", description: "LCA report is being generated." })
      router.push('/analysis/report')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({ title: "Error", description: "Failed to generate LCA report.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const completionPercentage = 20 // This would be calculated

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">LCA Analysis</h1>
            </div>
             <div className="flex items-center gap-4">
                 <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={saveDraft}
                  disabled={isDraftSaving}
                >
                  {isDraftSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : isDraftSaved ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Save className="h-4 w-4 mr-2" />}
                  {isDraftSaved ? 'Saved' : 'Save Draft'}
                </Button>
                <Button 
                  type="submit" 
                  form="lca-form"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                   {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Generate Report
                </Button>
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  
                  {/* Left Section */}
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full mb-3">
                      <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
                      <span className="text-xs font-medium text-white/90 tracking-wider">
                        LIFE CYCLE ASSESSMENT
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Data Collection
                    </h2>
                    <p className="text-blue-100/90 text-sm max-w-2xl">
                      Complete the following sections to generate your LCA report. 
                      All fields are required.
                    </p>
                  </div>

                  {/* Right Section - Progress */}
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block bg-white/10 px-4 py-2 rounded-lg">
                      <p className="text-xs text-blue-100/80 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={completionPercentage} 
                          className="h-1.5 w-32 bg-white/20" 
                        />
                        <span className="text-sm font-medium text-white">
                          {completionPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


          {/* Navigation Tabs */}
          <div className="bg-white/80 backdrop-blur-sm z-10 py-2 mb-6 border-b rounded-lg">
            <div className="flex items-center gap-1 overflow-x-auto py-1 px-2 pb-5">
              {sectionOrder.map((section) => (
                <button
                  key={section.key}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    currentSection === section.key
                      ? 'bg-blue-100 text-blue-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentSection(section.key)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <form id="lca-form" onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
            {/* Section 1: Mineral Selection */}
            <Card className={`${currentSection === 'mineral' ? 'block' : 'hidden'} border-2 border-gray-100 shadow-md`}>
              <CardHeader>
                <CardTitle>1. Select Mineral</CardTitle>
                <CardDescription>Choose the primary mineral for your LCA analysis.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">This selection will customize the form fields to be most relevant for your chosen mineral.</p>
                  </div>
                </div>
                <RadioGroup value={formData.selectedMineral} onValueChange={(value) => handleInputChange('selectedMineral', value)} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {MINERALS.map(mineral => (
                    <Label key={mineral} htmlFor={mineral} className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${formData.selectedMineral === mineral ? 'border-blue-500 bg-blue-50 ring-1' : 'border-gray-200 hover:border-blue-400'}`}>
                      <RadioGroupItem value={mineral} id={mineral} />
                      <span className="font-medium text-gray-800">{mineral}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
              </CardFooter>
            </Card>

            {/* Section 2: Production Data */}
            <Card className={`${currentSection === 'production' ? 'block' : 'hidden'} border-2 border-gray-100 shadow-md`}>
                <CardHeader>
                    <CardTitle>2. Production & Operational Data</CardTitle>
                    <CardDescription>Enter details about your production volume, process, and technology.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="annualProduction" className="text-sm font-medium text-gray-700">Annual production volume (t/yr)</Label>
                            <Input 
                                id="annualProduction" 
                                type="number" 
                                value={formData.annualProduction} 
                                onChange={(e) => handleInputChange('annualProduction', e.target.value)} 
                                placeholder="e.g., 100000"
                                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                         </div>
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-700">Plant operating hours (h/yr)</Label>
                            <Input 
                                id="operatingHours" 
                                type="number" 
                                value={formData.operatingHours} 
                                onChange={(e) => handleInputChange('operatingHours', e.target.value)} 
                                placeholder="e.g., 8000"
                                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                         </div>
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="yieldEfficiency" className="text-sm font-medium text-gray-700">Yield/Efficiency (%)</Label>
                            <Input 
                                id="yieldEfficiency" 
                                type="number" 
                                value={formData.yieldEfficiency} 
                                onChange={(e) => handleInputChange('yieldEfficiency', e.target.value)} 
                                placeholder="e.g., 95"
                                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                         </div>
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="oreGrade" className="text-sm font-medium text-gray-700">Ore grade (%)</Label>
                            <Input 
                                id="oreGrade" 
                                type="number" 
                                value={formData.oreGrade} 
                                onChange={(e) => handleInputChange('oreGrade', e.target.value)} 
                                placeholder="e.g., 62"
                                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                         </div>
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="technologyType" className="text-sm font-medium text-gray-700">Technology type</Label>
                            <Select 
                                value={formData.technologyType} 
                                onValueChange={(value) => handleInputChange('technologyType', value)}
                            >
                                <SelectTrigger className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                                    <SelectValue placeholder="Select technology" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="blast-furnace">Blast Furnace</SelectItem>
                                    <SelectItem value="electric-arc">Electric Arc Furnace</SelectItem>
                                    <SelectItem value="basic-oxygen">Basic Oxygen Furnace</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                            <Label htmlFor="functionalUnit" className="text-sm font-medium text-gray-700">Functional unit</Label>
                            <Input 
                                id="functionalUnit" 
                                value={formData.functionalUnit} 
                                onChange={(e) => handleInputChange('functionalUnit', e.target.value)}
                                className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                         </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4 ">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>
            
            {/* Section 3: Energy Inputs */}
            <Card className={`${currentSection === 'energy' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>3. Energy Inputs</CardTitle><CardDescription>Provide data on energy consumption from various sources.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="gridElectricity" className="text-sm font-medium text-gray-700">Grid electricity consumption (kWh/t product)</Label>
                        <Input 
                            id="gridElectricity" 
                            type="number" 
                            value={formData.gridElectricity} 
                            onChange={(e) => handleInputChange('gridElectricity', e.target.value)} 
                            placeholder="e.g., 500"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="gridEmissionFactor" className="text-sm font-medium text-gray-700">Grid emission factor (kg CO₂/kWh)</Label>
                        <Input 
                            id="gridEmissionFactor" 
                            type="number" 
                            step="0.01" 
                            value={formData.gridEmissionFactor} 
                            onChange={(e) => handleInputChange('gridEmissionFactor', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="fuelOilConsumption" className="text-sm font-medium text-gray-700">Fuel oil consumption (L or MJ/t product)</Label>
                        <Input 
                            id="fuelOilConsumption" 
                            type="number" 
                            value={formData.fuelOilConsumption} 
                            onChange={(e) => handleInputChange('fuelOilConsumption', e.target.value)} 
                            placeholder="e.g., 100"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="coalCokeInput" className="text-sm font-medium text-gray-700">Coal/coke input (kg/t product)</Label>
                        <Input 
                            id="coalCokeInput" 
                            type="number" 
                            value={formData.coalCokeInput} 
                            onChange={(e) => handleInputChange('coalCokeInput', e.target.value)} 
                            placeholder="e.g., 400"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="naturalGasInput" className="text-sm font-medium text-gray-700">Natural gas input (Nm³/t product)</Label>
                        <Input 
                            id="naturalGasInput" 
                            type="number" 
                            value={formData.naturalGasInput} 
                            onChange={(e) => handleInputChange('naturalGasInput', e.target.value)} 
                            placeholder="e.g., 80"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="renewableEnergyShare" className="text-sm font-medium text-gray-700">Renewable energy share (%)</Label>
                        <Input 
                            id="renewableEnergyShare" 
                            type="number" 
                            max="100" 
                            value={formData.renewableEnergyShare} 
                            onChange={(e) => handleInputChange('renewableEnergyShare', e.target.value)} 
                            placeholder="e.g., 10"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="onsiteElectricity" className="text-sm font-medium text-gray-700">On-site generated electricity (MWh/yr)</Label>
                        <Input 
                            id="onsiteElectricity" 
                            type="number" 
                            value={formData.onsiteElectricity} 
                            onChange={(e) => handleInputChange('onsiteElectricity', e.target.value)} 
                            placeholder="e.g., 5000"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="energyRecovery" className="text-sm font-medium text-gray-700">Energy recovery from waste gases (MJ/yr)</Label>
                        <Input 
                            id="energyRecovery" 
                            type="number" 
                            value={formData.energyRecovery} 
                            onChange={(e) => handleInputChange('energyRecovery', e.target.value)} 
                            placeholder="e.g., 10000"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 4: Raw Material Inputs */}
            <Card className={`${currentSection === 'materials' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>4. Raw Material Inputs</CardTitle><CardDescription>Detail the raw materials used in the process.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="oreMined" className="text-sm font-medium text-gray-700">Ore mined/processed (t/yr)</Label>
                        <Input 
                            id="oreMined" 
                            type="number" 
                            value={formData.oreMined} 
                            onChange={(e) => handleInputChange('oreMined', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="concentratesUsed" className="text-sm font-medium text-gray-700">Concentrates used (t/yr)</Label>
                        <Input 
                            id="concentratesUsed" 
                            type="number" 
                            value={formData.concentratesUsed} 
                            onChange={(e) => handleInputChange('concentratesUsed', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="fluxes" className="text-sm font-medium text-gray-700">Fluxes (kg/t product)</Label>
                        <Input 
                            id="fluxes" 
                            type="number" 
                            value={formData.fluxes} 
                            onChange={(e) => handleInputChange('fluxes', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="scrapRecycledInput" className="text-sm font-medium text-gray-700">Scrap/recycled metal input (%)</Label>
                        <Input 
                            id="scrapRecycledInput" 
                            type="number" 
                            max="100" 
                            value={formData.scrapRecycledInput} 
                            onChange={(e) => handleInputChange('scrapRecycledInput', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="alloyingElements" className="text-sm font-medium text-gray-700">Alloying elements (kg/t product)</Label>
                        <Input 
                            id="alloyingElements" 
                            type="number" 
                            value={formData.alloyingElements} 
                            onChange={(e) => handleInputChange('alloyingElements', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="chemicalReductants" className="text-sm font-medium text-gray-700">Chemical reductants (kg/t product)</Label>
                        <Input 
                            id="chemicalReductants" 
                            type="number" 
                            value={formData.chemicalReductants} 
                            onChange={(e) => handleInputChange('chemicalReductants', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors md:col-span-2">
                        <Label htmlFor="additives" className="text-sm font-medium text-gray-700">Additives (list with quantities)</Label>
                        <Textarea 
                            id="additives" 
                            value={formData.additives} 
                            onChange={(e) => handleInputChange('additives', e.target.value)} 
                            placeholder="e.g., Limestone: 50 kg/t, Dolomite: 30 kg/t"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-h-[100px]"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 5: Air Emissions */}
            <Card className={`${currentSection === 'airEmissions' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>5. Air Emissions</CardTitle><CardDescription>Quantify emissions released into the atmosphere.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="co2Direct" className="text-sm font-medium text-gray-700">Direct CO₂ emissions (kg CO₂/t product)</Label>
                        <Input 
                            id="co2Direct" 
                            type="number" 
                            value={formData.co2Direct} 
                            onChange={(e) => handleInputChange('co2Direct', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="co2FromFuels" className="text-sm font-medium text-gray-700">CO₂ from fuel combustion (kg CO₂/t product)</Label>
                        <Input 
                            id="co2FromFuels" 
                            type="number" 
                            value={formData.co2FromFuels} 
                            onChange={(e) => handleInputChange('co2FromFuels', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="ch4Emissions" className="text-sm font-medium text-gray-700">CH₄ emissions (kg CH₄/t product)</Label>
                        <Input 
                            id="ch4Emissions" 
                            type="number" 
                            value={formData.ch4Emissions} 
                            onChange={(e) => handleInputChange('ch4Emissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="n2oEmissions" className="text-sm font-medium text-gray-700">N₂O emissions (kg N₂O/t product)</Label>
                        <Input 
                            id="n2oEmissions" 
                            type="number" 
                            value={formData.n2oEmissions} 
                            onChange={(e) => handleInputChange('n2oEmissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="so2Emissions" className="text-sm font-medium text-gray-700">SO₂ emissions (kg SO₂/t product)</Label>
                        <Input 
                            id="so2Emissions" 
                            type="number" 
                            value={formData.so2Emissions} 
                            onChange={(e) => handleInputChange('so2Emissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="noxEmissions" className="text-sm font-medium text-gray-700">NOₓ emissions (kg NOₓ/t product)</Label>
                        <Input 
                            id="noxEmissions" 
                            type="number" 
                            value={formData.noxEmissions} 
                            onChange={(e) => handleInputChange('noxEmissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="coEmissions" className="text-sm font-medium text-gray-700">CO emissions (kg CO/t product)</Label>
                        <Input 
                            id="coEmissions" 
                            type="number" 
                            value={formData.coEmissions} 
                            onChange={(e) => handleInputChange('coEmissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="pmEmissions" className="text-sm font-medium text-gray-700">Particulate matter (PM) emissions (kg PM/t product)</Label>
                        <Input 
                            id="pmEmissions" 
                            type="number" 
                            value={formData.pmEmissions} 
                            onChange={(e) => handleInputChange('pmEmissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="vocsEmissions" className="text-sm font-medium text-gray-700">VOCs emissions (kg VOCs/t product)</Label>
                        <Input 
                            id="vocsEmissions" 
                            type="number" 
                            value={formData.vocsEmissions} 
                            onChange={(e) => handleInputChange('vocsEmissions', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="heavyMetalsAir" className="text-sm font-medium text-gray-700">Heavy metals to air (kg/t product)
                        </Label>
                        <Input 
                          id="heavyMetalsAir" 
                          type="number"  
                          value={formData.heavyMetalsAir} 
                          onChange={(e) => handleInputChange('heavyMetalsAir', e.target.value)}
                          className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                      />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="pfcsSf6" className="text-sm font-medium text-gray-700">PFCs/SF₆ emissions (kg CO₂-eq/t product)</Label>
                      <Input 
                      id="pfcsSf6" 
                      type="number" 
                      value={formData.pfcsSf6} 
                      onChange={(e) => handleInputChange('pfcsSf6', e.target.value)} 
                      className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                </CardContent>
                 <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 6: Water Inputs & Emissions */}
             <Card className={`${currentSection === 'water' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>6. Water Inputs & Emissions</CardTitle><CardDescription>Detail water usage and wastewater discharge.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="waterWithdrawn" className="text-sm font-medium text-gray-700">Water withdrawn (m³/t product)</Label>
                        <Input 
                            id="waterWithdrawn" 
                            type="number" 
                            value={formData.waterWithdrawn} 
                            onChange={(e) => handleInputChange('waterWithdrawn', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="waterConsumed" className="text-sm font-medium text-gray-700">Water consumed (m³/t product)</Label>
                        <Input 
                            id="waterConsumed" 
                            type="number" 
                            value={formData.waterConsumed} 
                            onChange={(e) => handleInputChange('waterConsumed', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="coolingWater" className="text-sm font-medium text-gray-700">Cooling water (m³/t product)</Label>
                        <Input 
                            id="coolingWater" 
                            type="number" 
                            value={formData.coolingWater} 
                            onChange={(e) => handleInputChange('coolingWater', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="wastewaterGenerated" className="text-sm font-medium text-gray-700">Wastewater generated (m³/t product)</Label>
                        <Input 
                            id="wastewaterGenerated" 
                            type="number" 
                            value={formData.wastewaterGenerated} 
                            onChange={(e) => handleInputChange('wastewaterGenerated', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="wastewaterCodBod" className="text-sm font-medium text-gray-700">Wastewater COD/BOD (kg/t product)</Label>
                        <Input 
                            id="wastewaterCodBod" 
                            type="number" 
                            value={formData.wastewaterCodBod} 
                            onChange={(e) => handleInputChange('wastewaterCodBod', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="heavyMetalsWater" className="text-sm font-medium text-gray-700">Heavy metals to water (kg/t product)</Label>
                        <Input 
                            id="heavyMetalsWater" 
                            type="number" 
                            value={formData.heavyMetalsWater} 
                            onChange={(e) => handleInputChange('heavyMetalsWater', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="nitratesPhosphates" className="text-sm font-medium text-gray-700">Nitrates/phosphates (kg/t product)</Label>
                        <Input 
                            id="nitratesPhosphates" 
                            type="number" 
                            value={formData.nitratesPhosphates} 
                            onChange={(e) => handleInputChange('nitratesPhosphates', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="phEffluent" className="text-sm font-medium text-gray-700">pH of effluent</Label>
                        <Input 
                            id="phEffluent" 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="14" 
                            value={formData.phEffluent} 
                            onChange={(e) => handleInputChange('phEffluent', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 7: Solid Waste & By-products */}
            <Card className={`${currentSection === 'waste' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>7. Solid Waste & By-products</CardTitle><CardDescription>Provide data on waste generation and by-product creation.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="overburdenWasteRock">Overburden/waste rock (t/t product)</Label>
                        <Input 
                          id="overburdenWasteRock" 
                          type="number"  
                          value={formData.overburdenWasteRock} 
                          onChange={(e) => handleInputChange('overburdenWasteRock', e.target.value)} 
                          className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="tailingsGenerated" className="text-sm font-medium text-gray-700">Tailings generated (t/t product)</Label>
                        <Input 
                            id="tailingsGenerated" 
                            type="number" 
                            value={formData.tailingsGenerated} 
                            onChange={(e) => handleInputChange('tailingsGenerated', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="slagGeneration" className="text-sm font-medium text-gray-700">Slag generation (kg/t product)</Label>
                        <Input 
                            id="slagGeneration" 
                            type="number" 
                            value={formData.slagGeneration} 
                            onChange={(e) => handleInputChange('slagGeneration', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="redMud" className="text-sm font-medium text-gray-700">Red mud/bauxite residue (t/t product)</Label>
                        <Input 
                            id="redMud" 
                            type="number" 
                            value={formData.redMud} 
                            onChange={(e) => handleInputChange('redMud', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="dustCollected" className="text-sm font-medium text-gray-700">Dust collected (kg/t product)</Label>
                        <Input 
                            id="dustCollected" 
                            type="number" 
                            value={formData.dustCollected} 
                            onChange={(e) => handleInputChange('dustCollected', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="hazardousWaste" className="text-sm font-medium text-gray-700">Hazardous waste (kg/t product)</Label>
                        <Input 
                            id="hazardousWaste" 
                            type="number" 
                            value={formData.hazardousWaste} 
                            onChange={(e) => handleInputChange('hazardousWaste', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="recyclableByProducts" className="text-sm font-medium text-gray-700">Recyclable by-products (list with quantities)</Label>
                        <Textarea 
                            id="recyclableByProducts" 
                            value={formData.recyclableByProducts} 
                            onChange={(e) => handleInputChange('recyclableByProducts', e.target.value)} 
                            placeholder="Example: Steel slag: 200 kg/t, Fly ash: 50 kg/t"
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-h-[100px]"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 8: Resource Use & Land */}
            <Card className={`${currentSection === 'resource' ? 'block' : 'hidden'}`}>
                <CardHeader><CardTitle>8. Resource Use & Land</CardTitle><CardDescription>Information on land occupation and resource depletion.</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="landAreaOccupied" className="text-sm font-medium text-gray-700">Land area occupied (m²/t product)</Label>
                         <Input 
                             id="landAreaOccupied" 
                             type="number" 
                             value={formData.landAreaOccupied} 
                             onChange={(e) => handleInputChange('landAreaOccupied', e.target.value)}
                             className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                         />
                     </div>
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="landDisturbed" className="text-sm font-medium text-gray-700">Land disturbed (m²/t product)</Label>
                         <Input 
                             id="landDisturbed" 
                             type="number" 
                             value={formData.landDisturbed} 
                             onChange={(e) => handleInputChange('landDisturbed', e.target.value)}
                             className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                         />
                     </div>
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="biodiversityImpact" className="text-sm font-medium text-gray-700">Biodiversity impact (species affected)</Label>
                         <Input 
                             id="biodiversityImpact" 
                             type="number" 
                             value={formData.biodiversityImpact} 
                             onChange={(e) => handleInputChange('biodiversityImpact', e.target.value)}
                             className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                         />
                     </div>
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="waterSourceType" className="text-sm font-medium text-gray-700">Water source type</Label>
                         <Select 
                             value={formData.waterSourceType} 
                             onValueChange={(value) => handleInputChange('waterSourceType', value)}
                         >
                             <SelectTrigger className="mt-1 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-100">
                                 <SelectValue placeholder="Select water source" />
                             </SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="surface">Surface water</SelectItem>
                                 <SelectItem value="groundwater">Groundwater</SelectItem>
                                 <SelectItem value="recycled">Recycled water</SelectItem>
                                 <SelectItem value="seawater">Seawater</SelectItem>
                             </SelectContent>
                         </Select>
                     </div>
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="mineralDepletion" className="text-sm font-medium text-gray-700">Mineral depletion (kg Sb-eq/t product)</Label>
                         <Input 
                             id="mineralDepletion" 
                             type="number" 
                             value={formData.mineralDepletion} 
                             onChange={(e) => handleInputChange('mineralDepletion', e.target.value)}
                             className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                         />
                     </div>
                     <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                         <Label htmlFor="fossilFuelDepletion" className="text-sm font-medium text-gray-700">Fossil fuel depletion (MJ/t product)</Label>
                         <Input 
                             id="fossilFuelDepletion" 
                             type="number" 
                             value={formData.fossilFuelDepletion} 
                             onChange={(e) => handleInputChange('fossilFuelDepletion', e.target.value)}
                             className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                         />
                     </div>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>
            
            {/* Section 9: Toxicity & Human Health */}
            <Card className={`${currentSection === 'toxicity' ? 'block' : 'hidden'}`}>
                 <CardHeader><CardTitle>9. Toxicity & Human Health</CardTitle><CardDescription>Data related to workplace exposure and toxic emissions.</CardDescription></CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="workplaceDust" className="text-sm font-medium text-gray-700">Workplace dust exposure (mg/m³)</Label>
                        <Input 
                            id="workplaceDust" 
                            type="number" 
                            value={formData.workplaceDust} 
                            onChange={(e) => handleInputChange('workplaceDust', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="workplaceHeavyMetals" className="text-sm font-medium text-gray-700">Workplace heavy metals (mg/m³)</Label>
                        <Input 
                            id="workplaceHeavyMetals" 
                            type="number" 
                            value={formData.workplaceHeavyMetals} 
                            onChange={(e) => handleInputChange('workplaceHeavyMetals', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="toxicAirPollutants" className="text-sm font-medium text-gray-700">Toxic air pollutants (CTUh/t product)</Label>
                        <Input 
                            id="toxicAirPollutants" 
                            type="number" 
                            value={formData.toxicAirPollutants} 
                            onChange={(e) => handleInputChange('toxicAirPollutants', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="toxicEffluents" className="text-sm font-medium text-gray-700">Toxic effluents (CTUe/t product)</Label>
                        <Input 
                            id="toxicEffluents" 
                            type="number" 
                            value={formData.toxicEffluents} 
                            onChange={(e) => handleInputChange('toxicEffluents', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                 </CardContent>
                 <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 10: Circularity & End-of-Life */}
            <Card className={`${currentSection === 'circularity' ? 'block' : 'hidden'}`}>
                 <CardHeader><CardTitle>10. Circularity & End-of-Life</CardTitle><CardDescription>Information about recycling, reuse, and product lifecycle.</CardDescription></CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="recycledInputShare" className="text-sm font-medium text-gray-700">Recycled input share (%)</Label>
                        <Input 
                            id="recycledInputShare" 
                            type="number" 
                            max="100" 
                            value={formData.recycledInputShare} 
                            onChange={(e) => handleInputChange('recycledInputShare', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="byProductsReuse" className="text-sm font-medium text-gray-700">By-products reuse rate (%)</Label>
                        <Input 
                            id="byProductsReuse" 
                            type="number" 
                            max="100" 
                            value={formData.byProductsReuse} 
                            onChange={(e) => handleInputChange('byProductsReuse', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="wasteDiverted" className="text-sm font-medium text-gray-700">Waste diverted from landfill (%)</Label>
                        <Input 
                            id="wasteDiverted" 
                            type="number" 
                            max="100" 
                            value={formData.wasteDiverted} 
                            onChange={(e) => handleInputChange('wasteDiverted', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="recyclingCredit" className="text-sm font-medium text-gray-700">Recycling credit (kg CO₂-eq/t product)</Label>
                        <Input 
                            id="recyclingCredit" 
                            type="number" 
                            value={formData.recyclingCredit} 
                            onChange={(e) => handleInputChange('recyclingCredit', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="productLifetime" className="text-sm font-medium text-gray-700">Product lifetime (years)</Label>
                        <Input 
                            id="productLifetime" 
                            type="number" 
                            value={formData.productLifetime} 
                            onChange={(e) => handleInputChange('productLifetime', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                        <Label htmlFor="productRecyclability" className="text-sm font-medium text-gray-700">Product recyclability (%)</Label>
                        <Input 
                            id="productRecyclability" 
                            type="number" 
                            max="100" 
                            value={formData.productRecyclability} 
                            onChange={(e) => handleInputChange('productRecyclability', e.target.value)}
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors md:col-span-2">
                        <Label htmlFor="industrialSymbiosis" className="text-sm font-medium text-gray-700">Industrial symbiosis partnerships</Label>
                        <Textarea 
                            id="industrialSymbiosis" 
                            value={formData.industrialSymbiosis} 
                            onChange={(e) => handleInputChange('industrialSymbiosis', e.target.value)} 
                            placeholder="Describe partnerships and material exchanges..."
                            className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-h-[100px]"
                        />
                    </div>
                 </CardContent>
                 <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="button" onClick={goToNextSection}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
                </CardFooter>
            </Card>

            {/* Section 11: Circularity Metrics */}
            <Card className={`${currentSection === 'circularityMetrics' ? 'block' : 'hidden'}`}>
                 <CardHeader><CardTitle>11. Circularity Metrics</CardTitle><CardDescription>Advanced metrics for a detailed circularity assessment.</CardDescription></CardHeader>
                 <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="mRecoverable" className="text-sm font-medium text-gray-700">M_recoverable (kg)</Label>
                      <Input 
                        id="mRecoverable" 
                        type="number" 
                        value={formData.mRecoverable} 
                        onChange={(e) => handleInputChange('mRecoverable', e.target.value)} 
                        placeholder="Recoverable material"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="mReused" className="text-sm font-medium text-gray-700">M_reused (kg)</Label>
                      <Input 
                        id="mReused" 
                        type="number" 
                        value={formData.mReused} 
                        onChange={(e) => handleInputChange('mReused', e.target.value)} 
                        placeholder="Reused material"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="mRecycledOutput" className="text-sm font-medium text-gray-700">M_recycled_out (kg)</Label>
                      <Input 
                        id="mRecycledOutput" 
                        type="number" 
                        value={formData.mRecycledOutput} 
                        onChange={(e) => handleInputChange('mRecycledOutput', e.target.value)} 
                        placeholder="Recycled material output"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="mLandfill" className="text-sm font-medium text-gray-700">M_landfill (kg)</Label>
                      <Input 
                        id="mLandfill" 
                        type="number" 
                        value={formData.mLandfill} 
                        onChange={(e) => handleInputChange('mLandfill', e.target.value)} 
                        placeholder="Material to landfill"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="ePrimary" className="text-sm font-medium text-gray-700">E_primary (MJ)</Label>
                      <Input 
                        id="ePrimary" 
                        type="number" 
                        value={formData.ePrimary} 
                        onChange={(e) => handleInputChange('ePrimary', e.target.value)} 
                        placeholder="Primary energy"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="eRecycled" className="text-sm font-medium text-gray-700">E_recycled (MJ)</Label>
                      <Input 
                        id="eRecycled" 
                        type="number" 
                        value={formData.eRecycled} 
                        onChange={(e) => handleInputChange('eRecycled', e.target.value)} 
                        placeholder="Recycled energy"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="gwpPrimary" className="text-sm font-medium text-gray-700">GWP_primary (kg CO₂-eq)</Label>
                      <Input 
                        id="gwpPrimary" 
                        type="number" 
                        value={formData.gwpPrimary} 
                        onChange={(e) => handleInputChange('gwpPrimary', e.target.value)} 
                        placeholder="Primary GWP"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="gwpSecondary" className="text-sm font-medium text-gray-700">GWP_secondary (kg CO₂-eq)</Label>
                      <Input 
                        id="gwpSecondary" 
                        type="number" 
                        value={formData.gwpSecondary} 
                        onChange={(e) => handleInputChange('gwpSecondary', e.target.value)} 
                        placeholder="Secondary GWP"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="v" className="text-sm font-medium text-gray-700">V (utility factor)</Label>
                      <Input 
                        id="v" 
                        type="number" 
                        step="0.01" 
                        value={formData.v} 
                        onChange={(e) => handleInputChange('v', e.target.value)} 
                        placeholder="e.g., 0.95"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="w" className="text-sm font-medium text-gray-700">W (quality factor)</Label>
                      <Input 
                        id="w" 
                        type="number" 
                        step="0.01" 
                        value={formData.w} 
                        onChange={(e) => handleInputChange('w', e.target.value)} 
                        placeholder="e.g., 0.9"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="tActual" className="text-sm font-medium text-gray-700">T_actual (years)</Label>
                      <Input 
                        id="tActual" 
                        type="number" 
                        value={formData.tActual} 
                        onChange={(e) => handleInputChange('tActual', e.target.value)} 
                        placeholder="Actual lifetime"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-blue-300 transition-colors">
                      <Label htmlFor="tRef" className="text-sm font-medium text-gray-700">T_ref (years)</Label>
                      <Input 
                        id="tRef" 
                        type="number" 
                        value={formData.tRef} 
                        onChange={(e) => handleInputChange('tRef', e.target.value)} 
                        placeholder="Reference lifetime"
                        className="mt-1 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                 </CardContent>
                 <CardFooter className="flex justify-between py-4">
                    <Button type="button" variant="outline" onClick={goToPrevSection}><ArrowLeft className="h-4 w-4 mr-2" /> Previous</Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</> : 'Submit & Generate Report'}
                    </Button>
                </CardFooter>
            </Card>

          </form>
        </div>
      </main>
    </div>
  )
}