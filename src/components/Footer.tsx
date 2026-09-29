import { Shield, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenInquiry: (subject?: string) => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
              <span>{t.brandName}</span>
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="text-[11px] text-slate-500">
              ASC-C-02941 · HACCP Code CXC 52-2003 · ISO 22000 Certified Facilities
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Commercial Offerings
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('species-catalog')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {t.navSpecies}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('wholesale-estimator')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {t.navWholesale}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('ras-technology')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {t.navRasTech}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('batch-traceability')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {t.navTraceability}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('certifications')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {t.navCertifications}
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Science */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Engineering & Science
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('ras-technology')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Vertical Crab Apartments
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('water-telemetry')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Live Water Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('ras-technology')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Closed-Loop Filtration
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('batch-traceability')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Ultrasound Fullness Testing
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('certifications')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Zero Antibiotic Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Logistics & Compliance */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Global Trade Desks
            </div>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-300 font-medium">Asia-Pacific Logistics Hub:</span>
                <span className="block text-slate-500">Changi Air Cargo (SIN)</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">North America Trade Desk:</span>
                <span className="block text-slate-500">Los Angeles (LAX) Cold Chain</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">European Union Inspection:</span>
                <span className="block text-slate-500">Frankfurt Cargo Hub (FRA)</span>
              </li>
              <li>
                <button
                  onClick={() => onOpenInquiry('Consignment Scheduling Request')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline underline-offset-2"
                >
                  Book Direct Flight Consignment
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.brandName}. {t.footerRights}
          </div>
          <div className="flex items-center gap-6">
            <span>Codex CXC 52-2003 Compliant</span>
            <span>ASC Mangrove Conservation Partner</span>
            <span>Cold-Chain 14°C Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
