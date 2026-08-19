'use client';

import { useEffect } from 'react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast-card glass-panel ${toast.type || 'success'}`}>
        <div className="toast-icon">
          {toast.type === 'info' ? (
            <i className="fa-solid fa-circle-info"></i>
          ) : (
            <i className="fa-solid fa-circle-check"></i>
          )}
        </div>
        <div className="toast-content">
          <h4 className="toast-title">{toast.title || 'Notification'}</h4>
          <p className="toast-message">{toast.message}</p>
        </div>
        <button onClick={onClose} className="toast-close-btn" aria-label="Close notification">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
