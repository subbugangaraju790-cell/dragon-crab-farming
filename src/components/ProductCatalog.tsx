import { useState } from 'react';
import { ArrowUpRight, Scale, Shield, Info, X, TrendingUp } from 'lucide-react';
import { CRAB_GRADES } from '../data/crabData';
import { CrabGrade } from '../types/crab';
import { useCurrency } from './CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { PriceFluctuationChart } from './PriceFluctuationChart';

interface ProductCatalogProps {
  onSelectForQuote: (grade: CrabGrade) => void;
  onOpenInquiry: (subject: string) => void;
}

export function ProductCatalog({ onSelectForQuote, onOpenInquiry }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [inspectedGrade, setInspectedGrade] = useState<CrabGrade | null>(null);
  const { t } = useLanguage();

  const filteredGrades = activeCategory === 'all'
    ? CRAB_GRADES
    : CRAB_GRADES.filter((g) => g.category === activeCategory);

  return (
    <section id="species-catalog" className="py-20 lg:py-28 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              {t.catalogKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.catalogTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.catalogDescription}
            </p>
          </div>

          {/* Interactive Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.catalogFilterAll} ({CRAB_GRADES.length})
            </button>
            <button
              onClick={() => setActiveCategory('king')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'king' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.catalogFilterKings}
            </button>
            <button
              onClick={() => setActiveCategory('female_roe')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'female_roe' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.catalogFilterRoe}
            </button>
            <button
              onClick={() => setActiveCategory('soft_shell')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'soft_shell' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.catalogFilterSoft}
            </button>
            <button
              onClick={() => setActiveCategory('seedling')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'seedling' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.catalogFilterSeedlings}
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGrades.map((grade) => (
            <div
              key={grade.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
            >
              <div>
                {/* Product Image Slot with Fallback Container */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={grade.image}
                    alt={grade.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed price tag at bottom left */}
                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-cyan-300 tracking-wide">
                    {t.catalogFobPrice}: <span className="font-bold text-white text-sm">{grade.pricingFOB}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="italic font-serif text-slate-300">{grade.scientificName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{grade.weightRange}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {grade.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">
                      {grade.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {grade.description}
                  </p>

                  {/* Technical Spec Bullets (Zero Pills) */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{t.catalogMeatYield}</span>
                      </span>
                      <span className="font-medium text-white">{grade.meatYield}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.catalogHardness}</span>
                      </span>
                      <span className="font-medium text-white">{grade.shellHardness}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setInspectedGrade(grade)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.catalogInspectBtn}</span>
                </button>

                <button
                  onClick={() => onSelectForQuote(grade)}
                  className="flex-1 py-2.5 px-3 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span>{t.catalogQuoteBtn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* D3 Historical Price Fluctuations Interactive Line Chart */}
        <PriceFluctuationChart />
      </div>

      {/* Technical Spec Inspection Modal */}
      {inspectedGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectedGrade(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close Specification Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                <span>Technical Export Specification</span>
                <span aria-hidden="true">·</span>
                <span>{inspectedGrade.scientificName}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {inspectedGrade.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-medium">Average Piece Weight</span>
                <span className="text-white font-semibold text-sm">{inspectedGrade.specifications.averageWeight}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-medium">Export Master Packaging</span>
                <span className="text-white font-semibold text-sm">{inspectedGrade.specifications.packagingUnit}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-medium">Live Dormancy Tolerance</span>
                <span className="text-white font-semibold text-sm">{inspectedGrade.specifications.dormancyTolerance}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-medium">Seasonal Availability</span>
                <span className="text-white font-semibold text-sm">{inspectedGrade.specifications.seasonalAvailability}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 block font-semibold uppercase tracking-wide">Target Culinary Applications</span>
              <p className="text-slate-200 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                {inspectedGrade.specifications.idealCulinaryUse}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 block font-semibold uppercase tracking-wide">Qualified Air Cargo Destinations</span>
              <div className="flex flex-wrap gap-2">
                {inspectedGrade.specifications.targetMarkets.map((market) => (
                  <span key={market} className="text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded text-xs">
                    {market}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setInspectedGrade(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close Spec
              </button>
              <button
                onClick={() => {
                  const target = inspectedGrade;
                  setInspectedGrade(null);
                  onSelectForQuote(target);
                }}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                Select for Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
