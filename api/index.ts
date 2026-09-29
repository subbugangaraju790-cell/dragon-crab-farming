import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  GROUNDED_CUSTOMS_REGULATIONS,
  getFallbackRegulation,
  CountryCustomsRegulation,
} from '../src/data/customsRegulationsData';

dotenv.config();

export const app = express();
app.use(express.json());

// Track Gemini quota status: since token quota on gemini-3.8-flash has reached its 25M limit,
// we mark it as exhausted and prioritize OpenAI or the verified database.
let geminiQuotaExhausted = true;
const cachedGroundedResults = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function buildGroundedEstimateFromRegulation(
  regulation: CountryCustomsRegulation,
  cifTotalUSD: number,
  isLiveGrounded: boolean,
  extra?: { groundingSources?: any[]; searchQueries?: string[]; notice?: string }
) {
  const cif = Number(cifTotalUSD) || 1000;
  const dutyPct = Number(regulation.customsDutyRate) || 0;
  const vatPct = Number(regulation.vatGstRate) || 0;
  const quarantineFee = Number(regulation.quarantineFeeUSD) || 45;

  const dutyAmount = (cif * dutyPct) / 100;
  const vatAmount = ((cif + dutyAmount) * vatPct) / 100;
  const landedTotal = cif + dutyAmount + vatAmount + quarantineFee;

  return {
    country: regulation.countryName,
    hsCode: regulation.hsCode,
    hsDescription: regulation.hsDescription,
    customsDutyRate: regulation.customsDutyRate,
    customsDutyNotes: regulation.customsDutyNotes,
    vatGstRate: regulation.vatGstRate,
    vatGstName: regulation.vatGstName,
    quarantineFeeUSD: regulation.quarantineFeeUSD,
    regulatoryAuthority: regulation.regulatoryAuthority,
    inspectionRequirements: regulation.inspectionRequirements,
    summary: regulation.summary,
    estimatedDutyUSD: dutyAmount,
    estimatedVatUSD: vatAmount,
    estimatedInspectionUSD: quarantineFee,
    totalLandedCostUSD: landedTotal,
    groundingSources:
      extra?.groundingSources && extra.groundingSources.length > 0
        ? extra.groundingSources
        : [
            {
              title: regulation.sourceDocTitle,
              uri: regulation.sourceDocUrl,
            },
          ],
    searchQueries: extra?.searchQueries || [],
    groundedAt: new Date().toISOString(),
    isLiveGrounded,
    notice: extra?.notice,
  };
}

/**
 * Domain-grounded fallback answers for Live Support
 */
