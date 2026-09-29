import { ShieldCheck, Award, FileCheck, CheckCircle2, Download } from 'lucide-react';
import { CERTIFICATIONS } from '../data/crabData';
import { useLanguage } from '../context/LanguageContext';

export function CertificationsSection() {
  const { t } = useLanguage();

  const handleDownloadSpec = (title: string) => {
    // Generate simple compliant text summary file download
    const content = `DRAGON CRAB FARMING - OFFICIAL QUALITY COMPLIANCE CERTIFICATE\n\nStandard: ${title}\nAudit Status: Fully Certified & Active (2026-2027)\nInspection Body: Marine Biosecurity & Seafood Safety Authority\nScope: Vertical Indoor Recirculating Aquaculture System (RAS) & Cold-Chain Air Export.\nPathogen Verification: WSSV Negative, Zero Antibiotic Residues.\n\nDragon Crab Farming Aquaculture Co., Ltd.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DragonCrab-${title.replace(/[^a-zA-Z0-9]/g, '_')}-Audit.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="certifications" className="py-20 lg:py-28 bg-slate-900/30 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            {t.certKicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.certTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.certDescription}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.code}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-cyan-950/60 border border-cyan-800/60 rounded-lg text-cyan-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {cert.code}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Audited</span>
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Issuing Authority: <span className="text-slate-300">{cert.authority}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Validity: Continuous Q3 2026 – Q4 2027</span>
                <button
                  onClick={() => handleDownloadSpec(cert.title)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audit Summary</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Biosecurity Commitment Banner */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-900/40 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="text-base font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t.certMangroveCommitment}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.certMangroveDesc}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs whitespace-nowrap">
            <div className="text-right">
              <span className="text-slate-400 block text-[11px]">ASC Eco-Score</span>
              <span className="text-emerald-400 font-bold text-base">Class A+ (Zero Bycatch)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
