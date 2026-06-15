import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import RecentVisitsTable from '../../components/analytics/RecentVisitsTable';
import ClickTrendChart from '../../components/analytics/ClickTrendChart';
import { ArrowLeft, BarChart2, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import * as analyticsService from '../../services/analyticsService';
import Loader from '../../components/common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const shortId = queryParams.get('id');

  useEffect(() => {
    fetchAnalytics(true);

    // Set up polling to automatically update stats every 10 seconds
    const intervalId = setInterval(() => {
      fetchAnalytics(false); // Fetch silently without triggering the main loading screen
    }, 10000);

    return () => clearInterval(intervalId);
  }, [shortId]);

  const fetchAnalytics = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = shortId 
        ? await analyticsService.getUrlAnalytics(shortId)
        : await analyticsService.getDashboardStats();
      setStats(data);
    } catch (e) {
      if (showLoading) setError(e.message || 'Failed to load analytics');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="page-container">Error: {error}</div>;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in" style={{ paddingTop: '0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 className="page-title">{shortId ? 'URL Analytics' : 'Overall Analytics'}</h1>
              <p className="page-subtitle">Dashboard &gt; Analytics {shortId ? `> ${shortId}` : ''}</p>
            </div>
            {shortId && (
              <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', background: 'white' }} onClick={() => navigate('/analytics')}>
                <ArrowLeft size={16} /> Overall Analytics
              </button>
            )}
          </div>

          {/* Top Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="card" style={{ 
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem', 
              background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.03)'; }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)' }}>
                <BarChart2 size={28} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Clicks</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.5px' }}>{stats?.totalClicks || 0}</h3>
              </div>
            </div>

            <div className="card" style={{ 
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem',
              background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.03)'; }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)' }}>
                <Calendar size={28} />
              </div>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Visited</p>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, marginTop: '0.25rem', color: '#0f172a' }}>
                  {stats?.lastVisitedTime ? formatDate(stats.lastVisitedTime) : 'Never'}
                </h3>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Click Trend</h3>
            <ClickTrendChart data={stats?.clicksByDate || []} />
          </div>

          {stats?.recentVisits && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recent Visits</h3>
              <RecentVisitsTable visits={stats.recentVisits} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Analytics;
