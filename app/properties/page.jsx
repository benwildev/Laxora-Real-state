'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyDetailModal from '@/components/Modals/PropertyDetailModal';
import ScheduleTourModal from '@/components/Modals/ScheduleTourModal';
import ToastNotification from '@/components/ToastNotification';
import Link from 'next/link';

const ALL_PROPERTIES = [
  {
    id: 1,
    title: 'Oceanfront Villa',
    location: 'Malibu, California',
    price: '$8,750,000',
    type: 'Villa',
    beds: '5 Beds',
    baths: '6 Baths',
    sqft: '7,200 sqft',
    badge: 'FEATURED',
    badgeClass: 'badge-featured',
    image: '/assets/property_oceanfront_villa.jpg',
  },
  {
    id: 2,
    title: 'Skyline Penthouse',
    location: 'Dubai Marina, UAE',
    price: '$5,600,000',
    type: 'Penthouse',
    beds: '4 Beds',
    baths: '5 Baths',
    sqft: '5,100 sqft',
    badge: 'NEW LISTING',
    badgeClass: 'badge-new',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Beverly Hills Estate',
    location: 'Beverly Hills, CA',
    price: '$12,900,000',
    type: 'Estate',
    beds: '6 Beds',
    baths: '7 Baths',
    sqft: '9,300 sqft',
    badge: 'EXCLUSIVE',
    badgeClass: 'badge-exclusive',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Luxury Apartment',
    location: 'New York, USA',
    price: '$4,250,000',
    type: 'Apartment',
    beds: '3 Beds',
    baths: '4 Baths',
    sqft: '3,200 sqft',
    badge: 'OFF MARKET',
    badgeClass: 'badge-offmarket',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Bel-Air Modern Palace',
    location: 'Los Angeles, CA',
    price: '$16,500,000',
    type: 'Estate',
    beds: '7 Beds',
    baths: '9 Baths',
    sqft: '11,400 sqft',
    badge: 'EXCLUSIVE',
    badgeClass: 'badge-exclusive',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Mayfair Townhouse',
    location: 'London, UK',
    price: '$9,200,000',
    type: 'Apartment',
    beds: '4 Beds',
    baths: '5 Baths',
    sqft: '4,800 sqft',
    badge: 'FEATURED',
    badgeClass: 'badge-featured',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Palm Jumeirah Signature Villa',
    location: 'Dubai, UAE',
    price: '$14,800,000',
    type: 'Villa',
    beds: '6 Beds',
    baths: '7 Baths',
    sqft: '8,600 sqft',
    badge: 'NEW LISTING',
    badgeClass: 'badge-new',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'South Beach Waterfront Villa',
    location: 'Miami, Florida',
    price: '$11,200,000',
    type: 'Villa',
    beds: '5 Beds',
    baths: '6 Baths',
    sqft: '6,900 sqft',
    badge: 'OFF MARKET',
    badgeClass: 'badge-offmarket',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80',
  },
];

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedBadge, setSelectedBadge] = useState('ALL');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedForTour, setSelectedForTour] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const toggleFav = (prop, e) => {
    e.stopPropagation();
    const next = !favorites[prop.id];
    setFavorites((prev) => ({ ...prev, [prop.id]: next }));
    showToast(
      next ? 'Saved to Portfolio' : 'Removed from Portfolio',
      next ? `"${prop.title}" added to your saved collection.` : `"${prop.title}" removed.`
    );
  };

  const filtered = ALL_PROPERTIES.filter((p) => {
    if (selectedType !== 'ALL' && p.type !== selectedType) return false;
    if (selectedBadge !== 'ALL' && p.badge !== selectedBadge) return false;
    if (searchTerm) {
      const matchTitle = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLoc = p.location.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchTitle && !matchLoc) return false;
    }
    return true;
  });

  return (
    <main className="subpage-wrapper">
      <Navbar onOpenTourModal={() => setIsTourModalOpen(true)} />

      {/* Subpage Header Banner */}
      <section className="subpage-hero-section">
        <div className="section-container">
          <div className="subpage-hero-content">
            <div className="breadcrumbs-nav">
              <Link href="/">Home</Link>
              <i className="fa-solid fa-chevron-right"></i>
              <span>Properties</span>
            </div>
            <h1 className="subpage-title">Exclusive Property Collection</h1>
            <p className="subpage-subtitle">
              Explore ultra-prime residences, private penthouses, and generational estates across the world&apos;s most coveted enclaves.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section className="section subpage-content-section">
        <div className="section-container">
          {/* Filter Bar */}
          <div className="catalog-filter-bar glass-card">
            <div className="catalog-search-wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by city, title, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="catalog-search-input"
              />
            </div>

            <div className="catalog-pills-row">
              <span className="filter-label-inline">Type:</span>
              {['ALL', 'Villa', 'Penthouse', 'Estate', 'Apartment'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`category-pill ${selectedType === t ? 'active' : ''}`}
                  onClick={() => setSelectedType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="catalog-pills-row">
              <span className="filter-label-inline">Status:</span>
              {['ALL', 'FEATURED', 'NEW LISTING', 'EXCLUSIVE', 'OFF MARKET'].map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`category-pill ${selectedBadge === b ? 'active' : ''}`}
                  onClick={() => setSelectedBadge(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-results-header">
            <p className="results-count">Showing <strong>{filtered.length}</strong> luxury residences</p>
          </div>

          {/* Properties Grid */}
          <div className="properties-grid">
            {filtered.length === 0 ? (
              <div className="no-properties-box glass-card">
                <i className="fa-solid fa-house-circle-xmark"></i>
                <h3>No properties found matching your criteria</h3>
                <p>Try resetting filters or search for another location.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('ALL');
                    setSelectedBadge('ALL');
                  }}
                  className="btn btn-gold btn-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filtered.map((prop) => {
                const isFav = !!favorites[prop.id];
                return (
                  <div
                    key={prop.id}
                    className="property-card glass-card clickable-card"
                    onClick={() => setSelectedProperty(prop)}
                  >
                    <div className="property-img-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="property-img"
                        loading="lazy"
                      />
                      <div className="property-badges-row">
                        <span className={`property-badge ${prop.badgeClass}`}>{prop.badge}</span>
                        <button
                          className={`btn-favorite ${isFav ? 'active' : ''}`}
                          onClick={(e) => toggleFav(prop, e)}
                          aria-label={isFav ? 'Remove from saved' : 'Save property'}
                        >
                          <i className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
                        </button>
                      </div>
                    </div>

                    <div className="property-details">
                      <div className="property-header-info">
                        <span className="property-location-tag">
                          <i className="fa-solid fa-location-dot"></i> {prop.location}
                        </span>
                        <h3 className="property-title">{prop.title}</h3>
                      </div>

                      <div className="property-specs">
                        <span className="spec-item">
                          <i className="fa-solid fa-bed"></i> {prop.beds}
                        </span>
                        <span className="spec-item">
                          <i className="fa-solid fa-bath"></i> {prop.baths}
                        </span>
                        <span className="spec-item">
                          <i className="fa-solid fa-vector-square"></i> {prop.sqft}
                        </span>
                      </div>

                      <div className="property-footer">
                        <div className="property-price-wrap">
                          <span className="price-label">Price</span>
                          <span className="property-price">{prop.price}</span>
                        </div>
                        <div className="property-view-btn" title="View Estate Dossier">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Modals & Toast */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleTour={(p) => {
          setSelectedForTour(p);
          setIsTourModalOpen(true);
        }}
        onSavedToast={(t, m) => showToast(t, m, 'success')}
      />

      <ScheduleTourModal
        isOpen={isTourModalOpen}
        initialProperty={selectedForTour}
        onClose={() => setIsTourModalOpen(false)}
        onBooked={({ title, message }) => showToast(title, message, 'success')}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      <Footer onToast={showToast} onOpenTourModal={() => setIsTourModalOpen(true)} />
    </main>
  );
}