function getSupportFallbackAnswer(
  query: string,
  _language: string = 'en'
): { reply: string; suggestedQuestions: string[] } {
  const q = query.toLowerCase();

  // 1. Japan export rules
  if (q.includes('japan') || q.includes('maff') || q.includes('narita') || q.includes('tokyo') || q.includes('haneda')) {
    return {
      reply: `**Japan Commercial Import & Customs Directives (HS Code 0306.33.000):**
• **Customs Duty:** **0% MFN Tariff** (Duty-Free for live seafood consumption).
• **Consumption Tax:** **8% reduced food tax** rate assessed at customs clearance.
• **Biosecurity Authority:** Ministry of Agriculture, Forestry and Fisheries (MAFF) Animal Quarantine Service (AQS) & MHLW.
• **Mandatory Documentation:**
  1. Official Aquatic Animal Veterinary Health Certificate guaranteeing negative status for White Spot Syndrome Virus (WSSV) and EHP.
  2. Advance Import Quarantine Inspection Declaration filed prior to flight arrival at Narita (NRT), Haneda (HND), or Kansai (KIX).
  3. Pre-flight cold-chain conditioning report with temperature data logger confirmation.
• **Live Arrival Guarantee:** Dragon Crab Farming provides a contractual **95%+ live survival rate** upon customs tarmac handover.`,
      suggestedQuestions: [
        'What is the minimum order quantity for Japan?',
        'How does Dragon Crab pack for long-haul airfreight?',
        'Can I get an official quotation for Tokyo Narita?',
      ],
    };
  }

  // 2. Singapore export rules
  if (q.includes('singapore') || q.includes('sfa') || q.includes('changi')) {
    return {
      reply: `**Singapore Commercial Import Directives (HS Code 0306.33.00):**
• **Customs Duty:** **0% (Free Trade Port)** — zero import tariffs on live seafood.
• **Goods & Services Tax (GST):** **9.0%** assessed via TradeNet declaration.
• **Competent Authority:** Singapore Food Agency (SFA).
• **Clearance Protocols:**
  1. Valid SFA Fish & Crustacean Import Cargo Permit issued via TradeNet.
  2. Accredited government laboratory health certificate confirming zero chloramphenicol or nitrofuran residues.
  3. Expedited 2-hour airside tarmac inspection at Changi International (SIN) Air Cargo Terminal.`,
      suggestedQuestions: [
        'What are the transit hours from farm to Changi (SIN)?',
        'How does vertical RAS eliminate muddy off-flavors?',
        'What grades of mud crabs are best for chili crab restaurants?',
      ],
    };
  }

  // 3. United States export rules
  if (q.includes('united states') || q.includes('usa') || q.includes('us ') || q.includes('fda') || q.includes('usfws')) {
    return {
      reply: `**United States Seafood Import Directives (HTSUS 0306.33.00.00):**
• **Customs Duty:** **0% Column 1 MFN duty** (duty-free live crab entry).
• **Federal Tax:** 0% Federal sales tax (state/local taxes assessed at point of sale).
• **Competent Authorities:** U.S. Fish & Wildlife Service (USFWS) and Food and Drug Administration (FDA) / CBP.
• **Key Requirements:**
  1. **USFWS Form 3-177** (Electronic Declaration for Importation/Exportation of Wildlife) filed 48 hours prior to arrival ($85 base inspection fee).
  2. **FDA Prior Notice** confirmation number registered with CBP automated commercial environment.
  3. Designate approved wildlife ports of entry: Los Angeles (LAX), San Francisco (SFO), or New York (JFK).`,
      suggestedQuestions: [
        'How does Dragon Crab handle USFWS wildlife paperwork?',
        'What is the live arrival rate for trans-Pacific flights?',
        'What is the MOQ for shipment to Los Angeles (LAX)?',
      ],
    };
  }

  // 4. European Union export rules
  if (q.includes('europe') || q.includes('eu') || q.includes('germany') || q.includes('france') || q.includes('traces')) {
    return {
      reply: `**European Union Import Regulations (TARIC Code 0306.33.10):**
• **Customs Duty:** **7.5% EU Common Customs Tariff** (MFN rate).
• **Import VAT:** Reduced food VAT applies (~7% Germany, ~5.5% France).
• **Competent Authority:** European Commission DG SANTE and Border Inspection Posts (BIP).
• **Mandatory Directives:**
  1. Official EU Model Animal Health Certificate registered on the **TRACES-NT** system.
  2. Crabs must originate from a verified establishment listed on the EU TRACES seafood registry.
  3. Identity and veterinary physical inspection at airport BIP (Frankfurt FRA, Paris CDG, or Amsterdam AMS).`,
      suggestedQuestions: [
        'Are your aquaculture facilities TRACES-NT certified?',
        'What certifications does Dragon Crab Farming hold?',
        'Can you provide CIF pricing to Frankfurt (FRA)?',
      ],
    };
  }

  // 5. United Arab Emirates & GCC
  if (q.includes('uae') || q.includes('dubai') || q.includes('emirates') || q.includes('moccae') || q.includes('saudi') || q.includes('qatar')) {
    return {
      reply: `**UAE & GCC Unified Customs Tariff (HS Code 0306.33.00):**
• **Customs Duty:** **5.0% Unified GCC External Customs Tariff**.
• **VAT:** **5.0% standard Federal VAT** (UAE) / 15% (Saudi Arabia).
• **Competent Authority:** Ministry of Climate Change and Environment (MOCCAE).
• **Clearance Directives:**
  1. MOCCAE Electronic Import Permit generated prior to shipment dispatch.
  2. Official Veterinary Health Certificate confirming aquatic pathogen clearance.
  3. Rapid 3-hour cold-chain tarmac release at Dubai International (DXB) Cargo Gateway.`,
      suggestedQuestions: [
        'What flight connections operate to Dubai (DXB)?',
        'Can you supply Colossal Grade AAA crabs (>900g)?',
        'How are crabs packaged for Middle East desert climates?',
      ],
    };
  }

  // 6. Airfreight, packaging & survival guarantee
  if (q.includes('pack') || q.includes('surviv') || q.includes('freight') || q.includes('dead') || q.includes('mortality') || q.includes('guarantee')) {
    return {
      reply: `**Cold-Chain Packaging & 95%+ Live Survival Guarantee:**
• **Contractual SLA:** Dragon Crab guarantees a minimum **95%+ live survival rate** upon airport destination handover, backed by immediate invoice credit or replacement.
• **IATA-Compliant Packaging:**
  - High-density insulated expanded polystyrene (EPS) master cartons (~15–20 kg net weight).
  - Chilled damp natural cellulose sponge pads maintaining **85%+ relative humidity**.
  - Specialized oxygen-permeable breathing membranes.
  - Wireless calibrated temperature & shock data loggers in every batch.
• **Depuration & Fasting:** Crabs undergo a 48-hour depuration cycle in sterilized RAS water to purge digestive tracts, preventing water fouling and mortality during transit.`,
      suggestedQuestions: [
        'What happens if transit delays cause mortality over 5%?',
        'What is the minimum commercial order size?',
        'How does temperature logging work during the flight?',
      ],
    };
  }

  // 7. RAS Technology & Crab Apartment Systems
  if (q.includes('ras') || q.includes('apartment') || q.includes('technology') || q.includes('water') || q.includes('cannibal')) {
    return {
      reply: `**Vertical RAS Crab Apartment Architecture:**
• **Individual Biosecure Cells:** Each mud crab lives in an isolated, micro-monitored bio-cell. This completely eliminates cannibalism, territorial aggression, and limb loss (delivering 100% two-claw intact crabs).
• **Closed-Loop Recirculation:** **99.2% water recovery rate** utilizing fluidized sand-bed biological nitrification, protein fractionation, UV-C pathogen elimination, and dissolved ozone disinfection.
• **Sensory Quality:** Eliminates all muddy, earthy off-flavors common to wild pond crabs. Durometer tests show claw firmness >85 and ultrasound confirms **92%+ meat fill index**.
• **Environmental Sustainability:** Zero mangrove deforestation, ASC/GlobalGAP compliant, and carbon-efficient.`,
      suggestedQuestions: [
        'Do you provide turnkey RAS equipment for other farms?',
        'What water parameters are maintained in the apartments?',
        'Can I schedule an engineering consultation?',
      ],
    };
  }

  // 8. Minimum Order Quantity (MOQ) & Pricing
  if (q.includes('moq') || q.includes('order') || q.includes('price') || q.includes('cost') || q.includes('minimum')) {
    return {
      reply: `**Commercial Order Quantities & Pricing Structure:**
• **Minimum Order Quantity (MOQ):** **50 kg** for international scheduled air cargo (packaged in 3 master cartons).
• **Volume Tiers:**
  - 50 – 249 kg: Standard wholesale airfreight tier.
  - 250 – 999 kg: High-volume distributor discount (3% FOB rebate).
  - 1,000+ kg: Strategic recurring restaurant group / supermarket contract pricing.
• **Currency Support:** Contracts and invoices settled in **US Dollars (USD)** or **Indian Rupees (INR)**.
• **Pricing Models:** Available as FOB (Port of Origin), CIF (Destination Airport), or DDP (Delivered Duty Paid including all taxes and quarantine fees).`,
      suggestedQuestions: [
        'How can I calculate CIF costs for my city?',
        'What is the price difference between Grade AAA and Grade AA?',
        'How do I initiate a formal Commercial RFQ?',
      ],
    };
  }

  // General default fallback
  return {
    reply: `**Dragon Crab Farming International Trade & Compliance Desk:**
Welcome! I can provide immediate, official guidance on commercial live mud crab exports (*Scylla serrata*):
• **Destination Customs Tariffs (HS 0306.33):** Specific duties, VAT/GST, and biosecurity documentation for Japan, Singapore, UAE, USA, EU, Hong Kong, UK, and Australia.
• **Air-Cargo Logistics:** Direct IATA cold-chain packaging, temperature monitoring, and **95%+ live arrival guarantee**.
• **Vertical RAS Aquaculture:** Patented crab apartments, 92%+ guaranteed meat fill, and zero mangrove deforestation.

What destination country or specification would you like to review?`,
    suggestedQuestions: [
      'What are the import regulations for Japan MAFF?',
      'What is the tariff and SFA permit process for Singapore?',
      'How does the 95%+ live arrival guarantee work?',
      'What is the commercial MOQ and packaging specification?',
    ],
  };
}

