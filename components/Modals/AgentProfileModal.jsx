'use client';

import { useState, useEffect } from 'react';

export default function AgentProfileModal({ isOpen, onClose, onScheduleConsultation }) {
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConsultationSubmitted(true);
    setTimeout(() => {
      setConsultationSubmitted(false);
      onClose();
      if (onScheduleConsultation) {
        onScheduleConsultation({
          title: 'Consultation Request Sent',
          message: 'Isabella Martinez has received your VIP inquiry and will connect via encrypted channel.',
        });
      }
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog agent-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="agent-dialog-header">
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="agent-modal-grid">
          {/* Left Column: Avatar & Quick Info */}
          <div className="agent-col-left">
            <div className="agent-modal-avatar-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Isabella Martinez"
                className="agent-modal-avatar"
              />
              <span className="verified-agent-badge">
                <i className="fa-solid fa-certificate"></i> TOP 0.1% GLOBAL ADVISOR
              </span>
            </div>

            <div className="agent-quick-stats">
              <div className="agent-stat">
                <span className="num">$2.8B+</span>
                <span className="lbl">Career Volume</span>
              </div>
              <div className="agent-stat">
                <span className="num">12+</span>
                <span className="lbl">Years in Luxury</span>
              </div>
              <div className="agent-stat">
                <span className="num">23</span>
                <span className="lbl">Global Hubs</span>
              </div>
            </div>

            <div className="agent-contact-info">
              <a href="tel:+18001234567" className="agent-direct-link">
                <i className="fa-solid fa-phone"></i>
                <span>Direct: +1 (800) 123-4567</span>
              </a>
              <a href="mailto:isabella@luxoraproperties.com" className="agent-direct-link">
                <i className="fa-solid fa-envelope"></i>
                <span>isabella@luxoraproperties.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Booking */}
          <div className="agent-col-right">
            <h2 className="agent-modal-name">Isabella Martinez</h2>
            <p className="agent-modal-subtitle">Managing Director, International Luxury Estates</p>

            <p className="agent-modal-bio">
              Ranked among the premier luxury advisors internationally, Isabella Martinez represents royalty, tech pioneers, and private investment syndicates across Beverly Hills, Palm Beach, London, Monaco, and Dubai. Her bespoke advisory combines deep fiduciary discretion with off-market market intelligence.
            </p>

            <div className="agent-credentials">
              <span className="cred-tag"><i className="fa-solid fa-check"></i> Certified Luxury Home Specialist</span>
              <span className="cred-tag"><i className="fa-solid fa-check"></i> International Cross-Border Fiduciary</span>
              <span className="cred-tag"><i className="fa-solid fa-check"></i> Multi-Currency Settlement Expert</span>
            </div>

            <div className="agent-consultation-box glass-card">
              <h4 className="box-title">Request Confidential Consultation</h4>
              <form onSubmit={handleSubmit} className="agent-form">
                <div className="form-row">
                  <input type="text" placeholder="Your Name" className="form-input" required />
                  <input type="email" placeholder="Private Email" className="form-input" required />
                </div>
                <input type="tel" placeholder="Phone / WhatsApp" className="form-input" required />
                <button type="submit" className="btn btn-gold w-full">
                  <span>Send VIP Consultation Request</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
