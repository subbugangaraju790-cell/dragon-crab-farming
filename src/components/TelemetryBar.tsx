import { useState } from 'react';
import { Activity, Droplets, Thermometer, Wind, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';
import { TELEMETRY_SECTORS } from '../data/crabData';
import { useLanguage } from '../context/LanguageContext';

export function TelemetryBar() {
  const [selectedSectorId, setSelectedSectorId] = useState('SEC-A');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t } = useLanguage();

  const activeSector = TELEMETRY_SECTORS.find((s) => s.sectorId === selectedSectorId) || TELEMETRY_SECTORS[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section id="water-telemetry" className="bg-slate-900/60 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with sector controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.telemetryKicker}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.telemetryTitle}
            </h2>
          </div>

          {/* Sector Selector Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
              {TELEMETRY_SECTORS.map((sector) => (
                <button
                  key={sector.sectorId}
                  onClick={() => setSelectedSectorId(sector.sectorId)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    selectedSectorId === sector.sectorId
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sector.sectorId === 'SEC-A' ? t.telemetrySectorHard : sector.sectorId === 'SEC-B' ? t.telemetrySectorRoe : t.telemetrySectorSoft}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              title="Poll Sensor Nodes"
              aria-label="Poll Sensor Nodes"
              className="p-2 text-slate-400 hover:text-cyan-300 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Salinity */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetrySalinity}</span>
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              {activeSector.salinity.toFixed(1)} <span className="text-xs font-normal text-slate-400">ppt</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{t.telemetrySalinityNote}</span>
            </div>
          </div>

          {/* Dissolved Oxygen */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetryOxygen}</span>
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              {activeSector.dissolvedOxygen.toFixed(1)} <span className="text-xs font-normal text-slate-400">mg/L</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{t.telemetryOxygenNote}</span>
            </div>
          </div>

          {/* Water Temperature */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetryTemp}</span>
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              {activeSector.temperature.toFixed(1)} <span className="text-xs font-normal text-slate-400">°C</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{t.telemetryTempNote}</span>
            </div>
          </div>

          {/* Water pH */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetryPh}</span>
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              {activeSector.ph.toFixed(2)}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{t.telemetryPhNote}</span>
            </div>
          </div>

          {/* Ammonia TAN */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetryAmmonia}</span>
              <Cpu className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums tracking-tight">
              &lt;{activeSector.ammonia.toFixed(3)} <span className="text-xs font-normal text-slate-400">ppm</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{t.telemetryAmmoniaNote}</span>
            </div>
          </div>

          {/* Recirculation Rate */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.telemetryFlow}</span>
              <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
              {activeSector.waterFlowRate.toLocaleString()} <span className="text-xs font-normal text-slate-400">m³/h</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{t.telemetryStatus}: <strong className="text-cyan-300 font-medium">{activeSector.filtrationStatus}</strong></span>
            </div>
          </div>
        </div>

        {/* Sector Context Caption */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">{activeSector.sectorName}</span>
            <span aria-hidden="true">·</span>
            <span>{activeSector.activeApartments.toLocaleString()} Active Biocells</span>
            <span aria-hidden="true">·</span>
            <span>UV-C Dosage: 400 J/m² Continuous</span>
          </div>
          <div className="text-slate-400">
            {t.telemetryFootnote}
          </div>
        </div>
      </div>
    </section>
  );
}
