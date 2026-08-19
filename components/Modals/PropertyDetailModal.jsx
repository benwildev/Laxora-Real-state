'use client';

import { useState, useEffect } from 'react';

export default function PropertyDetailModal({ property, isOpen, onClose, onScheduleTour, onSavedToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [downPayment, setDownPayment] = useState('20');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('5.8');

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

  if (!isOpen || !property) return null;

  const galleryImages = [
    property.image,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  ];

  // Simple Mortgage Estimate
  const priceNumber = parseInt(property.price.replace(/[^0-9]/g, ''), 10) || 5000000;
  const loanPrincipal = priceNumber * (1 - parseFloat(downPayment) / 100);
  const monthlyRate = parseFloat(interestRate) / 100 / 12;
  const numPayments = parseInt(loanTerm, 10) * 12;
  const estimatedMonthly = Math.round(
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog property-detail-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="property-modal-topbar">
          <div className="property-badge-group">
            <span className={`property-badge ${property.badgeClass}`}>{property.badge}</span>
            <span className="estate-id">MLS-ID: #LX-{property.id}892</span>
          </div>
          <div className="modal-actions-right">
            <button
              onClick={() => {
                if (onSavedToast) onSavedToast('Saved to Portfolio', `"${property.title}" has been pinned to your private dossier.`);
              }}
              className="circle-action-btn"
              title="Save to Portfolio"
            >
              <i className="fa-regular fa-heart"></i>
            </button>
            <button
              onClick={() => {
                if (onSavedToast) onSavedToast('Dossier Downloaded', `Confidential PDF brochure for "${property.title}" generated.`);
              }}
              className="circle-action-btn"
              title="Download Brochure"
            >
              <i className="fa-solid fa-file-pdf"></i>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className="property-gallery-viewport">
          {/* Main Image */}
          <div className="gallery-main-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={galleryImages[currentImgIndex]}
              alt={`${property.title} view ${currentImgIndex + 1}`}
              className="gallery-main-img"
            />
            {/* Prev / Next arrows */}
            <button
              className="gallery-arrow prev"
              onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="gallery-arrow next"
              onClick={() => setCurrentImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Image counter */}
            <span className="gallery-counter">{currentImgIndex + 1} / {galleryImages.length}</span>
          </div>

          {/* Thumbnails below */}
          <div className="gallery-thumbs-row">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${idx === currentImgIndex ? 'active' : ''}`}
                onClick={() => setCurrentImgIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Main Property Info */}
        <div className="property-modal-content">
          <div className="property-modal-header-row">
            <div>
              <h2 className="property-modal-title">{property.title}</h2>
              <p className="property-modal-location">
                <i className="fa-solid fa-location-dot"></i> {property.location}
              </p>
            </div>
            <div className="property-modal-price-wrap">
              <span className="price-tag">{property.price}</span>
              <span className="price-term">USD / Freehold Title</span>
            </div>
          </div>

          {/* Quick Specs Strip */}
          <div className="property-specs-strip">
            <div className="spec-strip-item">
              <i className="fa-solid fa-bed"></i>
              <span className="val">{property.beds}</span>
              <span className="lbl">Bedrooms</span>
            </div>
            <div className="spec-strip-item">
              <i className="fa-solid fa-bath"></i>
              <span className="val">{property.baths}</span>
              <span className="lbl">Bathrooms</span>
            </div>
            <div className="spec-strip-item">
              <i className="fa-solid fa-vector-square"></i>
              <span className="val">{property.sqft}</span>
              <span className="lbl">Living Area</span>
            </div>
            <div className="spec-strip-item">
              <i className="fa-solid fa-tree"></i>
              <span className="val">1.4 Acres</span>
              <span className="lbl">Private Lot</span>
            </div>
            <div className="spec-strip-item">
              <i className="fa-solid fa-car"></i>
              <span className="val">6 Bays</span>
              <span className="lbl">Climate Garage</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="modal-tabs-header">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview & Amenities
            </button>
            <button
              className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              Mortgage & ROI Calculator
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="tab-body">
              <p className="property-long-desc">
                An architectural masterpiece offering uninterrupted ocean and horizon vistas. Meticulously engineered with Italian travertine marble, custom floor-to-ceiling automated glass walls, a heated infinity edge pool, 1,200-bottle wine cellar, and integrated biometric security.
              </p>

              <h4 className="amenities-heading">Prime Estate Amenities</h4>
              <div className="amenities-grid">
                <div className="amenity-item"><i className="fa-solid fa-water-ladder"></i> Heated Infinity Pool & Spa</div>
                <div className="amenity-item"><i className="fa-solid fa-wine-glass"></i> Sommelier Wine Cellar</div>
                <div className="amenity-item"><i className="fa-solid fa-shield-halved"></i> 24/7 Monitored Smart Security</div>
                <div className="amenity-item"><i className="fa-solid fa-film"></i> Dolby Atmos Cinema Room</div>
                <div className="amenity-item"><i className="fa-solid fa-dumbbell"></i> Wellness Spa & Technogym</div>
                <div className="amenity-item"><i className="fa-solid fa-helicopter"></i> Private Helipad Permitted</div>
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="tab-body calculator-body">
              <div className="calculator-grid">
                <div className="calc-inputs">
                  <div className="form-group">
                    <label className="form-label">Down Payment (%)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Loan Term (Years)</label>
                    <select
                      className="form-input"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                    >
                      <option value="15">15 Years Fixed</option>
                      <option value="20">20 Years Fixed</option>
                      <option value="30">30 Years Fixed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-input"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="calc-result glass-card">
                  <span className="calc-label">Estimated Monthly Payment</span>
                  <h3 className="calc-value">${estimatedMonthly.toLocaleString()}<span className="mo">/mo</span></h3>
                  <p className="calc-note">Principal & Interest only. Taxes, insurance, and HOA estimated separately.</p>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="property-modal-footer">
            <button
              onClick={() => {
                onClose();
                if (onScheduleTour) onScheduleTour(property);
              }}
              className="btn btn-gold"
            >
              <i className="fa-solid fa-calendar-check"></i>
              <span>Schedule VIP Private Tour</span>
            </button>
            <a
              href="tel:+18001234567"
              className="btn btn-glass"
            >
              <i className="fa-solid fa-phone"></i>
              <span>Speak to Senior Advisor</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
