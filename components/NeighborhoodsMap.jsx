'use client';

import { useState, useEffect, useRef } from 'react';

const DESTINATIONS = [
  {
    id: 'beverly-hills',
    name: 'Beverly Hills',
    state: 'California, USA',
    lat: 34.0736,
    lng: -118.4004,
    zoom: 13,
    avgPrice: '$2,850/sqft',
    estates: 42,
    yoy: '+14.2%',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    state: 'Dubai, UAE',
    lat: 25.1124,
    lng: 55.1390,
    zoom: 13,
    avgPrice: '$1,950/sqft',
    estates: 54,
    yoy: '+18.5%',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach',
    state: 'Florida, USA',
    lat: 25.7907,
    lng: -80.1300,
    zoom: 13,
    avgPrice: '$2,400/sqft',
    estates: 29,
    yoy: '+12.8%',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'manhattan',
    name: 'Manhattan (Tribeca)',
    state: 'New York, USA',
    lat: 40.7180,
    lng: -74.0080,
    zoom: 13,
    avgPrice: '$3,100/sqft',
    estates: 36,
    yoy: '+9.4%',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80',
  },
];

export default function NeighborhoodsMap({ onSelectNeighborhood, onToast }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const tileLayerRef = useRef(null);

  const [activeDest, setActiveDest] = useState(DESTINATIONS[0]);
  const [mapType, setMapType] = useState('carto'); // 'carto' | 'satellite' | 'osm'

  // Initialize Real Leaflet Map on client
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically load Leaflet
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Handle React double-mount
      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Create Leaflet instance
      const map = L.map(mapContainerRef.current, {
        center: [DESTINATIONS[0].lat, DESTINATIONS[0].lng],
        zoom: 12,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Reliable Tile Layer URLs without undefined sub-properties
      const getTileUrl = (type) => {
        if (type === 'satellite') {
          return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        }
        return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
      };

      const tileLayer = L.tileLayer(getTileUrl(mapType), {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Custom Gold Pulse DivIcon Marker
      const customIcon = L.divIcon({
        className: 'luxury-map-pin-div',
        html: `
          <div class="luxury-pin-beacon">
            <span class="pulse-wave"></span>
            <div class="pin-core"><i class="fa-solid fa-gem"></i></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      // Add Markers for all destinations
      markersRef.current = DESTINATIONS.map((dest) => {
        const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setActiveDest(dest);
          map.flyTo([dest.lat, dest.lng], 13, { duration: 1.5 });
          if (onToast) {
            onToast(`Selected Enclave: ${dest.name}`, `Avg ${dest.avgPrice} • ${dest.estates} Portfolios`);
          }
        });

        // Popup
        marker.bindPopup(`
          <div class="real-map-popup">
            <div class="popup-img-wrap">
              <img src="${dest.image}" alt="${dest.name}" />
              <span class="popup-badge">${dest.estates} Estates</span>
            </div>
            <div class="popup-body">
              <h4 class="popup-title">${dest.name}</h4>
              <p class="popup-sub">${dest.state}</p>
              <div class="popup-metrics">
                <span>Avg: <strong>${dest.avgPrice}</strong></span>
                <span class="trend">${dest.yoy} YoY</span>
              </div>
            </div>
          </div>
        `);

        return { marker, dest };
      });

      // Invalidate size once rendered in container
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 700);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle Map Tile Switch
  const switchMapType = (type) => {
    setMapType(type);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    const newUrl =
      type === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

    tileLayerRef.current.setUrl(newUrl);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  };

  // Fly to destination when card is clicked
  const handleFlyTo = (dest) => {
    setActiveDest(dest);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      mapInstanceRef.current.flyTo([dest.lat, dest.lng], dest.zoom || 13, { duration: 1.8 });
    }
  };

  const resetWorldView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      mapInstanceRef.current.flyTo([25, 10], 2, { duration: 1.5 });
    }
  };

  return (
    <section className="section neighborhoods-map-section">
      <div className="section-container">
        {/* Unified Top Header Bar */}
        <div className="section-header-bar glass-card mb-24">
          <div>
            <h2 className="section-title">Explore Prime Neighborhoods</h2>
            <p className="section-subtext">Click any enclave to explore live on the interactive satellite map</p>
          </div>
          <button
            onClick={() => onSelectNeighborhood && onSelectNeighborhood(activeDest)}
            className="view-all-link"
          >
            <span>Full Area Dossier</span>
            <div className="link-circle-arrow"><i className="fa-solid fa-arrow-right"></i></div>
          </button>
        </div>

        {/* 2 Equal Columns Grid */}
        <div className="neighborhoods-equal-grid">
          {/* Left Column: 2x2 Balanced Enclave Cards Grid */}
          <div className="neighborhoods-2x2-container">
            {DESTINATIONS.map((n) => {
              const isSelected = activeDest?.id === n.id;
              return (
                <div
                  key={n.id}
                  className={`neighborhood-card glass-card clickable-card ${isSelected ? 'active-enclave' : ''}`}
                  onClick={() => handleFlyTo(n)}
                >
                  <div className="neighborhood-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={n.image} alt={n.name} className="neighborhood-img" loading="lazy" />
                    <div className="card-click-hint"><i className="fa-solid fa-location-crosshairs"></i></div>
                    <span className="enclave-estates-badge">{n.estates} Estates</span>
                  </div>
                  <div className="neighborhood-info">
                    <div>
                      <h4 className="neighborhood-name">{n.name}</h4>
                      <p className="neighborhood-state">{n.state}</p>
                    </div>
                    <span className={`circle-btn ${isSelected ? 'selected' : ''}`} aria-label={`Fly to ${n.name}`}>
                      <i className="fa-solid fa-crosshairs"></i>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Real Interactive Leaflet Satellite / Street Map */}
          <div className="map-block glass-card real-map-card equal-map-card">
            <div className="real-map-topbar">
              <div className="real-map-title-wrap">
                <span className="live-gps-dot"></span>
                <h3 className="map-title">Global Real Estate Map</h3>
              </div>

              {/* Map Layer Switcher & Controls */}
              <div className="map-control-pills">
                <button
                  type="button"
                  className={`map-pill-btn ${mapType === 'carto' ? 'active' : ''}`}
                  onClick={() => switchMapType('carto')}
                >
                  <i className="fa-solid fa-map"></i> Cartography
                </button>
                <button
                  type="button"
                  className={`map-pill-btn ${mapType === 'satellite' ? 'active' : ''}`}
                  onClick={() => switchMapType('satellite')}
                >
                  <i className="fa-solid fa-earth-americas"></i> Satellite
                </button>
                <button
                  type="button"
                  className="map-pill-btn reset-btn"
                  onClick={resetWorldView}
                  title="Reset World View"
                >
                  <i className="fa-solid fa-globe"></i>
                </button>
              </div>
            </div>

            {/* Real Map Canvas Container */}
            <div className="real-leaflet-map-wrapper">
              <div ref={mapContainerRef} className="leaflet-map-canvas" />

              {/* Floating Real-Time Enclave Intel Card */}
              {activeDest && (
                <div className="map-floating-intel-box glass-card">
                  <div className="intel-header">
                    <div className="intel-icon"><i className="fa-solid fa-location-dot"></i></div>
                    <div>
                      <h4 className="intel-title">{activeDest.name}</h4>
                      <p className="intel-loc">{activeDest.state}</p>
                    </div>
                  </div>

                  <div className="intel-metrics-row">
                    <div className="intel-metric">
                      <span className="lbl">Average Sqft</span>
                      <strong className="val">{activeDest.avgPrice}</strong>
                    </div>
                    <div className="intel-metric">
                      <span className="lbl">Appreciation</span>
                      <strong className="val green">{activeDest.yoy}</strong>
                    </div>
                    <div className="intel-metric">
                      <span className="lbl">Portfolio</span>
                      <strong className="val">{activeDest.estates} Available</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectNeighborhood && onSelectNeighborhood(activeDest)}
                    className="btn btn-gold btn-sm w-full mt-10"
                  >
                    <span>View {activeDest.name} Portfolio</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
