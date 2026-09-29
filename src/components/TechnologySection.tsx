import { useState } from 'react';
import { Check, X, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { RAS_FEATURES, TECH_APARTMENTS_IMAGE } from '../data/crabData';
import { useLanguage } from '../context/LanguageContext';

export function TechnologySection() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison'>('architecture');
  const { t } = useLanguage();

  return (
    <section id="ras-technology" className="py-20 lg:py-28 bg-slate-900/40 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              {t.techKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.techTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.techDescription}
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'architecture' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.techTabArchitecture}
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'comparison' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.techTabComparison}
            </button>
          </div>
        </div>

        {activeTab === 'architecture' ? (
          <div className="space-y-12">
            {/* Visual Feature Showcase with Asymmetric Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={TECH_APARTMENTS_IMAGE}
                    alt="Close-up of vertical recirculating aquaculture system crab boxes"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-cyan-300 font-semibold mb-1">
                    <span>Automated Individual Biocell</span>
                    <span>Capacity: 48,000 Cells</span>
                  </div>
                  <p className="text-slate-400">
                    Each modular apartment unit features continuous directional laminar flow, isolated waste evacuator, and optical molting reflectance monitoring.
                  </p>
                </div>
              </div>

              {/* Numbered Editorial Feature List */}
              <div className="lg:col-span-6 space-y-6">
                {RAS_FEATURES.map((feat) => (
                  <div
                    key={feat.step}
                    className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-cyan-400 tabular-nums">
                          {feat.step}.
                        </span>
                        <h3 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {feat.title}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                        {feat.stat}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-7">
                      {feat.description}
                    </p>

                    <div className="pl-7 pt-1 text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-400">Impact:</span>
                      <span>{feat.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Head-to-Head Comparison Table */
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Operational Efficiency & Ecological Footprint Analysis
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comparison between conventional mangrove earthen pond farming and Dragon Crab Indoor Vertical RAS.
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Audited to ASC & FAO Aquaculture Standards
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Production Metric</th>
                    <th className="py-4 px-6 text-slate-400">Traditional Earthen Mangrove Ponds</th>
                    <th className="py-4 px-6 text-cyan-400 bg-cyan-950/20">Dragon Crab Vertical RAS</th>
                    <th className="py-4 px-6 text-emerald-400">Efficiency Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Harvest Survival Rate</td>
                    <td className="py-4 px-6 text-rose-300">35% - 50% (Heavy cannibalism)</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">92% - 96% (Isolated cells)</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold tabular-nums">+110% Yield Increase</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Water Consumption</td>
                    <td className="py-4 px-6">Massive daily tidal exchange (high loss)</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">95% Recycled Closed-Loop</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold tabular-nums">-95% Fresh Seawater Intake</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Land Area Footprint</td>
                    <td className="py-4 px-6">10 - 20 hectares for 50,000 crabs</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">800 m² Vertical Multi-Tier Facility</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold tabular-nums">120x Spatial Density</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Pathogen & Virus Exposure</td>
                    <td className="py-4 px-6">Vulnerable to bird feces, wild vectors & run-off</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">Cleanroom Biosecure + UV + Microfiltration</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold">100% Specific Pathogen Free</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Limb Completeness</td>
                    <td className="py-4 px-6">25% missing claws/legs due to fights</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">&gt;99% Flawless Claws & Limbs</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold">Zero Downgrade Penalties</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Soft-Shell Harvest Precision</td>
                    <td className="py-4 px-6">Manual hand-scooping every 3-4 hours</td>
                    <td className="py-4 px-6 font-bold text-cyan-300 bg-cyan-950/10">Optical Infrared Alert &lt;90 minutes</td>
                    <td className="py-4 px-6 text-emerald-400 font-semibold">Uniform Grade-A Tenderness</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
