import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Export Language"
        className={`px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800/90 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
          isOpen ? 'ring-2 ring-cyan-500/50 border-cyan-500/60' : ''
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className="hidden sm:inline font-medium uppercase tracking-wider text-[11px] text-slate-300">
          {compact ? currentOption.code.toUpperCase() : currentOption.code.toUpperCase()}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-950/98 border border-slate-700/80 shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-md"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
            <span>Export Market Languages</span>
            <span className="text-cyan-400 font-mono">i18n</span>
          </div>

          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/70 text-cyan-300 font-bold border border-cyan-800/50'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div>
                      <div className="leading-snug">{lang.nativeLabel}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{lang.label}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
