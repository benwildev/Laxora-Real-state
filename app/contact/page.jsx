'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Estate Acquisition',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Private Estate Acquisition',
        message: '',
      });
      showToast(
        'Inquiry Transmitted',
        'Thank you. A senior managing director will contact you via your preferred secure channel within 2 hours.'
      );
    }, 700);
  };

  const officeSalons = [
    {
      city: 'Beverly Hills Flagship',
      address: '450 North Rodeo Drive, Beverly Hills, CA 90210',
      tel: '+1 (800) 123-4567',
      email: 'beverlyhills@luxoraproperties.com',
      hours: 'Mon – Sat: 9:00 AM – 7:00 PM PST',
    },
    {
      city: 'Manhattan Private Salon',
      address: '767 Fifth Avenue, Manhattan, NY 10153',
      tel: '+1 (212) 890-1200',
      email: 'manhattan@luxoraproperties.com',
      hours: 'Mon – Sat: 9:00 AM – 7:00 PM EST',
    },
    {
      city: 'Mayfair London Desk',
      address: '14 Berkeley Square, Mayfair, London W1J 6AE',
      tel: '+44 (20) 7946-0921',
      email: 'london@luxoraproperties.com',
      hours: 'Mon – Sat: 9:00 AM – 6:00 PM GMT',
    },
    {
      city: 'Dubai International Financial Centre',
      address: 'Burj Khalifa District, Downtown Dubai, UAE',
      tel: '+971 (4) 382-9000',
      email: 'dubai@luxoraproperties.com',
      hours: 'Mon – Sat: 10:00 AM – 8:00 PM GST',
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
              <span>Contact</span>
            </div>
            <h1 className="subpage-title">Global Salons & Private Concierge</h1>
            <p className="subpage-subtitle">
              Direct access to our senior luxury fiduciaries across North America, Europe, the Middle East, and Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="contact-main-grid">
            {/* Left: Contact Form */}
            <div className="contact-form-card glass-card">
              <div className="contact-form-header">
                <span className="modal-badge">DIRECT FIDUCIARY CHANNEL</span>
                <h2 className="section-title">Confidential Consultation Request</h2>
                <p className="section-subtext">All submissions are protected under institutional NDA protocols.</p>
              </div>

              <form onSubmit={handleSubmit} className="modal-form mt-20">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Lord Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confidential Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="e.g. client@familyoffice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nature of Inquiry</label>
                    <select
                      className="form-input"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    >
                      <option value="Private Estate Acquisition">Private Estate Acquisition</option>
                      <option value="Discreet Property Listing / Sale">Discreet Property Listing / Sale</option>
                      <option value="Real Estate Investment Fund">Real Estate Investment Fund</option>
                      <option value="Golden Visa & Residency Advisory">Golden Visa & Residency Advisory</option>
                      <option value="Architectural Appraisal">Architectural Appraisal</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Confidential Message & Requirements</label>
                  <textarea
                    rows={4}
                    className="form-input form-textarea"
                    placeholder="Provide details regarding target cities, square footage, budget parameters, or specific estates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold w-full mt-10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Encrypting & Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Private Inquiry</span>
                      <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Direct Concierge & Hours */}
            <div className="contact-side-info">
              <div className="concierge-direct-card glass-card mb-24">
                <div className="concierge-badge">
                  <span className="dot"></span>
                  <span>24/7 PRIVATE DESK ONLINE</span>
                </div>
                <h3 className="concierge-title">Instant VIP Concierge</h3>
                <p className="concierge-desc">
                  For immediate private jet coordination, off-market estate access, or same-day viewings:
                </p>

                <div className="direct-lines-list">
                  <a href="tel:+18001234567" className="direct-line-item">
                    <div className="line-icon"><i className="fa-solid fa-phone"></i></div>
                    <div>
                      <span className="line-lbl">Global Direct Line (Toll-Free)</span>
                      <strong className="line-val">+1 (800) 123-4567</strong>
                    </div>
                  </a>
                  <a href="mailto:concierge@luxoraproperties.com" className="direct-line-item">
                    <div className="line-icon"><i className="fa-solid fa-envelope"></i></div>
                    <div>
                      <span className="line-lbl">Encrypted Inquiries</span>
                      <strong className="line-val">concierge@luxoraproperties.com</strong>
                    </div>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTourModalOpen(true)}
                  className="btn btn-glass w-full mt-18"
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>Schedule Private Chauffeur Tour</span>
                </button>
              </div>

              <div className="security-assurance-card glass-card">
                <div className="sec-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div>
                  <h4 className="sec-title">Fiduciary Security Protocol</h4>
                  <p className="sec-desc">All client communications are routed through end-to-end encrypted servers with institutional data deletion guarantees.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Global Salons Grid */}
          <div className="global-salons-section mt-50">
            <div className="section-header-center">
              <span className="modal-badge">GLOBAL PRESENCE</span>
              <h2 className="section-title">Visit Our International Salons</h2>
              <p className="section-subtext">Private appointment bookings available across all locations</p>
            </div>

            <div className="offices-grid mt-30">
              {officeSalons.map((salon, i) => (
                <div key={i} className="office-card glass-card">
                  <div className="office-icon"><i className="fa-solid fa-landmark"></i></div>
                  <h3 className="office-city">{salon.city}</h3>
                  <p className="office-addr">{salon.address}</p>
                  <p className="office-hours"><i className="fa-regular fa-clock"></i> {salon.hours}</p>
                  <a href={`tel:${salon.tel.replace(/[^0-9+]/g, '')}`} className="office-tel">
                    <i className="fa-solid fa-phone"></i> {salon.tel}
                  </a>
                </div>
              ))}
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
