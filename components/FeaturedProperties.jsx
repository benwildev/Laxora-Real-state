'use client';

import { useState } from 'react';

const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: 'Oceanfront Villa',
    location: 'Malibu, California',
    price: '$8,750,000',
    type: 'Oceanfront Villa',
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
    type: 'Skyline Penthouse',
    beds: '4 Beds',
    baths: '5 Baths',
    sqft: '5,100 sqft',
    badge: 'NEW',
    badgeClass: 'badge-new',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Beverly Hills Estate',
    location: 'Beverly Hills, CA',
    price: '$12,900,000',
    type: 'Beverly Hills Estate',
    beds: '6 Beds',
    baths: '7 Baths',
    sqft: '9,300 sqft',
    badge: 'EXCLUSIVE',
    badgeClass: 'badge-exclusive',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Tribeca Private Loft',
    location: 'New York, USA',
    price: '$4,250,000',
    type: 'Luxury Apartment',
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
    type: 'Beverly Hills Estate',
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
    type: 'Luxury Apartment',
    beds: '4 Beds',
    baths: '5 Baths',
    sqft: '4,800 sqft',
    badge: 'FEATURED',
    badgeClass: 'badge-featured',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Palm Beach Waterfront Manor',
    location: 'Miami Beach, FL',
    price: '$14,800,000',
    type: 'Oceanfront Villa',
    beds: '6 Beds',
    baths: '8 Baths',
    sqft: '8,900 sqft',
    badge: 'NEW',
    badgeClass: 'badge-new',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Monaco Harbor Penthouse',
    location: 'Monaco / Côte d\'Azur',
    price: '$21,000,000',
    type: 'Skyline Penthouse',
    beds: '4 Beds',
    baths: '5 Baths',
    sqft: '4,600 sqft',
    badge: 'EXCLUSIVE',
    badgeClass: 'badge-exclusive',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Knightsbridge Private Mansion',
    location: 'London, UK',
    price: '$17,500,000',
    type: 'Historic Mansion',
    beds: '6 Beds',
    baths: '7 Baths',
    sqft: '8,400 sqft',
    badge: 'OFF MARKET',
    badgeClass: 'badge-offmarket',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'Aspen Alpine Sanctuary',
    location: 'Aspen, Colorado',
    price: '$11,200,000',
    type: 'Historic Mansion',
    beds: '5 Beds',
    baths: '6 Baths',
    sqft: '7,800 sqft',
    badge: 'NEW',
    badgeClass: 'badge-new',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
];

export default function FeaturedProperties({ onSelectProperty, onToast, filters, onResetFilters }) {
  const [favorites, setFavorites] = useState({});
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const toggleFavorite = (prop, e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !favorites[prop.id];
    setFavorites((prev) => ({ ...prev, [prop.id]: nextState }));
    if (onToast) {
      onToast(
        nextState ? 'Saved to Portfolio' : 'Removed from Portfolio',
        nextState
          ? `"${prop.title}" added to your saved luxury collection.`
          : `"${prop.title}" removed from your collection.`
      );
    }
  };

  // Filter properties based on category and SearchFilter state
  const filtered = INITIAL_PROPERTIES.filter((p) => {
    if (filterCategory !== 'ALL') {
      const badgeUpper = p.badge.toUpperCase();
      if (filterCategory === 'FEATURED' && !badgeUpper.includes('FEATURED')) return false;
      if (filterCategory === 'NEW' && !badgeUpper.includes('NEW')) return false;
      if (filterCategory === 'EXCLUSIVE' && !badgeUpper.includes('EXCLUSIVE')) return false;
      if (filterCategory === 'OFF MARKET' && !badgeUpper.includes('OFF MARKET')) return false;
    }
    if (filters) {
      if (filters.location && filters.location !== 'All Locations') {
        const queryLoc = filters.location.toLowerCase().split(',')[0].trim();
        if (!p.location.toLowerCase().includes(queryLoc)) return false;
      }
      if (filters.propertyType && filters.propertyType !== 'All Types' && p.type !== filters.propertyType) {
        return false;
      }
    }
    return true;
  });

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 4 >= filtered.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? Math.max(0, filtered.length - 4) : prev - 1));
  };

  const handleReset = () => {
    setFilterCategory('ALL');
    setCarouselIndex(0);
    if (onResetFilters) onResetFilters();
  };

  const visibleProperties = filtered.slice(carouselIndex, carouselIndex + 4);

  return (
    <section className="section featured-properties-section" id="properties">
      <div className="section-container">
        {/* Header Bar */}
        <div className="section-header-bar glass-card">
          <div>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtext">Showing {filtered.length} curated luxury residences</p>
          </div>

          <div className="section-header-right">
            {/* Filter Category Pills */}
            <div className="category-filter-pills">
              {['ALL', 'FEATURED', 'NEW', 'EXCLUSIVE', 'OFF MARKET'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setFilterCategory(cat);
                    setCarouselIndex(0);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="carousel-nav-buttons">
              <button onClick={handlePrev} className="carousel-btn prev-btn" aria-label="Previous properties">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button onClick={handleNext} className="carousel-btn next-btn" aria-label="Next properties">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {visibleProperties.length === 0 ? (
            <div className="no-properties-box glass-card">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
              <h3>No exact match found</h3>
              <p>Adjust your search criteria or explore off-market estates directly with our advisors.</p>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-gold btn-sm mt-10"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            visibleProperties.map((prop) => {
              const isFav = !!favorites[prop.id];
              return (
                <div
                  key={prop.id}
                  className="property-card glass-card clickable-card"
                  onClick={() => onSelectProperty && onSelectProperty(prop)}
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
                        onClick={(e) => toggleFavorite(prop, e)}
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
  );
}
