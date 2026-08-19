'use client';

import { useEffect } from 'react';

export default function NeighborhoodModal({ neighborhood, isOpen, onClose, onExploreProperties }) {
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

  if (!isOpen || !neighborhood) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog neighborhood-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="neighborhood-modal-banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={neighborhood.image} alt={neighborhood.name} className="neighborhood-banner-img" />
          <button onClick={onClose} className="modal-close-btn banner-close" aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="neighborhood-banner-overlay">
            <span className="n-tag">PRIME DESTINATION REPORT</span>
            <h2 className="n-title">{neighborhood.name}</h2>
            <p className="n-loc"><i className="fa-solid fa-location-dot"></i> {neighborhood.state}</p>
          </div>
        </div>

        <div className="neighborhood-modal-body">
          {/* Market Stats Strip */}
          <div className="n-stats-grid">
            <div className="n-stat-item glass-card">
              <span className="lbl">Avg Price / Sqft</span>
              <h4 className="val">$2,450</h4>
              <span className="trend positive"><i className="fa-solid fa-arrow-trend-up"></i> +14.2% YoY</span>
            </div>
            <div className="n-stat-item glass-card">
              <span className="lbl">Active Portfolios</span>
              <h4 className="val">28 Estates</h4>
              <span className="trend">12 Off-Market</span>
            </div>
            <div className="n-stat-item glass-card">
              <span className="lbl">Safety & Privacy</span>
              <h4 className="val">9.9 / 10</h4>
              <span className="trend">Gated Fencing</span>
            </div>
            <div className="n-stat-item glass-card">
              <span className="lbl">Airport Transit</span>
              <h4 className="val">18 Mins</h4>
              <span className="trend">Private Jet FBO</span>
            </div>
          </div>

          <div className="n-info-content">
            <h4 className="n-section-h">Neighborhood Intelligence</h4>
            <p className="n-text">
              Renowned globally for world-class architectural estates, Michelin-starred gastronomy, and private golf & yacht clubs. Our international advisory division currently oversees multiple generational properties and trophy acquisitions within this prestigious enclave.
            </p>
          </div>

          <div className="neighborhood-modal-footer">
            <button
              onClick={() => {
                onClose();
                if (onExploreProperties) onExploreProperties(neighborhood.name);
              }}
              className="btn btn-gold"
            >
              <span>View Available {neighborhood.name} Estates</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
