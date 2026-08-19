'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenTourModal }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar glass-panel">
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

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li className={`nav-item ${isActive('/properties') ? 'active' : ''}`}>
            <Link href="/properties" onClick={() => setMobileMenuOpen(false)}>Properties</Link>
          </li>
          <li className={`nav-item ${isActive('/buy') ? 'active' : ''}`}>
            <Link href="/buy" onClick={() => setMobileMenuOpen(false)}>Buy</Link>
          </li>
          <li className={`nav-item ${isActive('/sell') ? 'active' : ''}`}>
            <Link href="/sell" onClick={() => setMobileMenuOpen(false)}>Sell</Link>
          </li>
          <li className={`nav-item ${isActive('/invest') ? 'active' : ''}`}>
            <Link href="/invest" onClick={() => setMobileMenuOpen(false)}>Invest</Link>
          </li>
          <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          </li>
          {/* Mobile Drawer Bottom Actions — shown only when drawer is open */}
          {mobileMenuOpen && (
            <li className="mobile-drawer-actions">
              <a href="tel:+18001234567" className="mobile-phone-btn">
                <i className="fa-solid fa-phone"></i>
                <span>+1 (800) 123-4567</span>
              </a>
              <Link
                href="/contact"
                className="btn btn-gold btn-sm w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          <a href="tel:+18001234567" className="nav-phone">
            <i className="fa-solid fa-phone"></i>
            <span>+1 (800) 123-4567</span>
          </a>
          <Link href="/contact" className="btn btn-gold btn-sm">
            Contact Us
          </Link>
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
