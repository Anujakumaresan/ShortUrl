import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import UrlTable from '../../components/url/UrlTable';
import { Link2, MousePointerClick, TrendingUp, Target, X } from 'lucide-react';
import * as urlService from '../../services/urlService';
import ToastMessage from '../../components/common/ToastMessage';
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Form state
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Modals state
  const [editModalData, setEditModalData] = useState(null);
  const [qrModalData, setQrModalData] = useState(null);
  const [editUrlInput, setEditUrlInput] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const data = await urlService.getMyUrls();
      setUrls(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) return;
    
    setLoading(true);
    try {
      // Pass customAlias to backend if supported
      const newUrl = await urlService.createShortUrl(longUrl, customAlias, expiryDate);
      setUrls([newUrl, ...urls]);
      setToast({ message: 'URL shortened successfully!', type: 'success' });
      setLongUrl('');
      setCustomAlias('');
      setExpiryDate('');
    } catch (error) {
      setToast({ message: 'Failed to shorten URL', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await urlService.updateUrl(editModalData.id, editUrlInput);
      setUrls(urls.map(u => u.id === updated.id ? updated : u));
      setToast({ message: 'URL updated successfully', type: 'success' });
      setEditModalData(null);
    } catch (e) {
      setToast({ message: e.message || 'Failed to update', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (url) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      setLoading(true);
      await urlService.deleteUrl(url.id);
      setUrls(urls.filter(u => u.id !== url.id));
      setToast({ message: 'URL deleted', type: 'success' });
    } catch (e) {
      setToast({ message: e.message || 'Failed to delete', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in" style={{ paddingTop: '0' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, {user?.name || 'user'} 👋</p>
          </div>

          {/* Stats Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(67, 24, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                <Link2 size={28} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Total URLs</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{urls.length}</h3>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(67, 24, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                <MousePointerClick size={28} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Total Clicks</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{totalClicks}</h3>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                <TrendingUp size={28} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Active Links</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{urls.length}</h3>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--error-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--error)' }}>
                <Target size={28} />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Expired Links</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>0</h3>
              </div>
            </div>
          </div>

          {/* Create Short URL Form Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Create Short URL</h2>
            
            <form onSubmit={handleShorten} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '2', minWidth: '300px' }}>
                <label className="form-label">Long URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-that-needs-to-be-shortened"
                  required
                />
              </div>
              <div style={{ flex: '1', minWidth: '150px' }}>
                <label className="form-label">Custom Alias (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link"
                />
              </div>
              <div style={{ flex: '1', minWidth: '150px' }}>
                <label className="form-label">Expiry Date (Optional)</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading || !longUrl}
                style={{ height: '48px', padding: '0 2rem' }}
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
              </button>
            </form>
          </div>

          {/* Your URLs Table */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Your URLs</h2>
            <UrlTable 
              urls={urls.slice(0, 10)} 
              onEdit={(url) => { setEditModalData(url); setEditUrlInput(url.originalUrl); }} 
              onDelete={handleDelete} 
              onQrCode={(url) => setQrModalData(url)} 
              onViewAnalytics={(id) => window.location.href = `/analytics?id=${id}`} 
            />
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {qrModalData && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '380px', position: 'relative', textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.25rem' }}>Scan QR Code</h3>
            
            <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <QRCodeCanvas id="qr-canvas" value={`http://${window.location.hostname === 'localhost' ? '10.129.158.103' : window.location.hostname}:5000/s/${qrModalData.shortId}`} size={220} />
            </div>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Point your camera at the QR code to easily share this shortened link.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1, padding: '0.75rem' }}
                onClick={() => setQrModalData(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '0.75rem' }}
                onClick={() => {
                  const canvas = document.getElementById('qr-canvas');
                  if (canvas) {
                    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                    let downloadLink = document.createElement('a');
                    downloadLink.href = pngUrl;
                    downloadLink.download = `qrcode-${qrModalData.shortId}.png`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  }
                }}
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalData && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button onClick={() => setEditModalData(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Edit Destination URL</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Original URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={editUrlInput}
                  onChange={(e) => setEditUrlInput(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
      {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Dashboard;
