'use client';

export default function Hero({ onOpenTourModal }) {
  const scrollToProperties = (e) => {
    e.preventDefault();
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-text-block">
          <h1 className="hero-title">
            Discover Extraordinary
            <span className="hero-title-serif">Luxury Living</span>
          </h1>
          <p className="hero-subtitle">
            Explore curated collections of the world&apos;s most exclusive homes and investment properties.
          </p>
          <div className="hero-btn-group">
            <button
              onClick={() => onOpenTourModal && onOpenTourModal()}
              className="btn btn-gold"
            >
              <span>Schedule a Private Tour</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button
              onClick={scrollToProperties}
              className="btn btn-glass"
            >
              <span>Explore Properties</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
