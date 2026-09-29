export interface CrabGrade {
  id: string;
  name: string;
  scientificName: string;
  category: 'king' | 'female_roe' | 'soft_shell' | 'seedling';
  tagline: string;
  weightRange: string;
  meatYield: string;
  shellHardness: string;
  pricingFOB: string;
  image: string;
  description: string;
  specifications: {
    averageWeight: string;
    packagingUnit: string;
    dormancyTolerance: string;
    targetMarkets: string[];
    idealCulinaryUse: string;
    seasonalAvailability: string;
  };
}

export interface TelemetryData {
  sectorId: string;
  sectorName: string;
  salinity: number; // ppt
  temperature: number; // °C
  dissolvedOxygen: number; // mg/L
  ph: number;
  ammonia: number; // ppm
  waterFlowRate: number; // m3/h
  activeApartments: number;
  totalCapacity: number;
  filtrationStatus: 'Optimal' | 'Bio-Regenerating' | 'Sterilizing';
}

export interface BatchRecord {
  batchId: string;
  grade: string;
  harvestDate: string;
  pondBiocellCluster: string;
  meatFullnessScore: number;
  shellDurometer: number;
  vetClearanceNo: string;
  departureHub: string;
  waterQualityLog: {
    salinity: string;
    ph: string;
    temperature: string;
  };
  destination: string;
  status: 'In Dormancy Transit' | 'Export Cleared' | 'Ready for Dispatch' | 'Harvested & Inspected';
}

export interface QuoteCalculation {
  gradeId: string;
  weightKg: number;
  destinationRegion: string;
  packagingOption: string;
  basePricePerKg: number;
  airFreightPerKg: number;
  packagingCost: number;
  totalEstimatedFOB: number;
  totalEstimatedCIF: number;
  estimatedBoxes: number;
  guaranteedLiveArrival: number;
}
