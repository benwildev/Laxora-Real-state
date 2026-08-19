'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    quote: '"From the first consultation to closing, Luxora Properties provided unmatched expertise and personalized service. Truly a world-class experience."',
    author: 'Michael Thompson',
    title: 'Private Equity Principal, New York',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: 'Acquired $14.2M Tribeca Penthouse',
  },
  {
    quote: '"The attention to detail and curated access to off-market estates in Beverly Hills surpassed all our expectations. Exceptional discretion and professionalism."',
    author: 'Elena Rostova',
    title: 'Technology Founder, London',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: 'Acquired $18.5M Bel-Air Estate',
  },
  {
    quote: '"Securing our Dubai penthouse through Luxora was completely frictionless. Their international advisory team is simply without equal."',
    author: 'David & Sarah Chen',
    title: 'Family Office Directors, Singapore',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: 'Acquired $8.9M Palm Jumeirah Villa',
  },
];

export default function TestimonialsInvestments({ onOpenVideoModal, onOpenTourModal, onToast }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="section testimonials-investments-section" id="invest">
      <div className="section-container">
        <div className="testimonials-investments-grid">
          {/* Left: Client Testimonial */}
          <div className="testimonial-card glass-card">
            <div>
              <div className="testimonial-card-header">
                <span className="card-badge-sm"><i className="fa-solid fa-star"></i> CLIENT VERIFIED</span>
                <h2 className="section-title">What Our Clients Say</h2>
              </div>
              <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
              <p className="testimonial-text">{current.quote}</p>
            </div>

            <div>
              <div className="testimonial-author-row">
                <div className="author-avatar-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={current.avatar} alt={current.author} className="author-avatar" />
                </div>
                <div className="author-meta">
                  <h4 className="author-name">{current.author}</h4>
                  <p className="author-title">{current.title}</p>
                  <span className="author-verified-tag"><i className="fa-solid fa-shield-check"></i> {current.verified}</span>
                </div>
              </div>

              <div className="testimonial-pagination">
                <div className="test-nav-arrows">
                  <button onClick={handlePrev} className="test-arrow-btn" aria-label="Previous testimonial">
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button onClick={handleNext} className="test-arrow-btn" aria-label="Next testimonial">
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
                <div className="test-dots">
                  {TESTIMONIALS.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`dot ${i === activeIdx ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Video Preview Card with Real Modal Trigger */}
          <div
            className="video-preview-card glass-card clickable-video-card"
            onClick={() => onOpenVideoModal && onOpenVideoModal()}
            role="button"
            tabIndex={0}
            aria-label="Play 4K Architecture Video Tour"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Villa Video Preview"
              className="video-thumb"
            />
            <div className="video-overlay">
              <div className="video-play-btn" aria-hidden="true">
                <i className="fa-solid fa-play"></i>
              </div>
              <div className="video-bottom-caption">
                <i className="fa-solid fa-film"></i>
                <span>Watch 4K Architecture Tour</span>
              </div>
            </div>
          </div>

          {/* Right: Exclusive Investment Opportunities */}
          <div className="investment-info-card glass-card">
            <div>
              <span className="card-badge-sm gold"><i className="fa-solid fa-chart-line"></i> CAPITAL GROWTH</span>
              <h3 className="investment-title">Exclusive Investment Opportunities</h3>
              <p className="investment-subtitle">
                Institutional-grade luxury real estate funds with forecast yields and historical capital appreciation.
              </p>
            </div>

            <div className="investment-features-list">
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-arrow-trend-up"></i></div>
                <div>
                  <span className="feature-text">14.8% Projected Net IRR</span>
                  <p className="feature-sub">Multi-family & luxury rental yields</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-chart-pie"></i></div>
                <div>
                  <span className="feature-text">Discretionary Portfolio Allocation</span>
                  <p className="feature-sub">Fiduciary wealth preservation</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-briefcase"></i></div>
                <div>
                  <span className="feature-text">Cross-Border Title Desks</span>
                  <p className="feature-sub">Golden visa & tax optimization</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenTourModal) onOpenTourModal();
              }}
              className="btn btn-gold btn-sm w-full"
            >
              <span>Request Private Investment Prospectus</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
