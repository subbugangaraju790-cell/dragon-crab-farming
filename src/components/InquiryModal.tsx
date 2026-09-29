import { useState, useEffect, useId } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export function InquiryModal({ isOpen, onClose, initialSubject = 'Wholesale Commercial Quotation' }: InquiryModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: initialSubject,
    details: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const modalNameInputId = useId();
  const modalCompanyInputId = useId();
  const modalEmailInputId = useId();
  const modalPhoneInputId = useId();
  const modalSubjectInputId = useId();
  const modalNotesInputId = useId();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: initialSubject }));
    setIsSuccess(false);
    setError('');
  }, [initialSubject, isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your contact name and email address.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900 border border-slate-700/80 rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Inquiry Dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="modal-success"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-emerald-950 border border-emerald-600 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Request Received by Export Desk
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our senior seafood trade specialist has received your quotation request for <strong className="text-cyan-300">{formData.subject}</strong> and will follow up with direct air cargo flight timetables and FOB/CIF pro-forma pricing.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="modal-form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onSubmit={handleSubmit}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Commercial Export Trade Desk</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Request Wholesale Quotation
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Direct procurement inquiries for seafood importers, restaurant groups, and distributors.
                    </p>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label htmlFor={modalSubjectInputId} className="text-slate-300 font-semibold block">Inquiry Topic</label>
                    <input
                      id={modalSubjectInputId}
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor={modalNameInputId} className="text-slate-300 font-semibold block">{t.contactFullName} *</label>
                      <input
                        id={modalNameInputId}
                        type="text"
                        required
                        placeholder="e.g. Alex Wong"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor={modalCompanyInputId} className="text-slate-300 font-semibold block">{t.contactCompany} *</label>
                      <input
                        id={modalCompanyInputId}
                        type="text"
                        required
                        placeholder="e.g. Ocean Harvest Ltd."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor={modalEmailInputId} className="text-slate-300 font-semibold block">{t.contactEmail} *</label>
                      <input
                        id={modalEmailInputId}
                        type="email"
                        required
                        placeholder="trade@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor={modalPhoneInputId} className="text-slate-300 font-semibold block">{t.contactPhone}</label>
                      <input
                        id={modalPhoneInputId}
                        type="tel"
                        placeholder="+65 8000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={modalNotesInputId} className="text-slate-300 font-semibold block">Consignment Notes & Destination Airport</label>
                    <textarea
                      id={modalNotesInputId}
                      rows={3}
                      placeholder="Requested volume (kg), target airport (e.g. HKG, SIN, LAX), frequency..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.contactSubmitBtn}</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
