export interface CountryCustomsRegulation {
  countryCode: string;
  countryName: string;
  flag: string;
  corridor: string;
  hsCode: string;
  hsDescription: string;
  customsDutyRate: number; // percentage
  customsDutyNotes: string;
  vatGstRate: number; // percentage
  vatGstName: string;
  quarantineFeeUSD: number;
  regulatoryAuthority: string;
  inspectionRequirements: string[];
  summary: string;
  sourceDocTitle: string;
  sourceDocUrl: string;
  defaultAirCargoHub: string;
}

export const GROUNDED_CUSTOMS_REGULATIONS: Record<string, CountryCustomsRegulation> = {
  'Japan': {
    countryCode: 'JP',
    countryName: 'Japan',
    flag: '🇯🇵',
    corridor: 'East Asia',
    hsCode: '0306.33.000',
    hsDescription: 'Live mud crab (Scylla serrata) for consumption',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% MFN Tariff / EPA bilateral preferential rate',
    vatGstRate: 8.0,
    vatGstName: 'Consumption Tax (Reduced Food Rate)',
    quarantineFeeUSD: 45,
    regulatoryAuthority: 'MAFF Animal Quarantine Service (AQS) & MHLW',
    inspectionRequirements: [
      'Official Phytosanitary & Aquatic Animal Health Certificate (WSSV / EHP negative)',
      'Advance Import Quarantine Inspection declaration to Tokyo Narita (NRT) or Haneda (HND)',
      'Live crab ecdysis status inspection upon cold-chain tarmac offloading'
    ],
    summary: 'Japan charges 0% import duty on live mud crabs under WTO MFN terms with 8% reduced food consumption tax.',
    sourceDocTitle: 'Japan Customs Tariff Schedule - Chapter 03 Live Crustaceans',
    sourceDocUrl: 'https://www.customs.go.jp/tariff/',
    defaultAirCargoHub: 'Tokyo Narita (NRT)',
  },
  'Singapore': {
    countryCode: 'SG',
    countryName: 'Singapore',
    flag: '🇸🇬',
    corridor: 'Southeast Asia',
    hsCode: '0306.33.00',
    hsDescription: 'Live Mud Crabs (Scylla serrata / tranquebarica)',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% Customs Duty (Free Trade Port)',
    vatGstRate: 9.0,
    vatGstName: 'Goods and Services Tax (GST)',
    quarantineFeeUSD: 35,
    regulatoryAuthority: 'Singapore Food Agency (SFA)',
    inspectionRequirements: [
      'SFA Fish & Crustacean Import Cargo Permit via TradeNet',
      'Health Certificate from accredited government laboratory stating freedom from Chloramphenicol',
      'Fast-track tarmac inspection at Changi Air Cargo Terminal (SIN)'
    ],
    summary: 'Singapore assesses zero customs duty on live seafood; standard 9% GST applies with mandatory SFA cargo clearance.',
    sourceDocTitle: 'Singapore Food Agency Commercial Import Directives for Live Seafood',
    sourceDocUrl: 'https://www.sfa.gov.sg',
    defaultAirCargoHub: 'Changi International (SIN)',
  },
  'United Arab Emirates': {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    corridor: 'Middle East',
    hsCode: '0306.33.00',
    hsDescription: 'Live fresh mangrove mud crab',
    customsDutyRate: 5.0,
    customsDutyNotes: '5% GCC Unified Customs Tariff',
    vatGstRate: 5.0,
    vatGstName: 'Federal Value Added Tax (VAT)',
    quarantineFeeUSD: 60,
    regulatoryAuthority: 'Ministry of Climate Change and Environment (MOCCAE)',
    inspectionRequirements: [
      'MOCCAE Electronic Import Permit issued prior to shipment departure',
      'Official Veterinary Health Certificate with micro-pathogen clearance',
      'Live quarantine clearance inspection at Dubai International (DXB) Cargo Gateway'
    ],
    summary: 'UAE applies 5% GCC external tariff on CIF and 5% standard VAT, supported by rapid 3-hour air-cargo live clearance.',
    sourceDocTitle: 'Dubai Customs Integrated Tariff Schedule & MOCCAE Guidelines',
    sourceDocUrl: 'https://www.dubaicustoms.gov.ae',
    defaultAirCargoHub: 'Dubai International (DXB)',
  },
  'United States': {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    corridor: 'North America',
    hsCode: '0306.33.00.00',
    hsDescription: 'Live Crabs, mud / swimming species',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% Duty under Harmonized Tariff Schedule (HTSUS Column 1)',
    vatGstRate: 0.0,
    vatGstName: 'Federal Sales Tax (0% Federal; State destination applies)',
    quarantineFeeUSD: 85,
    regulatoryAuthority: 'US Fish & Wildlife Service (USFWS) & FDA / CBP',
    inspectionRequirements: [
      'USFWS eDecs Electronic Declaration (Form 3-177) filed 48 hrs prior to landing',
      'FDA Prior Notice of Imported Food Confirmation Number',
      'Declared designated live wildlife port of entry (LAX, SFO, or JFK)'
    ],
    summary: 'Live mud crabs enter the US duty-free at 0% tariff with USFWS wildlife inspection protocol ($85 base fee).',
    sourceDocTitle: 'US International Trade Commission (USITC) HTSUS Chapter 3',
    sourceDocUrl: 'https://hts.usitc.gov',
    defaultAirCargoHub: 'Los Angeles (LAX) / New York (JFK)',
  },
  'European Union': {
    countryCode: 'EU',
    countryName: 'European Union (Germany / France)',
    flag: '🇪🇺',
    corridor: 'Europe',
    hsCode: '0306.33.10',
    hsDescription: 'Live mud crab for human consumption',
    customsDutyRate: 7.5,
    customsDutyNotes: '7.5% EU Common Customs Tariff (MFN rate)',
    vatGstRate: 7.0,
    vatGstName: 'Reduced Food VAT (7% DE / 5.5% FR)',
    quarantineFeeUSD: 95,
    regulatoryAuthority: 'European Commission DG SANTE & Border Inspection Posts (BIP)',
    inspectionRequirements: [
      'Official EU Model Animal Health/Official Certificate via TRACES-NT',
      'Origination from an establishment approved and listed on TRACES registry',
      'Veterinary documentary, identity, and physical check at FRA / CDG BIP'
    ],
    summary: 'EU imports incur 7.5% customs duty and reduced food VAT (approx. 7%), requiring formal TRACES-NT entry.',
    sourceDocTitle: 'European Commission TARIC Database - Code 0306 33 10',
    sourceDocUrl: 'https://ec.europa.eu/taxation_customs/dds2/taric/',
    defaultAirCargoHub: 'Frankfurt (FRA) / Paris (CDG)',
  },
  'Hong Kong': {
    countryCode: 'HK',
    countryName: 'Hong Kong (SAR)',
    flag: '🇭🇰',
    corridor: 'East Asia',
    hsCode: '0306.33.00',
    hsDescription: 'Live mangrove mud crab (Scylla serrata)',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% Customs Duty (Free Trade Port)',
    vatGstRate: 0.0,
    vatGstName: 'Goods Tax (0% Free Port)',
    quarantineFeeUSD: 25,
    regulatoryAuthority: 'Centre for Food Safety (CFS) & FEHD',
    inspectionRequirements: [
      'Official Health Certificate from exporting authority',
      'Physical inspection at SuperTerminal 1 (HKG Air Cargo)',
      'Negative certificate for synthetic hormones and chloramphenicol'
    ],
    summary: 'Hong Kong provides free port status with 0% tariff and 0% VAT, making it the most cost-efficient live crab export destination.',
    sourceDocTitle: 'Hong Kong Customs and Excise & FEHD Food Safety Guidelines',
    sourceDocUrl: 'https://www.customs.gov.hk',
    defaultAirCargoHub: 'Hong Kong International (HKG)',
  },
  'United Kingdom': {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    corridor: 'Europe',
    hsCode: '0306.33.10',
    hsDescription: 'Live fresh mud crabs',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% under UK Global Tariff (UKGT for human food consumption)',
    vatGstRate: 0.0,
    vatGstName: 'Zero-Rated Food VAT (0%)',
    quarantineFeeUSD: 80,
    regulatoryAuthority: 'DEFRA & Animal and Plant Health Agency (APHA)',
    inspectionRequirements: [
      'Pre-notification on IPAFFS (Import of Products, Animals, Food and Feed System)',
      'Export Health Certificate (EHC) issued by competent veterinary service',
      'Border Control Post (BCP) clearance at London Heathrow (LHR)'
    ],
    summary: 'Live crabs enter the UK at 0% tariff with zero-rated food VAT, requiring DEFRA IPAFFS digital notification.',
    sourceDocTitle: 'UK Integrated Online Tariff Schedule - Commodity 0306331000',
    sourceDocUrl: 'https://www.trade-tariff.service.gov.uk',
    defaultAirCargoHub: 'London Heathrow (LHR)',
  },
  'Australia': {
    countryCode: 'AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    corridor: 'Domestic / Regional',
    hsCode: '0306.33.00',
    hsDescription: 'Live edible mud crabs',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% Customs Duty under Ch. 3 Customs Tariff Act',
    vatGstRate: 0.0,
    vatGstName: 'GST-Free Food Crustaceans (0%)',
    quarantineFeeUSD: 110,
    regulatoryAuthority: 'Department of Agriculture, Fisheries and Forestry (DAFF Biosecurity)',
    inspectionRequirements: [
      'DAFF BICON Biosecurity Import Permit issued prior to transport',
      'Veterinary freedom declaration for White Spot Syndrome Virus (WSSV)',
      'Strict live containment water disposal protocol upon landing'
    ],
    summary: 'Australia assesses 0% duty and 0% GST on live food seafood, with rigorous biosecurity BICON clearance inspections.',
    sourceDocTitle: 'Australian Border Force Working Tariff & DAFF BICON System',
    sourceDocUrl: 'https://bicon.agriculture.gov.au',
    defaultAirCargoHub: 'Sydney Kingsford Smith (SYD)',
  },
  'China': {
    countryCode: 'CN',
    countryName: 'China',
    flag: '🇨🇳',
    corridor: 'East Asia',
    hsCode: '0306.33.90',
    hsDescription: 'Live Scylla serrata / mangrove mud crab (青蟹 / 膏蟹)',
    customsDutyRate: 7.0,
    customsDutyNotes: '7% MFN customs duty rate for live crustaceans',
    vatGstRate: 9.0,
    vatGstName: 'Agricultural Import VAT',
    quarantineFeeUSD: 55,
    regulatoryAuthority: 'General Administration of Customs of China (GACC)',
    inspectionRequirements: [
      'GACC registered seafood aquaculture facility listing',
      'Official Aquatic Animal Veterinary Health Certificate (WSSV negative)',
      'Designated port of entry inspection at Guangzhou (CAN), Shanghai (PVG), or Shenzhen (SZX)'
    ],
    summary: 'China imposes a 7% MFN tariff and 9% agricultural VAT on live mud crabs with mandatory GACC establishment registration.',
    sourceDocTitle: 'GACC General Administration of Customs Tariff Schedule',
    sourceDocUrl: 'http://customs.gov.cn',
    defaultAirCargoHub: 'Guangzhou Baiyun (CAN) / Shanghai Pudong (PVG)',
  },
  'South Korea': {
    countryCode: 'KR',
    countryName: 'South Korea',
    flag: '🇰🇷',
    corridor: 'East Asia',
    hsCode: '0306.33.0000',
    hsDescription: 'Live mangrove mud crab (톱날꽃게)',
    customsDutyRate: 5.0,
    customsDutyNotes: '5% MFN Basic Tariff for live seafood',
    vatGstRate: 10.0,
    vatGstName: 'Value-Added Tax (VAT)',
    quarantineFeeUSD: 50,
    regulatoryAuthority: 'National Fishery Products Quality Management Service (NFQS) & MFDS',
    inspectionRequirements: [
      'NFQS Aquatic Animal Quarantine Certificate',
      'Cold-chain transport humidity and temperature monitoring verification',
      'Rapid microbiological and heavy metal random lot screening at Incheon (ICN)'
    ],
    summary: 'South Korea levies a 5% basic tariff and 10% VAT with specialized NFQS live aquatic quarantine at Incheon International.',
    sourceDocTitle: 'Korea Customs Service Customs Tariff & NFQS Aquatic Directives',
    sourceDocUrl: 'https://www.customs.go.kr',
    defaultAirCargoHub: 'Incheon International (ICN)',
  },
  'Canada': {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    corridor: 'North America',
    hsCode: '0306.33.00.00',
    hsDescription: 'Crabs, live, fresh or chilled (Scylla spp.)',
    customsDutyRate: 0.0,
    customsDutyNotes: '0% MFN Customs Tariff (Chapter 3)',
    vatGstRate: 5.0,
    vatGstName: 'Goods and Services Tax (GST - Basic Groceries 0% / Food Service 5%)',
    quarantineFeeUSD: 70,
    regulatoryAuthority: 'Canadian Food Inspection Agency (CFIA) & CBSA',
    inspectionRequirements: [
      'CFIA Aquatic Animal Health Import Permit',
      'Electronic cargo reporting via CBSA eManifest',
      'Live survival inspection at Vancouver (YVR) or Toronto Pearson (YYZ)'
    ],
    summary: 'Canada permits duty-free entry (0% tariff) for live mud crabs under CFIA aquatic biosecurity certification.',
    sourceDocTitle: 'Canada Border Services Agency Customs Tariff Schedule',
    sourceDocUrl: 'https://www.cbsa-asfc.gc.ca',
    defaultAirCargoHub: 'Vancouver International (YVR)',
  },
  'Saudi Arabia': {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    flag: '🇸🇦',
    corridor: 'Middle East',
    hsCode: '0306.33.00',
    hsDescription: 'Live fresh mangrove mud crab',
    customsDutyRate: 5.0,
    customsDutyNotes: '5% Unified GCC Customs Tariff',
    vatGstRate: 15.0,
    vatGstName: 'Value Added Tax (ZATCA)',
    quarantineFeeUSD: 65,
    regulatoryAuthority: 'Saudi Food and Drug Authority (SFDA) & MEWA',
    inspectionRequirements: [
      'SFDA electronic import clearance declaration',
      'Accredited Veterinary Health Certificate confirming pathogen freedom',
      'Live animal handling clearance at Riyadh (RUH) or Jeddah (JED)'
    ],
    summary: 'Saudi Arabia applies standard 5% GCC tariff and 15% VAT, supported by SFDA food safety fast-clearance.',
    sourceDocTitle: 'Zakat, Tax and Customs Authority (ZATCA) Tariff Book',
    sourceDocUrl: 'https://zatca.gov.sa',
    defaultAirCargoHub: 'Riyadh King Khalid (RUH) / Jeddah King Abdulaziz (JED)',
  },
};

