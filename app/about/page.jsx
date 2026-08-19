'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentProfileModal from '@/components/Modals/AgentProfileModal';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

export default function AboutPage() {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const advisors = [
    {
      name: 'Isabella Martinez',
      role: 'Managing Director, International Luxury',
      exp: '12+ Years Experience',
      vol: '$2.8B+ Volume',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Advising royal family offices and tech executives across Beverly Hills, Palm Beach, and Dubai.',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Private Wealth & Syndications',
      exp: '16+ Years Experience',
      vol: '$1.9B+ Volume',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Specializing in trophy commercial-residential conversions and cross-border 1031 exchanges.',
    },
    {
      name: 'Sophia Al-Maktoum',
      role: 'Director, Middle East & Mediterranean',
      exp: '10+ Years Experience',
      vol: '$1.4B+ Volume',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Leading acquisitions across Palm Jumeirah, Emirates Hills, Monaco, and Costa Smeralda.',
    },
    {
      name: 'Henry Sterling',
      role: 'Principal, UK & European Heritage Estates',
      exp: '18+ Years Experience',
      vol: '$2.1B+ Volume',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      bio: 'Representing historic castles, Mayfair townhouses, and generational country estates.',
    },
  ];

  const offices = [
    { city: 'Beverly Hills', address: '450 North Rodeo Drive, Beverly Hills, CA 90210', tel: '+1 (800) 123-4567' },
    { city: 'New York', address: '767 Fifth Avenue, Manhattan, NY 10153', tel: '+1 (212) 890-1200' },
    { city: 'London', address: '14 Berkeley Square, Mayfair, London W1J 6AE', tel: '+44 (20) 7946-0921' },
    { city: 'Dubai', address: 'Burj Khalifa District, Downtown Dubai, UAE', tel: '+971 (4) 382-9000' },
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
              <span>About Us</span>
            </div>
            <h1 className="subpage-title">The Standard in Global Luxury</h1>
            <p className="subpage-subtitle">
              Founded on fiduciary discretion, architectural mastery, and unwavering client advocacy.
            </p>
            <div className="subpage-cta-row">
              <button onClick={() => setIsAgentModalOpen(true)} className="btn btn-gold">
                <span>Meet Isabella Martinez</span>
                <i className="fa-solid fa-user-check"></i>
              </button>
              <Link href="/contact" className="btn btn-glass">
                <span>Global Office Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Values */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="about-heritage-grid">
            <div className="heritage-text-block glass-card">
              <span className="modal-badge">OUR HERITAGE</span>
              <h2 className="section-title">Generational Discretion & Global Reach</h2>
              <p className="about-paragraph">
                For over a decade, Luxora Properties has served as the trusted fiduciary partner to sovereign wealth funds, pioneering entrepreneurs, and discerning private collectors seeking extraordinary architectural assets.
              </p>
              <p className="about-paragraph">
                Unlike volume-driven brokerages, our boutique model operates with strict client confidentiality, rigorous macro-economic valuation modeling, and direct access to off-market generational holdings.
              </p>

              <div className="about-metrics-row">
                <div className="about-metric">
                  <strong>$2.8B+</strong>
                  <span>Career Volume</span>
                </div>
                <div className="about-metric">
                  <strong>23</strong>
                  <span>Global Desks</span>
                </div>
                <div className="about-metric">
                  <strong>99.4%</strong>
                  <span>Client Retention</span>
                </div>
              </div>
            </div>

            <div className="heritage-img-block glass-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxora Architecture"
                className="heritage-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Senior Advisory Team */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">FIDUCIARY LEADERSHIP</span>
            <h2 className="section-title">Senior Luxury Advisory Team</h2>
            <p className="section-subtext">Direct access to the world&apos;s most accomplished real estate fiduciaries</p>
          </div>

          <div className="advisors-grid">
            {advisors.map((adv, idx) => (
              <div key={idx} className="advisor-card glass-card">
                <div className="advisor-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adv.img} alt={adv.name} className="advisor-img" />
                  <span className="advisor-vol-badge">{adv.vol}</span>
                </div>
                <div className="advisor-body">
                  <h3 className="advisor-name">{adv.name}</h3>
                  <p className="advisor-role">{adv.role}</p>
                  <p className="advisor-bio">{adv.bio}</p>
                  <button
                    onClick={() => setIsAgentModalOpen(true)}
                    className="btn btn-gold btn-sm w-full mt-14"
                  >
                    <span>Connect Privately</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="section subpage-content-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="modal-badge">WORLDWIDE PRESENCE</span>
            <h2 className="section-title">Global Desks & Salons</h2>
            <p className="section-subtext">Private client salons located in the world&apos;s foremost financial centers</p>
          </div>

          <div className="offices-grid">
            {offices.map((off, i) => (
              <div key={i} className="office-card glass-card">
                <div className="office-icon"><i className="fa-solid fa-building-columns"></i></div>
                <h3 className="office-city">{off.city}</h3>
                <p className="office-addr">{off.address}</p>
                <a href={`tel:${off.tel.replace(/[^0-9+]/g, '')}`} className="office-tel">
                  <i className="fa-solid fa-phone"></i> {off.tel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals & Toast */}
      <AgentProfileModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        onScheduleConsultation={({ title, message }) => showToast(title, message, 'success')}
      />

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
