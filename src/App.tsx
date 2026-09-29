/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TelemetryBar } from './components/TelemetryBar';
import { ProductCatalog } from './components/ProductCatalog';
import { TechnologySection } from './components/TechnologySection';
import { WholesaleCalculator } from './components/WholesaleCalculator';
import { BatchVerification } from './components/BatchVerification';
import { CulinaryShowcase } from './components/CulinaryShowcase';
import { CertificationsSection } from './components/CertificationsSection';
import { TurnkeyConsultation } from './components/TurnkeyConsultation';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { LiveSupportWidget } from './components/LiveSupportWidget';
import { CurrencyProvider } from './components/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { CrabGrade } from './types/crab';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('Wholesale Export Inquiry');
  const [selectedGradeForCalculator, setSelectedGradeForCalculator] = useState<CrabGrade | null>(null);

  const handleOpenInquiry = (subject: string = 'Wholesale Commercial Quotation') => {
    setInquirySubject(subject);
    setInquiryModalOpen(true);
  };

  const handleSelectGradeForQuote = (grade: CrabGrade) => {
    setSelectedGradeForCalculator(grade);
    const element = document.getElementById('wholesale-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTech = () => {
    const element = document.getElementById('ras-technology');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    const element = document.getElementById('wholesale-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
          {/* 3-Zone Navbar */}
          <Navbar onOpenInquiry={handleOpenInquiry} />

          <main className="flex-1">
            {/* Cinematic Hero */}
            <Hero
              onOpenInquiry={handleOpenInquiry}
              onExploreTech={handleExploreTech}
              onOpenEstimator={handleOpenEstimator}
            />

            {/* Real-Time Water Quality & Sensor Telemetry */}
            <TelemetryBar />

            {/* Commercial Products & Grade Catalog */}
            <ProductCatalog
              onSelectForQuote={handleSelectGradeForQuote}
              onOpenInquiry={handleOpenInquiry}
            />

            {/* RAS Engineering & Crab Apartment Architecture */}
            <TechnologySection />

            {/* Interactive B2B Wholesale & Freight Calculator */}
            <WholesaleCalculator
              initialGrade={selectedGradeForCalculator}
              onOpenInquiry={handleOpenInquiry}
            />

            {/* Batch Traceability & Veterinary Inspection Tool */}
            <BatchVerification />

            {/* Culinary Performance & Chef Testimonials */}
            <CulinaryShowcase />

            {/* Environmental Accreditations & ASC Standards */}
            <CertificationsSection />

            {/* Commercial RFP & Consultation Lead Capture */}
            <TurnkeyConsultation />
          </main>

          {/* Quiet Corporate Footer */}
          <Footer onOpenInquiry={handleOpenInquiry} />

          {/* Inquiry Dialog */}
          <InquiryModal
            isOpen={inquiryModalOpen}
            onClose={() => setInquiryModalOpen(false)}
            initialSubject={inquirySubject}
          />

          {/* Floating AI Live Support Desk */}
          <LiveSupportWidget onOpenInquiry={handleOpenInquiry} />
        </div>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