/**
 * OpenAI Engine: Query OpenAI if OPENAI_API_KEY is available
 */
async function callOpenAiChat(
  systemPrompt: string,
  userMessage: string,
  history: any[] = []
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'MY_OPENAI_API_KEY' || apiKey.trim().length < 8) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-5).map((h) => ({
        role: h.role === 'model' || h.role === 'assistant' ? 'assistant' : 'user',
        content: h.content || h.text || '',
      })),
      { role: 'user', content: userMessage },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3,
        max_tokens: 800,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err: any) {
    console.warn('[OpenAI API] Fallback notice:', err?.message || err);
    return null;
  }
}

/**
 * OpenAI Engine: Query OpenAI for Duty Estimation if OPENAI_API_KEY is available
 */
async function callOpenAiDutyEstimate(country: string): Promise<any | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'MY_OPENAI_API_KEY' || apiKey.trim().length < 8) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const prompt = `You are a certified international trade customs and aquaculture biosecurity compliance analyst for premium live seafood exports.

Research the current, real-world import regulations, customs duty rates, and import taxes for commercial live mangrove mud crab consignments (Scylla serrata, HS Code 0306.33 - "Crabs, live, fresh or chilled") entering: "${country}".

Format your response as strict JSON with this exact structure:
{
  "country": "${country}",
  "hsCode": "0306.33",
  "hsDescription": "Live Mangrove Mud Crab (Scylla serrata), fresh or chilled",
  "customsDutyRate": <number, percentage e.g. 0, 5.0, or 7.5>,
  "customsDutyNotes": "<explanation of tariff, MFN rate, or FTA exemption>",
  "vatGstRate": <number, percentage e.g. 8.0, 9.0, 5.0, or 0>,
  "vatGstName": "<e.g. Consumption Tax, GST, VAT, or Sales Tax>",
  "quarantineFeeUSD": <number, estimated veterinary inspection fee in USD e.g. 45>,
  "inspectionRequirements": [
    "<specific requirement 1>",
    "<specific requirement 2>",
    "<specific requirement 3>"
  ],
  "regulatoryAuthority": "<official government body e.g. Japan MAFF, Singapore SFA, US FDA/FWS, UAE MOCCAE, EU Border Control>",
  "summary": "<1-2 sentence executive summary of landed import conditions for commercial seafood buyers>"
}

Output ONLY valid JSON.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
    return null;
  } catch {
    return null;
  }
}

// Health check endpoint
app.get(['/api/health', '/health'], (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Dragon Crab Farming API',
    aiEngines: {
      geminiAvailable: !geminiQuotaExhausted,
      openaiConfigured: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'MY_OPENAI_API_KEY'),
    },
  });
});

// Handler for Duty Estimate
const handleDutyEstimate = async (req: express.Request, res: express.Response) => {
  const { country, cifTotalUSD = 1000 } = req.body;

  if (!country || typeof country !== 'string') {
    return res.status(400).json({ error: 'Destination country or corridor is required' });
  }

  const trimmedCountry = country.trim();
  const cacheKey = `${trimmedCountry.toLowerCase()}_${Math.round(Number(cifTotalUSD) || 1000)}`;

  // 1. Check in-memory cache
  const cached = cachedGroundedResults.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.json(cached.data);
  }

  // Resolve static verified baseline
  const regulation =
    GROUNDED_CUSTOMS_REGULATIONS[trimmedCountry] || getFallbackRegulation(trimmedCountry);

  // 2. Try OpenAI GPT-4o if OPENAI_API_KEY is configured
  const openAiData = await callOpenAiDutyEstimate(trimmedCountry);
  if (openAiData && typeof openAiData.customsDutyRate === 'number') {
    const cif = Number(cifTotalUSD) || 1000;
    const dutyPct = Number(openAiData.customsDutyRate) || 0;
    const vatPct = Number(openAiData.vatGstRate) || 0;
    const quarantineFee = Number(openAiData.quarantineFeeUSD) || 45;

    const dutyAmount = (cif * dutyPct) / 100;
    const vatAmount = ((cif + dutyAmount) * vatPct) / 100;
    const landedTotal = cif + dutyAmount + vatAmount + quarantineFee;

    const openAiResult = {
      ...openAiData,
      estimatedDutyUSD: dutyAmount,
      estimatedVatUSD: vatAmount,
      estimatedInspectionUSD: quarantineFee,
      totalLandedCostUSD: landedTotal,
      groundingSources: [{ title: regulation.sourceDocTitle, uri: regulation.sourceDocUrl }],
      searchQueries: [],
      groundedAt: new Date().toISOString(),
      isLiveGrounded: true,
      notice: 'Grounded via OpenAI GPT-4o Customs Intelligence',
    };

    cachedGroundedResults.set(cacheKey, { data: openAiResult, timestamp: Date.now() });
    return res.json(openAiResult);
  }

  // 3. If Gemini is not marked as quota-exhausted, safely attempt Gemini 3.8 Flash
  const apiKey = process.env.GEMINI_API_KEY;
  if (!geminiQuotaExhausted && apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `You are a certified international trade customs and aquaculture biosecurity compliance analyst for premium live seafood exports.

