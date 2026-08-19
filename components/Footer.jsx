'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer({ onToast, onOpenTourModal }) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      if (onToast) onToast('Please provide a valid email', 'Enter a valid email address to subscribe.', 'info');
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      if (onToast) {
        onToast(
          'Subscribed to Private Intelligence',
          'Thank you. You will receive confidential market reports and off-market estate releases.'
        );
      }
    }, 600);
  };

  return (
    <footer className="footer-section">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link href="/" className="brand-logo">
              <div className="brand-crest">
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#c59b56" strokeWidth="1.2"/>
                  <path d="M15 12V28H25M15 20H23" stroke="#b88636" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">LUXORA</span>
                <span className="brand-subtitle">PROPERTIES</span>
              </div>
            </Link>
            <p className="footer-desc">
              Redefining luxury real estate with exceptional properties and unmatched client experiences worldwide.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Properties Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Properties</h4>
            <ul className="footer-nav-list">
              <li><Link href="/properties">All Properties</Link></li>
              <li><Link href="/properties">New Listings</Link></li>
              <li><Link href="/properties">Featured Homes</Link></li>
              <li><Link href="/properties">Off Market</Link></li>
              <li><Link href="/sell">Sold Properties</Link></li>
            </ul>
          </div>

          {/* Buy Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Buy</h4>
            <ul className="footer-nav-list">
              <li><Link href="/buy">Search Properties</Link></li>
              <li><Link href="/buy">Buyer Guide</Link></li>
              <li><Link href="/buy">Financing & Escrow</Link></li>
              <li><Link href="/buy">Relocation Services</Link></li>
              <li><Link href="/faq">Buyer FAQs</Link></li>
            </ul>
          </div>

          {/* Sell Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Sell</h4>
            <ul className="footer-nav-list">
              <li><Link href="/sell">List Your Property</Link></li>
              <li><Link href="/sell">Seller Guide</Link></li>
              <li><Link href="/sell">Marketing Plan</Link></li>
              <li><Link href="/sell">Instant Home Valuation</Link></li>
              <li><Link href="/about">Success Stories</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-nav-list">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about">Our Advisors</Link></li>
              <li><Link href="/invest">Investments & Funds</Link></li>
              <li><Link href="/faq">FAQ Knowledgebase</Link></li>
              <li><Link href="/contact">Global Offices & Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="newsletter-sub">Subscribe for exclusive listings and market insights.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-send"
                aria-label="Subscribe to newsletter"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-paper-plane"></i>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-divider-line"></div>

        {/* Bottom Footer Bar */}
        <div className="footer-bottom-row">
          <p className="copyright-text">© 2025 Luxora Properties. All rights reserved.</p>
          <div className="legal-links">
            <Link href="/faq">Privacy Policy</Link>
            <Link href="/faq">Terms of Service</Link>
            <Link href="/">Sitemap</Link>
          </div>
          <div className="designed-by">
            <span>Designed with Excellence</span>
            <i className="fa-solid fa-gem"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
