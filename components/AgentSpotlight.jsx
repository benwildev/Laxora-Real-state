'use client';

export default function AgentSpotlight({ onOpenAgentModal }) {
  return (
    <section className="section agent-metrics-section" id="about">
      <div className="section-container">
        <div className="agent-metrics-layout glass-card">
          {/* Left: Agent Spotlight */}
          <div className="agent-spotlight">
            <div className="agent-badge-title">
              <span>Meet Our Top Advisor</span>
            </div>
            <div className="agent-profile-wrap">
              <div className="agent-avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Isabella Martinez"
                  className="agent-avatar"
                  loading="lazy"
                />
              </div>
              <div className="agent-bio-details">
                <h3 className="agent-name">Isabella Martinez</h3>
                <p className="agent-role">Managing Director, International Luxury Estates</p>
                <p className="agent-desc">
                  With over 12 years of fiduciary advisory across Beverly Hills, London, and Dubai, Isabella specializes in confidential off-market acquisitions and global real estate portfolios.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenAgentModal && onOpenAgentModal()}
                  className="btn btn-gold btn-sm"
                >
                  <span>View Full Profile & Track Record</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="section-vertical-divider"></div>

          {/* Right: Performance Metrics */}
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-icon-wrap"><i className="fa-solid fa-chart-line"></i></div>
              <h4 className="metric-value">$2.8B+</h4>
              <p className="metric-label">Career Volume</p>
            </div>

            <div className="metric-item">
              <div className="metric-icon-wrap"><i className="fa-solid fa-building-user"></i></div>
              <h4 className="metric-value">950+</h4>
              <p className="metric-label">Estates Brokered</p>
            </div>

            <div className="metric-item">
              <div className="metric-icon-wrap"><i className="fa-solid fa-globe"></i></div>
              <h4 className="metric-value">23</h4>
              <p className="metric-label">Global Desks</p>
            </div>

            <div className="metric-item">
              <div className="metric-icon-wrap"><i className="fa-solid fa-award"></i></div>
              <h4 className="metric-value">12+</h4>
              <p className="metric-label">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
