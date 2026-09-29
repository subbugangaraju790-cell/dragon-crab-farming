import { useState, useId } from 'react';
import { Search, ShieldCheck, CheckCircle, FileText, ArrowRight, Award, Compass } from 'lucide-react';
import { BATCH_RECORDS } from '../data/crabData';
import { BatchRecord } from '../types/crab';
import { useLanguage } from '../context/LanguageContext';

export function BatchVerification() {
  const [searchQuery, setSearchQuery] = useState('DCF-2026-B84');
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(BATCH_RECORDS[0]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const { t } = useLanguage();
  const batchSearchInputId = useId();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSearched(true);
    const found = BATCH_RECORDS.find(
      (b) => b.batchId.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    setSelectedBatch(found || null);
  };

  const handleSelectBatch = (batch: BatchRecord) => {
    setSearchQuery(batch.batchId);
    setSelectedBatch(batch);
    setHasSearched(false);
  };

  return (
    <section id="batch-traceability" className="py-20 lg:py-28 bg-slate-900/40 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              {t.batchKicker}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.batchTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.batchDescription}
            </p>
          </div>

          {/* Quick Sample Selector */}
          <div className="space-y-1 text-xs">
            <span className="text-slate-400 block font-medium">Quick Inspection Sample Codes:</span>
            <div className="flex flex-wrap gap-2">
              {BATCH_RECORDS.map((b) => (
                <button
                  key={b.batchId}
                  onClick={() => handleSelectBatch(b)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                    selectedBatch?.batchId === b.batchId
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {b.batchId}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <label htmlFor={batchSearchInputId} className="sr-only">Batch or Master Box QR Code</label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id={batchSearchInputId}
                type="text"
                placeholder={t.batchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.batchVerifyBtn}
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {selectedBatch ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Top Status Header */}
            <div className="p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Certified Batch ID: <strong className="text-white">{selectedBatch.batchId}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Harvested: {selectedBatch.harvestDate}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {selectedBatch.grade}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Logistics Status</span>
                  <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{selectedBatch.status}</span>
                  </span>
                </div>

                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Phytosanitary Certificate</span>
                </button>
              </div>
            </div>

            {/* Core Verification Data Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Meat Fullness Score */}
              <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">{t.batchMeatDensity}</span>
                <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                  {selectedBatch.meatFullnessScore}%
                </div>
                <div className="text-[11px] text-slate-400">
                  Target threshold &gt;88% for Grade-A certification.
                </div>
              </div>

              {/* Shell Durometer */}
              <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">{t.batchDurometer}</span>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {selectedBatch.shellDurometer} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Dense mineralized shell preventing transit cracking.
                </div>
              </div>

              {/* Biocell Origin */}
              <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">{t.batchApartmentCluster}</span>
                <div className="text-sm font-semibold text-white leading-snug">
                  {selectedBatch.pondBiocellCluster}
                </div>
                <div className="text-[11px] text-slate-400">
                  Isolated water circuit with closed UV loop.
                </div>
              </div>

              {/* Veterinary Clearance */}
              <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-medium">{t.batchVetClearance}</span>
                <div className="text-sm font-semibold text-cyan-300 font-mono">
                  {selectedBatch.vetClearanceNo}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Negative for WSSV / EHP pathogens</span>
                </div>
              </div>
            </div>

            {/* Water Quality at Harvest & Transit Route */}
            <div className="px-6 pb-6 pt-0 border-t border-slate-800/80 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                    Aquaculture Water Parameters Recorded at Harvest
                  </span>
                  <div className="grid grid-cols-3 gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Salinity</span>
                      <span className="font-semibold text-white">{selectedBatch.waterQualityLog.salinity}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Water pH</span>
                      <span className="font-semibold text-white">{selectedBatch.waterQualityLog.ph}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Water Temp</span>
                      <span className="font-semibold text-white">{selectedBatch.waterQualityLog.temperature}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                    Cold-Chain Export Route & Destination
                  </span>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-slate-300 font-medium">Departure: {selectedBatch.departureHub}</div>
                    <div className="text-cyan-400 font-medium">Final Consignee: {selectedBatch.destination}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-2">
            <p className="text-slate-300 font-medium">No verified harvest batch found for "{searchQuery}".</p>
            <p className="text-xs text-slate-400">
              Please verify the 10-digit alphanumeric code on your EPS master box or bill of lading.
            </p>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {showCertificateModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Official Export Sanitary Clearance
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono bg-slate-950 p-5 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
              <div className="text-center font-bold text-white border-b border-slate-800 pb-2">
                DRAGON CRAB FARMING AQUACULTURE CO., LTD.<br />
                CERTIFICATE OF AQUATIC ANIMAL HEALTH & EXPORT QUALITY
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>BATCH ID: <span className="text-cyan-300 font-bold">{selectedBatch.batchId}</span></div>
                <div>DOC NO: <span className="text-white">{selectedBatch.vetClearanceNo}</span></div>
                <div>SPECIES: <span className="text-white">{selectedBatch.grade}</span></div>
                <div>HARVEST DATE: <span className="text-white">{selectedBatch.harvestDate}</span></div>
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-[11px] space-y-1">
                <div>PATHOGEN TESTING REPORT:</div>
                <div className="text-emerald-400 pl-2">✓ WSSV (White Spot Syndrome): NOT DETECTED (RT-PCR)</div>
                <div className="text-emerald-400 pl-2">✓ TSV / YHV / EHP: NOT DETECTED</div>
                <div className="text-emerald-400 pl-2">✓ CHLORAMPHENICOL / NITROFURANS: ZERO RESIDUE</div>
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-[11px] text-slate-400">
                This crustacean consignment complies with Codex Alimentarius Seafood Hygiene Code CXC 52-2003 and has been cleared for immediate international air transport.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
