'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

export default function InvestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const investmentFunds = [
    {
      title: 'Global Prime Core Fund',
      irr: '14.8% Net IRR',
      minInvest: '$1,000,000',
      focus: 'Trophy residential estates in Beverly Hills, Mayfair & Manhattan.',
      badge: 'OPEN FOR SUBSCRIPTION',
    },
    {
      title: 'Dubai & Palm High-Yield Portfolio',
      irr: '18.2% Net IRR',
      minInvest: '$500,000',
      focus: 'Waterfront luxury hospitality & branded residences with tax-free yields.',
      badge: 'FEATURED STRATEGY',
    },
    {
      title: 'European Generational Land Trust',
      irr: '12.4% Net IRR',
      minInvest: '$2,500,000',
      focus: 'Historical vineyards, coastal villas, and private islands across the Mediterranean.',
      badge: 'INSTITUTIONAL ONLY',
    },
  ];

  const marketYields = [
    { city: 'Dubai, UAE', rentalYield: '7.8% Net', capGrowth: '+16.5% YoY', taxRate: '0% Capital Gains' },
    { city: 'Miami, Florida', rentalYield: '6.4% Net', capGrowth: '+12.8% YoY', taxRate: '0% State Income Tax' },
    { city: 'London, UK', rentalYield: '4.5% Net', capGrowth: '+8.2% YoY', taxRate: 'Favorable Non-Dom Regimes' },
    { city: 'Singapore', rentalYield: '3.9% Net', capGrowth: '+10.4% YoY', taxRate: 'Zero Estate Tax' },
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
              <span>Invest</span>
            </div>
            <h1 className="subpage-title">Real Estate Investment & Private Funds</h1>
            <p className="subpage-subtitle">
              Institutional-grade capital allocation, forecast yield optimization, and confidential cross-border wealth preservation.
            </p>
            <div className="subpage-cta-row">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-gold">
                <span>Request 2025-2026 Investment Prospectus</span>
                <i className="fa-solid fa-file-arrow-down"></i>
              </button>
              <a href="#yield-comparison" className="btn btn-glass">
                <span>Global Market Yields</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Active Investment Portfolios */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">PORTFOLIO STRATEGIES</span>
            <h2 className="section-title">Active Investment Vehicles</h2>
            <p className="section-subtext">Curated residential syndications delivering risk-adjusted returns</p>
          </div>

          <div className="funds-grid">
            {investmentFunds.map((fund, i) => (
              <div key={i} className="fund-card glass-card">
                <div className="fund-top">
                  <span className="fund-badge">{fund.badge}</span>
                  <span className="fund-irr">{fund.irr}</span>
                </div>
                <h3 className="fund-title">{fund.title}</h3>
                <p className="fund-desc">{fund.focus}</p>

                <div className="fund-specs">
                  <div className="fund-spec-row">
                    <span>Minimum Commitment:</span>
                    <strong>{fund.minInvest}</strong>
                  </div>
                  <div className="fund-spec-row">
                    <span>Distribution Cycle:</span>
                    <strong>Quarterly Cashflow</strong>
                  </div>
                  <div className="fund-spec-row">
                    <span>Target Horizon:</span>
                    <strong>3 – 5 Years</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    showToast('Prospectus Requested', `Confidential dossier for "${fund.title}" prepared.`);
                  }}
                  className="btn btn-gold btn-sm w-full mt-16"
                >
                  <span>Request Fund Memorandum</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Yield Comparison Table */}
      <section className="section subpage-content-section" id="yield-comparison">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">GLOBAL INTELLIGENCE</span>
            <h2 className="section-title">2025 Global Yield & Appreciation Index</h2>
            <p className="section-subtext">Direct empirical benchmarks monitored by the Luxora Macro Research Desk</p>
          </div>

          <div className="yield-table-wrap glass-card">
            <table className="yield-table">
              <thead>
                <tr>
                  <th>Global Destination</th>
                  <th>Avg Net Rental Yield</th>
                  <th>YoY Capital Growth</th>
                  <th>Tax & Residency Advantage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marketYields.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{row.city}</strong>
                    </td>
                    <td><span className="yield-val">{row.rentalYield}</span></td>
                    <td><span className="growth-val positive">{row.capGrowth}</span></td>
                    <td><span className="tax-val">{row.taxRate}</span></td>
                    <td>
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          showToast('Market Briefing', `Private market report for ${row.city} sent.`);
                        }}
                        className="btn btn-glass btn-sm"
                      >
                        View Portfolios
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
