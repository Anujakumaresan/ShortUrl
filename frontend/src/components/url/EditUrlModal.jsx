import React, { useState } from 'react';

export const EditUrlModal = ({ url, onClose, onSave }) => {
  const [newUrl, setNewUrl] = useState(url?.originalUrl || '');

  if (!url) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Edit URL</h3>
        <div className="form-group">
          <label className="form-label">Original URL</label>
          <input 
            type="url" 
            className="form-input" 
            value={newUrl} 
            onChange={(e) => setNewUrl(e.target.value)} 
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onSave(url.id, newUrl)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlModal;
