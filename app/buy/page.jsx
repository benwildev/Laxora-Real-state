'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

export default function BuyPage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [budget, setBudget] = useState('10000000');
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const steps = [
    {
      num: '01',
      title: 'Confidential Buyer Briefing',
      desc: 'We conduct an encrypted consultation to outline your lifestyle preferences, tax jurisdiction criteria, and architectural desires.',
      icon: 'fa-user-shield',
    },
    {
      num: '02',
      title: 'Off-Market & Pre-Market Discovery',
      desc: 'Gain exclusive access to private trophy properties not listed on public MLS registries or international portals.',
      icon: 'fa-key',
    },
    {
      num: '03',
      title: 'Private Chauffeur Viewings',
      desc: 'Accompanied in-person chauffeured tours or live encrypted 4K virtual drone walkthroughs with our senior advisors.',
      icon: 'fa-car-side',
    },
    {
      num: '04',
      title: 'Institutional Escrow & Closing',
      desc: 'Cross-border legal, taxation, and title settlement desks ensure frictionless acquisition in over 23 global countries.',
      icon: 'fa-file-signature',
    },
  ];

  return (
    <main className="subpage-wrapper">
      <Navbar onOpenTourModal={() => setIsTourModalOpen(true)} />

      {/* Header Banner */}
      <section className="subpage-hero-section">
        <div className="section-container">
          <div className="subpage-hero-content">
            <div className="breadcrumbs-nav">
              <Link href="/">Home</Link>
              <i className="fa-solid fa-chevron-right"></i>
              <span>Buy</span>
            </div>
            <h1 className="subpage-title">Luxury Property Acquisition</h1>
            <p className="subpage-subtitle">
              Bespoke advisory and confidential representation for high-net-worth buyers acquiring premier real estate worldwide.
            </p>
            <div className="subpage-cta-row">
              <button onClick={() => setIsTourModalOpen(true)} className="btn btn-gold">
                <span>Book VIP Buyer Consultation</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <Link href="/properties" className="btn btn-glass">
                <span>Explore Current Portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Acquisition Journey Steps */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">THE LUXORA METHOD</span>
            <h2 className="section-title">The Four-Step Acquisition Journey</h2>
            <p className="section-subtext">How we represent discerning buyers with fiduciary precision</p>
          </div>

          <div className="journey-grid">
            {steps.map((step) => (
              <div key={step.num} className="journey-card glass-card">
                <div className="journey-card-top">
                  <span className="journey-num">{step.num}</span>
                  <div className="journey-icon-circle">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                </div>
                <h3 className="journey-title">{step.title}</h3>
                <p className="journey-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Services & Financing Section */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="buyer-benefits-grid">
            <div className="buyer-benefits-info glass-card">
              <h3 className="service-box-title">Why Elite Buyers Choose Luxora</h3>
              <ul className="luxury-check-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <strong>100% Discretion & NDA Protection:</strong>
                    <p>Buyer identity is protected through institutional escrow and blind trusts.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <strong>Proprietary Valuation Models:</strong>
                    <p>We negotiate from factual asset yield models, avoiding inflated market premiums.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <strong>Cross-Border Golden Visa Desks:</strong>
                    <p>Direct residency by investment support across the USA, UAE, UK, and EU.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <strong>Post-Closing Concierge Division:</strong>
                    <p>Immediate handover, luxury furnishing procurement, and estate staff recruitment.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="buyer-calc-box glass-card">
              <h3 className="service-box-title">Instant Buyer Capacity Estimator</h3>
              <p className="calc-sub">Estimate investment allocation and institutional financing leverage.</p>

              <div className="form-group mb-16">
                <label className="form-label">Target Acquisition Budget: ${parseInt(budget, 10).toLocaleString()}</label>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="500000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="luxury-slider"
                />
              </div>

              <div className="calc-breakdown-box">
                <div className="breakdown-row">
                  <span>Down Payment (30% Private Bank):</span>
                  <strong>${(parseInt(budget, 10) * 0.3).toLocaleString()}</strong>
                </div>
                <div className="breakdown-row">
                  <span>Financed Principal:</span>
                  <strong>${(parseInt(budget, 10) * 0.7).toLocaleString()}</strong>
                </div>
                <div className="breakdown-row highlight">
                  <span>Est. Monthly Jumbo Payment (5.8%):</span>
                  <strong>${Math.round((parseInt(budget, 10) * 0.7 * 0.058) / 12).toLocaleString()}/mo</strong>
                </div>
              </div>

              <button
                onClick={() => setIsTourModalOpen(true)}
                className="btn btn-gold w-full mt-20"
              >
                <span>Request Private Financing Pre-Approval</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals & Toast */}
      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onBooked={({ title, message }) => showToast(title, message, 'success')}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      <Footer onToast={showToast} onOpenTourModal={() => setIsTourModalOpen(true)} />
    </main>
  );
}
