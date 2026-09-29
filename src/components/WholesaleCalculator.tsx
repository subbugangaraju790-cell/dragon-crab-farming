import { useState, useId } from 'react';
import { Calculator, Plane, Package, ArrowRight, CheckCircle2, Scale, Sparkles } from 'lucide-react';
import { CRAB_GRADES, DESTINATION_RATES } from '../data/crabData';
import { CrabGrade } from '../types/crab';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from './CurrencyContext';
import { FreightDutyEstimator } from './FreightDutyEstimator';

interface WholesaleCalculatorProps {
  initialGrade?: CrabGrade | null;
  onOpenInquiry: (summary: string) => void;
}

export function WholesaleCalculator({ initialGrade, onOpenInquiry }: WholesaleCalculatorProps) {
  const [selectedGradeId, setSelectedGradeId] = useState(initialGrade?.id || 'grade-a-king');
  const [weightKg, setWeightKg] = useState(250);
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(0);
  const [packagingType, setPackagingType] = useState<'dormancy' | 'wet_crushed' | 'iqf'>('dormancy');
  const [estimatedDdpTotalUSD, setEstimatedDdpTotalUSD] = useState<number | null>(null);

  const { t } = useLanguage();
  const { currency, formatPrice, convertFromUSD } = useCurrency();

  const gradeSelectId = useId();
  const weightSliderId = useId();
  const weightInputId = useId();
  const destinationSelectId = useId();

  const currentGrade = CRAB_GRADES.find((g) => g.id === selectedGradeId) || CRAB_GRADES[0];
  const currentDestination = DESTINATION_RATES[selectedDestinationIndex];

  // Map destination corridor to initial country
  const corridorToCountryMap: Record<number, string> = {
    0: 'Japan',
    1: 'Singapore',
    2: 'United States',
    3: 'European Union',
    4: 'United Arab Emirates',
    5: 'Australia',
  };
  const activeCountry = corridorToCountryMap[selectedDestinationIndex] || 'Japan';

  // Price models per grade in USD (and convert to INR)
  const basePricesUSD: Record<string, number> = {
    'grade-a-king': 31.00,
    'grade-coral-female': 35.50,
    'grade-soft-shell': 24.50,
    'grade-prime-medium': 25.50,
    'grade-seedling-crablet': 0.60,
  };

  const isSeedling = selectedGradeId === 'grade-seedling-crablet';
  const effectiveBasePriceUSD = basePricesUSD[selectedGradeId] || 30.00;

  // Box calculations
  const kgPerBox = currentGrade.category === 'soft_shell' ? 10 : 15;
  const estimatedBoxes = Math.ceil(weightKg / kgPerBox);
  const packagingCostPerBoxUSD = packagingType === 'dormancy' ? 12 : packagingType === 'wet_crushed' ? 15 : 10;
  const totalPackagingCostUSD = estimatedBoxes * packagingCostPerBoxUSD;

  // Total CIF estimates in USD
  const totalFOB_USD = isSeedling ? weightKg * 50 * effectiveBasePriceUSD : weightKg * effectiveBasePriceUSD;
  const freightCostUSD = weightKg * currentDestination.ratePerKg;
  const totalCIF_USD = totalFOB_USD + freightCostUSD + totalPackagingCostUSD;
  const landedPricePerKgUSD = totalCIF_USD / weightKg;

  // Convert to INR for formatPrice
  const totalCIF_INR = convertFromUSD(totalCIF_USD);
  const totalFOB_INR = convertFromUSD(totalFOB_USD);
  const freightCostINR = convertFromUSD(freightCostUSD);
  const totalPackagingCostINR = convertFromUSD(totalPackagingCostUSD);
  const landedPricePerKgINR = convertFromUSD(landedPricePerKgUSD);

  const effectiveDdpUSD = estimatedDdpTotalUSD ?? (totalCIF_USD * 1.08 + 45);
  const effectiveDdpINR = convertFromUSD(effectiveDdpUSD);

  const handleInquirySubmit = () => {
    const formattedCIF = currency === 'INR' 
      ? `₹${totalCIF_INR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` 
      : `$${totalCIF_USD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formattedDDP = currency === 'INR'
      ? `₹${effectiveDdpINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
      : `$${effectiveDdpUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const summary = `Wholesale RFQ: ${weightKg}kg of ${currentGrade.name} to ${currentDestination.region} (${activeCountry}). Estimated CIF Total: ${formattedCIF}, Estimated Landed DDP (Duties & Taxes Included): ${formattedDDP}. Packaging: ${packagingType.toUpperCase()}.`;
    onOpenInquiry(summary);
  };

  return (
    <section id="wholesale-estimator" className="py-20 lg:py-28 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            {t.calcKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.calcTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t.calcDescription}
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Configuration Controls */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Grade */}
            <div className="space-y-2">
              <label htmlFor={gradeSelectId} className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                {t.calcStepGrade}
              </label>
              <select
                id={gradeSelectId}
                value={selectedGradeId}
                onChange={(e) => setSelectedGradeId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {CRAB_GRADES.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name} ({grade.scientificName}) · {grade.weightRange}
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-400 pl-1">
                Yield: <span className="text-slate-300 font-medium">{currentGrade.meatYield}</span> · Average Weight: <span className="text-slate-300 font-medium">{currentGrade.specifications.averageWeight}</span>
              </div>
            </div>

            {/* Step 2: Consignment Weight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor={weightInputId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t.calcStepWeight}
                </label>
                <div className="text-sm font-bold text-cyan-400 tabular-nums">
                  {weightKg.toLocaleString()} kg ({Math.round(weightKg * 2.20462).toLocaleString()} lbs)
                </div>
              </div>

              <input
                id={weightSliderId}
                type="range"
                min="50"
                max="2500"
                step="25"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
                aria-label="Order volume slider in kilograms"
              />

              {/* Quick weight selector chips */}
              <div className="flex items-center flex-wrap gap-2 pt-1">
                {[100, 250, 500, 1000, 2000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setWeightKg(preset)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      weightKg === preset
                        ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Destination Corridor */}
            <div className="space-y-2">
              <label htmlFor={destinationSelectId} className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                {t.calcStepDestination}
              </label>
              <select
                id={destinationSelectId}
                value={selectedDestinationIndex}
                onChange={(e) => setSelectedDestinationIndex(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {DESTINATION_RATES.map((dest, idx) => {
                  const rateStr = currency === 'INR'
                    ? `₹${convertFromUSD(dest.ratePerKg).toFixed(0)}/kg`
                    : `$${dest.ratePerKg.toFixed(2)}/kg`;
                  return (
                    <option key={dest.region} value={idx}>
                      {dest.region} · Air Transit: {dest.transitHours} · ~{rateStr}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Step 4: Packaging Method */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                {t.calcStepPackaging}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPackagingType('dormancy')}
                  className={`p-3 text-left rounded-lg border text-xs space-y-1 transition-all cursor-pointer ${
                    packagingType === 'dormancy'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold block text-white">Live Dormant EPS</span>
                  <span className="text-[11px] block leading-tight">14°C - 16°C cold-hibernation with humid aeration pad.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackagingType('wet_crushed')}
                  className={`p-3 text-left rounded-lg border text-xs space-y-1 transition-all cursor-pointer ${
                    packagingType === 'wet_crushed'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold block text-white">Gel Ice Barrier</span>
                  <span className="text-[11px] block leading-tight">Double insulated carton for longer flight connections.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackagingType('iqf')}
                  className={`p-3 text-left rounded-lg border text-xs space-y-1 transition-all cursor-pointer ${
                    packagingType === 'iqf'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold block text-white">IQF Blast Frozen</span>
                  <span className="text-[11px] block leading-tight">-35°C Cryogenic freeze for soft-shell & culinary meats.</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Cost Breakdown Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  {t.calcCardTitle}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {t.calcTotalEstimated}
                </h3>
              </div>
              <div className="p-2.5 bg-cyan-950/50 border border-cyan-800/60 rounded-lg text-cyan-400">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            {/* Dynamic Price Output */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Estimated CIF Port Total</span>
                  <span className="text-[10px] text-cyan-400 font-mono">FOB + Airfreight + Pack</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tabular-nums tracking-tight font-mono">
                    {formatPrice(totalCIF_INR)}
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    ≈ {formatPrice(landedPricePerKgINR, { perKg: true })} CIF
                  </span>
                </div>
              </div>

              {/* Line items */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Crab Product Cost (FOB Base)</span>
                  <span className="font-medium text-white tabular-nums">{formatPrice(totalFOB_INR)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Estimated Air Freight ({currentDestination.transitHours})</span>
                  </span>
                  <span className="font-medium text-white tabular-nums">{formatPrice(freightCostINR)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Certified Export Packaging ({estimatedBoxes} Master Boxes)</span>
                  </span>
                  <span className="font-medium text-white tabular-nums">{formatPrice(totalPackagingCostINR)}</span>
                </div>

                {/* Grounded Landed DDP Preview */}
                <div className="flex items-center justify-between text-cyan-300 pt-2 border-t border-slate-800/60 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Grounded Landed Total (DDP Incl. Duties):</span>
                  </span>
                  <span className="font-bold font-mono">{formatPrice(effectiveDdpINR)}</span>
                </div>
              </div>

              {/* Arrival SLA & Guarantees */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.calcLiveGuarantee}</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {currentDestination.guaranteeArrival}% Live Guarantee
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estimated Transit Window</span>
                  <span className="text-white font-medium">
                    {currentDestination.transitHours}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Includes health phytosanitary certificate and pre-flight cold ramp inspection report.</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                onClick={handleInquirySubmit}
                className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-lg transition-all shadow-[0_4px_16px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.calcSubmitRfp}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-400 mt-2">
                Guaranteed commercial reply within 4 business hours from trade export desk.
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Grounded Freight & Duty Estimator */}
        <div className="pt-4">
          <FreightDutyEstimator
            initialCountry={activeCountry}
            cifTotalUSD={totalCIF_USD}
            weightKg={weightKg}
            gradeName={currentGrade.name}
            onUpdateLandedTotal={(ddpUSD) => setEstimatedDdpTotalUSD(ddpUSD)}
          />
        </div>
      </div>
    </section>
  );
}
