import React from 'react';
import Navbar from '../../components/layout/Navbar';
import AdminSidebar from '../../components/layout/AdminSidebar';
import AnalyticsCard from '../../components/cards/AnalyticsCard';
import EmptyState from '../../components/common/EmptyState';
import { Activity } from 'lucide-react';

const SystemAnalytics = () => {
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">System-wide Analytics</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
            <div style={{ gridColumn: 'span 12' }}>
              <AnalyticsCard title="Server Load & Traffic">
                <EmptyState 
                  title="System Metrics" 
                  description="Global system analytics (CPU, Memory, Traffic across all links) would be displayed here."
                  icon={Activity}
                />
              </AnalyticsCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