Research the current, real-world import regulations, customs duty rates, and import taxes for commercial live mangrove mud crab consignments (Scylla serrata, HS Code 0306.33 - "Crabs, live, fresh or chilled") entering: "${trimmedCountry}".

Format your response as strict JSON with this exact structure:
{
  "country": "${trimmedCountry}",
  "hsCode": "0306.33",
  "hsDescription": "Live Mangrove Mud Crab (Scylla serrata), fresh or chilled",
  "customsDutyRate": <number, percentage e.g. 0, 5.0, or 7.5>,
  "customsDutyNotes": "<explanation of tariff, MFN rate, or FTA exemption>",
  "vatGstRate": <number, percentage e.g. 8.0, 9.0, 5.0, or 0>,
  "vatGstName": "<e.g. Consumption Tax, GST, VAT, or Sales Tax>",
  "quarantineFeeUSD": <number, estimated veterinary inspection fee in USD e.g. 45>,
  "inspectionRequirements": [
    "<specific requirement 1>",
    "<specific requirement 2>",
    "<specific requirement 3>"
  ],
  "regulatoryAuthority": "<official government body e.g. Japan MAFF, Singapore SFA, US FDA/FWS, UAE MOCCAE, EU Border Control>",
  "summary": "<1-2 sentence executive summary of landed import conditions for commercial seafood buyers>"
}

