import { Sparkles, Utensils, Star, Award, Check } from 'lucide-react';
import { CULINARY_CRAB_IMAGE, CLIENT_TESTIMONIALS } from '../data/crabData';
import { useLanguage } from '../context/LanguageContext';

export function CulinaryShowcase() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            {t.culinaryKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.culinaryTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t.culinaryDescription}
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Culinary Photography */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group bg-slate-900">
            <div className="aspect-[4/3] w-full">
              <img
                src={CULINARY_CRAB_IMAGE}
                alt="Luxury steamed giant crab with succulent claw meat and golden roe"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-semibold mb-1">
                <span>Natural Sweetness · Zero Off-Flavors</span>
                <span>Brix Score: 8.4</span>
              </div>
              <p className="text-slate-400">
                Individual water cleansing flushes all gut impurities 72 hours before harvest, producing pearl-white meat flakes with natural marine umami.
              </p>
            </div>
          </div>

          {/* Sensory Comparison & Culinary Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Four Gastronomic Standards Guaranteed by Dragon Crab
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Zero Muddy Geosmin Taste</span>
                  </div>
                  <p className="text-slate-300 pl-3.5 leading-relaxed">
                    Crabs reside on clean poly-mesh surfaces rather than anoxic pond sludge, completely eliminating cyanobacterial geosmin contamination.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Dense, Unshrunk Muscle Strands</span>
                  </div>
                  <p className="text-slate-300 pl-3.5 leading-relaxed">
                    Dietary supplementation with cold-pressed marine lipids produces compact, succulent claw muscle that holds its shape when wok-tossed in high heat chili sauce or cracked whole.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>100% Guaranteed Female Coral Fill</span>
                  </div>
                  <p className="text-slate-300 pl-3.5 leading-relaxed">
                    Every female crab is non-destructively inspected under high-intensity trans-illumination. Only carapaces with complete ovary maturation and dense golden-orange roe are packed.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Intact Appendages & Vigorous Presentation</span>
                  </div>
                  <p className="text-slate-300 pl-3.5 leading-relaxed">
                    Living alone in isolated biocells prevents territorial clashes, resulting in 10-limb completeness and immaculate banquet table presentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Attributable Testimonials */}
        <div className="space-y-6 pt-6">
          <div className="border-t border-slate-800 pt-8">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Industry Trust & Field Proof
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Commercial Buyers & Head Chefs on Dragon Crab Performance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-cyan-400 text-[11px] font-medium">{testimonial.role}</div>
                  <div className="text-slate-400 text-[11px]">{testimonial.restaurant}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
