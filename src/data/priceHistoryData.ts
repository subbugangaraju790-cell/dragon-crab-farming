export interface PriceDataPoint {
  date: string; // "YYYY-MM" or "MMM YYYY"
  timestamp: number;
  inrPrice: number; // Price in INR per kg (or piece for seedling)
  usdPrice: number; // Price in USD
  volumeMetricTons: number;
  marketEvent?: string;
}

export interface GradePriceHistory {
  gradeId: string;
  gradeName: string;
  shortName: string;
  color: string;
  unit: string;
  description: string;
  currentINR: number;
  minINR: number;
  maxINR: number;
  avgINR: number;
  volatilityPercentage: number;
  data: PriceDataPoint[];
}

export const HISTORICAL_PRICE_SERIES: GradePriceHistory[] = [
  {
    gradeId: 'grade-a-king',
    gradeName: 'Dragon King Mud Crab (XL 800g-1400g+)',
    shortName: 'King Mud Crab (XL)',
    color: '#06b6d4', // cyan-500
    unit: 'kg',
    description: 'Premier export hard-shell crab. Peaks during Lunar New Year & Golden Week banquet seasons.',
    currentINR: 2850,
    minINR: 2380,
    maxINR: 3250,
    avgINR: 2795,
    volatilityPercentage: 14.2,
    data: [
      { date: 'Apr 2025', timestamp: new Date(2025, 3, 1).getTime(), inrPrice: 2450, usdPrice: 27.7, volumeMetricTons: 18.2 },
      { date: 'May 2025', timestamp: new Date(2025, 4, 1).getTime(), inrPrice: 2520, usdPrice: 28.5, volumeMetricTons: 19.5 },
      { date: 'Jun 2025', timestamp: new Date(2025, 5, 1).getTime(), inrPrice: 2680, usdPrice: 30.3, volumeMetricTons: 16.8, marketEvent: 'South-West Monsoon Wild Catch Restriction' },
      { date: 'Jul 2025', timestamp: new Date(2025, 6, 1).getTime(), inrPrice: 2750, usdPrice: 31.1, volumeMetricTons: 15.4 },
      { date: 'Aug 2025', timestamp: new Date(2025, 7, 1).getTime(), inrPrice: 2820, usdPrice: 31.9, volumeMetricTons: 17.1 },
      { date: 'Sep 2025', timestamp: new Date(2025, 8, 1).getTime(), inrPrice: 2980, usdPrice: 33.7, volumeMetricTons: 22.4, marketEvent: 'Mid-Autumn Festival Export Surge' },
      { date: 'Oct 2025', timestamp: new Date(2025, 9, 1).getTime(), inrPrice: 2720, usdPrice: 30.7, volumeMetricTons: 20.8 },
      { date: 'Nov 2025', timestamp: new Date(2025, 10, 1).getTime(), inrPrice: 2890, usdPrice: 32.7, volumeMetricTons: 24.1, marketEvent: 'Diwali & Wedding Season Influx' },
      { date: 'Dec 2025', timestamp: new Date(2025, 11, 1).getTime(), inrPrice: 3050, usdPrice: 34.5, volumeMetricTons: 26.5 },
      { date: 'Jan 2026', timestamp: new Date(2026, 0, 1).getTime(), inrPrice: 3250, usdPrice: 36.7, volumeMetricTons: 31.0, marketEvent: 'Lunar New Year Peak Demand Surge' },
      { date: 'Feb 2026', timestamp: new Date(2026, 1, 1).getTime(), inrPrice: 3120, usdPrice: 35.3, volumeMetricTons: 25.6 },
      { date: 'Mar 2026', timestamp: new Date(2026, 2, 1).getTime(), inrPrice: 2650, usdPrice: 29.9, volumeMetricTons: 21.0 },
      { date: 'Apr 2026', timestamp: new Date(2026, 3, 1).getTime(), inrPrice: 2580, usdPrice: 29.2, volumeMetricTons: 22.3 },
      { date: 'May 2026', timestamp: new Date(2026, 4, 1).getTime(), inrPrice: 2640, usdPrice: 29.8, volumeMetricTons: 23.5 },
      { date: 'Jun 2026', timestamp: new Date(2026, 5, 1).getTime(), inrPrice: 2780, usdPrice: 31.4, volumeMetricTons: 19.8, marketEvent: 'Coastal Fishing Ban Elevation' },
      { date: 'Jul 2026', timestamp: new Date(2026, 6, 1).getTime(), inrPrice: 2810, usdPrice: 31.8, volumeMetricTons: 20.2 },
      { date: 'Aug 2026', timestamp: new Date(2026, 7, 1).getTime(), inrPrice: 2830, usdPrice: 32.0, volumeMetricTons: 22.0 },
      { date: 'Sep 2026', timestamp: new Date(2026, 8, 1).getTime(), inrPrice: 2850, usdPrice: 32.2, volumeMetricTons: 24.8, marketEvent: 'RAS High-Density Harvest Equilibrium' },
    ],
  },
  {
    gradeId: 'grade-coral-female',
    gradeName: 'Imperial Golden Roe Female Crab (450g-700g)',
    shortName: 'Imperial Roe Female',
    color: '#f59e0b', // amber-500
    unit: 'kg',
    description: 'High-demand female crab with 100% full coral maturation. Major premium in Asian culinary centers.',
    currentINR: 3200,
    minINR: 2650,
    maxINR: 3750,
    avgINR: 3140,
    volatilityPercentage: 16.8,
    data: [
      { date: 'Apr 2025', timestamp: new Date(2025, 3, 1).getTime(), inrPrice: 2720, usdPrice: 30.7, volumeMetricTons: 11.2 },
      { date: 'May 2025', timestamp: new Date(2025, 4, 1).getTime(), inrPrice: 2790, usdPrice: 31.5, volumeMetricTons: 12.0 },
      { date: 'Jun 2025', timestamp: new Date(2025, 5, 1).getTime(), inrPrice: 2950, usdPrice: 33.3, volumeMetricTons: 10.5 },
      { date: 'Jul 2025', timestamp: new Date(2025, 6, 1).getTime(), inrPrice: 3100, usdPrice: 35.0, volumeMetricTons: 11.8 },
      { date: 'Aug 2025', timestamp: new Date(2025, 7, 1).getTime(), inrPrice: 3380, usdPrice: 38.2, volumeMetricTons: 14.0 },
      { date: 'Sep 2025', timestamp: new Date(2025, 8, 1).getTime(), inrPrice: 3650, usdPrice: 41.2, volumeMetricTons: 18.5, marketEvent: 'Peak Autumn Female Roe Demand' },
      { date: 'Oct 2025', timestamp: new Date(2025, 9, 1).getTime(), inrPrice: 3450, usdPrice: 39.0, volumeMetricTons: 16.2 },
      { date: 'Nov 2025', timestamp: new Date(2025, 10, 1).getTime(), inrPrice: 3300, usdPrice: 37.3, volumeMetricTons: 15.0 },
      { date: 'Dec 2025', timestamp: new Date(2025, 11, 1).getTime(), inrPrice: 3520, usdPrice: 39.8, volumeMetricTons: 17.8 },
      { date: 'Jan 2026', timestamp: new Date(2026, 0, 1).getTime(), inrPrice: 3750, usdPrice: 42.4, volumeMetricTons: 20.4, marketEvent: 'Banquet Roe Shortage in Hong Kong & SG' },
      { date: 'Feb 2026', timestamp: new Date(2026, 1, 1).getTime(), inrPrice: 3580, usdPrice: 40.5, volumeMetricTons: 16.5 },
      { date: 'Mar 2026', timestamp: new Date(2026, 2, 1).getTime(), inrPrice: 3050, usdPrice: 34.5, volumeMetricTons: 13.0 },
      { date: 'Apr 2026', timestamp: new Date(2026, 3, 1).getTime(), inrPrice: 2980, usdPrice: 33.7, volumeMetricTons: 13.8 },
      { date: 'May 2026', timestamp: new Date(2026, 4, 1).getTime(), inrPrice: 3020, usdPrice: 34.1, volumeMetricTons: 14.2 },
      { date: 'Jun 2026', timestamp: new Date(2026, 5, 1).getTime(), inrPrice: 3120, usdPrice: 35.3, volumeMetricTons: 13.5 },
      { date: 'Jul 2026', timestamp: new Date(2026, 6, 1).getTime(), inrPrice: 3180, usdPrice: 35.9, volumeMetricTons: 14.6 },
      { date: 'Aug 2026', timestamp: new Date(2026, 7, 1).getTime(), inrPrice: 3220, usdPrice: 36.4, volumeMetricTons: 15.2 },
      { date: 'Sep 2026', timestamp: new Date(2026, 8, 1).getTime(), inrPrice: 3200, usdPrice: 36.2, volumeMetricTons: 16.0 },
    ],
  },
  {
    gradeId: 'grade-soft-shell',
    gradeName: 'Synchronized Prime Soft-Shell Crab',
    shortName: 'Prime Soft-Shell',
    color: '#10b981', // emerald-500
    unit: 'kg',
    description: 'IQF blast frozen or chilled 90-min post-molt crab. Very stable pricing due to continuous indoor RAS molting cycles.',
    currentINR: 2250,
    minINR: 2050,
    maxINR: 2480,
    avgINR: 2220,
    volatilityPercentage: 7.2,
    data: [
      { date: 'Apr 2025', timestamp: new Date(2025, 3, 1).getTime(), inrPrice: 2100, usdPrice: 23.7, volumeMetricTons: 8.5 },
      { date: 'May 2025', timestamp: new Date(2025, 4, 1).getTime(), inrPrice: 2150, usdPrice: 24.3, volumeMetricTons: 9.0 },
      { date: 'Jun 2025', timestamp: new Date(2025, 5, 1).getTime(), inrPrice: 2200, usdPrice: 24.9, volumeMetricTons: 9.8 },
      { date: 'Jul 2025', timestamp: new Date(2025, 6, 1).getTime(), inrPrice: 2250, usdPrice: 25.4, volumeMetricTons: 10.2 },
      { date: 'Aug 2025', timestamp: new Date(2025, 7, 1).getTime(), inrPrice: 2280, usdPrice: 25.8, volumeMetricTons: 10.5 },
      { date: 'Sep 2025', timestamp: new Date(2025, 8, 1).getTime(), inrPrice: 2320, usdPrice: 26.2, volumeMetricTons: 11.0 },
      { date: 'Oct 2025', timestamp: new Date(2025, 9, 1).getTime(), inrPrice: 2300, usdPrice: 26.0, volumeMetricTons: 11.2 },
      { date: 'Nov 2025', timestamp: new Date(2025, 10, 1).getTime(), inrPrice: 2350, usdPrice: 26.6, volumeMetricTons: 11.8 },
      { date: 'Dec 2025', timestamp: new Date(2025, 11, 1).getTime(), inrPrice: 2420, usdPrice: 27.3, volumeMetricTons: 12.5 },
      { date: 'Jan 2026', timestamp: new Date(2026, 0, 1).getTime(), inrPrice: 2480, usdPrice: 28.0, volumeMetricTons: 13.2, marketEvent: 'Japanese Izakaya Winter Restocking' },
      { date: 'Feb 2026', timestamp: new Date(2026, 1, 1).getTime(), inrPrice: 2390, usdPrice: 27.0, volumeMetricTons: 11.5 },
      { date: 'Mar 2026', timestamp: new Date(2026, 2, 1).getTime(), inrPrice: 2180, usdPrice: 24.6, volumeMetricTons: 10.0 },
      { date: 'Apr 2026', timestamp: new Date(2026, 3, 1).getTime(), inrPrice: 2150, usdPrice: 24.3, volumeMetricTons: 10.4 },
      { date: 'May 2026', timestamp: new Date(2026, 4, 1).getTime(), inrPrice: 2180, usdPrice: 24.6, volumeMetricTons: 10.8 },
      { date: 'Jun 2026', timestamp: new Date(2026, 5, 1).getTime(), inrPrice: 2220, usdPrice: 25.1, volumeMetricTons: 11.1 },
      { date: 'Jul 2026', timestamp: new Date(2026, 6, 1).getTime(), inrPrice: 2240, usdPrice: 25.3, volumeMetricTons: 11.4 },
      { date: 'Aug 2026', timestamp: new Date(2026, 7, 1).getTime(), inrPrice: 2260, usdPrice: 25.5, volumeMetricTons: 11.7 },
      { date: 'Sep 2026', timestamp: new Date(2026, 8, 1).getTime(), inrPrice: 2250, usdPrice: 25.4, volumeMetricTons: 12.0 },
    ],
  },
  {
    gradeId: 'grade-prime-medium',
    gradeName: 'Commercial Prime Mud Crab (500g-750g)',
    shortName: 'Commercial Prime',
    color: '#8b5cf6', // violet-500
    unit: 'kg',
    description: 'High turnover restaurant workhorse grade. High liquidity and steady domestic and Southeast Asian volume.',
    currentINR: 2150,
    minINR: 1850,
    maxINR: 2490,
    avgINR: 2110,
    volatilityPercentage: 11.4,
    data: [
      { date: 'Apr 2025', timestamp: new Date(2025, 3, 1).getTime(), inrPrice: 1920, usdPrice: 21.7, volumeMetricTons: 25.0 },
      { date: 'May 2025', timestamp: new Date(2025, 4, 1).getTime(), inrPrice: 1980, usdPrice: 22.4, volumeMetricTons: 26.4 },
      { date: 'Jun 2025', timestamp: new Date(2025, 5, 1).getTime(), inrPrice: 2100, usdPrice: 23.7, volumeMetricTons: 23.1 },
      { date: 'Jul 2025', timestamp: new Date(2025, 6, 1).getTime(), inrPrice: 2180, usdPrice: 24.6, volumeMetricTons: 22.5 },
      { date: 'Aug 2025', timestamp: new Date(2025, 7, 1).getTime(), inrPrice: 2210, usdPrice: 25.0, volumeMetricTons: 24.2 },
      { date: 'Sep 2025', timestamp: new Date(2025, 8, 1).getTime(), inrPrice: 2290, usdPrice: 25.9, volumeMetricTons: 28.0 },
      { date: 'Oct 2025', timestamp: new Date(2025, 9, 1).getTime(), inrPrice: 2150, usdPrice: 24.3, volumeMetricTons: 26.5 },
      { date: 'Nov 2025', timestamp: new Date(2025, 10, 1).getTime(), inrPrice: 2280, usdPrice: 25.8, volumeMetricTons: 29.8, marketEvent: 'Domestic Indian Seafood Festival Runs' },
      { date: 'Dec 2025', timestamp: new Date(2025, 11, 1).getTime(), inrPrice: 2380, usdPrice: 26.9, volumeMetricTons: 32.0 },
      { date: 'Jan 2026', timestamp: new Date(2026, 0, 1).getTime(), inrPrice: 2490, usdPrice: 28.1, volumeMetricTons: 35.5 },
      { date: 'Feb 2026', timestamp: new Date(2026, 1, 1).getTime(), inrPrice: 2320, usdPrice: 26.2, volumeMetricTons: 30.1 },
      { date: 'Mar 2026', timestamp: new Date(2026, 2, 1).getTime(), inrPrice: 2020, usdPrice: 22.8, volumeMetricTons: 27.0 },
      { date: 'Apr 2026', timestamp: new Date(2026, 3, 1).getTime(), inrPrice: 1990, usdPrice: 22.5, volumeMetricTons: 28.2 },
      { date: 'May 2026', timestamp: new Date(2026, 4, 1).getTime(), inrPrice: 2040, usdPrice: 23.1, volumeMetricTons: 29.0 },
      { date: 'Jun 2026', timestamp: new Date(2026, 5, 1).getTime(), inrPrice: 2110, usdPrice: 23.8, volumeMetricTons: 26.4 },
      { date: 'Jul 2026', timestamp: new Date(2026, 6, 1).getTime(), inrPrice: 2140, usdPrice: 24.2, volumeMetricTons: 27.2 },
      { date: 'Aug 2026', timestamp: new Date(2026, 7, 1).getTime(), inrPrice: 2160, usdPrice: 24.4, volumeMetricTons: 28.5 },
      { date: 'Sep 2026', timestamp: new Date(2026, 8, 1).getTime(), inrPrice: 2150, usdPrice: 24.3, volumeMetricTons: 30.0 },
    ],
  },
];
