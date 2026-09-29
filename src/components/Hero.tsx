import { ArrowRight, ShieldCheck, ChevronRight, Activity, Globe } from 'lucide-react';
import { HERO_IMAGE } from '../data/crabData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenInquiry: (subject?: string) => void;
  onExploreTech: () => void;
  onOpenEstimator: () => void;
}

export function Hero({ onOpenInquiry, onExploreTech, onOpenEstimator }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Modern indoor recirculating aquaculture facility with vertical crab apartments"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
        />
        {/* Measured multi-stop scrim ensuring WCAG AA contrast across all media luminance */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Value Proposition Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Clean unboxed editorial kicker - NO PILLS */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium tracking-wide text-cyan-400">
              <span className="font-semibold uppercase tracking-wider">{t.heroKickerAquaculture}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{t.heroKickerRas}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{t.heroKickerAirfreight}</span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl"
              style={{ fontFamily: "'Outfit', sans-serif", textWrap: 'balance' }}
            >
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {t.heroDescription}
            </p>

            {/* Conversion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenEstimator}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-[0_0_24px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>{t.heroCtaCalculate}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreTech}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{t.heroCtaTech}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 border-t border-slate-800/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.heroTrustZeroAntibiotics}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>{t.heroTrustColdChain}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{t.heroTrustHaccp}</span>
              </div>
            </div>
          </div>

          {/* Adjacent Quantitative Proof Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Operational Benchmark · Q3 2026
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.heroProofTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                      {t.heroProofBiocells}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug">
                      {t.heroProofBiocellsDesc}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums tracking-tight">
                      {t.heroProofLiveArrival}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug">
                      {t.heroProofLiveArrivalDesc}
                    </div>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-slate-800/80">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums tracking-tight">
                      {t.heroProofMeatYield}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug">
                      {t.heroProofMeatYieldDesc}
                    </div>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-slate-800/80">
                    <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums tracking-tight">
                      {t.heroProofYearRound}
                    </div>
                    <div className="text-xs text-slate-400 leading-snug">
                      {t.heroProofYearRoundDesc}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">{t.heroNextDispatch}</span>
                    <span className="text-white font-medium">Batch #DCF-2026-F90 (Ready)</span>
                  </div>
                  <button
                    onClick={() => onOpenInquiry('Reservation for Next Export Dispatch')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer"
                  >
                    {t.heroReserveBatch}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
