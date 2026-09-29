import { useState } from 'react';
import { Menu, X, ArrowUpRight, Compass, IndianRupee } from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, toggleCurrency } = useCurrency();
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2.5 shrink-0"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] inline-block" />
          <span>{t.brandName}</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollTo('species-catalog')} 
            className="hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            {t.navSpecies}
          </button>
          <button 
            onClick={() => scrollTo('ras-technology')} 
            className="hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            {t.navRasTech}
          </button>
          <button 
            onClick={() => scrollTo('wholesale-estimator')} 
            className="hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            {t.navWholesale}
          </button>
          <button 
            onClick={() => scrollTo('batch-traceability')} 
            className="hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            {t.navTraceability}
          </button>
          <button 
            onClick={() => scrollTo('certifications')} 
            className="hover:text-cyan-300 transition-colors cursor-pointer py-1"
          >
            {t.navCertifications}
          </button>
        </nav>

        {/* Zone 3: Controls (Language Switcher, Currency Toggle, Telemetry, Request Quote) */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            title="Toggle Currency (INR ₹ / USD $)"
            className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-bold text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{currency}</span>
          </button>

          <button
            onClick={() => scrollTo('water-telemetry')}
            className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 px-3 py-2 border border-cyan-800/60 rounded-md hover:bg-cyan-950/40 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.navTelemetry}</span>
          </button>

          <button
            onClick={() => onOpenInquiry('Wholesale Export Inquiry')}
            className="text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 px-4 py-2 rounded-md transition-all shadow-[0_2px_14px_rgba(34,211,238,0.25)] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>{t.navRequestQuote}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <LanguageSwitcher compact />

          <button
            onClick={toggleCurrency}
            className="px-2 py-1 text-xs font-bold text-cyan-300 bg-slate-900 border border-slate-800 rounded"
          >
            {currency}
          </button>

          <button
            onClick={() => onOpenInquiry('Quick Inquiry')}
            className="text-xs font-semibold text-slate-950 bg-cyan-400 px-2.5 py-1.5 rounded-md"
          >
            {t.navQuote}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/98 px-5 py-4 space-y-3">
          <button
            onClick={() => scrollTo('species-catalog')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            {t.navSpecies}
          </button>
          <button
            onClick={() => scrollTo('ras-technology')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            {t.navRasTech}
          </button>
          <button
            onClick={() => scrollTo('wholesale-estimator')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            {t.navWholesale}
          </button>
          <button
            onClick={() => scrollTo('batch-traceability')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            {t.navTraceability}
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            {t.navCertifications}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry('Wholesale Procurement Inquiry');
            }}
            className="w-full text-center py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-md mt-2"
          >
            {t.navRequestQuote}
          </button>
        </div>
      )}
    </header>
  );
}
