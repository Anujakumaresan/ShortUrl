import React from 'react';

export const DeleteModal = ({ url, onClose, onConfirm }) => {
  if (!url) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--error)' }}>Delete URL?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Are you sure you want to delete the short URL for <strong>{url.shortId}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => onConfirm(url.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
