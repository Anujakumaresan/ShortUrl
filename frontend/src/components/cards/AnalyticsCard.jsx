import React from 'react';

const AnalyticsCard = ({ title, children }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        {title}
      </h3>
      <div style={{ flex: 1, minHeight: '300px' }}>
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;
