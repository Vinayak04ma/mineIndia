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
import { Badge } from "@/components/ui/badge"

export default function IndiaSpecificInputPage() {
  const searchParams = useSearchParams()
  
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
  
  // Raw Material Inputs
  const [oreProcessed, setOreProcessed] = useState("")
  const [concentratesUsed, setConcentratesUsed] = useState("")
  const [fluxes, setFluxes] = useState("")
  const [scrapMetalInput, setScrapMetalInput] = useState("")
  const [alloyingElements, setAlloyingElements] = useState("")
  const [chemicalReductants, setChemicalReductants] = useState("")
  const [additives, setAdditives] = useState("")

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

  // Water Inputs & Emissions
  const [waterWithdrawn, setWaterWithdrawn] = useState("")
  const [waterConsumed, setWaterConsumed] = useState("")
  const [coolingWater, setCoolingWater] = useState("")
  const [wastewater, setWastewater] = useState("")
  const [codBod, setCodBod] = useState("")
  const [heavyMetalsWater, setHeavyMetalsWater] = useState("")
  const [nutrients, setNutrients] = useState("")
  const [effluentPh, setEffluentPh] = useState("")

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

  // Toxicity & Human Health
  const [dustExposure, setDustExposure] = useState("")
  const [metalExposure, setMetalExposure] = useState("")
  const [airPollutants, setAirPollutants] = useState("")
  const [toxicEffluents, setToxicEffluents] = useState("")

  // Circularity & End-of-Life
  const [recycledInput, setRecycledInput] = useState("")
  const [byproductReuse, setByproductReuse] = useState("")
  const [wasteDiverted, setWasteDiverted] = useState("")
  const [recyclingCredit, setRecyclingCredit] = useState("")
  const [productLifetime, setProductLifetime] = useState("")
  const [productRecyclability, setProductRecyclability] = useState("")
  const [industrialSymbiosis, setIndustrialSymbiosis] = useState("")
  
  // Circularity Metrics
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
  
  // Energy & Grid Context
  const [regionalGridMix, setRegionalGridMix] = useState("")
  const [timeOfDayEmissions, setTimeOfDayEmissions] = useState("")
  const [captivePlantEfficiency, setCaptivePlantEfficiency] = useState("")
  
  // Water Stress & Quality
  const [waterStressIndex, setWaterStressIndex] = useState("")
  const [groundwaterTableDepth, setGroundwaterTableDepth] = useState("")
  const [seasonalWaterVariation, setSeasonalWaterVariation] = useState("")
  const [waterTdsHardness, setWaterTdsHardness] = useState("")
  
  // Mining-Specific Inputs
  const [strippingRatio, setStrippingRatio] = useState("")
  const [mineDepth, setMineDepth] = useState("")
  const [blastingAgentConsumption, setBlastingAgentConsumption] = useState("")
  const [oreTransportDistance, setOreTransportDistance] = useState("")
  const [beneficiationYield, setBeneficiationYield] = useState("")
  
  // Land & Ecology
  const [forestLandDiverted, setForestLandDiverted] = useState("")
  const [rehabilitationProgress, setRehabilitationProgress] = useState("")
  const [biodiversityHotspotDistance, setBiodiversityHotspotDistance] = useState("")
  const [soilFertilityLossIndex, setSoilFertilityLossIndex] = useState("")
  
  // Socio-Economic Development
  const [employmentGenerated, setEmploymentGenerated] = useState("")
  const [localProcurementShare, setLocalProcurementShare] = useState("")
  const [csrExpenditure, setCsrExpenditure] = useState("")
  const [healthSafetyIncidents, setHealthSafetyIncidents] = useState("")
  
  // Recycling & Informal Sector
  const [informalScrapShare, setInformalScrapShare] = useState("")
  const [informalRecoveryRate, setInformalRecoveryRate] = useState("")
  const [hazardousByProductsInformal, setHazardousByProductsInformal] = useState("")
  
  // Regulatory & Policy Inputs
  const [eprCompliance, setEprCompliance] = useState("")
  const [spcbConsentValidity, setSpcbConsentValidity] = useState("")
  const [rpoCompliance, setRpoCompliance] = useState("")
  const [carbonMarketParticipation, setCarbonMarketParticipation] = useState("")
  
  // Logistics & Infrastructure
  const [transportModeSplit, setTransportModeSplit] = useState("")
  const [averageFreightDistance, setAverageFreightDistance] = useState("")
  const [fuelEfficiencyMiningTrucks, setFuelEfficiencyMiningTrucks] = useState("")
  
  const [additionalInputs, setAdditionalInputs] = useState("")

  // Build report link preserving context from the state-wise flow
  const qs = new URLSearchParams()
  
  // Add all URL parameters to the query string
  const params = { state, stateLabel, mine, mineName, type }
  Object.entries(params).forEach(([key, value]) => {
    if (value) qs.set(key, value)
  })
  
  const reportHref = `/analysis/india-specific/report?${qs.toString()}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/analysis/india-specific">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Mine Selection
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analysis Input Parameters</h1>
              <p className="text-muted-foreground">Configure your LCA analysis with location-specific data</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
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
                      <Label className="text-sm font-semibold text-accent-foreground">Climate Zone</Label>
                      <p className="text-sm">Tropical Monsoon</p>
                      <p className="text-xs text-muted-foreground">28°C avg, 1200mm rainfall</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Label className="text-sm font-semibold">Grid Carbon Intensity</Label>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="mr-2 h-5 w-5" />
                    Production & Operational Data
                  </CardTitle>
                  <CardDescription>Specify your production requirements and methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="production-volume">Annual Production Volume</Label>
                        <div className="relative">
                          <Input
                            id="production-volume"
                            placeholder="e.g., 50000"
                            value={productionVolume}
                            onChange={(e) => setProductionVolume(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">t/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="operating-hours">Plant Operating Hours</Label>
                        <div className="relative">
                          <Input
                            id="operating-hours"
                            placeholder="e.g., 8000"
                            value={operatingHours}
                            onChange={(e) => setOperatingHours(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">h/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yield-efficiency">Yield/Efficiency</Label>
                        <div className="relative">
                          <Input
                            id="yield-efficiency"
                            placeholder="e.g., 85"
                            value={yieldEfficiency}
                            onChange={(e) => setYieldEfficiency(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="technology-type">Technology Type</Label>
                        <Select value={technologyType} onValueChange={setTechnologyType}>
                          <SelectTrigger>
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
                      <div className="space-y-2">
                        <Label htmlFor="ore-grade">Ore Grade</Label>
                        <div className="relative">
                          <Input
                            id="ore-grade"
                            placeholder="e.g., 62"
                            value={oreGrade}
                            onChange={(e) => setOreGrade(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="functional-unit">Functional Unit</Label>
                        <Select value={functionalUnit} onValueChange={setFunctionalUnit}>
                          <SelectTrigger>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Battery className="mr-2 h-5 w-5" />
                    Energy Inputs
                  </CardTitle>
                  <CardDescription>Specify energy consumption and sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Grid Electricity</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={gridElectricity}
                            onChange={(e) => setGridElectricity(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kWh/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Grid Emission Factor</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.82"
                            value={gridEmissionFactor}
                            onChange={(e) => setGridEmissionFactor(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg CO₂/kWh</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Fuel Oil Consumption</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 50"
                            value={fuelOilConsumption}
                            onChange={(e) => setFuelOilConsumption(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">L/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Coal/Coke Input</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 300"
                            value={coalInput}
                            onChange={(e) => setCoalInput(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Natural Gas Input</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 100"
                            value={naturalGasInput}
                            onChange={(e) => setNaturalGasInput(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">Nm³/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Renewable Energy Share</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 20"
                            value={renewableShare}
                            onChange={(e) => setRenewableShare(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>On-site Electricity</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5000"
                            value={onsiteElectricity}
                            onChange={(e) => setOnsiteElectricity(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">MWh/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Energy Recovery</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 10000"
                            value={energyRecovery}
                            onChange={(e) => setEnergyRecovery(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">MJ/yr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="mr-2 h-5 w-5" />
                    Water Inputs & Emissions
                  </CardTitle>
                  <CardDescription>Specify water usage and discharge parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Water Withdrawn</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.5"
                            value={waterWithdrawn}
                            onChange={(e) => setWaterWithdrawn(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m³/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Water Consumed</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 1.2"
                            value={waterConsumed}
                            onChange={(e) => setWaterConsumed(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m³/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Cooling Water Used</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5000"
                            value={coolingWater}
                            onChange={(e) => setCoolingWater(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m³/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Wastewater Generated</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 1.8"
                            value={wastewater}
                            onChange={(e) => setWastewater(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m³/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>COD/BOD</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 50"
                            value={codBod}
                            onChange={(e) => setCodBod(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Heavy Metals in Water</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.5"
                            value={heavyMetalsWater}
                            onChange={(e) => setHeavyMetalsWater(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">mg/L</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Nutrients (N/P)</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.5"
                            value={nutrients}
                            onChange={(e) => setNutrients(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Effluent pH</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 7.0"
                            value={effluentPh}
                            onChange={(e) => setEffluentPh(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="mr-2 h-5 w-5" />
                    Air Emissions
                  </CardTitle>
                  <CardDescription>Specify direct and indirect air emissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>CO₂ Process Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={co2Process}
                            onChange={(e) => setCo2Process(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>CO₂ from Fossil Fuels</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 300"
                            value={co2Fossil}
                            onChange={(e) => setCo2Fossil(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>CH₄ Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.5"
                            value={ch4Emissions}
                            onChange={(e) => setCh4Emissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>N₂O Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.2"
                            value={n2oEmissions}
                            onChange={(e) => setN2oEmissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>SO₂ Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 1.5"
                            value={so2Emissions}
                            onChange={(e) => setSo2Emissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>NOx Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 1.2"
                            value={noxEmissions}
                            onChange={(e) => setNoxEmissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>CO Emissions</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.0"
                            value={coEmissions}
                            onChange={(e) => setCoEmissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>PM10/PM2.5</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.5"
                            value={pmEmissions}
                            onChange={(e) => setPmEmissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>VOCs</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.3"
                            value={vocEmissions}
                            onChange={(e) => setVocEmissions(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Heavy Metals in Air</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.1"
                            value={heavyMetalsAir}
                            onChange={(e) => setHeavyMetalsAir(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">g/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>PFCs/SF₆</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.01"
                            value={pfcsSf6}
                            onChange={(e) => setPfcsSf6(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trash2 className="mr-2 h-5 w-5" />
                    Solid Waste & By-products
                  </CardTitle>
                  <CardDescription>Specify waste generation and management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Overburden/Waste Rock</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 10000"
                            value={overburden}
                            onChange={(e) => setOverburden(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">t/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Tailings Generated</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.5"
                            value={tailings}
                            onChange={(e) => setTailings(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">t/t ore</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Slag Generation</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 300"
                            value={slag}
                            onChange={(e) => setSlag(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Red Mud</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={redMud}
                            onChange={(e) => setRedMud(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Dust Collected</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 50"
                            value={dustCollected}
                            onChange={(e) => setDustCollected(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Hazardous Waste</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 10"
                            value={hazardousWaste}
                            onChange={(e) => setHazardousWaste(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Recyclable By-products</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 200"
                            value={recyclableByProducts}
                            onChange={(e) => setRecyclableByProducts(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LandPlot className="mr-2 h-5 w-5" />
                    Resource Use & Land
                  </CardTitle>
                  <CardDescription>Specify land use and resource depletion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Land Area Occupied</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 50"
                            value={landOccupied}
                            onChange={(e) => setLandOccupied(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">ha</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Land Disturbed/Mined</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 10"
                            value={landDisturbed}
                            onChange={(e) => setLandDisturbed(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">ha/yr</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Biodiversity Impact Zone</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 25"
                            value={biodiversityZone}
                            onChange={(e) => setBiodiversityZone(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">ha</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Water Source Type</Label>
                        <Select value={waterSourceType} onValueChange={setWaterSourceType}>
                          <SelectTrigger>
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
                      <div className="space-y-2">
                        <Label>Mineral Resource Depletion</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 1000"
                            value={mineralDepletion}
                            onChange={(e) => setMineralDepletion(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg ore used</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Fossil Fuel Depletion</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5000"
                            value={fossilFuelDepletion}
                            onChange={(e) => setFossilFuelDepletion(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">MJ primary energy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Toxicity & Human Health
                  </CardTitle>
                  <CardDescription>Specify workplace and environmental health parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Workplace Dust Exposure</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.5"
                            value={dustExposure}
                            onChange={(e) => setDustExposure(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">mg/m³</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Heavy Metal Exposure</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.1"
                            value={metalExposure}
                            onChange={(e) => setMetalExposure(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">mg/m³</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Toxic Air Pollutants</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.5"
                            value={airPollutants}
                            onChange={(e) => setAirPollutants(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Toxic Effluents</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.3"
                            value={toxicEffluents}
                            onChange={(e) => setToxicEffluents(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Recycle className="mr-2 h-5 w-5" />
                    Circularity & End-of-Life
                  </CardTitle>
                  <CardDescription>Specify circular economy and end-of-life parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Share of Recycled Input</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 30"
                            value={recycledInput}
                            onChange={(e) => setRecycledInput(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>By-product Reuse</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 200"
                            value={byproductReuse}
                            onChange={(e) => setByproductReuse(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Waste Diverted from Landfill</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 80"
                            value={wasteDiverted}
                            onChange={(e) => setWasteDiverted(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Recycling Credit</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={recyclingCredit}
                            onChange={(e) => setRecyclingCredit(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg CO₂ avoided/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Product Lifetime</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 25"
                            value={productLifetime}
                            onChange={(e) => setProductLifetime(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">years</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Product Recyclability</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 90"
                            value={productRecyclability}
                            onChange={(e) => setProductRecyclability(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Industrial Symbiosis</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5"
                            value={industrialSymbiosis}
                            onChange={(e) => setIndustrialSymbiosis(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">exchanges</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-4">Circularity Metrics</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs">m(virgin)</Label>
                          <Input
                            placeholder="Virgin material"
                            value={mVirgin}
                            onChange={(e) => setMVirgin(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(recycled_in)</Label>
                          <Input
                            placeholder="Recycled input material"
                            value={mRecycledIn}
                            onChange={(e) => setMRecycledIn(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(EoL)</Label>
                          <Input
                            placeholder="End-of-life material"
                            value={mEol}
                            onChange={(e) => setMEol(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(recoverable)</Label>
                          <Input
                            placeholder="Recoverable material"
                            value={mRecoverable}
                            onChange={(e) => setMRecoverable(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(reused)</Label>
                          <Input
                            placeholder="Reused material"
                            value={mReused}
                            onChange={(e) => setMReused(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(recycled_output)</Label>
                          <Input
                            placeholder="Recycled output material"
                            value={mRecycledOut}
                            onChange={(e) => setMRecycledOut(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">m(landfill)</Label>
                          <Input
                            placeholder="Landfilled material"
                            value={mLandfill}
                            onChange={(e) => setMLandfill(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">E(primary)</Label>
                          <Input
                            placeholder="Primary energy"
                            value={ePrimary}
                            onChange={(e) => setEPrimary(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">E(recycled)</Label>
                          <Input
                            placeholder="Recycled energy"
                            value={eRecycled}
                            onChange={(e) => setERecycled(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">GWP(primary)</Label>
                          <Input
                            placeholder="Primary GWP"
                            value={gwpPrimary}
                            onChange={(e) => setGwpPrimary(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">GWP(secondary)</Label>
                          <Input
                            placeholder="Secondary GWP"
                            value={gwpSecondary}
                            onChange={(e) => setGwpSecondary(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">V factor</Label>
                          <Input
                            placeholder="V factor"
                            value={vFactor}
                            onChange={(e) => setVFactor(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">W factor</Label>
                          <Input
                            placeholder="W factor"
                            value={wFactor}
                            onChange={(e) => setWFactor(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">t(actual)</Label>
                          <Input
                            placeholder="Actual lifetime"
                            value={tActual}
                            onChange={(e) => setTActual(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">t(ref)</Label>
                          <Input
                            placeholder="Reference lifetime"
                            value={tRef}
                            onChange={(e) => setTRef(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Use Intensity</Label>
                          <Input
                            placeholder="Use intensity"
                            value={useIntensity}
                            onChange={(e) => setUseIntensity(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Process Losses</Label>
                          <Input
                            placeholder="Process losses"
                            value={processLosses}
                            onChange={(e) => setProcessLosses(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Energy & Grid Context Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Energy & Grid Context
                  </CardTitle>
                  <CardDescription>Specify energy and grid-related parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Regional Grid Mix</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 70% coal, 20% hydro, 10% solar"
                            value={regionalGridMix}
                            onChange={(e) => setRegionalGridMix(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Time-of-Day Emissions Factor</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., Peak: 0.9, Off-peak: 0.6"
                            value={timeOfDayEmissions}
                            onChange={(e) => setTimeOfDayEmissions(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Captive Power Plant Efficiency</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 35"
                            value={captivePlantEfficiency}
                            onChange={(e) => setCaptivePlantEfficiency(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Water Stress & Quality Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="mr-2 h-5 w-5" />
                    Water Stress & Quality
                  </CardTitle>
                  <CardDescription>Specify water-related parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Water Stress Index</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 3.5"
                            value={waterStressIndex}
                            onChange={(e) => setWaterStressIndex(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Groundwater Table Depth</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 50"
                            value={groundwaterTableDepth}
                            onChange={(e) => setGroundwaterTableDepth(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Seasonal Water Variation</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., ±40%"
                            value={seasonalWaterVariation}
                            onChange={(e) => setSeasonalWaterVariation(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Water TDS/Hardness</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={waterTdsHardness}
                            onChange={(e) => setWaterTdsHardness(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">mg/L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mining-Specific Inputs Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="mr-2 h-5 w-5" />
                    Mining-Specific Inputs
                  </CardTitle>
                  <CardDescription>Specify mining operation parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Stripping Ratio</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 3.5"
                            value={strippingRatio}
                            onChange={(e) => setStrippingRatio(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">:1</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Mine Depth</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 150"
                            value={mineDepth}
                            onChange={(e) => setMineDepth(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">m</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Blasting Agent Consumption</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.5"
                            value={blastingAgentConsumption}
                            onChange={(e) => setBlastingAgentConsumption(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Ore Transport Distance</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 25"
                            value={oreTransportDistance}
                            onChange={(e) => setOreTransportDistance(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">km</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Beneficiation Yield</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 75"
                            value={beneficiationYield}
                            onChange={(e) => setBeneficiationYield(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Land & Ecology Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LandPlot className="mr-2 h-5 w-5" />
                    Land & Ecology
                  </CardTitle>
                  <CardDescription>Specify land use and ecological parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Forest Land Diverted</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 25"
                            value={forestLandDiverted}
                            onChange={(e) => setForestLandDiverted(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">ha</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Rehabilitation Progress</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 60"
                            value={rehabilitationProgress}
                            onChange={(e) => setRehabilitationProgress(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Distance to Biodiversity Hotspot</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5"
                            value={biodiversityHotspotDistance}
                            onChange={(e) => setBiodiversityHotspotDistance(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">km</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Soil Fertility Loss Index</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.7"
                            value={soilFertilityLossIndex}
                            onChange={(e) => setSoilFertilityLossIndex(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Socio-Economic Development Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Socio-Economic Development
                  </CardTitle>
                  <CardDescription>Specify social and economic parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Employment Generated</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 500"
                            value={employmentGenerated}
                            onChange={(e) => setEmploymentGenerated(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">jobs</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Local Procurement Share</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 65"
                            value={localProcurementShare}
                            onChange={(e) => setLocalProcurementShare(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>CSR Expenditure</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 5000000"
                            value={csrExpenditure}
                            onChange={(e) => setCsrExpenditure(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">INR</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Health & Safety Incidents</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2"
                            value={healthSafetyIncidents}
                            onChange={(e) => setHealthSafetyIncidents(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">per year</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recycling & Informal Sector Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Recycle className="mr-2 h-5 w-5" />
                    Recycling & Informal Sector
                  </CardTitle>
                  <CardDescription>Specify recycling and informal sector parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Share of Scrap from Informal Sector</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 40"
                            value={informalScrapShare}
                            onChange={(e) => setInformalScrapShare(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Recovery Rate from Informal Recycling</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 85"
                            value={informalRecoveryRate}
                            onChange={(e) => setInformalRecoveryRate(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Hazardous By-products Handled Informally</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 0.2"
                            value={hazardousByProductsInformal}
                            onChange={(e) => setHazardousByProductsInformal(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">kg/t</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory & Policy Inputs Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Regulatory & Policy Inputs
                  </CardTitle>
                  <CardDescription>Specify regulatory compliance parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>EPR Compliance Status</Label>
                        <Select value={eprCompliance} onValueChange={setEprCompliance}>
                          <SelectTrigger>
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
                      <div className="space-y-2">
                        <Label>SPCB Consent Validity</Label>
                        <div className="relative">
                          <Input
                            type="date"
                            value={spcbConsentValidity}
                            onChange={(e) => setSpcbConsentValidity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>RPO Compliance</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 85"
                            value={rpoCompliance}
                            onChange={(e) => setRpoCompliance(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Carbon Market Participation</Label>
                        <Select value={carbonMarketParticipation} onValueChange={setCarbonMarketParticipation}>
                          <SelectTrigger>
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
                </CardContent>
              </Card>

              {/* Logistics & Infrastructure Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Logistics & Infrastructure
                  </CardTitle>
                  <CardDescription>Specify transportation and infrastructure parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Transport Mode Split</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 60% road, 30% rail, 10% conveyor"
                            value={transportModeSplit}
                            onChange={(e) => setTransportModeSplit(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Average Freight Distance</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 150"
                            value={averageFreightDistance}
                            onChange={(e) => setAverageFreightDistance(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">km</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Fuel Efficiency of Mine Trucks</Label>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2.5"
                            value={fuelEfficiencyMiningTrucks}
                            onChange={(e) => setFuelEfficiencyMiningTrucks(e.target.value)}
                          />
                          <span className="absolute right-3 top-3 text-sm text-muted-foreground">km/L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Additional Process Inputs
                  </CardTitle>
                  <CardDescription>Specify any additional process requirements or notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      id="additional-inputs"
                      placeholder="Specify any additional chemicals, water usage, or special processing requirements..."
                      value={additionalInputs}
                      onChange={(e) => setAdditionalInputs(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Analysis Configuration
                  </CardTitle>
                  <CardDescription>Choose your LCA scope and comparison options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold mb-3 block">Impact Categories</Label>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="carbon" defaultChecked className="rounded" />
                            <Label htmlFor="carbon" className="text-sm">
                              Carbon Footprint (CO₂ eq)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="water" defaultChecked className="rounded" />
                            <Label htmlFor="water" className="text-sm">
                              Water Footprint
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="energy" defaultChecked className="rounded" />
                            <Label htmlFor="energy" className="text-sm">
                              Energy Consumption
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="land" className="rounded" />
                            <Label htmlFor="land" className="text-sm">
                              Land Use Impact
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="acidification" className="rounded" />
                            <Label htmlFor="acidification" className="text-sm">
                              Acidification Potential
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="eutrophication" className="rounded" />
                            <Label htmlFor="eutrophication" className="text-sm">
                              Eutrophication
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold mb-3 block">Comparison Scenarios</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="conventional" defaultChecked className="rounded" />
                            <Label htmlFor="conventional" className="text-sm">
                              Conventional Mining Methods
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="sustainable" defaultChecked className="rounded" />
                            <Label htmlFor="sustainable" className="text-sm">
                              Sustainable/Green Mining Alternatives
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="renewable-energy" className="rounded" />
                            <Label htmlFor="renewable-energy" className="text-sm">
                              100% Renewable Energy Scenario
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calculator className="mr-2 h-5 w-5" />
                    Analysis Preview
                  </CardTitle>
                  <CardDescription>AI-powered LCA estimation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <h4 className="font-semibold text-primary text-sm mb-1">Location Advantage</h4>
                      <p className="text-xs text-muted-foreground">High-grade ore reduces processing energy by ~15%</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Estimated CO₂ Impact</span>
                        <Badge className="bg-accent text-accent-foreground">2.1 t CO₂/t ore</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Water Usage</span>
                        <Badge className="bg-secondary text-secondary-foreground">3.2 m³/t ore</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Energy Intensity</span>
                        <Badge className="bg-primary text-primary-foreground">45 kWh/t ore</Badge>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        * Preliminary estimates based on location data. Full analysis will provide detailed breakdown.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Ready to Analyze
                  </CardTitle>
                  <CardDescription>Generate comprehensive LCA report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-semibold text-accent-foreground text-sm mb-1">AI Analysis Features</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Location-specific impact factors</li>
                        <li>• Multi-scenario comparisons</li>
                        <li>• Optimization recommendations</li>
                        <li>• Regulatory compliance check</li>
                      </ul>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={reportHref}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Generate LCA Report
                      </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">Analysis typically takes 30-60 seconds</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}