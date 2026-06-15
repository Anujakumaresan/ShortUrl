import React from 'react';
import RecentVisitsTable from '../analytics/RecentVisitsTable';
import { formatDate } from '../../utils/formatDate';

const PublicStatsCard = ({ data }) => {
  return (
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        width: '80px', height: '80px', borderRadius: '50%', 
        background: 'var(--brand-gradient)', display: 'flex', 
        alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem auto', color: 'white', fontSize: '2rem', fontWeight: 'bold'
      }}>
        {data.totalClicks}
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Total Clicks</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        For URL: <a href={data.originalUrl} target="_blank" rel="noreferrer">{data.originalUrl}</a>
      </p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Last Visited</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          {data.lastVisitedTime ? formatDate(data.lastVisitedTime) : 'Never'}
        </p>
      </div>

      <div style={{ textAlign: 'left', marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Recent Visit History</h3>
        <RecentVisitsTable visits={data.recentVisits} />
      </div>
    </div>
  );
};

export default PublicStatsCard;
