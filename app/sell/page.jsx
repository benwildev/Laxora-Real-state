'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

export default function SellPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valuationData, setValuationData] = useState({
    address: '',
    type: 'Villa',
    sqft: '6500',
    beds: '5',
    condition: 'Mint / Newly Renovated',
  });
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const handleCalculateValuation = (e) => {
    e.preventDefault();
    if (!valuationData.address) {
      showToast('Address Required', 'Please enter your property address or city.', 'info');
      return;
    }
    const sqftNum = parseInt(valuationData.sqft, 10) || 5000;
    const baseRate = valuationData.type === 'Estate' ? 1850 : valuationData.type === 'Penthouse' ? 2100 : 1550;
    const lowEst = sqftNum * baseRate;
    const highEst = Math.round(lowEst * 1.22);
    setEstimatedValue({ low: lowEst, high: highEst });
    showToast('Valuation Calculated', `Preliminary estimate: $${(lowEst / 1000000).toFixed(1)}M – $${(highEst / 1000000).toFixed(1)}M USD.`);
  };

  const pastSales = [
    { title: 'The Bel-Air Promontory', loc: 'Los Angeles, CA', price: '$22,500,000', days: '28 Days on Market' },
    { title: 'Tribeca Sky Mansion', loc: 'New York, USA', price: '$17,800,000', days: 'Record $4,100/sqft' },
    { title: 'Palm Jumeirah Crown Villa', loc: 'Dubai, UAE', price: '$14,200,000', days: 'Off-Market Private Sale' },
  ];

  return (
    <main className="subpage-wrapper">
      <Navbar onOpenTourModal={() => setIsModalOpen(true)} />

      {/* Header Banner */}
      <section className="subpage-hero-section">
        <div className="section-container">
          <div className="subpage-hero-content">
            <div className="breadcrumbs-nav">
              <Link href="/">Home</Link>
              <i className="fa-solid fa-chevron-right"></i>
              <span>Sell</span>
            </div>
            <h1 className="subpage-title">List & Sell Your Luxury Estate</h1>
            <p className="subpage-subtitle">
              Unrivaled international marketing reach, targeted family office distribution, and record-setting sales performance.
            </p>
            <div className="subpage-cta-row">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-gold">
                <span>Request Listing Consultation</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <a href="#valuation-tool" className="btn btn-glass">
                <span>Instant Home Valuation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Home Valuation Tool */}
      <section className="section subpage-content-section" id="valuation-tool">
        <div className="section-container">
          <div className="valuation-card-wrapper glass-card">
            <div className="valuation-header">
              <span className="modal-badge">INSTANT MARKET INTELLIGENCE</span>
              <h2 className="section-title">Luxury Property Valuation Estimator</h2>
              <p className="section-subtext">Compute estimated asset valuation based on real-time comparable transaction indices.</p>
            </div>

            <form onSubmit={handleCalculateValuation} className="valuation-form">
              <div className="form-group">
                <label className="form-label">Property Address / City & Country</label>
                <input
                  type="text"
                  placeholder="e.g. 1024 Ocean Way, Malibu, CA"
                  className="form-input"
                  value={valuationData.address}
                  onChange={(e) => setValuationData({ ...valuationData, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    className="form-input"
                    value={valuationData.type}
                    onChange={(e) => setValuationData({ ...valuationData, type: e.target.value })}
                  >
                    <option value="Villa">Oceanfront / Luxury Villa</option>
                    <option value="Penthouse">Skyline Penthouse</option>
                    <option value="Estate">Gated Mega-Estate</option>
                    <option value="Townhouse">Historic Townhouse</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Interior Living Area (Sqft)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={valuationData.sqft}
                    onChange={(e) => setValuationData({ ...valuationData, sqft: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <select
                    className="form-input"
                    value={valuationData.beds}
                    onChange={(e) => setValuationData({ ...valuationData, beds: e.target.value })}
                  >
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms</option>
                    <option value="6+">6+ Bedrooms</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Architectural Condition</label>
                  <select
                    className="form-input"
                    value={valuationData.condition}
                    onChange={(e) => setValuationData({ ...valuationData, condition: e.target.value })}
                  >
                    <option value="Mint">Mint / Newly Renovated</option>
                    <option value="Excellent">Excellent / Move-in Ready</option>
                    <option value="Custom">Custom Architectural Build</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-gold w-full mt-10">
                <i className="fa-solid fa-calculator"></i>
                <span>Calculate Preliminary Valuation Range</span>
              </button>
            </form>

            {estimatedValue && (
              <div className="valuation-result-box glass-card mt-24">
                <span className="res-tag">ESTIMATED ASSET VALUATION RANGE</span>
                <h3 className="res-price">
                  ${(estimatedValue.low / 1000000).toFixed(2)}M – ${(estimatedValue.high / 1000000).toFixed(2)}M <span className="currency">USD</span>
                </h3>
                <p className="res-note">
                  Based on comparable ultra-prime closed transactions in your area. For a comprehensive certified appraisal, schedule an in-person assessment with Isabella Martinez.
                </p>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-gold btn-sm mt-16">
                  <span>Schedule Certified In-Person Appraisal</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Record-Breaking Sales Showcase */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">TRACK RECORD</span>
            <h2 className="section-title">Recent Landmark Sales</h2>
            <p className="section-subtext">Setting new historical price-per-square-foot benchmarks worldwide</p>
          </div>

          <div className="past-sales-grid">
            {pastSales.map((sale, i) => (
              <div key={i} className="past-sale-card glass-card">
                <div className="sale-top">
                  <span className="sale-badge"><i className="fa-solid fa-award"></i> CLOSED RECORD</span>
                  <span className="sale-days">{sale.days}</span>
                </div>
                <h3 className="sale-title">{sale.title}</h3>
                <p className="sale-loc"><i className="fa-solid fa-location-dot"></i> {sale.loc}</p>
                <div className="sale-price-bar">
                  <span className="sale-price">{sale.price}</span>
                  <span className="sale-lbl">Sold via Luxora Private Desks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals & Toast */}
      <ScheduleTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBooked={({ title, message }) => showToast(title, message, 'success')}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      <Footer onToast={showToast} onOpenTourModal={() => setIsModalOpen(true)} />
    </main>
  );
}
