"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Zap, Calculator, TrendingUp, Factory, Battery, Droplets, Cloud, Trash2, LandPlot, Activity, Recycle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Define the input categories and their associated icons
const inputCategories = [
  { id: 'production', label: 'Production & Operational Data', icon: Factory },
  { id: 'energy', label: 'Energy Inputs', icon: Battery },
  { id: 'water', label: 'Water Inputs & Emissions', icon: Droplets },
  { id: 'air', label: 'Air Emissions', icon: Cloud },
  { id: 'waste', label: 'Solid Waste & By-products', icon: Trash2 },
  { id: 'resources', label: 'Resource Use & Land', icon: LandPlot },
  { id: 'toxicity', label: 'Toxicity & Human Health', icon: Activity },
  { id: 'circularity', label: 'Circularity & End-of-Life', icon: Recycle },
  { id: 'mining', label: 'Mining-Specific Inputs', icon: Factory },
  { id: 'policy', label: 'Regulatory & Policy Inputs', icon: TrendingUp },
  { id: 'logistics', label: 'Logistics & Infrastructure', icon: TrendingUp },
  { id: 'additional', label: 'Additional Process Inputs', icon: Calculator },
]

export default function IndiaSpecificInputPage() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(inputCategories[0].id)
  
  // Get URL parameters
  const state = searchParams.get('state') || ''
  const stateLabel = searchParams.get('stateLabel') || ''
  const mine = searchParams.get('mine') || ''
  const mineName = searchParams.get('mineName') || ''
  const type = searchParams.get('type') || ''
  
  // Production Data
  const [productionVolume, setProductionVolume] = useState("")
  const [operatingHours, setOperatingHours] = useState("")
  const [yieldEfficiency, setYieldEfficiency] = useState("")
  const [technologyType, setTechnologyType] = useState("")
  const [oreGrade, setOreGrade] = useState("")
  const [functionalUnit, setFunctionalUnit] = useState("1 tonne product")
  
  // Energy Inputs
  const [gridElectricity, setGridElectricity] = useState("")
  const [gridEmissionFactor, setGridEmissionFactor] = useState("")
  const [fuelOilConsumption, setFuelOilConsumption] = useState("")
  const [coalInput, setCoalInput] = useState("")
  const [naturalGasInput, setNaturalGasInput] = useState("")
  const [renewableShare, setRenewableShare] = useState("")
  const [onsiteElectricity, setOnsiteElectricity] = useState("")
  const [energyRecovery, setEnergyRecovery] = useState("")
  const [regionalGridMix, setRegionalGridMix] = useState("")
  const [timeOfDayEmissions, setTimeOfDayEmissions] = useState("")
  const [captivePlantEfficiency, setCaptivePlantEfficiency] = useState("")
  
  // Water Inputs & Emissions
  const [waterWithdrawn, setWaterWithdrawn] = useState("")
  const [waterConsumed, setWaterConsumed] = useState("")
  const [coolingWater, setCoolingWater] = useState("")
  const [wastewater, setWastewater] = useState("")
  const [codBod, setCodBod] = useState("")
  const [heavyMetalsWater, setHeavyMetalsWater] = useState("")
  const [nutrients, setNutrients] = useState("")
  const [effluentPh, setEffluentPh] = useState("")
  const [waterStressIndex, setWaterStressIndex] = useState("")
  const [groundwaterTableDepth, setGroundwaterTableDepth] = useState("")
  const [seasonalWaterVariation, setSeasonalWaterVariation] = useState("")
  const [waterTdsHardness, setWaterTdsHardness] = useState("")
  
  // Air Emissions
  const [co2Process, setCo2Process] = useState("")
  const [co2Fossil, setCo2Fossil] = useState("")
  const [ch4Emissions, setCh4Emissions] = useState("")
  const [n2oEmissions, setN2oEmissions] = useState("")
  const [so2Emissions, setSo2Emissions] = useState("")
  const [noxEmissions, setNoxEmissions] = useState("")
  const [coEmissions, setCoEmissions] = useState("")
  const [pmEmissions, setPmEmissions] = useState("")
  const [vocEmissions, setVocEmissions] = useState("")
  const [heavyMetalsAir, setHeavyMetalsAir] = useState("")
  const [pfcsSf6, setPfcsSf6] = useState("")

  // Solid Waste & By-products
  const [overburden, setOverburden] = useState("")
  const [tailings, setTailings] = useState("")
  const [slag, setSlag] = useState("")
  const [redMud, setRedMud] = useState("")
  const [dustCollected, setDustCollected] = useState("")
  const [hazardousWaste, setHazardousWaste] = useState("")
  const [recyclableByProducts, setRecyclableByProducts] = useState("")

  // Resource Use & Land
  const [landOccupied, setLandOccupied] = useState("")
  const [landDisturbed, setLandDisturbed] = useState("")
  const [biodiversityZone, setBiodiversityZone] = useState("")
  const [waterSourceType, setWaterSourceType] = useState("")
  const [mineralDepletion, setMineralDepletion] = useState("")
  const [fossilFuelDepletion, setFossilFuelDepletion] = useState("")
  const [forestLandDiverted, setForestLandDiverted] = useState("")
  const [rehabilitationProgress, setRehabilitationProgress] = useState("")
  const [biodiversityHotspotDistance, setBiodiversityHotspotDistance] = useState("")
  const [soilFertilityLossIndex, setSoilFertilityLossIndex] = useState("")
  
  // Toxicity & Human Health
  const [dustExposure, setDustExposure] = useState("")
  const [metalExposure, setMetalExposure] = useState("")
  const [airPollutants, setAirPollutants] = useState("")
  const [toxicEffluents, setToxicEffluents] = useState("")
  const [employmentGenerated, setEmploymentGenerated] = useState("")
  const [localProcurementShare, setLocalProcurementShare] = useState("")
  const [csrExpenditure, setCsrExpenditure] = useState("")
  const [healthSafetyIncidents, setHealthSafetyIncidents] = useState("")

  // Circularity & End-of-Life
  const [recycledInput, setRecycledInput] = useState("")
  const [byproductReuse, setByproductReuse] = useState("")
  const [wasteDiverted, setWasteDiverted] = useState("")
  const [recyclingCredit, setRecyclingCredit] = useState("")
  const [productLifetime, setProductLifetime] = useState("")
  const [productRecyclability, setProductRecyclability] = useState("")
  const [industrialSymbiosis, setIndustrialSymbiosis] = useState("")
  const [mVirgin, setMVirgin] = useState("")
  const [mRecycledIn, setMRecycledIn] = useState("")
  const [mEol, setMEol] = useState("")
  const [mRecoverable, setMRecoverable] = useState("")
  const [mReused, setMReused] = useState("")
  const [mRecycledOut, setMRecycledOut] = useState("")
  const [mLandfill, setMLandfill] = useState("")
  const [ePrimary, setEPrimary] = useState("")
  const [eRecycled, setERecycled] = useState("")
  const [gwpPrimary, setGwpPrimary] = useState("")
  const [gwpSecondary, setGwpSecondary] = useState("")
  const [vFactor, setVFactor] = useState("")
  const [wFactor, setWFactor] = useState("")
  const [tActual, setTActual] = useState("")
  const [tRef, setTRef] = useState("")
  const [useIntensity, setUseIntensity] = useState("")
  const [processLosses, setProcessLosses] = useState("")
  const [informalScrapShare, setInformalScrapShare] = useState("")
  const [informalRecoveryRate, setInformalRecoveryRate] = useState("")
  const [hazardousByProductsInformal, setHazardousByProductsInformal] = useState("")

  // Mining-Specific Inputs (Added missing state variables)
  const [strippingRatio, setStrippingRatio] = useState("")
  const [mineDepth, setMineDepth] = useState("")
  const [blastingAgentConsumption, setBlastingAgentConsumption] = useState("")
  const [oreTransportDistance, setOreTransportDistance] = useState("")
  const [beneficiationYield, setBeneficiationYield] = useState("")

  // Regulatory & Policy Inputs
  const [eprCompliance, setEprCompliance] = useState("")
  const [spcbConsentValidity, setSpcbConsentValidity] = useState("")
  const [rpoCompliance, setRpoCompliance] = useState("")
  const [carbonMarketParticipation, setCarbonMarketParticipation] = useState("")

  // Logistics & Infrastructure
  const [transportModeSplit, setTransportModeSplit] = useState("")
  const [averageFreightDistance, setAverageFreightDistance] = useState("")
  const [fuelEfficiencyMiningTrucks, setFuelEfficiencyMiningTrucks] = useState("")

  // Additional Inputs
  const [additionalInputs, setAdditionalInputs] = useState("")

  // Build report link preserving context from the state-wise flow
  const qs = new URLSearchParams()
  
  // Add all URL parameters to the query string
  const params = { state, stateLabel, mine, mineName, type }
  Object.entries(params).forEach(([key, value]) => {
    if (value) qs.set(key, value)
  })
  
  const reportHref = `/analysis/india-specific/report?${qs.toString()}`

  // Helper function to render input fields based on the active category
  const renderInputFields = () => {
    switch (activeCategory) {
      case 'production':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="production-volume" className="text-sm font-medium text-gray-900">Annual Production Volume (t/yr)</Label>
                <Input 
                  id="production-volume" 
                  type="number"
                  placeholder="Enter production volume" 
                  value={productionVolume} 
                  onChange={(e) => setProductionVolume(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="operating-hours" className="text-sm font-medium text-gray-900">Plant Operating Hours (h/yr)</Label>
                <Input 
                  id="operating-hours" 
                  type="number"
                  placeholder="Enter operating hours" 
                  value={operatingHours} 
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="yield-efficiency" className="text-sm font-medium text-gray-900">Yield/Efficiency (%)</Label>
                <Input 
                  id="yield-efficiency" 
                  type="number"
                  placeholder="Enter yield efficiency" 
                  value={yieldEfficiency} 
                  onChange={(e) => setYieldEfficiency(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="technology-type" className="text-sm font-medium text-gray-900">Technology Type</Label>
                <Select value={technologyType} onValueChange={setTechnologyType}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blast-furnace">Blast Furnace</SelectItem>
                    <SelectItem value="electric-arc">Electric Arc Furnace</SelectItem>
                    <SelectItem value="basic-oxygen">Basic Oxygen Furnace</SelectItem>
                    <SelectItem value="direct-reduction">Direct Reduction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="ore-grade" className="text-sm font-medium text-gray-900">Ore Grade (%)</Label>
                <Input 
                  id="ore-grade" 
                  type="number"
                  placeholder="Enter ore grade" 
                  value={oreGrade} 
                  onChange={(e) => setOreGrade(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="functional-unit" className="text-sm font-medium text-gray-900">Functional Unit</Label>
                <Select value={functionalUnit} onValueChange={setFunctionalUnit}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 tonne product">1 tonne product</SelectItem>
                    <SelectItem value="1 kg product">1 kg product</SelectItem>
                    <SelectItem value="1 MJ energy">1 MJ energy</SelectItem>
                    <SelectItem value="1 m2 area">1 m² area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 'energy':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Grid Electricity (kWh/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter electricity consumption" 
                  value={gridElectricity} 
                  onChange={(e) => setGridElectricity(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Grid Emission Factor (kg CO₂/kWh)</Label>
                <Input 
                  type="number"
                  step="0.01"
                  placeholder="Enter emission factor" 
                  value={gridEmissionFactor} 
                  onChange={(e) => setGridEmissionFactor(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Fuel Oil Consumption (L/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter fuel oil consumption" 
                  value={fuelOilConsumption} 
                  onChange={(e) => setFuelOilConsumption(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Coal/Coke Input (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter coal/coke input" 
                  value={coalInput} 
                  onChange={(e) => setCoalInput(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Natural Gas Input (Nm³/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter natural gas input" 
                  value={naturalGasInput} 
                  onChange={(e) => setNaturalGasInput(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Renewable Energy Share (%)</Label>
                <Input 
                  type="number"
                  max="100"
                  placeholder="Enter renewable energy share" 
                  value={renewableShare} 
                  onChange={(e) => setRenewableShare(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">On-site Electricity (MWh/yr)</Label>
                <Input 
                  type="number"
                  placeholder="Enter on-site electricity" 
                  value={onsiteElectricity} 
                  onChange={(e) => setOnsiteElectricity(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Energy Recovery (MJ/yr)</Label>
                <Input 
                  type="number"
                  placeholder="Enter energy recovery" 
                  value={energyRecovery} 
                  onChange={(e) => setEnergyRecovery(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'water':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Water Withdrawn (m³/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter water withdrawn" 
                  value={waterWithdrawn} 
                  onChange={(e) => setWaterWithdrawn(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Water Consumed (m³/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter water consumed" 
                  value={waterConsumed} 
                  onChange={(e) => setWaterConsumed(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Cooling Water Used (m³/yr)</Label>
                <Input 
                  type="number"
                  placeholder="Enter cooling water" 
                  value={coolingWater} 
                  onChange={(e) => setCoolingWater(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Wastewater Generated (m³/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter wastewater generated" 
                  value={wastewater} 
                  onChange={(e) => setWastewater(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">COD/BOD (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter COD/BOD" 
                  value={codBod} 
                  onChange={(e) => setCodBod(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Heavy Metals in Water (mg/L)</Label>
                <Input 
                  type="number"
                  placeholder="Enter heavy metals" 
                  value={heavyMetalsWater} 
                  onChange={(e) => setHeavyMetalsWater(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Nutrients (N/P) (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter nutrients" 
                  value={nutrients} 
                  onChange={(e) => setNutrients(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Effluent pH</Label>
                <Input 
                  type="number"
                  step="0.1"
                  placeholder="Enter effluent pH" 
                  value={effluentPh} 
                  onChange={(e) => setEffluentPh(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'air':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">CO₂ Process Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter CO₂ process emissions" 
                  value={co2Process} 
                  onChange={(e) => setCo2Process(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">CO₂ from Fossil Fuels (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter CO₂ from fossil fuels" 
                  value={co2Fossil} 
                  onChange={(e) => setCo2Fossil(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">CH₄ Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter CH₄ emissions" 
                  value={ch4Emissions} 
                  onChange={(e) => setCh4Emissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">N₂O Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter N₂O emissions" 
                  value={n2oEmissions} 
                  onChange={(e) => setN2oEmissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">SO₂ Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter SO₂ emissions" 
                  value={so2Emissions} 
                  onChange={(e) => setSo2Emissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">NOx Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter NOx emissions" 
                  value={noxEmissions} 
                  onChange={(e) => setNoxEmissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">CO Emissions (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter CO emissions" 
                  value={coEmissions} 
                  onChange={(e) => setCoEmissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">PM10/PM2.5 (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter PM emissions" 
                  value={pmEmissions} 
                  onChange={(e) => setPmEmissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">VOCs (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter VOC emissions" 
                  value={vocEmissions} 
                  onChange={(e) => setVocEmissions(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Heavy Metals in Air (g/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter heavy metals in air" 
                  value={heavyMetalsAir} 
                  onChange={(e) => setHeavyMetalsAir(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">PFCs/SF₆ (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter PFCs/SF₆" 
                  value={pfcsSf6} 
                  onChange={(e) => setPfcsSf6(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'waste':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Overburden/Waste Rock (t/yr)</Label>
                <Input 
                  type="number"
                  placeholder="Enter overburden" 
                  value={overburden} 
                  onChange={(e) => setOverburden(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Tailings Generated (t/t ore)</Label>
                <Input 
                  type="number"
                  placeholder="Enter tailings generated" 
                  value={tailings} 
                  onChange={(e) => setTailings(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Slag Generation (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter slag generation" 
                  value={slag} 
                  onChange={(e) => setSlag(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Red Mud (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter red mud" 
                  value={redMud} 
                  onChange={(e) => setRedMud(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Dust Collected (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter dust collected" 
                  value={dustCollected} 
                  onChange={(e) => setDustCollected(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Hazardous Waste (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter hazardous waste" 
                  value={hazardousWaste} 
                  onChange={(e) => setHazardousWaste(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Recyclable By-products (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter recyclable by-products" 
                  value={recyclableByProducts} 
                  onChange={(e) => setRecyclableByProducts(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Land Area Occupied (ha)</Label>
                <Input 
                  type="number"
                  placeholder="Enter land area occupied" 
                  value={landOccupied} 
                  onChange={(e) => setLandOccupied(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Land Disturbed/Mined (ha/yr)</Label>
                <Input 
                  type="number"
                  placeholder="Enter land disturbed" 
                  value={landDisturbed} 
                  onChange={(e) => setLandDisturbed(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Biodiversity Impact Zone (ha)</Label>
                <Input 
                  type="number"
                  placeholder="Enter biodiversity impact zone" 
                  value={biodiversityZone} 
                  onChange={(e) => setBiodiversityZone(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Water Source Type</Label>
                <Select value={waterSourceType} onValueChange={setWaterSourceType}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surface">Surface Water</SelectItem>
                    <SelectItem value="groundwater">Groundwater</SelectItem>
                    <SelectItem value="municipal">Municipal Supply</SelectItem>
                    <SelectItem value="recycled">Recycled Water</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Mineral Resource Depletion (kg ore used)</Label>
                <Input 
                  type="number"
                  placeholder="Enter mineral resource depletion" 
                  value={mineralDepletion} 
                  onChange={(e) => setMineralDepletion(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Fossil Fuel Depletion (MJ primary energy)</Label>
                <Input 
                  type="number"
                  placeholder="Enter fossil fuel depletion" 
                  value={fossilFuelDepletion} 
                  onChange={(e) => setFossilFuelDepletion(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'toxicity':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Workplace Dust Exposure (mg/m³)</Label>
                <Input 
                  type="number"
                  placeholder="Enter dust exposure" 
                  value={dustExposure} 
                  onChange={(e) => setDustExposure(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Heavy Metal Exposure (mg/m³)</Label>
                <Input 
                  type="number"
                  placeholder="Enter metal exposure" 
                  value={metalExposure} 
                  onChange={(e) => setMetalExposure(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Toxic Air Pollutants (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter air pollutants" 
                  value={airPollutants} 
                  onChange={(e) => setAirPollutants(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Toxic Effluents (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter toxic effluents" 
                  value={toxicEffluents} 
                  onChange={(e) => setToxicEffluents(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'circularity':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Share of Recycled Input (%)</Label>
                <Input 
                  type="number"
                  placeholder="Enter recycled input share" 
                  value={recycledInput} 
                  onChange={(e) => setRecycledInput(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">By-product Reuse (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter by-product reuse" 
                  value={byproductReuse} 
                  onChange={(e) => setByproductReuse(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Waste Diverted from Landfill (%)</Label>
                <Input 
                  type="number"
                  placeholder="Enter waste diverted" 
                  value={wasteDiverted} 
                  onChange={(e) => setWasteDiverted(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Recycling Credit (kg CO₂ avoided/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter recycling credit" 
                  value={recyclingCredit} 
                  onChange={(e) => setRecyclingCredit(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Product Lifetime (years)</Label>
                <Input 
                  type="number"
                  placeholder="Enter product lifetime" 
                  value={productLifetime} 
                  onChange={(e) => setProductLifetime(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Product Recyclability (%)</Label>
                <Input 
                  type="number"
                  placeholder="Enter product recyclability" 
                  value={productRecyclability} 
                  onChange={(e) => setProductRecyclability(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Industrial Symbiosis (exchanges)</Label>
                <Input 
                  type="number"
                  placeholder="Enter industrial symbiosis" 
                  value={industrialSymbiosis} 
                  onChange={(e) => setIndustrialSymbiosis(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-4">Circularity Metrics</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(virgin)</Label>
                  <Input 
                    type="number"
                    placeholder="Virgin material" 
                    value={mVirgin} 
                    onChange={(e) => setMVirgin(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(recycled_in)</Label>
                  <Input 
                    type="number"
                    placeholder="Recycled input material" 
                    value={mRecycledIn} 
                    onChange={(e) => setMRecycledIn(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(EoL)</Label>
                  <Input 
                    type="number"
                    placeholder="End-of-life material" 
                    value={mEol} 
                    onChange={(e) => setMEol(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(recoverable)</Label>
                  <Input 
                    type="number"
                    placeholder="Recoverable material" 
                    value={mRecoverable} 
                    onChange={(e) => setMRecoverable(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(reused)</Label>
                  <Input 
                    type="number"
                    placeholder="Reused material" 
                    value={mReused} 
                    onChange={(e) => setMReused(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(recycled_output)</Label>
                  <Input 
                    type="number"
                    placeholder="Recycled output material" 
                    value={mRecycledOut} 
                    onChange={(e) => setMRecycledOut(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">m(landfill)</Label>
                  <Input 
                    type="number"
                    placeholder="Landfilled material" 
                    value={mLandfill} 
                    onChange={(e) => setMLandfill(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">E(primary)</Label>
                  <Input 
                    type="number"
                    placeholder="Primary energy" 
                    value={ePrimary} 
                    onChange={(e) => setEPrimary(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">E(recycled)</Label>
                  <Input 
                    type="number"
                    placeholder="Recycled energy" 
                    value={eRecycled} 
                    onChange={(e) => setERecycled(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">GWP(primary)</Label>
                  <Input 
                    type="number"
                    placeholder="Primary GWP" 
                    value={gwpPrimary} 
                    onChange={(e) => setGwpPrimary(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">GWP(secondary)</Label>
                  <Input 
                    type="number"
                    placeholder="Secondary GWP" 
                    value={gwpSecondary} 
                    onChange={(e) => setGwpSecondary(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">V factor</Label>
                  <Input 
                    type="number"
                    placeholder="V factor" 
                    value={vFactor} 
                    onChange={(e) => setVFactor(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">W factor</Label>
                  <Input 
                    type="number"
                    placeholder="W factor" 
                    value={wFactor} 
                    onChange={(e) => setWFactor(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">t(actual)</Label>
                  <Input 
                    type="number"
                    placeholder="Actual lifetime" 
                    value={tActual} 
                    onChange={(e) => setTActual(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">t(ref)</Label>
                  <Input 
                    type="number"
                    placeholder="Reference lifetime" 
                    value={tRef} 
                    onChange={(e) => setTRef(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">Use Intensity</Label>
                  <Input 
                    type="number"
                    placeholder="Use intensity" 
                    value={useIntensity} 
                    onChange={(e) => setUseIntensity(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-gray-700">Process Losses</Label>
                  <Input 
                    type="number"
                    placeholder="Process losses" 
                    value={processLosses} 
                    onChange={(e) => setProcessLosses(e.target.value)}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'mining':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Stripping Ratio (:1)</Label>
                <Input 
                  type="number"
                  placeholder="Enter stripping ratio" 
                  value={strippingRatio} 
                  onChange={(e) => setStrippingRatio(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Mine Depth (m)</Label>
                <Input 
                  type="number"
                  placeholder="Enter mine depth" 
                  value={mineDepth} 
                  onChange={(e) => setMineDepth(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Blasting Agent Consumption (kg/t)</Label>
                <Input 
                  type="number"
                  placeholder="Enter blasting agent consumption" 
                  value={blastingAgentConsumption} 
                  onChange={(e) => setBlastingAgentConsumption(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Ore Transport Distance (km)</Label>
                <Input 
                  type="number"
                  placeholder="Enter ore transport distance" 
                  value={oreTransportDistance} 
                  onChange={(e) => setOreTransportDistance(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Beneficiation Yield (%)</Label>
                <Input 
                  type="number"
                  placeholder="Enter beneficiation yield" 
                  value={beneficiationYield} 
                  onChange={(e) => setBeneficiationYield(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'policy':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">EPR Compliance Status</Label>
                <Select value={eprCompliance} onValueChange={setEprCompliance}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="partial">Partially Compliant</SelectItem>
                    <SelectItem value="non-compliant">Non-compliant</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">SPCB Consent Validity</Label>
                <Input 
                  type="date" 
                  value={spcbConsentValidity} 
                  onChange={(e) => setSpcbConsentValidity(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">RPO Compliance (%)</Label>
                <Input 
                  type="number"
                  placeholder="Enter RPO compliance" 
                  value={rpoCompliance} 
                  onChange={(e) => setRpoCompliance(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Carbon Market Participation</Label>
                <Select value={carbonMarketParticipation} onValueChange={setCarbonMarketParticipation}>
                  <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Select participation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="planning">In Planning</SelectItem>
                    <SelectItem value="none">Not Participating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 'logistics':
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Transport Mode Split</Label>
                <Input 
                  type="text"
                  placeholder="e.g., 60% road, 30% rail, 10% conveyor" 
                  value={transportModeSplit} 
                  onChange={(e) => setTransportModeSplit(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Average Freight Distance (km)</Label>
                <Input 
                  type="number"
                  placeholder="Enter average freight distance" 
                  value={averageFreightDistance} 
                  onChange={(e) => setAverageFreightDistance(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900">Fuel Efficiency of Mine Trucks (km/L)</Label>
                <Input 
                  type="number"
                  placeholder="Enter fuel efficiency" 
                  value={fuelEfficiencyMiningTrucks} 
                  onChange={(e) => setFuelEfficiencyMiningTrucks(e.target.value)}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        );
      case 'additional':
        return (
          <div className="space-y-4">
            <Textarea 
              id="additional-inputs" 
              placeholder="Specify any additional chemicals, water usage, or special processing requirements..." 
              value={additionalInputs} 
              onChange={(e) => setAdditionalInputs(e.target.value)} 
              rows={3}
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Analysis Input Parameters</h1>
              <p className="text-muted-foreground">Configure your LCA analysis with location-specific data</p>
            </div>
            <Link href={reportHref}>
              <Button className="ml-auto">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate LCA Report
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Header Box */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary px-6 py-6">
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
                      <p className="text-white/90 text-sm max-w-2xl">
                        Complete the following sections to generate your LCA report. 
                        All fields are required.
                      </p>
                    </div>

                    {/* Right Section - Progress */}
                    <div className="flex items-center gap-4">
                      <div className="hidden md:block bg-white/10 px-4 py-2 rounded-lg">
                        <p className="text-xs text-white/80 mb-1">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-32 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white rounded-full transition-all duration-300"
                              style={{ width: '20%' }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-white">
                            20%
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
            {/* Pre-loaded Data Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Pre-loaded Location Data
                </CardTitle>
                <CardDescription>Automatically configured from selected mine location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Label className="text-sm font-semibold text-primary">Selected Mine</Label>
                    <p className="text-sm">Bailadila Iron Ore Mine</p>
                    <p className="text-xs text-muted-foreground">Dantewada, Odisha</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Label className="text-sm font-semibold text-primary">Climate Zone</Label>
                    <p className="text-sm">Tropical Monsoon</p>
                    <p className="text-xs text-muted-foreground">28°C avg, 1200mm rainfall</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Label className="text-sm font-semibold text-primary">Grid Carbon Intensity</Label>
                    <p className="text-sm">0.82 kg CO₂/kWh</p>
                    <p className="text-xs text-muted-foreground">Regional grid mix</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Label className="text-sm font-semibold text-primary">Ore Grade</Label>
                    <p className="text-sm">62% Fe</p>
                    <p className="text-xs text-muted-foreground">High-grade iron ore</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Input Form with Category Navigation */}
            <div className="space-y-6">
              <div className="overflow-x-auto flex space-x-2 pb-2">
                {inputCategories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <Button
                      key={category.id}
                      variant="ghost"
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex-shrink-0 hover:bg-gray-600 ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary to-primary text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary' 
                          : ''
                      }`}
                    >
                      {category.label}
                    </Button>
                  );
                })}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>{inputCategories.find(c => c.id === activeCategory)?.label}</CardTitle>
                  <CardDescription>
                    {activeCategory === 'production' && 'Specify your production requirements and methods'}
                    {activeCategory === 'energy' && 'Specify energy consumption and sources'}
                    {activeCategory === 'water' && 'Specify water usage and discharge parameters'}
                    {activeCategory === 'air' && 'Specify direct and indirect air emissions'}
                    {activeCategory === 'waste' && 'Specify waste generation and management'}
                    {activeCategory === 'resources' && 'Specify land use and resource depletion'}
                    {activeCategory === 'toxicity' && 'Specify workplace and environmental health parameters'}
                    {activeCategory === 'circularity' && 'Specify circular economy and end-of-life parameters'}
                    {activeCategory === 'mining' && 'Specify mining operation parameters'}
                    {activeCategory === 'policy' && 'Specify regulatory compliance parameters'}
                    {activeCategory === 'logistics' && 'Specify transportation and infrastructure parameters'}
                    {activeCategory === 'additional' && 'Specify any additional process requirements or notes'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderInputFields()}
                  
                  {/* Navigation Buttons */}
                  <div className={`flex ${inputCategories.findIndex(c => c.id === activeCategory) === 0 ? 'justify-end' : 'justify-between'} mt-6 pt-4 border-t`}>
                    {inputCategories.findIndex(c => c.id === activeCategory) > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = inputCategories.findIndex(c => c.id === activeCategory);
                          setActiveCategory(inputCategories[currentIndex - 1].id);
                        }}
                        className="bg-white text-black border-black hover:bg-gray-600 "
                      >
                        Back
                      </Button>
                    )}
                    
                    {inputCategories.findIndex(c => c.id === activeCategory) === inputCategories.length - 1 ? (
                      <Link href={reportHref}>
                        <Button className="bg-gradient-to-r from-primary to-primary text-white hover:from-primary hover:to-primary">
                          Submit & Generate Report
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={() => {
                          const currentIndex = inputCategories.findIndex(c => c.id === activeCategory);
                          setActiveCategory(inputCategories[currentIndex + 1].id);
                        }}
                        className="bg-gradient-to-r from-primary to-primary text-white hover:from-primary hover:to-primary"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}