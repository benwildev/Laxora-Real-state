'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

const FAQ_DATA = [
  {
    id: '1',
    category: 'ACQUISITIONS',
    title: 'How does Luxora handle off-market property acquisitions?',
    content: 'Over 40% of our ultra-luxury transactions never reach public MLS registries. We negotiate directly between private family offices and estates through verified fiduciary channels, ensuring total anonymity and zero market inflation.',
  },
  {
    id: '2',
    category: 'ACQUISITIONS',
    title: 'What privacy and NDA measures are standard during viewings?',
    content: 'Every viewer is pre-cleared with proof of funds and executes a binding non-disclosure agreement. Viewings can be conducted with private security escorts, armored transit, or via secure end-to-end encrypted live drone feeds.',
  },
  {
    id: '3',
    category: 'SELLING',
    title: 'How do you determine the valuation of unique architectural estates?',
    content: 'We employ proprietary micro-market regression models coupled with private historical transaction archives, replacement cost assessments, and global buyer sentiment indices rather than basic automated estimates.',
  },
  {
    id: '4',
    category: 'FINANCING',
    title: 'Do you facilitate multi-currency cross-border settlements and crypto?',
    content: 'Yes. Our international banking partners and institutional title escrow desks support USD, EUR, GBP, AED, CHF, and qualified institutional digital asset conversions compliant with global FINCEN/FATF frameworks.',
  },
  {
    id: '5',
    category: 'INTERNATIONAL & VISA',
    title: 'How do residency and Golden Visa programs integrate with property purchase?',
    content: 'In jurisdictions such as the UAE (10-Year Golden Visa), Greece, Portugal, and the Caribbean, our in-house immigration legal counsel coordinates residency applications concurrently with title deed registration.',
  },
  {
    id: '6',
    category: 'FINANCING',
    title: 'What are typical closing costs and fiduciary advisory retainers?',
    content: 'Closing costs vary by jurisdiction (typically 2%–5% covering stamp duty, title insurance, and escrow). Our fiduciary fees are fully disclosed upfront with zero hidden brokerage commissions.',
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ '1': true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory !== 'ALL' && item.category !== activeCategory) return false;
    if (searchQuery) {
      const matchQ = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchA = item.content.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

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
              <span>FAQs</span>
            </div>
            <h1 className="subpage-title">VIP Knowledgebase & FAQs</h1>
            <p className="subpage-subtitle">
              Comprehensive guidance on international acquisitions, off-market security, and fiduciary escrow.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section subpage-content-section">
        <div className="section-container">
          {/* Search and Category Filter */}
          <div className="faq-search-filter-box glass-card mb-30">
            <div className="catalog-search-wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search questions by keyword (e.g. Escrow, Off-Market, Visa)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
            </div>

            <div className="catalog-pills-row">
              {['ALL', 'ACQUISITIONS', 'SELLING', 'FINANCING', 'INTERNATIONAL & VISA'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Refined Accordion05 Container */}
          <div className="faq-accordion-05-wrapper glass-card">
            {filteredFaqs.length === 0 ? (
              <div className="no-properties-box">
                <i className="fa-solid fa-circle-question"></i>
                <h3>No matching questions found</h3>
                <p>Feel free to reach out directly to our senior advisors for private inquiries.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('ALL');
                  }}
                  className="btn btn-gold btn-sm mt-10"
                >
                  Reset FAQ Filter
                </button>
              </div>
            ) : (
              <div className="accordion-05-list">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = !!openItems[faq.id];
                  const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
                  return (
                    <div
                      key={faq.id}
                      className={`accordion-05-item ${isOpen ? 'is-open' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(faq.id)}
                        className="accordion-05-trigger"
                        aria-expanded={isOpen}
                      >
                        <div className="accordion-05-trigger-content">
                          <span className="accordion-05-num">{numStr}</span>
                          <h3 className="accordion-05-title">{faq.title}</h3>
                        </div>
                        <span className="accordion-05-icon-pill">
                          <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                        </span>
                      </button>

                      <div className="accordion-05-body">
                        <div className="accordion-05-content-inner">
                          <p>{faq.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Support Card */}
          <div className="faq-help-card glass-card mt-40">
            <div className="faq-help-content">
              <h3 className="help-title">Have a specific bespoke question?</h3>
              <p className="help-sub">Our managing directors are available 24/7 for confidential buyer and seller inquiries.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-gold">
              <span>Connect with Senior Fiduciary</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
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