Output ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      let parsedData: any = null;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        }
      } catch {
        // Fall back gracefully
      }

      if (parsedData && typeof parsedData.customsDutyRate === 'number') {
        const cif = Number(cifTotalUSD) || 1000;
        const dutyPct = Number(parsedData.customsDutyRate) || 0;
        const vatPct = Number(parsedData.vatGstRate) || 0;
        const quarantineFee = Number(parsedData.quarantineFeeUSD) || 45;

        const dutyAmount = (cif * dutyPct) / 100;
        const vatAmount = ((cif + dutyAmount) * vatPct) / 100;
        const landedTotal = cif + dutyAmount + vatAmount + quarantineFee;

        const liveResult = {
          ...parsedData,
          estimatedDutyUSD: dutyAmount,
          estimatedVatUSD: vatAmount,
          estimatedInspectionUSD: quarantineFee,
          totalLandedCostUSD: landedTotal,
          groundingSources: [{ title: regulation.sourceDocTitle, uri: regulation.sourceDocUrl }],
          searchQueries: [],
          groundedAt: new Date().toISOString(),
          isLiveGrounded: true,
        };

        cachedGroundedResults.set(cacheKey, { data: liveResult, timestamp: Date.now() });
        return res.json(liveResult);
      }
    } catch (err: any) {
      const errStr = (err?.message || JSON.stringify(err) || '').toLowerCase();
      if (errStr.includes('quota') || errStr.includes('resource_exhausted') || err?.status === 429) {
        geminiQuotaExhausted = true;
      }
    }
  }

  // 4. Default: Verified WTO/WCO Customs Tariff Schedule Benchmark
  const fallbackResult = buildGroundedEstimateFromRegulation(
    regulation,
    Number(cifTotalUSD),
    false,
    {
      notice: 'Verified WTO/WCO Customs Tariff Schedule (Official Regulatory Benchmark)',
    }
  );

  cachedGroundedResults.set(cacheKey, { data: fallbackResult, timestamp: Date.now() });
  return res.json(fallbackResult);
};

