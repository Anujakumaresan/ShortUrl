import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastMessage = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} color="var(--success)" />,
    error: <AlertCircle size={20} color="var(--error)" />,
    info: <Info size={20} color="var(--brand-secondary)" />
  };

  const bgColors = {
    success: 'rgba(16, 185, 129, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    info: 'rgba(14, 165, 233, 0.1)'
  };

  const borderColors = {
    success: 'rgba(16, 185, 129, 0.2)',
    error: 'rgba(239, 68, 68, 0.2)',
    info: 'rgba(14, 165, 233, 0.2)'
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${borderColors[type]}`,
      borderRadius: '8px',
      boxShadow: 'var(--shadow-lg)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{ background: bgColors[type], padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
        {icons[type]}
      </div>
      <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem', margin: 0, paddingRight: '1rem' }}>
        {message}
      </p>
      <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex' }}>
        <X size={18} />
      </button>
    </div>
  );
};

export default ToastMessage;