export const COMMON_EXPORT_COUNTRIES = Object.keys(GROUNDED_CUSTOMS_REGULATIONS);

/**
 * Fallback regulation for any unlisted or custom-searched country
 */
export function getFallbackRegulation(countryName: string): CountryCustomsRegulation {
  // Check direct or partial match
  const normalized = countryName.trim().toLowerCase();
  for (const [key, reg] of Object.entries(GROUNDED_CUSTOMS_REGULATIONS)) {
    if (key.toLowerCase() === normalized || reg.countryName.toLowerCase().includes(normalized)) {
      return reg;
    }
  }

  // European countries fallback
  const euCountries = ['france', 'germany', 'italy', 'spain', 'netherlands', 'belgium', 'sweden', 'denmark', 'portugal', 'greece', 'poland', 'austria', 'ireland'];
  if (euCountries.some(c => normalized.includes(c))) {
    return {
      ...GROUNDED_CUSTOMS_REGULATIONS['European Union'],
      countryName: countryName.trim(),
    };
  }

  // GCC countries fallback
  const gccCountries = ['qatar', 'kuwait', 'bahrain', 'oman'];
  if (gccCountries.some(c => normalized.includes(c))) {
    return {
      ...GROUNDED_CUSTOMS_REGULATIONS['United Arab Emirates'],
      countryName: countryName.trim(),
    };
  }

  // General WTO MFN default
  return {
    countryCode: 'INTL',
    countryName: countryName.trim() || 'International Destination',
    flag: '🌐',
    corridor: 'International WTO',
    hsCode: '0306.33.00',
    hsDescription: 'Live mud crab (Scylla serrata) for human consumption',
    customsDutyRate: 5.0,
    customsDutyNotes: '5% Standard WTO MFN Tariff benchmark',
    vatGstRate: 8.0,
    vatGstName: 'Destination VAT / Consumption Tax',
    quarantineFeeUSD: 60,
    regulatoryAuthority: 'National Department of Agriculture & Veterinary Biosecurity',
    inspectionRequirements: [
      'Official Aquatic Animal Health Certificate (WSSV / EHP negative)',
      'Pre-arrival electronic cargo declaration to port veterinary authorities',
      'Live temperature-controlled airway packaging inspection'
    ],
    summary: `${countryName.trim() || 'The destination country'} follows standard WTO MFN live seafood tariff guidelines (5% estimated customs duty, ~8% VAT) with mandatory veterinary health certificate.`,
    sourceDocTitle: 'World Customs Organization (WCO) Harmonized System Chapter 03',
    sourceDocUrl: 'https://www.wcoomd.org',
    defaultAirCargoHub: 'International Air Cargo Terminal',
  };
}
