import { useState, useId } from 'react';
import { Send, CheckCircle2, Building2, Phone, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function TurnkeyConsultation() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: 'Wholesale Supply Agreement',
    estimatedMonthlyVolume: '250 - 500 kg',
    destinationCity: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fullNameInputId = useId();
  const companyInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const inquiryTypeSelectId = useId();
  const volumeSelectId = useId();
  const destinationInputId = useId();
  const messageInputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      setErrorMessage('Please provide your name, company name, and commercial email.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid commercial email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
  };

  return (
    <section id="contact-consultation" className="py-20 lg:py-28 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                {t.contactKicker}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t.contactTitle}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.contactDescription}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Aquaculture Facility & Hatchery Nursery</div>
                  <div className="text-slate-400">Coastal Marine Bio-Tech Park, Sector 4, Straits of Malacca / South China Sea Gateway</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">International Export Trade Desk</div>
                  <div className="text-slate-400">Direct Cold-Chain Consolidation at Changi Airfreight Hub (SIN) & KLIA Cargo (KUL)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Electronic Procurement Communication</div>
                  <div className="text-slate-400">trade@dragoncrabfarming.com · inquiries@dragoncrabfarming.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Operational Availability</div>
                  <div className="text-slate-400">Live Packing & Air Cargo Despatch 24/7 · Mon - Sun</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="inquiry-submitted"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="py-12 px-4 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-600 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Procurement Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. An export commercial specialist from Dragon Crab Farming has received your request for <strong className="text-cyan-300">{formData.inquiryType}</strong> and will follow up with complete FOB/CIF rate cards within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          companyName: '',
                          email: '',
                          phone: '',
                          inquiryType: 'Wholesale Supply Agreement',
                          estimatedMonthlyVolume: '250 - 500 kg',
                          destinationCity: '',
                          message: '',
                        });
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="inquiry-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onSubmit={handleSubmit}
                  className="space-y-4 text-xs"
                >
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.contactFormTitle}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Please provide your business requirements for an official quotation.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={fullNameInputId} className="text-slate-300 font-semibold block">{t.contactFullName} *</label>
                      <input
                        id={fullNameInputId}
                        type="text"
                        required
                        placeholder="e.g. John Chen"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={companyInputId} className="text-slate-300 font-semibold block">{t.contactCompany} *</label>
                      <input
                        id={companyInputId}
                        type="text"
                        required
                        placeholder="e.g. Pacific Seafood Wholesalers"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={emailInputId} className="text-slate-300 font-semibold block">{t.contactEmail} *</label>
                      <input
                        id={emailInputId}
                        type="email"
                        required
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={phoneInputId} className="text-slate-300 font-semibold block">{t.contactPhone}</label>
                      <input
                        id={phoneInputId}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={inquiryTypeSelectId} className="text-slate-300 font-semibold block">{t.contactInquiryType}</label>
                      <select
                        id={inquiryTypeSelectId}
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-xs"
                      >
                        <option value="Wholesale Supply Agreement">Wholesale Live Export Supply</option>
                        <option value="Turnkey RAS Farm Setup">Turnkey RAS Crab Apartment Setup</option>
                        <option value="Hatchery Seedling Supply">SPF Seedling Crablets Supply</option>
                        <option value="Facility Tour & Audit">Schedule On-Site Bio-Facility Audit</option>
                        <option value="Custom Import Contract">Custom Distributor Contract</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={volumeSelectId} className="text-slate-300 font-semibold block">{t.contactVolume}</label>
                      <select
                        id={volumeSelectId}
                        value={formData.estimatedMonthlyVolume}
                        onChange={(e) => setFormData({ ...formData, estimatedMonthlyVolume: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-xs"
                      >
                        <option value="50 - 100 kg (Sample / Trial)">50 - 100 kg (Trial Flight)</option>
                        <option value="250 - 500 kg">250 - 500 kg / month</option>
                        <option value="500 - 1,500 kg">500 - 1,500 kg / month</option>
                        <option value="2,000 kg+ (Container / Pallet Airfreight)">2,000 kg+ / month (Cargo Pallet)</option>
                        <option value="Turnkey Hardware Only">Turnkey Hardware Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={destinationInputId} className="text-slate-300 font-semibold block">{t.contactDestination}</label>
                    <input
                      id={destinationInputId}
                      type="text"
                      placeholder="e.g. Hong Kong HKG, Tokyo NRT, Los Angeles LAX, Singapore SIN"
                      value={formData.destinationCity}
                      onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={messageInputId} className="text-slate-300 font-semibold block">{t.contactMessage}</label>
                    <textarea
                      id={messageInputId}
                      rows={3}
                      placeholder="Provide details on requested weight grades (e.g. King XL 1kg+, Coral Females), preferred flight schedules, or turnkey aquaculture questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-lg transition-all shadow-[0_4px_16px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.contactSubmitBtn}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
