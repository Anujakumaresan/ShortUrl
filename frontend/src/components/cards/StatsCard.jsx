import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            {title}
          </p>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {value}
          </h3>
        </div>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '12px', 
          background: 'rgba(139, 92, 246, 0.1)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--brand-primary)'
        }}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: trend > 0 ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span style={{ color: 'var(--text-muted)' }}>from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
