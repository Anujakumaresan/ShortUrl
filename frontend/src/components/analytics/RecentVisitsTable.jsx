import React from 'react';
import { formatDate } from '../../utils/formatDate';

const getBrowserBadge = (browser) => {
  const bg = browser === 'Chrome' ? 'rgba(16, 185, 129, 0.1)' : 
             browser === 'Firefox' ? 'rgba(245, 158, 11, 0.1)' : 
             browser === 'Safari' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(148, 163, 184, 0.1)';
  const color = browser === 'Chrome' ? '#10b981' : 
                browser === 'Firefox' ? '#f59e0b' : 
                browser === 'Safari' ? '#3b82f6' : '#64748b';
  return <span style={{ background: bg, color, padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block' }}>{browser || 'Unknown'}</span>;
};

const getDeviceBadge = (device) => {
  const bg = device === 'Desktop' ? 'rgba(99, 102, 241, 0.1)' : 
             device === 'Mobile' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(148, 163, 184, 0.1)';
  const color = device === 'Desktop' ? '#6366f1' : 
                device === 'Mobile' ? '#ec4899' : '#64748b';
  return <span style={{ background: bg, color, padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block' }}>{device || 'Unknown'}</span>;
};

const RecentVisitsTable = ({ visits }) => {
  if (!visits || visits.length === 0) {
    return <div style={{ color: 'var(--text-secondary)' }}>No recent visits yet.</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1.25rem 0.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</th>
            <th style={{ padding: '1.25rem 0.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Browser</th>
            <th style={{ padding: '1.25rem 0.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Device</th>
            <th style={{ padding: '1.25rem 0.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
            <th style={{ padding: '1.25rem 0.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Referrer</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row">
              <td style={{ padding: '1rem 0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                {formatDate(visit.created_at)}
              </td>
              <td style={{ padding: '1rem 0.5rem' }}>
                {getBrowserBadge(visit.browser)}
              </td>
              <td style={{ padding: '1rem 0.5rem' }}>
                {getDeviceBadge(visit.device_type)}
              </td>
              <td style={{ padding: '1rem 0.5rem', color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}>
                {visit.country || 'Unknown'}
              </td>
              <td style={{ padding: '1rem 0.5rem', color: '#475569', fontSize: '0.9rem', maxWidth: '150px' }}>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {visit.referrer || 'Direct'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .table-row:hover { background: #F8FAFC; }
      `}</style>
    </div>
  );
};

export default RecentVisitsTable;
