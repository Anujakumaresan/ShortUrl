import React, { useState } from 'react';
import { Link as LinkIcon, Plus } from 'lucide-react';

const UrlForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ 
      padding: '1.5rem', 
      display: 'flex', 
      gap: '1rem', 
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flex: 1, 
        background: 'var(--bg-tertiary)',
        borderRadius: '8px',
        padding: '0 1rem',
        border: '1px solid var(--border-color)'
      }}>
        <LinkIcon size={20} color="var(--text-muted)" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            padding: '1rem',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: '1rem'
          }}
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading || !url}
        style={{ padding: '1rem 2rem', fontSize: '1rem' }}
      >
        <Plus size={20} />
        {loading ? 'Shortening...' : 'Shorten'}
      </button>
    </form>
  );
};

export default UrlForm;
