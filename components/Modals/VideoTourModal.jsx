'use client';

import { useState, useEffect } from 'react';

export default function VideoTourModal({ isOpen, onClose, onScheduleTour }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog video-tour-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <div className="video-meta">
            <span className="live-tag"><i className="fa-solid fa-circle"></i> 4K ULTRA HD CINEMATIC TOUR</span>
            <h3 className="video-modal-title">The Bel-Air Crown Estate Walkthrough</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close video tour">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Video Player Screen */}
        <div className="cinematic-player-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
            alt="Cinematic Villa Tour"
            className="video-sim-img"
          />
          <div className="player-controls-overlay">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="player-play-toggle"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <div className="player-progress-bar">
              <div className="player-progress-fill" style={{ width: '42%' }}></div>
            </div>
            <div className="player-time-row">
              <span>03:45 / 08:20 (4K HDR 60FPS)</span>
              <div className="player-action-icons">
                <i className="fa-solid fa-volume-high"></i>
                <i className="fa-solid fa-expand"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="video-modal-footer">
          <p className="video-desc">
            Hosted by Isabella Martinez, Senior Luxury Advisor. Architectural tour of primary living wings, subterranean automotive gallery, and sunset infinity deck.
          </p>
          <button
            onClick={() => {
              onClose();
              if (onScheduleTour) onScheduleTour({ title: 'The Bel-Air Crown Estate' });
            }}
            className="btn btn-gold btn-sm"
          >
            <span>Book Private In-Person Visit</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
