"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Constants
const MINERALS = [
  "Iron ore", "Aluminium", "Coal", "Mica", "Manganese", "Limestone", "Chromite", "Diamonds", "Copper", "Zinc",
  "Lead", "Gypsum", "Dolomite", "Graphite", "Steel", "Lithium", "Gold", "Silver", "Iron", "Nickel"
] as const

// Types
type FormData = {
  // Section 1: Select Minerals
  selectedMinerals: string[]
  
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
    selectedMinerals: [],
    // Production & Operational Data
    annualProduction: '',
    operatingHours: '',
    yieldEfficiency: '',
    technologyType: '',
    oreGrade: '',
    functionalUnit: '1 tonne',
    // Energy Inputs
    gridElectricity: '',
    gridEmissionFactor: '0.5', // Default value for India
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

  // Handle mineral selection
  const handleMineralToggle = (mineral: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMinerals: prev.selectedMinerals.includes(mineral)
        ? prev.selectedMinerals.filter(m => m !== mineral)
        : [...prev.selectedMinerals, mineral]
    }))
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Navigate to the report page
    router.push('/analysis/report')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" onClick={() => router.back()}>
          &larr; Back to Analysis
        </Button>
        <h1 className="text-2xl font-bold">Manual Input And Selection</h1>
        <div className="w-24"></div> {/* Spacer for flex alignment */}
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate LCA Analysis</CardTitle>
          <CardDescription>
            Fill in the details below to generate a Life Cycle Assessment report for your selected minerals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section 1: Select Minerals */}
            <div>
              <h3 className="text-lg font-medium mb-4">1. Select Minerals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MINERALS.map(mineral => (
                  <div key={mineral} className="flex items-center space-x-2">
                    <Checkbox
                      id={mineral}
                      checked={formData.selectedMinerals.includes(mineral)}
                      onCheckedChange={() => handleMineralToggle(mineral)}
                    />
                    <label
                      htmlFor={mineral}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {mineral}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Section 2: Production Data */}
            <div>
              <h3 className="text-lg font-medium mb-4">2. Production & Operational Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualProduction">Annual production volume (t/yr)</Label>
                  <Input
                    id="annualProduction"
                    type="number"
                    value={formData.annualProduction}
                    onChange={(e) => handleInputChange('annualProduction', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Plant operating hours (h/yr)</Label>
                  <Input
                    id="operatingHours"
                    type="number"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yieldEfficiency">Yield/Efficiency (%)</Label>
                  <Input
                    id="yieldEfficiency"
                    type="number"
                    value={formData.yieldEfficiency}
                    onChange={(e) => handleInputChange('yieldEfficiency', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologyType">Technology type</Label>
                  <Select
                    value={formData.technologyType}
                    onValueChange={(value) => handleInputChange('technologyType', value)}
                  >
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="oreGrade">Ore grade (%)</Label>
                  <Input
                    id="oreGrade"
                    type="number"
                    value={formData.oreGrade}
                    onChange={(e) => handleInputChange('oreGrade', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="functionalUnit">Functional unit</Label>
                  <Input
                    id="functionalUnit"
                    value={formData.functionalUnit}
                    onChange={(e) => handleInputChange('functionalUnit', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Section 3: Energy Inputs */}
            <div>
              <h3 className="text-lg font-medium mb-4">3. Energy Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gridElectricity">Grid electricity consumption (kWh/t product)</Label>
                  <Input
                    id="gridElectricity"
                    type="number"
                    value={formData.gridElectricity}
                    onChange={(e) => handleInputChange('gridElectricity', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gridEmissionFactor">Grid emission factor (kg CO₂/kWh)</Label>
                  <Input
                    id="gridEmissionFactor"
                    type="number"
                    step="0.01"
                    value={formData.gridEmissionFactor}
                    onChange={(e) => handleInputChange('gridEmissionFactor', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelOilConsumption">Fuel oil consumption (L or MJ/t product)</Label>
                  <Input
                    id="fuelOilConsumption"
                    type="number"
                    value={formData.fuelOilConsumption}
                    onChange={(e) => handleInputChange('fuelOilConsumption', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coalCokeInput">Coal/coke input (kg/t product)</Label>
                  <Input
                    id="coalCokeInput"
                    type="number"
                    value={formData.coalCokeInput}
                    onChange={(e) => handleInputChange('coalCokeInput', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="naturalGasInput">Natural gas input (Nm³/t product)</Label>
                  <Input
                    id="naturalGasInput"
                    type="number"
                    value={formData.naturalGasInput}
                    onChange={(e) => handleInputChange('naturalGasInput', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renewableEnergyShare">Renewable energy share (%)</Label>
                  <Input
                    id="renewableEnergyShare"
                    type="number"
                    max="100"
                    value={formData.renewableEnergyShare}
                    onChange={(e) => handleInputChange('renewableEnergyShare', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="onsiteElectricity">On-site generated electricity (MWh/yr)</Label>
                  <Input
                    id="onsiteElectricity"
                    type="number"
                    value={formData.onsiteElectricity}
                    onChange={(e) => handleInputChange('onsiteElectricity', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="energyRecovery">Energy recovery from waste gases (MJ/yr)</Label>
                  <Input
                    id="energyRecovery"
                    type="number"
                    value={formData.energyRecovery}
                    onChange={(e) => handleInputChange('energyRecovery', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 4: Raw Material Inputs */}
            <div>
              <h3 className="text-lg font-medium mb-4">4. Raw Material Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oreMined">Ore mined/processed (t/yr)</Label>
                  <Input
                    id="oreMined"
                    type="number"
                    value={formData.oreMined}
                    onChange={(e) => handleInputChange('oreMined', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="concentratesUsed">Concentrates used (t/yr)</Label>
                  <Input
                    id="concentratesUsed"
                    type="number"
                    value={formData.concentratesUsed}
                    onChange={(e) => handleInputChange('concentratesUsed', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fluxes">Fluxes (kg/t product)</Label>
                  <Input
                    id="fluxes"
                    type="number"
                    value={formData.fluxes}
                    onChange={(e) => handleInputChange('fluxes', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scrapRecycledInput">Scrap/recycled metal input (%)</Label>
                  <Input
                    id="scrapRecycledInput"
                    type="number"
                    max="100"
                    value={formData.scrapRecycledInput}
                    onChange={(e) => handleInputChange('scrapRecycledInput', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alloyingElements">Alloying elements (kg/t product)</Label>
                  <Input
                    id="alloyingElements"
                    type="number"
                    value={formData.alloyingElements}
                    onChange={(e) => handleInputChange('alloyingElements', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chemicalReductants">Chemical reductants (kg/t product)</Label>
                  <Input
                    id="chemicalReductants"
                    type="number"
                    value={formData.chemicalReductants}
                    onChange={(e) => handleInputChange('chemicalReductants', e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="additives">Additives (list with quantities)</Label>
                  <Textarea
                    id="additives"
                    value={formData.additives}
                    onChange={(e) => handleInputChange('additives', e.target.value)}
                    placeholder="Example: Limestone: 50 kg/t, Dolomite: 30 kg/t"
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Section 5: Air Emissions */}
            <div>
              <h3 className="text-lg font-medium mb-4">5. Air Emissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="co2Direct">CO₂ direct process emissions (kg/t)</Label>
                  <Input
                    id="co2Direct"
                    type="number"
                    value={formData.co2Direct}
                    onChange={(e) => handleInputChange('co2Direct', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co2FromFuels">CO₂ from fossil fuels (kg/t)</Label>
                  <Input
                    id="co2FromFuels"
                    type="number"
                    value={formData.co2FromFuels}
                    onChange={(e) => handleInputChange('co2FromFuels', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ch4Emissions">CH₄ emissions (kg/t)</Label>
                  <Input
                    id="ch4Emissions"
                    type="number"
                    step="0.0001"
                    value={formData.ch4Emissions}
                    onChange={(e) => handleInputChange('ch4Emissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n2oEmissions">N₂O emissions (kg/t)</Label>
                  <Input
                    id="n2oEmissions"
                    type="number"
                    step="0.0001"
                    value={formData.n2oEmissions}
                    onChange={(e) => handleInputChange('n2oEmissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="so2Emissions">SO₂ emissions (kg/t)</Label>
                  <Input
                    id="so2Emissions"
                    type="number"
                    step="0.001"
                    value={formData.so2Emissions}
                    onChange={(e) => handleInputChange('so2Emissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noxEmissions">NOx emissions (kg/t)</Label>
                  <Input
                    id="noxEmissions"
                    type="number"
                    step="0.001"
                    value={formData.noxEmissions}
                    onChange={(e) => handleInputChange('noxEmissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coEmissions">CO emissions (kg/t)</Label>
                  <Input
                    id="coEmissions"
                    type="number"
                    step="0.001"
                    value={formData.coEmissions}
                    onChange={(e) => handleInputChange('coEmissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pmEmissions">PM10 / PM2.5 (kg/t)</Label>
                  <Input
                    id="pmEmissions"
                    type="number"
                    step="0.001"
                    value={formData.pmEmissions}
                    onChange={(e) => handleInputChange('pmEmissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vocsEmissions">VOCs (kg/t)</Label>
                  <Input
                    id="vocsEmissions"
                    type="number"
                    step="0.0001"
                    value={formData.vocsEmissions}
                    onChange={(e) => handleInputChange('vocsEmissions', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heavyMetalsAir">Heavy metals in air (g/t)</Label>
                  <Input
                    id="heavyMetalsAir"
                    type="number"
                    step="0.0001"
                    value={formData.heavyMetalsAir}
                    onChange={(e) => handleInputChange('heavyMetalsAir', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pfcsSf6">PFCs / SF₆ (kg CO₂e/t)</Label>
                  <Input
                    id="pfcsSf6"
                    type="number"
                    step="0.001"
                    value={formData.pfcsSf6}
                    onChange={(e) => handleInputChange('pfcsSf6', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 6: Water & Wastewater */}
            <div>
              <h3 className="text-lg font-medium mb-4">6. Water & Wastewater</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterWithdrawn">Water withdrawn (m³/t)</Label>
                  <Input
                    id="waterWithdrawn"
                    type="number"
                    step="0.1"
                    value={formData.waterWithdrawn}
                    onChange={(e) => handleInputChange('waterWithdrawn', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterConsumed">Water consumed (m³/t)</Label>
                  <Input
                    id="waterConsumed"
                    type="number"
                    step="0.1"
                    value={formData.waterConsumed}
                    onChange={(e) => handleInputChange('waterConsumed', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coolingWater">Cooling water used (m³/yr)</Label>
                  <Input
                    id="coolingWater"
                    type="number"
                    value={formData.coolingWater}
                    onChange={(e) => handleInputChange('coolingWater', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wastewaterGenerated">Process wastewater generated (m³/t)</Label>
                  <Input
                    id="wastewaterGenerated"
                    type="number"
                    step="0.1"
                    value={formData.wastewaterGenerated}
                    onChange={(e) => handleInputChange('wastewaterGenerated', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wastewaterCodBod">Wastewater COD/BOD (kg/t)</Label>
                  <Input
                    id="wastewaterCodBod"
                    type="number"
                    step="0.01"
                    value={formData.wastewaterCodBod}
                    onChange={(e) => handleInputChange('wastewaterCodBod', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heavyMetalsWater">Heavy metals in wastewater (mg/L)</Label>
                  <Input
                    id="heavyMetalsWater"
                    type="number"
                    step="0.001"
                    value={formData.heavyMetalsWater}
                    onChange={(e) => handleInputChange('heavyMetalsWater', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nitratesPhosphates">Nitrates, phosphates (kg/t)</Label>
                  <Input
                    id="nitratesPhosphates"
                    type="number"
                    step="0.001"
                    value={formData.nitratesPhosphates}
                    onChange={(e) => handleInputChange('nitratesPhosphates', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phEffluent">pH of discharged effluent</Label>
                  <Input
                    id="phEffluent"
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    value={formData.phEffluent}
                    onChange={(e) => handleInputChange('phEffluent', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Section 7: Solid Waste & By-products */}
            <div>
              <h3 className="text-lg font-medium mb-4">7. Solid Waste & By-products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="overburdenWasteRock">Overburden/waste rock (t/yr)</Label>
                  <Input
                    id="overburdenWasteRock"
                    type="number"
                    value={formData.overburdenWasteRock}
                    onChange={(e) => handleInputChange('overburdenWasteRock', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tailingsGenerated">Tailings generated (t/t ore)</Label>
                  <Input
                    id="tailingsGenerated"
                    type="number"
                    step="0.1"
                    value={formData.tailingsGenerated}
                    onChange={(e) => handleInputChange('tailingsGenerated', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slagGeneration">Slag generation (kg/t product)</Label>
                  <Input
                    id="slagGeneration"
                    type="number"
                    step="0.1"
                    value={formData.slagGeneration}
                    onChange={(e) => handleInputChange('slagGeneration', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="redMud">Red mud (t/t alumina)</Label>
                  <Input
                    id="redMud"
                    type="number"
                    step="0.1"
                    value={formData.redMud}
                    onChange={(e) => handleInputChange('redMud', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dustCollected">Dust collected (kg/t)</Label>
                  <Input
                    id="dustCollected"
                    type="number"
                    step="0.1"
                    value={formData.dustCollected}
                    onChange={(e) => handleInputChange('dustCollected', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hazardousWaste">Hazardous waste (kg/t)</Label>
                  <Input
                    id="hazardousWaste"
                    type="number"
                    step="0.1"
                    value={formData.hazardousWaste}
                    onChange={(e) => handleInputChange('hazardousWaste', e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="recyclableByProducts">Recyclable by-products (list with quantities)</Label>
                  <Textarea
                    id="recyclableByProducts"
                    value={formData.recyclableByProducts}
                    onChange={(e) => handleInputChange('recyclableByProducts', e.target.value)}
                    placeholder="Example: Slag: 200 kg/t, Dust: 50 kg/t"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 8: Resource Use & Land */}
            <div>
              <h3 className="text-lg font-medium mb-4">8. Resource Use & Land</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landAreaOccupied">Land area occupied (ha)</Label>
                  <Input
                    id="landAreaOccupied"
                    type="number"
                    step="0.01"
                    value={formData.landAreaOccupied}
                    onChange={(e) => handleInputChange('landAreaOccupied', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landDisturbed">Land disturbed/mined (ha/yr)</Label>
                  <Input
                    id="landDisturbed"
                    type="number"
                    step="0.01"
                    value={formData.landDisturbed}
                    onChange={(e) => handleInputChange('landDisturbed', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biodiversityImpact">Biodiversity impact zone (ha)</Label>
                  <Input
                    id="biodiversityImpact"
                    type="number"
                    step="0.01"
                    value={formData.biodiversityImpact}
                    onChange={(e) => handleInputChange('biodiversityImpact', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterSourceType">Water source type</Label>
                  <Select
                    value={formData.waterSourceType}
                    onValueChange={(value) => handleInputChange('waterSourceType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surface">Surface water</SelectItem>
                      <SelectItem value="ground">Groundwater</SelectItem>
                      <SelectItem value="rain">Rainwater</SelectItem>
                      <SelectItem value="municipal">Municipal supply</SelectItem>
                      <SelectItem value="recycled">Recycled water</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mineralDepletion">Mineral resource depletion (kg ore used)</Label>
                  <Input
                    id="mineralDepletion"
                    type="number"
                    value={formData.mineralDepletion}
                    onChange={(e) => handleInputChange('mineralDepletion', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fossilFuelDepletion">Fossil fuel depletion (MJ primary energy)</Label>
                  <Input
                    id="fossilFuelDepletion"
                    type="number"
                    value={formData.fossilFuelDepletion}
                    onChange={(e) => handleInputChange('fossilFuelDepletion', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 9: Toxicity & Health */}
            <div>
              <h3 className="text-lg font-medium mb-4">9. Toxicity & Human Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workplaceDust">Workplace exposure - Dust (mg/m³)</Label>
                  <Input
                    id="workplaceDust"
                    type="number"
                    step="0.001"
                    value={formData.workplaceDust}
                    onChange={(e) => handleInputChange('workplaceDust', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workplaceHeavyMetals">Workplace exposure - Heavy metals (mg/m³)</Label>
                  <Input
                    id="workplaceHeavyMetals"
                    type="number"
                    step="0.0001"
                    value={formData.workplaceHeavyMetals}
                    onChange={(e) => handleInputChange('workplaceHeavyMetals', e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="toxicAirPollutants">Toxic air pollutants (list with concentrations)</Label>
                  <Textarea
                    id="toxicAirPollutants"
                    value={formData.toxicAirPollutants}
                    onChange={(e) => handleInputChange('toxicAirPollutants', e.target.value)}
                    placeholder="Example: Arsenic: 0.01 mg/m³, Lead: 0.05 mg/m³"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="toxicEffluents">Toxic effluents (list with concentrations)</Label>
                  <Textarea
                    id="toxicEffluents"
                    value={formData.toxicEffluents}
                    onChange={(e) => handleInputChange('toxicEffluents', e.target.value)}
                    placeholder="Example: Cyanide: 0.1 mg/L, Mercury: 0.005 mg/L"
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Section 10: Circularity & End-of-Life */}
            <div>
              <h3 className="text-lg font-medium mb-4">10. Circularity & End-of-Life</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recycledInputShare">Share of recycled input (%)</Label>
                  <Input
                    id="recycledInputShare"
                    type="number"
                    max="100"
                    value={formData.recycledInputShare}
                    onChange={(e) => handleInputChange('recycledInputShare', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="byProductsReuse">Reuse of by-products (kg/t product)</Label>
                  <Input
                    id="byProductsReuse"
                    type="number"
                    step="0.1"
                    value={formData.byProductsReuse}
                    onChange={(e) => handleInputChange('byProductsReuse', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wasteDiverted">Waste diverted from landfill (%)</Label>
                  <Input
                    id="wasteDiverted"
                    type="number"
                    max="100"
                    value={formData.wasteDiverted}
                    onChange={(e) => handleInputChange('wasteDiverted', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recyclingCredit">Recycling credit (kg CO₂ avoided/t)</Label>
                  <Input
                    id="recyclingCredit"
                    type="number"
                    step="0.1"
                    value={formData.recyclingCredit}
                    onChange={(e) => handleInputChange('recyclingCredit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productLifetime">Lifetime of product (years)</Label>
                  <Input
                    id="productLifetime"
                    type="number"
                    value={formData.productLifetime}
                    onChange={(e) => handleInputChange('productLifetime', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productRecyclability">Recyclability of final product (%)</Label>
                  <Input
                    id="productRecyclability"
                    type="number"
                    max="100"
                    value={formData.productRecyclability}
                    onChange={(e) => handleInputChange('productRecyclability', e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="industrialSymbiosis">Industrial symbiosis exchanges</Label>
                  <Textarea
                    id="industrialSymbiosis"
                    value={formData.industrialSymbiosis}
                    onChange={(e) => handleInputChange('industrialSymbiosis', e.target.value)}
                    placeholder="Describe any material/energy exchanges with other industries"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Circularity Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mVirgin">m(virgin) - Virgin material input (kg)</Label>
                    <Input
                      id="mVirgin"
                      type="number"
                      value={formData.mVirgin}
                      onChange={(e) => handleInputChange('mVirgin', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mRecycledIn">m(recycled_in) - Recycled material input (kg)</Label>
                    <Input
                      id="mRecycledIn"
                      type="number"
                      value={formData.mRecycledIn}
                      onChange={(e) => handleInputChange('mRecycledIn', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mEol">m(EoL) - End-of-life material (kg)</Label>
                    <Input
                      id="mEol"
                      type="number"
                      value={formData.mEol}
                      onChange={(e) => handleInputChange('mEol', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mRecoverable">m(recoverable) - Recoverable material (kg)</Label>
                    <Input
                      id="mRecoverable"
                      type="number"
                      value={formData.mRecoverable}
                      onChange={(e) => handleInputChange('mRecoverable', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ePrimary">E(primary) - Primary energy (MJ)</Label>
                    <Input
                      id="ePrimary"
                      type="number"
                      value={formData.ePrimary}
                      onChange={(e) => handleInputChange('ePrimary', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eRecycled">E(recycled) - Recycled energy (MJ)</Label>
                    <Input
                      id="eRecycled"
                      type="number"
                      value={formData.eRecycled}
                      onChange={(e) => handleInputChange('eRecycled', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gwpPrimary">GWP(primary) - Primary GWP (kg CO₂e)</Label>
                    <Input
                      id="gwpPrimary"
                      type="number"
                      value={formData.gwpPrimary}
                      onChange={(e) => handleInputChange('gwpPrimary', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gwpSecondary">GWP(secondary) - Secondary GWP (kg CO₂e)</Label>
                    <Input
                      id="gwpSecondary"
                      type="number"
                      value={formData.gwpSecondary}
                      onChange={(e) => handleInputChange('gwpSecondary', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Final Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                Generate Analysis Report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}