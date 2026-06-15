import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import AdminSidebar from '../../components/layout/AdminSidebar';
import StatsCard from '../../components/cards/StatsCard';
import { Users, LinkIcon, Activity, Eye } from 'lucide-react';
import * as adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { formatDate } from '../../utils/formatDate';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await adminService.getSystemAnalytics();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <Loader />;

  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">Admin Overview</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <StatsCard title="Total Users" value={stats.totalUsers} icon={Users} trend={5} />
            <StatsCard title="Active Users" value={stats.activeUsers} icon={Activity} trend={12} />
            <StatsCard title="Total URLs" value={stats.totalUrls} icon={LinkIcon} trend={8} />
            <StatsCard title="Total Clicks" value={stats.totalClicks} icon={Eye} trend={15} />
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recently Joined Users</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{formatDate(user.joinedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
