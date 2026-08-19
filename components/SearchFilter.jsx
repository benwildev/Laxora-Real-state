'use client';

import { useState, useEffect, useRef } from 'react';

const LOCATIONS = ['All Locations', 'Malibu, CA', 'Dubai Marina', 'Beverly Hills, CA', 'New York, USA', 'London, UK', 'Miami Beach, FL'];
const TYPES = ['All Types', 'Oceanfront Villa', 'Skyline Penthouse', 'Beverly Hills Estate', 'Luxury Apartment', 'Historic Mansion'];
const PRICES = ['Any Price', '$3M - $6M', '$6M - $10M', '$10M - $25M', '$25M+'];
const BEDS = ['Any Beds', '3+ Beds', '4+ Beds', '5+ Beds', '6+ Beds'];

export default function SearchFilter({ onFilterChange }) {
  const [location, setLocation] = useState('All Locations');
  const [propertyType, setPropertyType] = useState('All Types');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [bedrooms, setBedrooms] = useState('Any Beds');

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const filterContainerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleLocationSelect = (val, e) => {
    e.stopPropagation();
    setLocation(val);
    setActiveDropdown(null);
    if (onFilterChange) onFilterChange({ location: val, propertyType, priceRange, bedrooms });
  };

  const handleTypeSelect = (val, e) => {
    e.stopPropagation();
    setPropertyType(val);
    setActiveDropdown(null);
    if (onFilterChange) onFilterChange({ location, propertyType: val, priceRange, bedrooms });
  };

  const handlePriceSelect = (val, e) => {
    e.stopPropagation();
    setPriceRange(val);
    setActiveDropdown(null);
    if (onFilterChange) onFilterChange({ location, propertyType, priceRange: val, bedrooms });
  };

  const handleBedsSelect = (val, e) => {
    e.stopPropagation();
    setBedrooms(val);
    setActiveDropdown(null);
    if (onFilterChange) onFilterChange({ location, propertyType, priceRange, bedrooms: val });
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    if (onFilterChange) {
      onFilterChange({ location, propertyType, priceRange, bedrooms });
    }
    setTimeout(() => {
      setIsSearching(false);
      const el = document.getElementById('properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="search-filter-section">
      <div className="search-filter-container glass-card" ref={filterContainerRef}>
        {/* Location Dropdown */}
        <div className="filter-item-wrapper">
          <div className="filter-item" onClick={(e) => toggleDropdown('location', e)}>
            <div className="filter-icon"><i className="fa-solid fa-location-dot"></i></div>
            <div className="filter-content">
              <span className="filter-label">Location</span>
              <div className="filter-select">
                <span className="selected-val">{location}</span>
                <i className={`fa-solid fa-chevron-down chevron ${activeDropdown === 'location' ? 'open' : ''}`}></i>
              </div>
            </div>
          </div>
          {activeDropdown === 'location' && (
            <div className="filter-dropdown-menu glass-card" onClick={(e) => e.stopPropagation()}>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`filter-opt-btn ${location === loc ? 'active' : ''}`}
                  onClick={(e) => handleLocationSelect(loc, e)}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-divider"></div>

        {/* Property Type Dropdown */}
        <div className="filter-item-wrapper">
          <div className="filter-item" onClick={(e) => toggleDropdown('type', e)}>
            <div className="filter-icon"><i className="fa-solid fa-house-chimney"></i></div>
            <div className="filter-content">
              <span className="filter-label">Property Type</span>
              <div className="filter-select">
                <span className="selected-val">{propertyType}</span>
                <i className={`fa-solid fa-chevron-down chevron ${activeDropdown === 'type' ? 'open' : ''}`}></i>
              </div>
            </div>
          </div>
          {activeDropdown === 'type' && (
            <div className="filter-dropdown-menu glass-card" onClick={(e) => e.stopPropagation()}>
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`filter-opt-btn ${propertyType === t ? 'active' : ''}`}
                  onClick={(e) => handleTypeSelect(t, e)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-divider"></div>

        {/* Price Range Dropdown */}
        <div className="filter-item-wrapper">
          <div className="filter-item" onClick={(e) => toggleDropdown('price', e)}>
            <div className="filter-icon"><i className="fa-solid fa-coins"></i></div>
            <div className="filter-content">
              <span className="filter-label">Price Range</span>
              <div className="filter-select">
                <span className="selected-val">{priceRange}</span>
                <i className={`fa-solid fa-chevron-down chevron ${activeDropdown === 'price' ? 'open' : ''}`}></i>
              </div>
            </div>
          </div>
          {activeDropdown === 'price' && (
            <div className="filter-dropdown-menu glass-card" onClick={(e) => e.stopPropagation()}>
              {PRICES.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`filter-opt-btn ${priceRange === p ? 'active' : ''}`}
                  onClick={(e) => handlePriceSelect(p, e)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-divider"></div>

        {/* Bedrooms Dropdown */}
        <div className="filter-item-wrapper">
          <div className="filter-item" onClick={(e) => toggleDropdown('beds', e)}>
            <div className="filter-icon"><i className="fa-solid fa-bed"></i></div>
            <div className="filter-content">
              <span className="filter-label">Bedrooms</span>
              <div className="filter-select">
                <span className="selected-val">{bedrooms}</span>
                <i className={`fa-solid fa-chevron-down chevron ${activeDropdown === 'beds' ? 'open' : ''}`}></i>
              </div>
            </div>
          </div>
          {activeDropdown === 'beds' && (
            <div className="filter-dropdown-menu glass-card" onClick={(e) => e.stopPropagation()}>
              {BEDS.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`filter-opt-btn ${bedrooms === b ? 'active' : ''}`}
                  onClick={(e) => handleBedsSelect(b, e)}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn btn-gold btn-search"
          aria-label="Search Properties"
          onClick={handleSearchClick}
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Filtering...</span>
            </>
          ) : (
            <>
              <span>Search Properties</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
