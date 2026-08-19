'use client';

export default function Preloader({ progress, isLoaded }) {
  return (
    <div id="loader" className={`loader-overlay ${isLoaded ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-crest">
          <svg viewBox="0 0 60 60" width="48" height="48" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#c59b56" strokeWidth="1.5" strokeDasharray="4 2"/>
            <path d="M22 18V42H38M22 30H34" stroke="#e8d08d" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="loader-brand">LUXORA PROPERTIES</div>
        <div className="loader-bar-container">
          <div
            id="loader-bar"
            className="loader-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="loader-status">
          <span id="loader-percent">{progress}%</span>
          <span className="loader-caption">Loading Experience</span>
        </div>
      </div>
    </div>
  );
}
