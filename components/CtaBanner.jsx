'use client';

export default function CtaBanner({ onOpenTourModal }) {
  return (
    <section className="cta-banner-section" id="contact">
      <div className="section-container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Ready to Acquire Your Dream Estate?</h2>
            <p className="cta-banner-sub">Connect directly with our senior luxury fiduciaries for confidential portfolio access.</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenTourModal && onOpenTourModal()}
            className="btn btn-white"
          >
            <span>Start Private Consultation</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
