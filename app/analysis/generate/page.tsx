"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Constants
const MINERALS = [
  "Iron ore", "Aluminium", "Coal", "Mica", "Manganese", "Limestone", "Chromite", "Diamonds", "Copper", "Zinc",
  "Lead", "Gypsum", "Dolomite", "Graphite", "Steel", "Lithium", "Gold", "Silver", "Iron", "Nickel"
] as const

// Types
type FormData = {
  // Section 1: Select Minerals - Changed to single selection
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

  // Circularity Metrics
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

export default function GenerateLCAPage() {
  const router = useRouter()

  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    selectedMineral: '',
    // Production & Operational Data
    annualProduction: '',
    operatingHours: '',
    yieldEfficiency: '',
    technologyType: '',
    oreGrade: '',
    functionalUnit: '1 tonne',
    // Energy Inputs
    gridElectricity: '',
    gridEmissionFactor: '0.5',
    fuelOilConsumption: '',
    coalCokeInput: '',
    naturalGasInput: '',
    renewableEnergyShare: '',
    onsiteElectricity: '',
    energyRecovery: '',
    // Raw Material Inputs
    oreMined: '',
    concentratesUsed: '',
    fluxes: '',
    scrapRecycledInput: '',
    alloyingElements: '',
    chemicalReductants: '',
    additives: '',
    // Air Emissions
    co2Direct: '',
    co2FromFuels: '',
    ch4Emissions: '',
    n2oEmissions: '',
    so2Emissions: '',
    noxEmissions: '',
    coEmissions: '',
    pmEmissions: '',
    vocsEmissions: '',
    heavyMetalsAir: '',
    pfcsSf6: '',
    // Water Inputs & Emissions
    waterWithdrawn: '',
    waterConsumed: '',
    coolingWater: '',
    wastewaterGenerated: '',
    wastewaterCodBod: '',
    heavyMetalsWater: '',
    nitratesPhosphates: '',
    phEffluent: '',
    // Solid Waste & By-products
    overburdenWasteRock: '',
    tailingsGenerated: '',
    slagGeneration: '',
    redMud: '',
    dustCollected: '',
    hazardousWaste: '',
    recyclableByProducts: '',
    // Resource Use & Land
    landAreaOccupied: '',
    landDisturbed: '',
    biodiversityImpact: '',
    waterSourceType: 'surface',
    mineralDepletion: '',
    fossilFuelDepletion: '',
    // Toxicity & Human Health
    workplaceDust: '',
    workplaceHeavyMetals: '',
    toxicAirPollutants: '',
    toxicEffluents: '',
    // Circularity & End-of-Life
    recycledInputShare: '',
    byProductsReuse: '',
    wasteDiverted: '',
    recyclingCredit: '',
    productLifetime: '',
    productRecyclability: '',
    industrialSymbiosis: '',
    // Circularity Metrics
    mVirgin: '',
    mRecycledIn: '',
    mEol: '',
    mRecoverable: '',
    mReused: '',
    mRecycledOutput: '',
    mLandfill: '',
    ePrimary: '',
    eRecycled: '',
    gwpPrimary: '',
    gwpSecondary: '',
    v: '',
    w: '',
    tActual: '',
    tRef: '',
    useIntensity: '',
    processLosses: ''
  })

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.selectedMineral) {
      alert('Please select a mineral before generating the report.')
      return
    }

    // Store form data in localStorage for the report page
    localStorage.setItem('lcaFormData', JSON.stringify(formData))

    console.log('Form submitted:', formData)
    router.push('/analysis/report')
  }

  return (
    <div className="container mx-auto py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300 hover:bg-gray-100"
        >
          ← Back to Analysis
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Manual Input And Selection</h1>
          <p className="text-gray-600 text-sm">Life Cycle Assessment Data Collection</p>
        </div>
        <div className="w-32"></div>
      </div>

      <Card className="mb-8 border border-gray-200 shadow-lg">
        <CardHeader className="bg-slate-800 text-white">
          <CardTitle className="text-2xl font-bold text-white">Generate LCA Analysis</CardTitle>
          <CardDescription className="text-slate-200 mt-2 text-base">
            Fill in the details below to generate a comprehensive Life Cycle Assessment report for your selected mineral.
          </CardDescription>
        </CardHeader>

        <CardContent className="bg-white p-0">
          <form onSubmit={handleSubmit} className="space-y-0">

            {/* Section 1: Select Mineral - Single Selection */}
            <div className="bg-gray-50 border-l-4 border-gray-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Select Mineral
                </h3>
              </div>
              <p className="text-gray-700 mb-6">Choose the primary mineral for your LCA analysis:</p>

              <RadioGroup
                value={formData.selectedMineral}
                onValueChange={(value) => handleInputChange('selectedMineral', value)}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {MINERALS.map(mineral => (
                  <div key={mineral} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem
                      value={mineral}
                      id={mineral}
                      className="border-gray-400 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                    />
                    <label
                      htmlFor={mineral}
                      className="text-sm font-medium text-gray-900 cursor-pointer flex-1"
                    >
                      {mineral}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 2: Production Data */}
            <div className="bg-white border-l-4 border-blue-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Production & Operational Data
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="annualProduction" className="text-sm font-medium text-gray-900">
                    Annual production volume (t/yr)
                  </Label>
                  <Input
                    id="annualProduction"
                    type="number"
                    value={formData.annualProduction}
                    onChange={(e) => handleInputChange('annualProduction', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter annual production"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="operatingHours" className="text-sm font-medium text-gray-900">
                    Plant operating hours (h/yr)
                  </Label>
                  <Input
                    id="operatingHours"
                    type="number"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter operating hours"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="yieldEfficiency" className="text-sm font-medium text-gray-900">
                    Yield/Efficiency (%)
                  </Label>
                  <Input
                    id="yieldEfficiency"
                    type="number"
                    value={formData.yieldEfficiency}
                    onChange={(e) => handleInputChange('yieldEfficiency', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter yield efficiency"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="technologyType" className="text-sm font-medium text-gray-900">
                    Technology type
                  </Label>
                  <Select
                    value={formData.technologyType}
                    onValueChange={(value) => handleInputChange('technologyType', value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select technology type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                      <SelectItem value="blast-furnace" className="text-black font-medium hover:bg-blue-50 focus:bg-blue-100 cursor-pointer">Blast Furnace</SelectItem>
                      <SelectItem value="electric-arc" className="text-black font-medium hover:bg-blue-50 focus:bg-blue-100 cursor-pointer">Electric Arc Furnace</SelectItem>
                      <SelectItem value="basic-oxygen" className="text-black font-medium hover:bg-blue-50 focus:bg-blue-100 cursor-pointer">Basic Oxygen Furnace</SelectItem>
                      <SelectItem value="other" className="text-black font-medium hover:bg-blue-50 focus:bg-blue-100 cursor-pointer">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="oreGrade" className="text-sm font-medium text-gray-900">
                    Ore grade (%)
                  </Label>
                  <Input
                    id="oreGrade"
                    type="number"
                    value={formData.oreGrade}
                    onChange={(e) => handleInputChange('oreGrade', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter ore grade"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="functionalUnit" className="text-sm font-medium text-gray-900">
                    Functional unit
                  </Label>
                  <Input
                    id="functionalUnit"
                    value={formData.functionalUnit}
                    onChange={(e) => handleInputChange('functionalUnit', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter functional unit"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 3: Energy Inputs */}
            <div className="bg-gray-50 border-l-4 border-orange-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Energy Inputs
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="gridElectricity" className="text-sm font-medium text-gray-900">
                    Grid electricity consumption (kWh/t product)
                  </Label>
                  <Input
                    id="gridElectricity"
                    type="number"
                    value={formData.gridElectricity}
                    onChange={(e) => handleInputChange('gridElectricity', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter electricity consumption"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="gridEmissionFactor" className="text-sm font-medium text-gray-900">
                    Grid emission factor (kg CO₂/kWh)
                  </Label>
                  <Input
                    id="gridEmissionFactor"
                    type="number"
                    step="0.01"
                    value={formData.gridEmissionFactor}
                    onChange={(e) => handleInputChange('gridEmissionFactor', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter emission factor"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fuelOilConsumption" className="text-sm font-medium text-gray-900">
                    Fuel oil consumption (L or MJ/t product)
                  </Label>
                  <Input
                    id="fuelOilConsumption"
                    type="number"
                    value={formData.fuelOilConsumption}
                    onChange={(e) => handleInputChange('fuelOilConsumption', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter fuel oil consumption"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="coalCokeInput" className="text-sm font-medium text-gray-900">
                    Coal/coke input (kg/t product)
                  </Label>
                  <Input
                    id="coalCokeInput"
                    type="number"
                    value={formData.coalCokeInput}
                    onChange={(e) => handleInputChange('coalCokeInput', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter coal/coke input"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="naturalGasInput" className="text-sm font-medium text-gray-900">
                    Natural gas input (Nm³/t product)
                  </Label>
                  <Input
                    id="naturalGasInput"
                    type="number"
                    value={formData.naturalGasInput}
                    onChange={(e) => handleInputChange('naturalGasInput', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter natural gas input"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="renewableEnergyShare" className="text-sm font-medium text-gray-900">
                    Renewable energy share (%)
                  </Label>
                  <Input
                    id="renewableEnergyShare"
                    type="number"
                    max="100"
                    value={formData.renewableEnergyShare}
                    onChange={(e) => handleInputChange('renewableEnergyShare', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter renewable energy share"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="onsiteElectricity" className="text-sm font-medium text-gray-900">
                    On-site generated electricity (MWh/yr)
                  </Label>
                  <Input
                    id="onsiteElectricity"
                    type="number"
                    value={formData.onsiteElectricity}
                    onChange={(e) => handleInputChange('onsiteElectricity', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter on-site electricity"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="energyRecovery" className="text-sm font-medium text-gray-900">
                    Energy recovery from waste gases (MJ/yr)
                  </Label>
                  <Input
                    id="energyRecovery"
                    type="number"
                    value={formData.energyRecovery}
                    onChange={(e) => handleInputChange('energyRecovery', e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter energy recovery"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 4: Raw Material Inputs */}
            <div className="bg-white border-l-4 border-purple-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Raw Material Inputs
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="oreMined" className="text-sm font-medium text-gray-900">
                    Ore mined/processed (t/yr)
                  </Label>
                  <Input
                    id="oreMined"
                    type="number"
                    value={formData.oreMined}
                    onChange={(e) => handleInputChange('oreMined', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter ore mined"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="concentratesUsed" className="text-sm font-medium text-gray-900">
                    Concentrates used (t/yr)
                  </Label>
                  <Input
                    id="concentratesUsed"
                    type="number"
                    value={formData.concentratesUsed}
                    onChange={(e) => handleInputChange('concentratesUsed', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter concentrates used"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fluxes" className="text-sm font-medium text-gray-900">
                    Fluxes (kg/t product)
                  </Label>
                  <Input
                    id="fluxes"
                    type="number"
                    value={formData.fluxes}
                    onChange={(e) => handleInputChange('fluxes', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter fluxes"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="scrapRecycledInput" className="text-sm font-medium text-gray-900">
                    Scrap/recycled metal input (%)
                  </Label>
                  <Input
                    id="scrapRecycledInput"
                    type="number"
                    max="100"
                    value={formData.scrapRecycledInput}
                    onChange={(e) => handleInputChange('scrapRecycledInput', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter scrap input percentage"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="alloyingElements" className="text-sm font-medium text-gray-900">
                    Alloying elements (kg/t product)
                  </Label>
                  <Input
                    id="alloyingElements"
                    type="number"
                    value={formData.alloyingElements}
                    onChange={(e) => handleInputChange('alloyingElements', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter alloying elements"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="chemicalReductants" className="text-sm font-medium text-gray-900">
                    Chemical reductants (kg/t product)
                  </Label>
                  <Input
                    id="chemicalReductants"
                    type="number"
                    value={formData.chemicalReductants}
                    onChange={(e) => handleInputChange('chemicalReductants', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter chemical reductants"
                  />
                </div>
                <div className="space-y-3 col-span-2">
                  <Label htmlFor="additives" className="text-sm font-medium text-gray-900">
                    Additives (list with quantities)
                  </Label>
                  <Textarea
                    id="additives"
                    value={formData.additives}
                    onChange={(e) => handleInputChange('additives', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                    placeholder="Example: Limestone: 50 kg/t, Dolomite: 30 kg/t"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 5: Air Emissions */}
            <div className="bg-gray-50 border-l-4 border-red-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Air Emissions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="co2Direct" className="text-sm font-medium text-gray-900">
                    Direct CO₂ emissions (kg CO₂/t product)
                  </Label>
                  <Input
                    id="co2Direct"
                    type="number"
                    value={formData.co2Direct}
                    onChange={(e) => handleInputChange('co2Direct', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter direct CO₂ emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="co2FromFuels" className="text-sm font-medium text-gray-900">
                    CO₂ from fuel combustion (kg CO₂/t product)
                  </Label>
                  <Input
                    id="co2FromFuels"
                    type="number"
                    value={formData.co2FromFuels}
                    onChange={(e) => handleInputChange('co2FromFuels', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter CO₂ from fuels"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ch4Emissions" className="text-sm font-medium text-gray-900">
                    CH₄ emissions (kg CH₄/t product)
                  </Label>
                  <Input
                    id="ch4Emissions"
                    type="number"
                    value={formData.ch4Emissions}
                    onChange={(e) => handleInputChange('ch4Emissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter CH₄ emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="n2oEmissions" className="text-sm font-medium text-gray-900">
                    N₂O emissions (kg N₂O/t product)
                  </Label>
                  <Input
                    id="n2oEmissions"
                    type="number"
                    value={formData.n2oEmissions}
                    onChange={(e) => handleInputChange('n2oEmissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter N₂O emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="so2Emissions" className="text-sm font-medium text-gray-900">
                    SO₂ emissions (kg SO₂/t product)
                  </Label>
                  <Input
                    id="so2Emissions"
                    type="number"
                    value={formData.so2Emissions}
                    onChange={(e) => handleInputChange('so2Emissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter SO₂ emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="noxEmissions" className="text-sm font-medium text-gray-900">
                    NOₓ emissions (kg NOₓ/t product)
                  </Label>
                  <Input
                    id="noxEmissions"
                    type="number"
                    value={formData.noxEmissions}
                    onChange={(e) => handleInputChange('noxEmissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter NOₓ emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="coEmissions" className="text-sm font-medium text-gray-900">
                    CO emissions (kg CO/t product)
                  </Label>
                  <Input
                    id="coEmissions"
                    type="number"
                    value={formData.coEmissions}
                    onChange={(e) => handleInputChange('coEmissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter CO emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="pmEmissions" className="text-sm font-medium text-gray-900">
                    Particulate matter (PM) emissions (kg PM/t product)
                  </Label>
                  <Input
                    id="pmEmissions"
                    type="number"
                    value={formData.pmEmissions}
                    onChange={(e) => handleInputChange('pmEmissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter PM emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="vocsEmissions" className="text-sm font-medium text-gray-900">
                    VOCs emissions (kg VOCs/t product)
                  </Label>
                  <Input
                    id="vocsEmissions"
                    type="number"
                    value={formData.vocsEmissions}
                    onChange={(e) => handleInputChange('vocsEmissions', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter VOCs emissions"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="heavyMetalsAir" className="text-sm font-medium text-gray-900">
                    Heavy metals to air (kg/t product)
                  </Label>
                  <Input
                    id="heavyMetalsAir"
                    type="number"
                    value={formData.heavyMetalsAir}
                    onChange={(e) => handleInputChange('heavyMetalsAir', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter heavy metals to air"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="pfcsSf6" className="text-sm font-medium text-gray-900">
                    PFCs/SF₆ emissions (kg CO₂-eq/t product)
                  </Label>
                  <Input
                    id="pfcsSf6"
                    type="number"
                    value={formData.pfcsSf6}
                    onChange={(e) => handleInputChange('pfcsSf6', e.target.value)}
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter PFCs/SF₆ emissions"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 6: Water Inputs & Emissions */}
            <div className="bg-white border-l-4 border-cyan-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Water Inputs & Emissions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="waterWithdrawn" className="text-sm font-medium text-gray-900">
                    Water withdrawn (m³/t product)
                  </Label>
                  <Input
                    id="waterWithdrawn"
                    type="number"
                    value={formData.waterWithdrawn}
                    onChange={(e) => handleInputChange('waterWithdrawn', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter water withdrawn"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="waterConsumed" className="text-sm font-medium text-gray-900">
                    Water consumed (m³/t product)
                  </Label>
                  <Input
                    id="waterConsumed"
                    type="number"
                    value={formData.waterConsumed}
                    onChange={(e) => handleInputChange('waterConsumed', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter water consumed"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="coolingWater" className="text-sm font-medium text-gray-900">
                    Cooling water (m³/t product)
                  </Label>
                  <Input
                    id="coolingWater"
                    type="number"
                    value={formData.coolingWater}
                    onChange={(e) => handleInputChange('coolingWater', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter cooling water"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="wastewaterGenerated" className="text-sm font-medium text-gray-900">
                    Wastewater generated (m³/t product)
                  </Label>
                  <Input
                    id="wastewaterGenerated"
                    type="number"
                    value={formData.wastewaterGenerated}
                    onChange={(e) => handleInputChange('wastewaterGenerated', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter wastewater generated"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="wastewaterCodBod" className="text-sm font-medium text-gray-900">
                    Wastewater COD/BOD (kg/t product)
                  </Label>
                  <Input
                    id="wastewaterCodBod"
                    type="number"
                    value={formData.wastewaterCodBod}
                    onChange={(e) => handleInputChange('wastewaterCodBod', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter COD/BOD"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="heavyMetalsWater" className="text-sm font-medium text-gray-900">
                    Heavy metals to water (kg/t product)
                  </Label>
                  <Input
                    id="heavyMetalsWater"
                    type="number"
                    value={formData.heavyMetalsWater}
                    onChange={(e) => handleInputChange('heavyMetalsWater', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter heavy metals to water"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="nitratesPhosphates" className="text-sm font-medium text-gray-900">
                    Nitrates/phosphates (kg/t product)
                  </Label>
                  <Input
                    id="nitratesPhosphates"
                    type="number"
                    value={formData.nitratesPhosphates}
                    onChange={(e) => handleInputChange('nitratesPhosphates', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter nitrates/phosphates"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phEffluent" className="text-sm font-medium text-gray-900">
                    pH of effluent
                  </Label>
                  <Input
                    id="phEffluent"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.phEffluent}
                    onChange={(e) => handleInputChange('phEffluent', e.target.value)}
                    className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Enter pH value"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 7: Solid Waste & By-products */}
            <div className="bg-gray-50 border-l-4 border-green-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  7
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Solid Waste & By-products
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="overburdenWasteRock" className="text-sm font-medium text-gray-900">
                    Overburden/waste rock (t/t product)
                  </Label>
                  <Input
                    id="overburdenWasteRock"
                    type="number"
                    value={formData.overburdenWasteRock}
                    onChange={(e) => handleInputChange('overburdenWasteRock', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter overburden/waste rock"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tailingsGenerated" className="text-sm font-medium text-gray-900">
                    Tailings generated (t/t product)
                  </Label>
                  <Input
                    id="tailingsGenerated"
                    type="number"
                    value={formData.tailingsGenerated}
                    onChange={(e) => handleInputChange('tailingsGenerated', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter tailings generated"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="slagGeneration" className="text-sm font-medium text-gray-900">
                    Slag generation (kg/t product)
                  </Label>
                  <Input
                    id="slagGeneration"
                    type="number"
                    value={formData.slagGeneration}
                    onChange={(e) => handleInputChange('slagGeneration', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter slag generation"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="redMud" className="text-sm font-medium text-gray-900">
                    Red mud/bauxite residue (t/t product)
                  </Label>
                  <Input
                    id="redMud"
                    type="number"
                    value={formData.redMud}
                    onChange={(e) => handleInputChange('redMud', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter red mud"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="dustCollected" className="text-sm font-medium text-gray-900">
                    Dust collected (kg/t product)
                  </Label>
                  <Input
                    id="dustCollected"
                    type="number"
                    value={formData.dustCollected}
                    onChange={(e) => handleInputChange('dustCollected', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter dust collected"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="hazardousWaste" className="text-sm font-medium text-gray-900">
                    Hazardous waste (kg/t product)
                  </Label>
                  <Input
                    id="hazardousWaste"
                    type="number"
                    value={formData.hazardousWaste}
                    onChange={(e) => handleInputChange('hazardousWaste', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter hazardous waste"
                  />
                </div>
                <div className="space-y-3 col-span-2">
                  <Label htmlFor="recyclableByProducts" className="text-sm font-medium text-gray-900">
                    Recyclable by-products (list with quantities)
                  </Label>
                  <Textarea
                    id="recyclableByProducts"
                    value={formData.recyclableByProducts}
                    onChange={(e) => handleInputChange('recyclableByProducts', e.target.value)}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                    placeholder="Example: Steel slag: 200 kg/t, Fly ash: 50 kg/t"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 8: Resource Use & Land */}
            <div className="bg-white border-l-4 border-yellow-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  8
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Resource Use & Land
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="landAreaOccupied" className="text-sm font-medium text-gray-900">
                    Land area occupied (m²/t product)
                  </Label>
                  <Input
                    id="landAreaOccupied"
                    type="number"
                    value={formData.landAreaOccupied}
                    onChange={(e) => handleInputChange('landAreaOccupied', e.target.value)}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter land area occupied"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="landDisturbed" className="text-sm font-medium text-gray-900">
                    Land disturbed (m²/t product)
                  </Label>
                  <Input
                    id="landDisturbed"
                    type="number"
                    value={formData.landDisturbed}
                    onChange={(e) => handleInputChange('landDisturbed', e.target.value)}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter land disturbed"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="biodiversityImpact" className="text-sm font-medium text-gray-900">
                    Biodiversity impact (species affected)
                  </Label>
                  <Input
                    id="biodiversityImpact"
                    type="number"
                    value={formData.biodiversityImpact}
                    onChange={(e) => handleInputChange('biodiversityImpact', e.target.value)}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter biodiversity impact"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="waterSourceType" className="text-sm font-medium text-gray-900">
                    Water source type
                  </Label>
                  <Select
                    value={formData.waterSourceType}
                    onValueChange={(value) => handleInputChange('waterSourceType', value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                      <SelectValue placeholder="Select water source type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                      <SelectItem value="surface" className="text-black font-medium hover:bg-yellow-50 focus:bg-yellow-100 cursor-pointer">Surface water</SelectItem>
                      <SelectItem value="groundwater" className="text-black font-medium hover:bg-yellow-50 focus:bg-yellow-100 cursor-pointer">Groundwater</SelectItem>
                      <SelectItem value="recycled" className="text-black font-medium hover:bg-yellow-50 focus:bg-yellow-100 cursor-pointer">Recycled water</SelectItem>
                      <SelectItem value="seawater" className="text-black font-medium hover:bg-yellow-50 focus:bg-yellow-100 cursor-pointer">Seawater</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mineralDepletion" className="text-sm font-medium text-gray-900">
                    Mineral depletion (kg Sb-eq/t product)
                  </Label>
                  <Input
                    id="mineralDepletion"
                    type="number"
                    value={formData.mineralDepletion}
                    onChange={(e) => handleInputChange('mineralDepletion', e.target.value)}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter mineral depletion"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fossilFuelDepletion" className="text-sm font-medium text-gray-900">
                    Fossil fuel depletion (MJ/t product)
                  </Label>
                  <Input
                    id="fossilFuelDepletion"
                    type="number"
                    value={formData.fossilFuelDepletion}
                    onChange={(e) => handleInputChange('fossilFuelDepletion', e.target.value)}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter fossil fuel depletion"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 9: Toxicity & Human Health */}
            <div className="bg-gray-50 border-l-4 border-pink-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  9
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Toxicity & Human Health
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="workplaceDust" className="text-sm font-medium text-gray-900">
                    Workplace dust exposure (mg/m³)
                  </Label>
                  <Input
                    id="workplaceDust"
                    type="number"
                    value={formData.workplaceDust}
                    onChange={(e) => handleInputChange('workplaceDust', e.target.value)}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="Enter workplace dust exposure"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="workplaceHeavyMetals" className="text-sm font-medium text-gray-900">
                    Workplace heavy metals (mg/m³)
                  </Label>
                  <Input
                    id="workplaceHeavyMetals"
                    type="number"
                    value={formData.workplaceHeavyMetals}
                    onChange={(e) => handleInputChange('workplaceHeavyMetals', e.target.value)}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="Enter workplace heavy metals"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="toxicAirPollutants" className="text-sm font-medium text-gray-900">
                    Toxic air pollutants (CTUh/t product)
                  </Label>
                  <Input
                    id="toxicAirPollutants"
                    type="number"
                    value={formData.toxicAirPollutants}
                    onChange={(e) => handleInputChange('toxicAirPollutants', e.target.value)}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="Enter toxic air pollutants"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="toxicEffluents" className="text-sm font-medium text-gray-900">
                    Toxic effluents (CTUe/t product)
                  </Label>
                  <Input
                    id="toxicEffluents"
                    type="number"
                    value={formData.toxicEffluents}
                    onChange={(e) => handleInputChange('toxicEffluents', e.target.value)}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="Enter toxic effluents"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Section 10: Circularity & End-of-Life */}
            <div className="bg-white border-l-4 border-indigo-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  10
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Circularity & End-of-Life
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="recycledInputShare" className="text-sm font-medium text-gray-900">
                    Recycled input share (%)
                  </Label>
                  <Input
                    id="recycledInputShare"
                    type="number"
                    max="100"
                    value={formData.recycledInputShare}
                    onChange={(e) => handleInputChange('recycledInputShare', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter recycled input share"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="byProductsReuse" className="text-sm font-medium text-gray-900">
                    By-products reuse rate (%)
                  </Label>
                  <Input
                    id="byProductsReuse"
                    type="number"
                    max="100"
                    value={formData.byProductsReuse}
                    onChange={(e) => handleInputChange('byProductsReuse', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter by-products reuse rate"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="wasteDiverted" className="text-sm font-medium text-gray-900">
                    Waste diverted from landfill (%)
                  </Label>
                  <Input
                    id="wasteDiverted"
                    type="number"
                    max="100"
                    value={formData.wasteDiverted}
                    onChange={(e) => handleInputChange('wasteDiverted', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter waste diverted"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="recyclingCredit" className="text-sm font-medium text-gray-900">
                    Recycling credit (kg CO₂-eq/t product)
                  </Label>
                  <Input
                    id="recyclingCredit"
                    type="number"
                    value={formData.recyclingCredit}
                    onChange={(e) => handleInputChange('recyclingCredit', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter recycling credit"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="productLifetime" className="text-sm font-medium text-gray-900">
                    Product lifetime (years)
                  </Label>
                  <Input
                    id="productLifetime"
                    type="number"
                    value={formData.productLifetime}
                    onChange={(e) => handleInputChange('productLifetime', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter product lifetime"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="productRecyclability" className="text-sm font-medium text-gray-900">
                    Product recyclability (%)
                  </Label>
                  <Input
                    id="productRecyclability"
                    type="number"
                    max="100"
                    value={formData.productRecyclability}
                    onChange={(e) => handleInputChange('productRecyclability', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter product recyclability"
                  />
                </div>
                <div className="space-y-3 col-span-2">
                  <Label htmlFor="industrialSymbiosis" className="text-sm font-medium text-gray-900">
                    Industrial symbiosis partnerships
                  </Label>
                  <Textarea
                    id="industrialSymbiosis"
                    value={formData.industrialSymbiosis}
                    onChange={(e) => handleInputChange('industrialSymbiosis', e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                    placeholder="Describe industrial symbiosis partnerships and material exchanges"
                  />
                </div>
              </div>
            </div>

            <Separator className="border-gray-200" />

            {/* Circularity Metrics Section */}
            <div className="bg-gray-50 border-l-4 border-teal-600 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  11
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Circularity Metrics
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="mVirgin" className="text-sm font-medium text-gray-900">
                    M_virgin (kg)
                  </Label>
                  <Input
                    id="mVirgin"
                    type="number"
                    value={formData.mVirgin}
                    onChange={(e) => handleInputChange('mVirgin', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Virgin material input"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mRecycledIn" className="text-sm font-medium text-gray-900">
                    M_recycled_in (kg)
                  </Label>
                  <Input
                    id="mRecycledIn"
                    type="number"
                    value={formData.mRecycledIn}
                    onChange={(e) => handleInputChange('mRecycledIn', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Recycled material input"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mEol" className="text-sm font-medium text-gray-900">
                    M_EoL (kg)
                  </Label>
                  <Input
                    id="mEol"
                    type="number"
                    value={formData.mEol}
                    onChange={(e) => handleInputChange('mEol', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="End-of-life material"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mRecoverable" className="text-sm font-medium text-gray-900">
                    M_recoverable (kg)
                  </Label>
                  <Input
                    id="mRecoverable"
                    type="number"
                    value={formData.mRecoverable}
                    onChange={(e) => handleInputChange('mRecoverable', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Recoverable material"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mReused" className="text-sm font-medium text-gray-900">
                    M_reused (kg)
                  </Label>
                  <Input
                    id="mReused"
                    type="number"
                    value={formData.mReused}
                    onChange={(e) => handleInputChange('mReused', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Reused material"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mRecycledOutput" className="text-sm font-medium text-gray-900">
                    M_recycled_out (kg)
                  </Label>
                  <Input
                    id="mRecycledOutput"
                    type="number"
                    value={formData.mRecycledOutput}
                    onChange={(e) => handleInputChange('mRecycledOutput', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Recycled material output"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="mLandfill" className="text-sm font-medium text-gray-900">
                    M_landfill (kg)
                  </Label>
                  <Input
                    id="mLandfill"
                    type="number"
                    value={formData.mLandfill}
                    onChange={(e) => handleInputChange('mLandfill', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Material to landfill"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ePrimary" className="text-sm font-medium text-gray-900">
                    E_primary (MJ)
                  </Label>
                  <Input
                    id="ePrimary"
                    type="number"
                    value={formData.ePrimary}
                    onChange={(e) => handleInputChange('ePrimary', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Primary energy"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="eRecycled" className="text-sm font-medium text-gray-900">
                    E_recycled (MJ)
                  </Label>
                  <Input
                    id="eRecycled"
                    type="number"
                    value={formData.eRecycled}
                    onChange={(e) => handleInputChange('eRecycled', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Recycled energy"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="gwpPrimary" className="text-sm font-medium text-gray-900">
                    GWP_primary (kg CO₂-eq)
                  </Label>
                  <Input
                    id="gwpPrimary"
                    type="number"
                    value={formData.gwpPrimary}
                    onChange={(e) => handleInputChange('gwpPrimary', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Primary GWP"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="gwpSecondary" className="text-sm font-medium text-gray-900">
                    GWP_secondary (kg CO₂-eq)
                  </Label>
                  <Input
                    id="gwpSecondary"
                    type="number"
                    value={formData.gwpSecondary}
                    onChange={(e) => handleInputChange('gwpSecondary', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Secondary GWP"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="v" className="text-sm font-medium text-gray-900">
                    V (utility factor)
                  </Label>
                  <Input
                    id="v"
                    type="number"
                    step="0.01"
                    value={formData.v}
                    onChange={(e) => handleInputChange('v', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Utility factor"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="w" className="text-sm font-medium text-gray-900">
                    W (quality factor)
                  </Label>
                  <Input
                    id="w"
                    type="number"
                    step="0.01"
                    value={formData.w}
                    onChange={(e) => handleInputChange('w', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Quality factor"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tActual" className="text-sm font-medium text-gray-900">
                    T_actual (years)
                  </Label>
                  <Input
                    id="tActual"
                    type="number"
                    value={formData.tActual}
                    onChange={(e) => handleInputChange('tActual', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Actual lifetime"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="tRef" className="text-sm font-medium text-gray-900">
                    T_ref (years)
                  </Label>
                  <Input
                    id="tRef"
                    type="number"
                    value={formData.tRef}
                    onChange={(e) => handleInputChange('tRef', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Reference lifetime"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="useIntensity" className="text-sm font-medium text-gray-900">
                    Use intensity (units/year)
                  </Label>
                  <Input
                    id="useIntensity"
                    type="number"
                    value={formData.useIntensity}
                    onChange={(e) => handleInputChange('useIntensity', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Use intensity"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="processLosses" className="text-sm font-medium text-gray-900">
                    Process losses (%)
                  </Label>
                  <Input
                    id="processLosses"
                    type="number"
                    max="100"
                    value={formData.processLosses}
                    onChange={(e) => handleInputChange('processLosses', e.target.value)}
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Process losses"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white p-8 border-t border-gray-200">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
                  disabled={!formData.selectedMineral} >
                  Generate LCA Report
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

