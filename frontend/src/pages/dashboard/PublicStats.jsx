import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PublicStatsCard from '../../components/cards/PublicStatsCard';
import * as analyticsService from '../../services/analyticsService';
import Loader from '../../components/common/Loader';
import { LinkIcon } from 'lucide-react';

const PublicStats = () => {
  const { shortId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await analyticsService.getPublicUrlAnalytics(shortId);
        // Add originalUrl to data for the card since analytics might not have it
        result.originalUrl = `http://localhost:5000/s/${shortId}`;
        setData(result);
      } catch (err) {
        setError(true);
      }
    };
    fetchStats();
  }, [shortId]);

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--error)' }}>Stats not found or private</h2>
      </div>
    );
  }

  if (!data) return <Loader />;

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <LinkIcon size={48} color="var(--brand-primary)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Public Link Statistics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Viewing stats for /s/{shortId}</p>
      </div>
      <PublicStatsCard data={data} />
    </div>
  );
};

export default PublicStats;