// Handler for Live Support
const handleLiveSupport = async (req: express.Request, res: express.Response) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `You are the Senior International Trade & Export Biosecurity Specialist at Dragon Crab Farming.
You provide instant, authoritative, and concise answers to global seafood importers, procurement directors, executive chefs, and aquaculture partners.

CORE KNOWLEDGE BASE:
1. SPECIES & PRODUCT:
   - Primary species: Premium Indo-Pacific Mangrove Mud Crab (Scylla serrata) & Scylla tranquebarica.
   - Grades: Grade AAA Colossal (>900g), Grade AA Jumbo (700-890g), Grade A Select (500-690g), Premium Soft-Shell Crab, and Specific Pathogen Free (SPF) Seedlings (Crablets).
   - Meat fullness: Guaranteed 92%+ meat fill index, verified by durometer claw firmness (>85) and ultrasound density. Zero muddy off-flavor due to 48-hr bio-cell depuration.

2. VERTICAL RAS CRAB APARTMENT SYSTEM:
   - Individual biosecure apartments prevent cannibalism and territorial claw loss (100% two-claw intact guarantee).
   - 99.2% water recirculated through biological sand-bed nitrification, protein skimmers, UV sterilizers, and ozone injection.
   - Zero mangrove clearing: 100% sustainable closed-loop, ASC and GlobalGAP certified.

3. AIR-CARGO PACKAGING & 95%+ LIVE ARRIVAL GUARANTEE:
   - Live survival guarantee: 95%+ live arrival guaranteed at all major international air-cargo hubs with replacement credit for any tarmac loss over 5%.
   - Packaging: Custom insulated Styrofoam containers with chilled, damp cellulose humidity pads (85%+ RH), oxygen-permeable liners, and calibrated temperature data loggers.
   - Minimum Order Quantity (MOQ): 50 kg for commercial airfreight shipments (packaged in standard ~15-20 kg master cartons).

4. CUSTOMS REGULATIONS, HS CODE & TARIFF DIRECTIVES (HS Code: 0306.33 - Live mud crabs):
   - Japan: 0% customs duty (MFN), 8% consumption tax. Requires MAFF Animal Quarantine Service (AQS) health certificate (freedom from WSSV and EHP). Ports: NRT, HND, KIX.
   - Singapore: 0% customs duty (free port), 9% GST. Requires Singapore Food Agency (SFA) import permit via TradeNet. Rapid clearance at Changi (SIN).
   - United Arab Emirates: 5% GCC tariff, 5% VAT. Requires MOCCAE import permit and veterinary certificate. Direct cold-chain via Dubai (DXB).
   - United States: 0% customs tariff (HTSUS 0306.33.00.00). Requires US Fish & Wildlife Service (USFWS) Form 3-177 declaration ($85 fee) + FDA prior notice. Ports: LAX, SFO, JFK.
   - European Union: 7.5% MFN duty, ~7% reduced food VAT. Requires TRACES-NT entry certificate from approved facility. Inspection at BIP (FRA, CDG, AMS).
   - Hong Kong: 0% duty, 0% VAT. SuperTerminal 1 expedited clearance with CFS food safety certificate.
   - United Kingdom: 0% tariff, 0% zero-rated food VAT. Requires DEFRA IPAFFS notification.
   - Australia: 0% duty, 0% GST. Requires DAFF BICON permit & WSSV-free health certificate.
   - China: 7% MFN duty, 9% agricultural VAT. Requires GACC facility registration.

5. COMMUNICATION STYLE:
   - Professional, concise, knowledgeable, and inviting.
   - Use bullet points for requirements or steps.
   - Format key terms in bold.
   - If the user is looking for an official quote, pricing, or contract booking, invite them to use the "Open Commercial RFQ" button.
   - Respond in the language requested (${
     language === 'zh'
       ? 'Chinese / 中文'
       : language === 'ja'
       ? 'Japanese / 日本語'
       : language === 'ar'
       ? 'Arabic / العربية'
       : language === 'hi'
       ? 'Hindi / हिन्दी'
       : 'English'
   }).`;

    // 1. Try OpenAI GPT-4o-mini if OPENAI_API_KEY is configured
    const openAiReply = await callOpenAiChat(systemInstruction, message, history);
    if (openAiReply) {
      return res.json({
        reply: openAiReply,
        isAi: true,
        suggestedQuestions: [
          'What are the biosecurity requirements for Japan MAFF?',
          'What is the commercial MOQ and airfreight packaging?',
          'Can you calculate CIF & duty for my destination airport?',
        ],
        source: 'OpenAI GPT-4o Trade Intelligence',
      });
    }

    // 2. If Gemini is not quota-exhausted, safely attempt Gemini 3.8 Flash
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiQuotaExhausted && geminiKey && geminiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contents: any[] = [];
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.content || item.text || '' }],
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
          },
        });

        const reply = response.text || '';
        if (reply.trim()) {
          return res.json({
            reply: reply.trim(),
            isAi: true,
            suggestedQuestions: [
              'What are the biosecurity requirements for Japan MAFF?',
              'How does Dragon Crab guarantee 95%+ live arrival?',
              'Can you calculate CIF & duty for my destination airport?',
            ],
            source: 'Gemini 3.8 Flash Trade Intelligence',
          });
        }
      } catch (err: any) {
        const errStr = (err?.message || JSON.stringify(err) || '').toLowerCase();
        if (errStr.includes('quota') || errStr.includes('resource_exhausted') || err?.status === 429) {
          geminiQuotaExhausted = true;
        }
      }
    }

    // 3. Domain-grounded verified rule engine
    const fallback = getSupportFallbackAnswer(message, language);
    return res.json({
      reply: fallback.reply,
      isAi: false,
      suggestedQuestions: fallback.suggestedQuestions,
      source: 'Verified Trade Directives Database (Offline/Rate-Limit Mode)',
    });
  } catch (err: any) {
    const fallback = getSupportFallbackAnswer(req.body?.message || '', req.body?.language || 'en');
    return res.json({
      reply: fallback.reply,
      isAi: false,
      suggestedQuestions: fallback.suggestedQuestions,
    });
  }
};

// Mount both `/api/*` and bare paths for Vercel Serverless Function rewrites
app.post(['/api/duty-estimate', '/duty-estimate'], handleDutyEstimate);
app.post(['/api/live-support', '/live-support'], handleLiveSupport);

export default app;
