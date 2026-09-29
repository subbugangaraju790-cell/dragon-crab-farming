import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'zh' | 'ja' | 'ar' | 'hi';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🌐', dir: 'ltr' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文 (繁體/簡體)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
];

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;

  // Nav
  navSpecies: string;
  navRasTech: string;
  navWholesale: string;
  navTraceability: string;
  navCertifications: string;
  navTelemetry: string;
  navRequestQuote: string;
  navQuote: string;

  // Hero
  heroKickerAquaculture: string;
  heroKickerRas: string;
  heroKickerAirfreight: string;
  heroTitle: string;
  heroDescription: string;
  heroCtaCalculate: string;
  heroCtaTech: string;
  heroTrustZeroAntibiotics: string;
  heroTrustColdChain: string;
  heroTrustHaccp: string;
  heroProofTitle: string;
  heroProofBiocells: string;
  heroProofBiocellsDesc: string;
  heroProofLiveArrival: string;
  heroProofLiveArrivalDesc: string;
  heroProofMeatYield: string;
  heroProofMeatYieldDesc: string;
  heroProofYearRound: string;
  heroProofYearRoundDesc: string;
  heroNextDispatch: string;
  heroReserveBatch: string;

  // Telemetry
  telemetryKicker: string;
  telemetryTitle: string;
  telemetrySalinity: string;
  telemetrySalinityNote: string;
  telemetryOxygen: string;
  telemetryOxygenNote: string;
  telemetryTemp: string;
  telemetryTempNote: string;
  telemetryPh: string;
  telemetryPhNote: string;
  telemetryAmmonia: string;
  telemetryAmmoniaNote: string;
  telemetryFlow: string;
  telemetryStatus: string;
  telemetrySectorHard: string;
  telemetrySectorRoe: string;
  telemetrySectorSoft: string;
  telemetryFootnote: string;

  // Catalog
  catalogKicker: string;
  catalogTitle: string;
  catalogDescription: string;
  catalogFilterAll: string;
  catalogFilterKings: string;
  catalogFilterRoe: string;
  catalogFilterSoft: string;
  catalogFilterSeedlings: string;
  catalogFobPrice: string;
  catalogMeatYield: string;
  catalogHardness: string;
  catalogInspectBtn: string;
  catalogQuoteBtn: string;

  // Chart
  chartKicker: string;
  chartTitle: string;
  chartDescription: string;
  chartToggleSeries: string;
  chartAuditedSpot: string;
  chartMarketEvent: string;
  chartBaselineGrade: string;
  chartSpotRate: string;
  chartRange: string;
  chartVolatility: string;
  chartVolatilityNote: string;

  // RAS Tech
  techKicker: string;
  techTitle: string;
  techDescription: string;
  techTabArchitecture: string;
  techTabComparison: string;
  techBiocellCaption: string;

  // Wholesale Estimator
  calcKicker: string;
  calcTitle: string;
  calcDescription: string;
  calcStepGrade: string;
  calcStepWeight: string;
  calcStepDestination: string;
  calcStepPackaging: string;
  calcCardTitle: string;
  calcTotalEstimated: string;
  calcSubmitRfp: string;
  calcLiveGuarantee: string;

  // Batch Traceability
  batchKicker: string;
  batchTitle: string;
  batchDescription: string;
  batchVerifyBtn: string;
  batchPlaceholder: string;
  batchMeatDensity: string;
  batchDurometer: string;
  batchApartmentCluster: string;
  batchVetClearance: string;

  // Culinary
  culinaryKicker: string;
  culinaryTitle: string;
  culinaryDescription: string;
  culinaryTestimonialTitle: string;

  // Certifications
  certKicker: string;
  certTitle: string;
  certDescription: string;
  certMangroveCommitment: string;
  certMangroveDesc: string;

  // Contact
  contactKicker: string;
  contactTitle: string;
  contactDescription: string;
  contactFormTitle: string;
  contactFullName: string;
  contactCompany: string;
  contactEmail: string;
  contactPhone: string;
  contactInquiryType: string;
  contactVolume: string;
  contactDestination: string;
  contactMessage: string;
  contactSubmitBtn: string;

  // Footer
  footerDesc: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    brandName: 'Dragon Crab Farming',
    brandTagline: 'Industrial-Scale Sustainable Crab Aquaculture & Global Live Export',

    navSpecies: 'Species & Grades',
    navRasTech: 'RAS Technology',
    navWholesale: 'Wholesale Estimator',
    navTraceability: 'Batch Traceability',
    navCertifications: 'Certifications',
    navTelemetry: 'Live Telemetry',
    navRequestQuote: 'Request Wholesale Quote',
    navQuote: 'Quote',

    heroKickerAquaculture: 'Commercial Crab Aquaculture',
    heroKickerRas: 'Vertical RAS Biocell Technology',
    heroKickerAirfreight: 'Worldwide Live Airfreight',
    heroTitle: 'Industrial-Scale Sustainable Crab Aquaculture & Global Live Export',
    heroDescription: 'Dragon Crab Farming operates high-density vertical Recirculating Aquaculture Systems (RAS), raising premium giant mud crabs and synchronized soft-shell crabs in zero-chemical, biosecure biocell apartments. We supply top-tier international seafood distributors and luxury dining groups with guaranteed live delivery.',
    heroCtaCalculate: 'Calculate Wholesale Freight & Pricing',
    heroCtaTech: 'Explore RAS Biocell Engineering',
    heroTrustZeroAntibiotics: 'Zero Antibiotics & Zero Prophylactics',
    heroTrustColdChain: 'Cold-Chain Live Delivery to 28 Air Cargo Hubs',
    heroTrustHaccp: 'HACCP & ASC Stewardship Standard',
    heroProofTitle: 'Verified Production Metrics',
    heroProofBiocells: '48,000+',
    heroProofBiocellsDesc: 'Vertical RAS Biocells in Active Operation',
    heroProofLiveArrival: '98.4%',
    heroProofLiveArrivalDesc: 'Guaranteed Live Arrival Across Global Airfreight',
    heroProofMeatYield: '92%–96%',
    heroProofMeatYieldDesc: 'Average Meat Fullness in Grade-A Kings',
    heroProofYearRound: '365 Days',
    heroProofYearRoundDesc: 'Predictable Supply Unaffected by Monsoons',
    heroNextDispatch: 'Next Available Export Dispatch',
    heroReserveBatch: 'Reserve Batch',

    telemetryKicker: 'Real-Time Biosecurity & Water Quality Monitoring',
    telemetryTitle: 'Active Aquaculture System Telemetry',
    telemetrySalinity: 'Salinity',
    telemetrySalinityNote: 'Mangrove brackish range',
    telemetryOxygen: 'Dissolved Oxygen',
    telemetryOxygenNote: '112% Hyper-aerated',
    telemetryTemp: 'Temperature',
    telemetryTempNote: 'Thermal climate locked',
    telemetryPh: 'Acidity / pH',
    telemetryPhNote: 'Calcite buffer balance',
    telemetryAmmonia: 'Ammonia (TAN)',
    telemetryAmmoniaNote: 'Biofiltration clearance',
    telemetryFlow: 'Recirculation',
    telemetryStatus: 'Status',
    telemetrySectorHard: 'Sector A: Hard-Shell',
    telemetrySectorRoe: 'Sector B: Roe Coral',
    telemetrySectorSoft: 'Sector C: Soft-Shell',
    telemetryFootnote: 'Automated sensor logs calibrated every 15 minutes to ASTM D1429 standards.',

    catalogKicker: 'Commercial Species & Grading Catalog',
    catalogTitle: 'Export & Domestic Crustacean Inventory',
    catalogDescription: 'Every specimen is raised within our controlled vertical apartment ecosystem, ensuring full claw integrity, zero mud off-flavors, and rigorously measured meat fullness.',
    catalogFilterAll: 'All Grades',
    catalogFilterKings: 'Giant Mud Kings',
    catalogFilterRoe: 'Imperial Roe Females',
    catalogFilterSoft: 'Soft-Shell Crabs',
    catalogFilterSeedlings: 'Hatchery Seedlings',
    catalogFobPrice: 'FOB Price',
    catalogMeatYield: 'Meat Fullness Index',
    catalogHardness: 'Carapace Hardness',
    catalogInspectBtn: 'Inspect Specs',
    catalogQuoteBtn: 'Build Quote',

    chartKicker: 'D3 Commercial Aquaculture Market Intelligence',
    chartTitle: 'Historical Crustacean Price Fluctuations',
    chartDescription: 'Quarterly and monthly wholesale trends across RAS harvest cycles, monsoon supply bans, and festival peaks.',
    chartToggleSeries: 'Toggle Series:',
    chartAuditedSpot: 'Audited Spot',
    chartMarketEvent: 'Market Event',
    chartBaselineGrade: 'Active Baseline Grade',
    chartSpotRate: 'Current Market Spot Rate',
    chartRange: 'Historical 18M Range',
    chartVolatility: 'Supply Volatility Index',
    chartVolatilityNote: 'Indoor RAS protects from 45% wild swings',

    techKicker: 'Aquaculture Engineering & RAS Infrastructure',
    techTitle: 'Next-Generation Vertical Crab Apartments',
    techDescription: 'We eliminated the primary bottlenecks of traditional crab farming—cannibalism, water degradation, and seasonal mortality—through computerized biosecure recirculating biocells.',
    techTabArchitecture: 'System Architecture',
    techTabComparison: 'RAS vs. Traditional Ponds',
    techBiocellCaption: 'Each modular apartment unit features continuous directional laminar flow, isolated waste evacuator, and optical molting reflectance monitoring.',

    calcKicker: 'B2B Commercial Procurement Suite',
    calcTitle: 'Live Consignment & Freight Calculator',
    calcDescription: 'Instant indicative CIF & FOB pricing with transparent freight, packaging, and 5% GST across Indian domestic reefer routes and international air cargo corridors.',
    calcStepGrade: '01. Select Specimen Grade',
    calcStepWeight: '02. Order Volume (kg)',
    calcStepDestination: '03. Destination Corridor',
    calcStepPackaging: '04. Cold-Chain Packaging',
    calcCardTitle: 'Estimated Landed Total',
    calcTotalEstimated: 'Total Landed Amount',
    calcSubmitRfp: 'Submit Formal RFP with This Estimate',
    calcLiveGuarantee: 'Live Arrival Guarantee',

    batchKicker: 'Biosecurity & Cold-Chain Chain of Custody',
    batchTitle: 'Batch Traceability & Veterinary Inspection Logs',
    batchDescription: 'Every shipment of Dragon Crab is tied to an immutable harvest record. Enter your box QR code or batch voucher to audit water parameters, shell durometer tests, and health clearance certificates.',
    batchVerifyBtn: 'Verify Record',
    batchPlaceholder: 'Enter Batch ID (e.g. DCF-2026-B84)...',
    batchMeatDensity: 'Ultrasound Meat Density',
    batchDurometer: 'Shore D Carapace Hardness',
    batchApartmentCluster: 'Apartment Housing Cluster',
    batchVetClearance: 'Govt. Veterinary Clearance',

    culinaryKicker: 'Gastronomy & Culinary Performance',
    culinaryTitle: 'Engineered for World-Class Seafood Gastronomy',
    culinaryDescription: 'Wild and earthen pond mud crabs frequently suffer from inconsistent shell meat fill and muddy geosmin off-flavors caused by anaerobic bottom silt. Our purified RAS water guarantees sweet, pristine, oceanic sweetness in every claw.',
    culinaryTestimonialTitle: 'Commercial Buyers & Head Chefs on Dragon Crab Performance',

    certKicker: 'Quality Assurance & Global Accreditations',
    certTitle: 'Certified to Highest Global Seafood Standards',
    certDescription: 'Our vertical aquaculture systems exceed traditional wild fishery and pond aquaculture benchmarks for environmental preservation, traceability, and consumer health.',
    certMangroveCommitment: 'Zero Wild Mangrove Deforestation Policy',
    certMangroveDesc: 'Unlike traditional pond operators who clear sensitive coastal mangrove ecosystems, our vertical indoor bio-apartments occupy 1/100th of the physical footprint and restore native mangrove wetlands through active corporate conservation grants.',

    contactKicker: 'Commercial Partnerships & Turnkey Engineering',
    contactTitle: 'Partner with Dragon Crab Farming',
    contactDescription: 'Whether you need dedicated weekly live crab export shipments for luxury hospitality or wish to deploy our proprietary vertical RAS bio-apartments in your region, our trade directors are ready to assist.',
    contactFormTitle: 'Commercial RFP & Consultation Request',
    contactFullName: 'Full Name *',
    contactCompany: 'Company / Restaurant Name *',
    contactEmail: 'Corporate Email *',
    contactPhone: 'Direct Phone / WhatsApp',
    contactInquiryType: 'Inquiry Type',
    contactVolume: 'Estimated Monthly Consignment Volume',
    contactDestination: 'Destination Airport / City',
    contactMessage: 'Specific Grade Preferences & Delivery Notes',
    contactSubmitBtn: 'Transmit Commercial RFP',

    footerDesc: 'Industrial-scale sustainable crustacean aquaculture. Engineering high-density vertical Recirculating Aquaculture Systems (RAS) to deliver export-grade live mangrove mud crabs and soft-shell crabs globally with zero environmental destruction.',
    footerRights: 'Dragon Crab Farming Aquaculture Co., Ltd. All commercial rights reserved.',
  },

  zh: {
    brandName: '龍蟹水產 (Dragon Crab)',
    brandTagline: '工業級可持續紅蟳養殖 · 循環水立體蟹公寓 · 全球鮮活空運直達',

    navSpecies: '品種與規格等級',
    navRasTech: 'RAS循環水科技',
    navWholesale: '批發空運試算',
    navTraceability: '批次追溯檢驗',
    navCertifications: '國際權威認證',
    navTelemetry: '實時水質遙測',
    navRequestQuote: '獲取大宗批發報價',
    navQuote: '詢價',

    heroKickerAquaculture: '商用青蟹循環水養殖',
    heroKickerRas: '立體生物單元蟹公寓技術',
    heroKickerAirfreight: '全球低溫休眠空運出口',
    heroTitle: '工業化可持續青蟹養殖與全球鮮活出口',
    heroDescription: '龍蟹水產採用高密度垂直循環水養殖系統 (RAS)，在無化學添加、生物安全隔離的立體蟹公寓中培育特級巨型青蟹（紅蟳）與同步脫殼軟殼蟹。我們為全球米其林餐廳、五星酒店及大型海產批發商提供鮮活到港保障。',
    heroCtaCalculate: '計算批發空運及CIF/FOB報價',
    heroCtaTech: '探索立體生物公寓工程技術',
    heroTrustZeroAntibiotics: '零抗生素 · 零化學預防藥物',
    heroTrustColdChain: '冷鏈休眠直達全球28個航空貨運樞紐',
    heroTrustHaccp: '符合HACCP與ASC國際負責任水產標準',
    heroProofTitle: '驗證生產關鍵指標',
    heroProofBiocells: '48,000+',
    heroProofBiocellsDesc: '在運垂直RAS生物公寓單元',
    heroProofLiveArrival: '98.4%',
    heroProofLiveArrivalDesc: '全球空運鮮活抵達保證率',
    heroProofMeatYield: '92%–96%',
    heroProofMeatYieldDesc: '特級公蟹平均蟹肉飽滿度',
    heroProofYearRound: '365天',
    heroProofYearRoundDesc: '不受季風影響的全年穩定供應',
    heroNextDispatch: '即將起運批次',
    heroReserveBatch: '預約該批次',

    telemetryKicker: '實時生物安全與水質參數監控',
    telemetryTitle: '養殖中心水質在線遙測系統',
    telemetrySalinity: '鹽度 (Salinity)',
    telemetrySalinityNote: '紅樹林鹹淡水最佳區間',
    telemetryOxygen: '溶解氧 (DO)',
    telemetryOxygenNote: '112% 超飽和微氣泡增氧',
    telemetryTemp: '水溫 (Temp)',
    telemetryTempNote: '恆溫氣候控制鎖定',
    telemetryPh: '酸鹼度 (pH)',
    telemetryPhNote: '方解石緩衝平衡',
    telemetryAmmonia: '總氨氮 (TAN)',
    telemetryAmmoniaNote: '生物過濾器即時清除',
    telemetryFlow: '循環水量',
    telemetryStatus: '狀態',
    telemetrySectorHard: 'A區：硬殼公蟹單元',
    telemetrySectorRoe: 'B區：紅蟳母蟹脂質育肥',
    telemetrySectorSoft: 'C區：智能脫殼軟殼蟹',
    telemetryFootnote: '自動傳感器節點每15分鐘依據ASTM D1429標準進行自動校準。',

    catalogKicker: '商用青蟹品級與出口目錄',
    catalogTitle: '頂級食用青蟹與育苗現貨名錄',
    catalogDescription: '每一隻青蟹均在獨立隔離的生物艙中生活，杜絕互相殘食，保證十肢完整無損、肉質無泥腥雜味、蟹肉飽滿度極高。',
    catalogFilterAll: '所有規格',
    catalogFilterKings: '特級巨型公蟹 (XL)',
    catalogFilterRoe: '特級滿膏母蟹 (紅蟳)',
    catalogFilterSoft: '同步脫殼軟殼蟹',
    catalogFilterSeedlings: 'SPF健康蟹苗',
    catalogFobPrice: 'FOB離岸價',
    catalogMeatYield: '蟹肉飽滿度指數',
    catalogHardness: '甲殼硬度等級',
    catalogInspectBtn: '技術檢驗報告',
    catalogQuoteBtn: '生成正式報價',

    chartKicker: 'D3 水產大宗期貨與現貨情報',
    chartTitle: '青蟹歷史價格波動趨勢圖 (D3)',
    chartDescription: '追蹤過去18個月在季風休漁期、中秋、農曆新年等旺季的產地批發價格走勢。',
    chartToggleSeries: '切換品種折線：',
    chartAuditedSpot: '審核現貨價',
    chartMarketEvent: '市場行情事件',
    chartBaselineGrade: '當前分析基準品級',
    chartSpotRate: '實時市場現貨價',
    chartRange: '歷史18個月價格波動區間',
    chartVolatility: '市場供應波動率',
    chartVolatilityNote: '室內RAS系統可避免野生捕撈高達45%的劇烈波動',

    techKicker: '水產工程學與RAS循環水架構',
    techTitle: '新一代立體垂直蟹公寓系統',
    techDescription: '傳統土塘養殖面臨嚴重的殘食互咬（損失高達50%）與水質惡化。我們透過微濾鼓網、流化床生化過濾與單艙隔離徹底解決此痛點。',
    techTabArchitecture: '系統架構詳解',
    techTabComparison: 'RAS與傳統土塘對比',
    techBiocellCaption: '每個模組化公寓艙均配備連續定向層流、獨立排污滑道以及紅外脫殼光學傳感監測。',

    calcKicker: 'B2B商用大宗採購系統',
    calcTitle: '鮮活空運與冷鏈運費實時計算器',
    calcDescription: '即時試算到達香港、新加坡、東京、杜拜及印度國內冷藏卡車路線的CIF/FOB成本，含專用低溫休眠箱與檢驗檢疫費用。',
    calcStepGrade: '01. 選擇青蟹品種規格',
    calcStepWeight: '02. 訂購批次重量 (kg)',
    calcStepDestination: '03. 目的航點/集散冷庫',
    calcStepPackaging: '04. 低溫冷鏈包裝方式',
    calcCardTitle: '預估到港總金額',
    calcTotalEstimated: 'CIF到港總費用',
    calcSubmitRfp: '以此估算提交正式採購意向',
    calcLiveGuarantee: '鮮活成活率保證',

    batchKicker: '生物安全與全程冷鏈追溯體系',
    batchTitle: '出水批次溯源與獸醫檢疫記錄',
    batchDescription: '每一箱龍蟹均帶有不可篡改的唯一批次條碼。輸入箱號即可核驗超聲波飽滿度測試合格率、出水水質日誌及官方出口衛生證書。',
    batchVerifyBtn: '核驗批次',
    batchPlaceholder: '輸入批次號 (例如 DCF-2026-B84)...',
    batchMeatDensity: '超聲波肌肉充盈度',
    batchDurometer: '邵氏D甲殼硬度值',
    batchApartmentCluster: '養殖生物單元塔號',
    batchVetClearance: '官方動物衛生檢驗編號',

    culinaryKicker: '頂級美饌與廚藝實測表現',
    culinaryTitle: '為星級名廚與高端海鮮盛宴量身定制',
    culinaryDescription: '野生及土塘青蟹常因池底淤泥厭氧菌產生土腥味(Geosmin)。龍蟹水產經72小時純淨深層過濾海水清胃淨水，肉質自帶純淨清甜甘美海味。',
    culinaryTestimonialTitle: '全球名廚與進口商真實評價',

    certKicker: '質量保證體系與全球標準認證',
    certTitle: '榮獲國際最高水產生態安全認證',
    certDescription: '全流程嚴格遵循Codex食品安全標準，杜絕抗生素，零破壞野生紅樹林，確保高端餐飲安全。',
    certMangroveCommitment: '零毀林承諾與紅樹林生態保護政策',
    certMangroveDesc: '與傳統推平紅樹林建造土塘的模式不同，我們的立體室內系統佔地僅為傳統模式的1%，並持續出資反哺天然紅樹林保護區。',

    contactKicker: '商業合作與整廠交鑰匙工程',
    contactTitle: '與龍蟹水產建立長期供應鏈合作',
    contactDescription: '無論您是採購每週直飛的鮮活特級青蟹，或是希望在您所在國家地區投資引進整套室內立體蟹公寓RAS專利技術，我們的全球貿易總監將竭誠為您服務。',
    contactFormTitle: '商業採購詢價單 (RFP)',
    contactFullName: '聯絡人姓名 *',
    contactCompany: '企業/餐廳名稱 *',
    contactEmail: '商務電子信箱 *',
    contactPhone: '電話 / WhatsApp',
    contactInquiryType: '意向合作類型',
    contactVolume: '預估每月採購量',
    contactDestination: '目的機場 / 城市冷庫',
    contactMessage: '規格要求與航班船期備註',
    contactSubmitBtn: '傳送商務採購詢盤',

    footerDesc: '工業級可持續甲殼類水產生態養殖。研發高密度垂直循環水養殖系統(RAS)，向全球頂級市場常年供應無污染的高品質鮮活青蟹與軟殼蟹。',
    footerRights: '龍蟹水產科技股份有限公司 (Dragon Crab Farming Co., Ltd.) 版權所有。',
  },

  ja: {
    brandName: 'ドラゴンクラブ (Dragon Crab)',
    brandTagline: '次世代循環式陸上養殖 · 立体カニマンション · 全球活蟹直輸',

    navSpecies: '取扱品種・等級',
    navRasTech: 'RAS養殖技術',
    navWholesale: '卸売運賃試算',
    navTraceability: 'ロット追跡確認',
    navCertifications: '国際規格認証',
    navTelemetry: '水質テレメトリ',
    navRequestQuote: '卸売見積を依頼',
    navQuote: '見積',

    heroKickerAquaculture: '商用ノコギリガザミ陸上養殖',
    heroKickerRas: '垂直RASバイオセルマンション',
    heroKickerAirfreight: '世界主要空港へ低温休眠空輸',
    heroTitle: '持続可能な工業規模のノコギリガザミ養殖と世界活蟹輸出',
    heroDescription: 'ドラゴンクラブは高密度な垂直循環式陸上養殖システム（RAS）を採用し、完全隔離されたバイオセルマンションで抗生物質不使用の最高級ノコギリガザミおよびソフトシェルクラブを生産。星付き料亭や高級ホテルへ鮮度100%でお届けします。',
    heroCtaCalculate: '卸売空輸運賃・CIF見積を試算',
    heroCtaTech: 'バイオセル工学技術を見る',
    heroTrustZeroAntibiotics: '抗生物質・薬品完全無添加',
    heroTrustColdChain: '成田・羽田など世界28空港へ直送',
    heroTrustHaccp: 'HACCPおよびASC持続可能水産認証',
    heroProofTitle: '検証済み生産実績指標',
    heroProofBiocells: '48,000+',
    heroProofBiocellsDesc: '稼働中垂直RASセルマンション室数',
    heroProofLiveArrival: '98.4%',
    heroProofLiveArrivalDesc: '世界航空便における活蟹到着保証率',
    heroProofMeatYield: '92%–96%',
    heroProofMeatYieldDesc: '特級キングの平均身入り歩留まり',
    heroProofYearRound: '365日',
    heroProofYearRoundDesc: '季節天候に左右されない通年安定供給',
    heroNextDispatch: '次回出荷可能ロット',
    heroReserveBatch: 'ロットを予約する',

    telemetryKicker: '24時間水質およびバイオセキュリティ監視',
    telemetryTitle: '養殖施設リアルタイム水質テレメトリ',
    telemetrySalinity: '塩分濃度 (Salinity)',
    telemetrySalinityNote: 'マングローブ汽水適正範囲',
    telemetryOxygen: '溶存酸素量 (DO)',
    telemetryOxygenNote: '112% 過飽和エアレーション',
    telemetryTemp: '水温 (Temp)',
    telemetryTempNote: '通年最適温度ロック',
    telemetryPh: 'pH値 (Acidity)',
    telemetryPhNote: '方解石バッファー安定',
    telemetryAmmonia: 'アンモニア (TAN)',
    telemetryAmmoniaNote: '生物ろ過器即時分解クリア',
    telemetryFlow: '循環流量',
    telemetryStatus: '状態',
    telemetrySectorHard: 'A棟：ハードシェル雄蟹',
    telemetrySectorRoe: 'B棟：内子メス肥育棟',
    telemetrySectorSoft: 'C棟：脱皮検知ソフトシェル',
    telemetryFootnote: '自動センサーはASTM D1429規格に準拠し15分ごとに自動校正されます。',

    catalogKicker: '取扱品種規格およびグレーディング',
    catalogTitle: '最高峰ノコギリガザミ・種苗カタログ',
    catalogDescription: '各個体が個室マンションで肥育されるため足欠け・ハサミ傷が皆無。泥臭さがなく、極上の甘みと圧倒的な身詰まりを誇ります。',
    catalogFilterAll: '全等級',
    catalogFilterKings: '特大キングガザミ (XL)',
    catalogFilterRoe: '極上内子メス (紅蟳)',
    catalogFilterSoft: '同調脱皮ソフトシェル',
    catalogFilterSeedlings: 'SPF種苗ガザミ',
    catalogFobPrice: 'FOB価格',
    catalogMeatYield: '身入り率指数',
    catalogHardness: '甲羅硬度',
    catalogInspectBtn: '仕様書を確認',
    catalogQuoteBtn: '見積を作成',

    chartKicker: 'D3 水産大口市場価格インテリジェンス',
    chartTitle: 'ノコギリガザミ過去相場推移チャート (D3)',
    chartDescription: '禁漁期間、中秋節、旧正月などの繁忙期における月別・四半期別の卸売相場推移を視覚化。',
    chartToggleSeries: '表示銘柄を切替：',
    chartAuditedSpot: '監査済みスポット値',
    chartMarketEvent: '市場イベント',
    chartBaselineGrade: '現在選択中の基準等級',
    chartSpotRate: '現行スポット卸売価格',
    chartRange: '過去18ヶ月の価格レンジ',
    chartVolatility: '供給ボラティリティ指数',
    chartVolatilityNote: '天然物の45%激変に対し、RAS養殖は極めて安定',

    techKicker: '陸上養殖工学およびRASインフラ',
    techTitle: '次世代型バーティカル・クラブマンション',
    techDescription: '従来池養殖の最大課題である共食い（へい死率40〜60%）と泥底汚濁を、独立給排水・赤外線センサー付き個室マンションで克服。',
    techTabArchitecture: 'システム構造',
    techTabComparison: 'RASと従来養殖池の比較',
    techBiocellCaption: '層流給水、独立排泄物フラッシュ、脱皮自動赤外線検知カメラを備えたモジュール型セル。',

    calcKicker: 'B2B調達システム',
    calcTitle: '活蟹空輸運賃・総額シミュレーター',
    calcDescription: '成田・関空・羽田への直行空輸運賃、低温休眠EPS梱包費、通関検疫費を含むCIF総額を即座に試算できます。',
    calcStepGrade: '01. 品種・等級の選択',
    calcStepWeight: '02. 注文数量 (kg)',
    calcStepDestination: '03. 到着空港・配送先',
    calcStepPackaging: '04. 低温梱包仕様',
    calcCardTitle: '見積総額概算',
    calcTotalEstimated: 'CIF到着総額',
    calcSubmitRfp: 'この試算で正式見積を依頼',
    calcLiveGuarantee: '活蟹到着保証',

    batchKicker: '品質保証とコールドチェーン追跡',
    batchTitle: '出荷ロット追跡および公的衛生証明書',
    batchDescription: '出荷箱のQRコードまたはロット番号から、超音波身入り検査値、硬度値、検査証明書を照会できます。',
    batchVerifyBtn: 'ロット照会',
    batchPlaceholder: 'ロット番号を入力 (例: DCF-2026-B84)...',
    batchMeatDensity: '超音波身入り充足率',
    batchDurometer: 'ショアD甲羅硬度',
    batchApartmentCluster: '飼育マンション棟番号',
    batchVetClearance: '輸出水産動物検疫番号',

    culinaryKicker: '料理人のための最高峰品質基準',
    culinaryTitle: '世界の一流シェフが認める究極の旨味と肉質',
    culinaryDescription: '泥底池特有のゲオスミン（泥臭さ）を完全に排除。清浄な循環海水で72時間トリートメントされた身は純白で上品な甘味を湛えます。',
    culinaryTestimonialTitle: '世界のトップシェフ・輸入商社の声',

    certKicker: '環境認証と国際安全基準',
    certTitle: '国際最高水準の持続可能性認証',
    certDescription: 'ASC持続可能認証、HACCP、ISO 22000を取得し、抗生物質・薬品を一切使用していません。',
    certMangroveCommitment: 'マングローブ森林破壊ゼロ方針',
    certMangroveDesc: 'マングローブ林を伐採する従来池とは異なり、100分の1の設置面積で稼働。自然再生基金を支援しています。',

    contactKicker: '大口契約・プラント輸出',
    contactTitle: 'ドラゴンクラブとのパートナーシップ',
    contactDescription: '日本向け定期便のご相談から、独自の垂直RAS設備導入をご検討の企業様まで、専任デスクが日本語対応いたします。',
    contactFormTitle: '法人向け見積・商談依頼フォーム',
    contactFullName: 'ご担当者様氏名 *',
    contactCompany: '会社名 / 店舗名 *',
    contactEmail: '法人メールアドレス *',
    contactPhone: '電話番号',
    contactInquiryType: 'お問い合わせ種別',
    contactVolume: '想定月間仕入量',
    contactDestination: '納品先都市 / 空港',
    contactMessage: '等級のご希望・配送頻度など',
    contactSubmitBtn: '商談リクエストを送信',

    footerDesc: '工業規模の持続可能な甲殻類陸上養殖。垂直RAS（閉鎖循環式）技術により、環境負荷ゼロで最高品質の生きたノコギリガザミを世界中にお届けします。',
    footerRights: 'Dragon Crab Farming Aquaculture Co., Ltd. 無断転載を禁じます。',
  },

  ar: {
    brandName: 'دراغون كراب (Dragon Crab)',
    brandTagline: 'الاستزراع المائي الصناعي المستدام لسرطان البحر والتصدير الحي العالمي',

    navSpecies: 'الأصناف والرتب',
    navRasTech: 'تقنية RAS',
    navWholesale: 'حاسبة التصدير',
    navTraceability: 'تتبع الشحنات',
    navCertifications: 'الشهادات الدولية',
    navTelemetry: 'القياس الحيوي المباشر',
    navRequestQuote: 'طلب تسعير بالجملة',
    navQuote: 'عرض سعر',

    heroKickerAquaculture: 'الاستزراع التجاري المستدام لسرطان الطين',
    heroKickerRas: 'تقنية الشقق الحيوية العمودية RAS',
    heroKickerAirfreight: 'شحن جوي حي ومبرد إلى كافة أنحاء العالم',
    heroTitle: 'الاستزراع الصناعي المستدام لسرطان البحر والتصدير الحي عالي الجودة',
    heroDescription: 'تدير دراغون كراب أنظمة استزراع مائي رأسية ذات تدوير مغلق عالي الكثافة (RAS)، لتربية سرطان الطين العملاق الفاخر وسرطانات القشرة الرخوة في بيئة نقية تماماً بدون أي مضادات حيوية أو كيماويات.',
    heroCtaCalculate: 'حساب تكاليف الشحن الجوي والأسعار',
    heroCtaTech: 'استكشف هندسة شقق السرطان العمودية',
    heroTrustZeroAntibiotics: 'خالٍ تماماً من المضادات الحيوية والكيماويات',
    heroTrustColdChain: 'سلسلة تبريد حية تصل إلى دبي والدوحة والرياض',
    heroTrustHaccp: 'معتمد وفق معايير HACCP و ASC الدولية',
    heroProofTitle: 'مؤشرات الإنتاج المعتمدة',
    heroProofBiocells: '+48,000',
    heroProofBiocellsDesc: 'خلية حيوية عمودية نشطة في المحطة',
    heroProofLiveArrival: '98.4%',
    heroProofLiveArrivalDesc: 'نسبة وصول حي مضمونة عبر الشحن الجوي',
    heroProofMeatYield: '92%–96%',
    heroProofMeatYieldDesc: 'متوسط امتلاء اللحم في الصنف الملكي',
    heroProofYearRound: '365 يوماً',
    heroProofYearRoundDesc: 'إمداد متواصل على مدار السنة دون تأثر بالمواسم',
    heroNextDispatch: 'الشحنة الجوية القادمة المتاحة',
    heroReserveBatch: 'حجز الشحنة',

    telemetryKicker: 'المراقبة الحيوية المباشرة لجودة المياه وسلامة البيئة',
    telemetryTitle: 'بيانات القياس عن بُعد لأنظمة الاستزراع النشطة',
    telemetrySalinity: 'الملوحة (Salinity)',
    telemetrySalinityNote: 'نطاق أشجار القرم المثالي',
    telemetryOxygen: 'الأكسجين الذائب',
    telemetryOxygenNote: '112% تهوية فائقة التشبع',
    telemetryTemp: 'درجة الحرارة',
    telemetryTempNote: 'تحكم حراري دقيق ومغلق',
    telemetryPh: 'الحموضة / pH',
    telemetryPhNote: 'توازن كلسي مثالي',
    telemetryAmmonia: 'الأمونيا (TAN)',
    telemetryAmmoniaNote: 'تنقية بيولوجية فائقة',
    telemetryFlow: 'معدل التدوير',
    telemetryStatus: 'الحالة',
    telemetrySectorHard: 'القطاع أ: الذكور الصلبة',
    telemetrySectorRoe: 'القطاع ب: الإناث بالبطارخ الذهبية',
    telemetrySectorSoft: 'القطاع ج: القشرة الطرية المتزامنة',
    telemetryFootnote: 'تتم معايرة أجهزة الاستشعار آلياً كل 15 دقيقة وفق مواصفات ASTM D1429 العالمية.',

    catalogKicker: 'دليل الأصناف التجارية ودرجات التصدير',
    catalogTitle: 'مخزون القشريات الحية للتصدير الفاخر',
    catalogDescription: 'تتم تربية كل سلطعون في حجرة معزولة لمنع الافتراس، مما يضمن سلامة المخالب والأطراف تماماً وخلوها من طعم الطين المزعج.',
    catalogFilterAll: 'كافة الأصناف',
    catalogFilterKings: 'سرطان كينغ العملاق (XL)',
    catalogFilterRoe: 'إناث البطارخ الإمبراطورية',
    catalogFilterSoft: 'سرطان القشرة الطرية',
    catalogFilterSeedlings: 'زريعة مفرخات SPF',
    catalogFobPrice: 'سعر FOB',
    catalogMeatYield: 'مؤشر امتلاء اللحم',
    catalogHardness: 'صلابة الدرع',
    catalogInspectBtn: 'فحص المواصفات',
    catalogQuoteBtn: 'طلب تسعير',

    chartKicker: 'معلومات السوق الذكية بتقنية D3',
    chartTitle: 'التقلبات التاريخية لأسعار سرطان البحر',
    chartDescription: 'بيانات تفاعلية توضح اتجاهات الأسعار وحجم المعروض عبر المواسم وفترات الأعياد وحظر الصيد البحري.',
    chartToggleSeries: 'تبديل الأصناف:',
    chartAuditedSpot: 'السعر الفوري المعتمد',
    chartMarketEvent: 'حدث السوق',
    chartBaselineGrade: 'الصنف الأساسي المختار',
    chartSpotRate: 'سعر السوق الفوري الحالي',
    chartRange: 'نطاق الأسعار خلال 18 شهراً',
    chartVolatility: 'مؤشر تقلب الإمدادات',
    chartVolatilityNote: 'تحمي أنظمة RAS المغلقة من تقلبات الصيد البري البالغة 45%',

    techKicker: 'الهندسة المائية وبنية أنظمة RAS',
    techTitle: 'الجيل الجديد من شقق السرطان الرأسية',
    techDescription: 'قضينا تماماً على المشاكل التقليدية كالافتراس الذاتي وتدهور المياه عبر خلايا بيولوجية مبرمجة ومراقبة بحساسات بصرية.',
    techTabArchitecture: 'بنية النظام',
    techTabComparison: 'مقارنة أنظمة RAS بالأحواض الترابية',
    techBiocellCaption: 'كل حجرة مزودة بتدفق مائي طبقي مستمر ومستشعر ليزر بالأشعة تحت الحمراء لرصد الانسلاخ.',

    calcKicker: 'منصة مشتريات الشركات B2B',
    calcTitle: 'حاسبة الشحن الجوي وتكاليف التصدير المباشر',
    calcDescription: 'احسب أسعار CIF و FOB التقديرية الفورية لشحنات التصدير إلى دبي والدوحة والرياض ومطارات العالم بدقة وسرعة.',
    calcStepGrade: '01. اختر الصنف المطلوب',
    calcStepWeight: '02. كمية الشحنة (كجم)',
    calcStepDestination: '03. مطار الوصول / الوجهة',
    calcStepPackaging: '04. مواصفات التبريد',
    calcCardTitle: 'إجمالي التكلفة التقديرية',
    calcTotalEstimated: 'إجمالي CIF التقديري',
    calcSubmitRfp: 'إرسال طلب رسمي بناءً على هذا التقدير',
    calcLiveGuarantee: 'ضمان الوصول حي',

    batchKicker: 'الأمن الحيوي وسلسلة التتبع المعتمدة',
    batchTitle: 'تتبع الشحنات والشهادات الصحية والبيطرية',
    batchDescription: 'كل صندوق تصدير مرتبط بسجل حصاد رقمي مسجل. أدخل رقم الشحنة للتحقق من فحص الموجات فوق الصوتية والشهادة الصحية الرسمية.',
    batchVerifyBtn: 'التحقق من السجل',
    batchPlaceholder: 'أدخل رقم الشحنة (مثال: DCF-2026-B84)...',
    batchMeatDensity: 'كثافة اللحم بالموجات فوق الصوتية',
    batchDurometer: 'صلابة الدرع بمقياس Shore D',
    batchApartmentCluster: 'برج الشقق الحيوية',
    batchVetClearance: 'رقم الفحص البيطري الحكومي',

    culinaryKicker: 'الأداء في فن الطهي الراقي',
    culinaryTitle: 'مصمم خصيصاً لمطاعم المأكولات البحرية الراقية',
    culinaryDescription: 'الماء المفلتر بنسبة 100% يزيل مادة الجيوسمين الطينية المزعجة، ليمنح لحم السلطعون طعماً حلواً بحرياً فائق النقاء والنضارة.',
    culinaryTestimonialTitle: 'آراء كبار الطهاة ومستوردي المأكولات البحرية الفاخرة',

    certKicker: 'ضمان الجودة والاعتمادات العالمية',
    certTitle: 'معتمد وفق أعلى المعايير العالمية للأغذية البحرية',
    certDescription: 'أنظمتنا تتفوق على المصائد الطبيعية بضمانات خلو تامة من المضادات الحيوية والمحافظة على النظم البيئية الساحلية.',
    certMangroveCommitment: 'سياسة حماية غابات القرم (المانغروف)',
    certMangroveDesc: 'على عكس المزارع التقليدية التي تدمر غابات القرم، تشغل مرافقنا الرأسية 1% فقط من المساحة الأرضية مع دعم مشاريع الاستزراع البيئي.',

    contactKicker: 'الشراكات التجارية والمشاريع المتكاملة',
    contactTitle: 'كن شريكاً لـ دراغون كراب',
    contactDescription: 'سواء كنت ترغب في توريد شحنات حية منتظمة لفنادقك ومطاعمك في الشرق الأوسط، أو نقل تقنية RAS إلى منشأتك، فريقنا جاهز للتواصل.',
    contactFormTitle: 'طلب عرض أسعار تجاري رسمي (RFP)',
    contactFullName: 'الاسم الكامل *',
    contactCompany: 'اسم الشركة أو المطعم *',
    contactEmail: 'البريد الإلكتروني التجاري *',
    contactPhone: 'الهاتف / واتساب',
    contactInquiryType: 'نوع الطلب',
    contactVolume: 'الكمية الشهرية المتوقعة',
    contactDestination: 'المدينة / مطار الوصول',
    contactMessage: 'تفاصيل الأصناف وملاحظات التوصيل',
    contactSubmitBtn: 'إرسال طلب التسعير',

    footerDesc: 'استزراع صناعي مستدام للقشريات البحرية. تشغيل أنظمة استزراع مائي رأسية مغلقة لتصدير سرطان الطين الحي وسلطعون القشرة الطرية بجودة عالمية وبدون إضرار بالبيئة.',
    footerRights: 'شركة دراغون كراب للاستزراع المائي المحدودة. جميع الحقوق محفوظة.',
  },

  hi: {
    brandName: 'ड्रैगन क्रैब फार्मिंग (Dragon Crab)',
    brandTagline: 'औद्योगिक-स्तरीय टिकाऊ केकड़ा जलीय कृषि और वैश्विक लाइव निर्यात',

    navSpecies: 'प्रजातियां व ग्रेड',
    navRasTech: 'आरएएस तकनीक',
    navWholesale: 'थोक फ्रेट कैलकुलेटर',
    navTraceability: 'बैच ट्रेसिबिलिटी',
    navCertifications: 'प्रमाणपत्र',
    navTelemetry: 'लाइव टेलीमेट्री',
    navRequestQuote: 'थोक कोटेशन मांगें',
    navQuote: 'कोटेशन',

    heroKickerAquaculture: 'व्यावसायिक मड क्रैब एक्वाकल्चर',
    heroKickerRas: 'वर्टिकल आरएएस बायोसेल तकनीक',
    heroKickerAirfreight: 'विश्वव्यापी लाइव एयरफ्रेट व रीफर डिलीवरी',
    heroTitle: 'औद्योगिक-स्तरीय टिकाऊ केकड़ा जलीय कृषि और वैश्विक लाइव निर्यात',
    heroDescription: 'ड्रैगन क्रैब फार्मिंग उच्च-घनत्व वाले रीसर्क्युलेटिंग एक्वाकल्चर सिस्टम (RAS) का संचालन करता है, जिसमें शून्य-रसायन और बायोसिक्योर बायोसेल अपार्टमेंट में प्रीमियम मड क्रैब्स और सॉफ्ट-शेल केकड़े तैयार किए जाते हैं।',
    heroCtaCalculate: 'थोक माल ढुलाई और मूल्य की गणना करें',
    heroCtaTech: 'आरएएस बायोसेल इंजीनियरिंग देखें',
    heroTrustZeroAntibiotics: 'शून्य एंटीबायोटिक्स व शून्य रसायन',
    heroTrustColdChain: 'भारत और वैश्विक 28 हवाई अड्डों पर लाइव डिलीवरी',
    heroTrustHaccp: 'HACCP और ASC वैश्विक मानकों द्वारा प्रमाणित',
    heroProofTitle: 'सत्यापित उत्पादन मीट्रिक्स',
    heroProofBiocells: '48,000+',
    heroProofBiocellsDesc: 'सक्रिय वर्टिकल आरएएस बायोसेल अपार्टमेंट',
    heroProofLiveArrival: '98.4%',
    heroProofLiveArrivalDesc: 'वैश्विक एयरफ्रेट में गारंटीड लाइव आगमन दर',
    heroProofMeatYield: '92%–96%',
    heroProofMeatYieldDesc: 'ग्रेड-ए किंग्स में औसत मीट फुलनेस',
    heroProofYearRound: '365 दिन',
    heroProofYearRoundDesc: 'मानसून या मौसम से अप्रभावित स्थिर आपूर्ति',
    heroNextDispatch: 'अगला उपलब्ध निर्यात प्रेषण',
    heroReserveBatch: 'बैच आरक्षित करें',

    telemetryKicker: 'रीयल-टाइम बायोसिक्योरिटी और जल गुणवत्ता निगरानी',
    telemetryTitle: 'सक्रिय एक्वाकल्चर सिस्टम टेलीमेट्री',
    telemetrySalinity: 'लवणता (Salinity)',
    telemetrySalinityNote: 'मैंग्रोव खारे पानी की आदर्श सीमा',
    telemetryOxygen: 'घुलित ऑक्सीजन (DO)',
    telemetryOxygenNote: '112% हाइपर-एरेटेड माइक्रो-बबल्स',
    telemetryTemp: 'तापमान (Temp)',
    telemetryTempNote: 'थर्मल क्लाइमेट नियंत्रित',
    telemetryPh: 'पीएच स्तर (pH)',
    telemetryPhNote: 'कैल्साइट बफर संतुलन',
    telemetryAmmonia: 'अमोनिया (TAN)',
    telemetryAmmoniaNote: 'बायोफिल्ट्रेशन द्वारा तुरंत शुद्ध',
    telemetryFlow: 'रीसर्क्युलेशन प्रवाह',
    telemetryStatus: 'स्थिति',
    telemetrySectorHard: 'सेक्टर ए: हार्ड-शेल मेल',
    telemetrySectorRoe: 'सेक्टर बी: रो (अंडे) वाली मादा',
    telemetrySectorSoft: 'सेक्टर सी: सॉफ्ट-शेल क्रैब',
    telemetryFootnote: 'सेंसर लॉग ASTM D1429 मानकों के तहत प्रत्येक 15 मिनट में स्वचालित रूप से कैलिब्रेट होते हैं।',

    catalogKicker: 'व्यावसायिक प्रजातियां और ग्रेडिंग कैटलॉग',
    catalogTitle: 'निर्यात व घरेलू क्रस्टेशियन सूची',
    catalogDescription: 'प्रत्येक केकड़े को अलग व्यक्तिगत अपार्टमेंट में पाला जाता है, जिससे आपस में लड़ाई नहीं होती, पूरे पंजे सुरक्षित रहते हैं और कीचड़ की गंध पूरी तरह समाप्त होती है।',
    catalogFilterAll: 'सभी ग्रेड',
    catalogFilterKings: 'विशालकाय मड किंग्स (XL)',
    catalogFilterRoe: 'शाही रो (अंडे) वाली मादा',
    catalogFilterSoft: 'सिंक्रोनाइज़्ड सॉफ्ट-शेल',
    catalogFilterSeedlings: 'हैचरी क्रैबलेट्स (बीज)',
    catalogFobPrice: 'FOB मूल्य',
    catalogMeatYield: 'मीट फुलनेस इंडेक्स',
    catalogHardness: 'कवच (शेल) कठोरता',
    catalogInspectBtn: 'विनिर्देश देखें',
    catalogQuoteBtn: 'कोटेशन बनाएं',

    chartKicker: 'D3 व्यावसायिक एक्वाकल्चर मार्केट इंटेलिजेंस',
    chartTitle: 'ऐतिहासिक केकड़ा मूल्य उतार-चढ़ाव (D3)',
    chartDescription: 'आरएएस फसल चक्र, मानसून प्रतिबंध और त्योहारों के दौरान त्रैमासिक व मासिक थोक मूल्यों का लाइव डेटा चार्ट।',
    chartToggleSeries: 'ग्रेड रेखाएं बदलें:',
    chartAuditedSpot: 'ऑडिटेड स्पॉट भाव',
    chartMarketEvent: 'बाजार घटना',
    chartBaselineGrade: 'सक्रिय आधार ग्रेड',
    chartSpotRate: 'वर्तमान स्पॉट रेट',
    chartRange: 'ऐतिहासिक 18 महीने की सीमा',
    chartVolatility: 'आपूर्ति अस्थिरता सूचकांक',
    chartVolatilityNote: 'आरएएस सिस्टम 45% जंगली मूल्य झटकों से बचाता है',

    techKicker: 'एक्वाकल्चर इंजीनियरिंग और आरएएस ढांचा',
    techTitle: 'नेक्स्ट-जेनरेशन वर्टिकल क्रैब अपार्टमेंट्स',
    techDescription: 'पारंपरिक तालाबों में आपसी लड़ाई से होने वाले 50% नुकसान और जल प्रदूषण को हमने बंद-लूप बायोसेल और ड्रम फिल्टर से पूरी तरह समाप्त कर दिया है।',
    techTabArchitecture: 'सिस्टम आर्किटेक्चर',
    techTabComparison: 'आरएएस बनाम पारंपरिक तालाब',
    techBiocellCaption: 'प्रत्येक मॉड्यूलर सेल में निरंतर लैमिनार जल प्रवाह, स्वतंत्र अपशिष्ट निकासी और इंफ्रारेड मोल्टिंग सेंसर लगा है।',

    calcKicker: 'B2B व्यावसायिक खरीद मंच',
    calcTitle: 'लाइव फ्रेट और लागत कैलकुलेटर (₹ INR)',
    calcDescription: 'चेन्नई, विशाखापट्टनम, बेंगलुरु, दिल्ली, मुंबई और अंतरराष्ट्रीय हब के लिए तुरंत पारदर्शी CIF और FOB कोटेशन तैयार करें।',
    calcStepGrade: '01. प्रजाति व ग्रेड चुनें',
    calcStepWeight: '02. ऑर्डर का वजन (किग्रा)',
    calcStepDestination: '03. गंतव्य शहर / हवाई अड्डा',
    calcStepPackaging: '04. कोल्ड-चेन पैकेजिंग',
    calcCardTitle: 'अनुमानित कुल लागत',
    calcTotalEstimated: 'कुल CIF राशि (जीएसटी सहित)',
    calcSubmitRfp: 'इस अनुमान के साथ औपचारिक RFP भेजें',
    calcLiveGuarantee: 'जीवित आगमन गारंटी',

    batchKicker: 'बायोसिक्योरिटी और कोल्ड-चेन कस्टडी',
    batchTitle: 'बैच ट्रेसिबिलिटी और पशु चिकित्सा निरीक्षण',
    batchDescription: 'प्रत्येक शिपमेंट एक अपरिवर्तनीय डिजिटल हार्वेस्ट रिकॉर्ड से जुड़ा है। अल्ट्रासाउंड मीट टेस्ट और स्वास्थ्य प्रमाणपत्र देखने के लिए बैच आईडी दर्ज करें।',
    batchVerifyBtn: 'रिकॉर्ड सत्यापित करें',
    batchPlaceholder: 'बैच आईडी दर्ज करें (उदा. DCF-2026-B84)...',
    batchMeatDensity: 'अल्ट्रासाउंड मीट डेंसिटी',
    batchDurometer: 'शोर-डी शेल हार्डनेस',
    batchApartmentCluster: 'बायोसेल टॉवर क्लस्टर',
    batchVetClearance: 'सरकारी पशु चिकित्सा मंजूरी संख्या',

    culinaryKicker: 'पाककला प्रदर्शन और शेफ समीक्षा',
    culinaryTitle: 'विश्व स्तरीय समुद्री व्यंजनों के लिए विशेष रूप से तैयार',
    culinaryDescription: 'हमारे स्वच्छ पानी में 72 घंटे के शुद्धिकरण के बाद केकड़े का मांस मोती जैसा सफेद, मीठा और समुद्र की प्राकृतिक सुगंध से भरपूर होता है।',
    culinaryTestimonialTitle: 'व्यावसायिक खरीदारों और प्रमुख शेफ की राय',

    certKicker: 'गुणवत्ता आश्वासन और वैश्विक मान्यताएं',
    certTitle: 'सर्वोच्च वैश्विक समुद्री खाद्य मानकों द्वारा प्रमाणित',
    certDescription: 'शून्य एंटीबायोटिक, पूर्ण ट्रेसिबिलिटी और तटीय मैंग्रोव संरक्षण के साथ खाद्य सुरक्षा के उच्चतम मानकों का पालन।',
    certMangroveCommitment: 'शून्य मैंग्रोव वन कटाई नीति',
    certMangroveDesc: 'पारंपरिक तालाबों के विपरीत जो मैंग्रोव वनों को नष्ट करते हैं, हमारी वर्टिकल इनडोर प्रणाली केवल 1% भूमि का उपयोग करती है और वनों का संरक्षण करती है।',

    contactKicker: 'व्यावसायिक साझेदारी और टर्नकी समाधान',
    contactTitle: 'ड्रैगन क्रैब फार्मिंग के साथ साझेदारी करें',
    contactDescription: 'चाहे आपको अपने होटल व रेस्तरां के लिए साप्ताहिक लाइव केकड़ा शिपमेंट की आवश्यकता हो या आप अपने क्षेत्र में हमारे आरएएस क्रैब अपार्टमेंट स्थापित करना चाहते हों, हमारी टीम तैयार है।',
    contactFormTitle: 'व्यावसायिक RFP और कोटेशन अनुरोध',
    contactFullName: 'पूरा नाम *',
    contactCompany: 'कंपनी / रेस्तरां का नाम *',
    contactEmail: 'कॉर्पोरेट ईमेल *',
    contactPhone: 'फोन / व्हाट्सएप',
    contactInquiryType: 'पूछताछ का प्रकार',
    contactVolume: 'अनुमानित मासिक मात्रा',
    contactDestination: 'गंतव्य शहर / हवाई अड्डा',
    contactMessage: 'ग्रेड प्राथमिकताएं और डिलीवरी विवरण',
    contactSubmitBtn: 'व्यावसायिक RFP भेजें',

    footerDesc: 'औद्योगिक-स्तरीय टिकाऊ क्रस्टेशियन जलीय कृषि। शून्य पर्यावरणीय क्षति के साथ वैश्विक स्तर पर निर्यात-ग्रेड लाइव मड केकड़े और सॉफ्ट-शेल केकड़े प्रदान करने के लिए वर्टिकल आरएएस का संचालन।',
    footerRights: 'ड्रैगन क्रैब फार्मिंग एक्वाकल्चर कंपनी लिमिटेड। सर्वाधिकार सुरक्षित।',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentOption: LanguageOption;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Load persisted language from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dragon_crab_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync document direction and language code
  useEffect(() => {
    const option = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    if (option) {
      document.documentElement.dir = option.dir;
      document.documentElement.lang = option.code;
    }
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('dragon_crab_lang', lang);
    } catch {
      // ignore
    }
  };

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isRtl = currentOption.dir === 'rtl';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentOption,
        t,
        isRtl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
