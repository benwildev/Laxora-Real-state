'use client';

import { useState, useEffect } from 'react';

export default function ScheduleTourModal({ isOpen, onClose, initialProperty, onBooked }) {
  const [tourType, setTourType] = useState('in-person');
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: initialProperty ? initialProperty.title : 'Oceanfront Villa, Malibu',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProperty) {
      setFormData((prev) => ({ ...prev, property: initialProperty.title }));
    }
  }, [initialProperty]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      if (onBooked) {
        onBooked({
          title: 'Private Tour Confirmed!',
          message: `Your ${tourType === 'in-person' ? 'VIP In-Person' : '4K Virtual'} tour for "${formData.property}" on ${selectedDate} at ${selectedTime} has been reserved. A Senior Advisor will contact you shortly.`,
        });
      }
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog schedule-modal-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge">VIP CONCIERGE</span>
            <h3 className="modal-title">Schedule a Private Tour</h3>
            <p className="modal-sub">Experience this world-class estate with dedicated luxury advisors.</p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Tour Type Toggle */}
          <div className="tour-type-toggle">
            <button
              type="button"
              className={`tour-type-btn ${tourType === 'in-person' ? 'active' : ''}`}
              onClick={() => setTourType('in-person')}
            >
              <i className="fa-solid fa-car"></i>
              <span>Chauffeur Accompanied (In-Person)</span>
            </button>
            <button
              type="button"
              className={`tour-type-btn ${tourType === 'virtual' ? 'active' : ''}`}
              onClick={() => setTourType('virtual')}
            >
              <i className="fa-solid fa-video"></i>
              <span>4K Live Virtual Walkthrough</span>
            </button>
          </div>

          {/* Property Select */}
          <div className="form-group">
            <label className="form-label">Selected Property</label>
            <input
              type="text"
              className="form-input"
              value={formData.property}
              onChange={(e) => setFormData({ ...formData, property: e.target.value })}
              required
            />
          </div>

          {/* Date and Time Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input
                type="date"
                className="form-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Time Slot</label>
              <select
                className="form-input"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="10:00">10:00 AM (Morning VIP)</option>
                <option value="12:30">12:30 PM (Midday)</option>
                <option value="14:00">02:00 PM (Afternoon Sunset)</option>
                <option value="16:30">04:30 PM (Golden Hour Viewing)</option>
                <option value="18:00">06:00 PM (Twilight Architectural)</option>
              </select>
            </div>
          </div>

          {/* Contact Details Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Lord Alexander Wright"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="alexander@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone (with country code)</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+1 (555) 000-1234"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Special Requests / NDA Requirements</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Helipad access required, security detail accompaniment, private banking verification..."
              rows="2"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-glass btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Securing Private Reservation...</span>
                </>
              ) : (
                <>
                  <span>Confirm VIP Tour Booking</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
