import React from 'react';
import Navbar from '../../components/layout/Navbar';
import AdminSidebar from '../../components/layout/AdminSidebar';
import UrlTable from '../../components/url/UrlTable';
import EmptyState from '../../components/common/EmptyState';
import { ShieldAlert } from 'lucide-react';

const Urls = () => {
  // In a real app, this would fetch ALL urls from the system
  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">All System URLs</h1>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', color: 'var(--error)' }}>
              <ShieldAlert size={24} />
              <p style={{ margin: 0 }}>You are viewing all URLs in the system. Use caution when modifying or deleting.</p>
            </div>
            
            <EmptyState 
              title="Global URL View" 
              description="This feature would typically include server-side pagination, search, and filtering to manage all system URLs." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Urls;
