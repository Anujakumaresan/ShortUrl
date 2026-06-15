import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { UploadCloud, FileText } from 'lucide-react';
import * as uploadService from '../../services/uploadService';
import ToastMessage from '../../components/common/ToastMessage';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResults(null);
    try {
      const res = await uploadService.bulkUploadUrls(file);
      setToast({ message: res.message, type: 'success' });
      setResults(res.details);
      setFile(null);
    } catch (e) {
      setToast({ message: e.message || 'Upload failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in" style={{ paddingTop: '0' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="page-title">Bulk Upload</h1>
            <p className="page-subtitle">Upload a CSV file with URLs to shorten in bulk.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            
            {/* Left Upload Area */}
            <div className="card" style={{ border: '2px dashed #CBD5E1', background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
               <UploadCloud size={48} color="var(--text-secondary)" style={{ marginBottom: '1.5rem' }} />
               <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Drag and drop your CSV file here</p>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>or</p>
               
               <input 
                type="file" 
                accept=".csv" 
                id="file-upload" 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="btn btn-primary" style={{ padding: '0.75rem 2.5rem', cursor: 'pointer' }}>
                Choose File
              </label>

              {file && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '300px' }}>
                   <FileText size={24} color="var(--text-secondary)" />
                   <div style={{ flex: 1, textAlign: 'left' }}>
                     <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</p>
                     <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{(file.size / 1024).toFixed(1)} KB</p>
                   </div>
                   <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                     ✓
                   </div>
                </div>
              )}
            </div>

            {/* Right Summary Area */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>CSV Format</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>The CSV file should contain one URL per line.</p>
              
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                https://example.com<br/>
                https://google.com<br/>
                https://github.com<br/>
                https://openai.com
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total URLs</p>
                  <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{results ? (results.successful + results.failed) : '-'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Successful</p>
                  <p style={{ fontWeight: 700, color: 'var(--success)' }}>{results ? results.successful : '-'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Failed</p>
                  <p style={{ fontWeight: 700, color: 'var(--error)' }}>{results ? results.failed : '-'}</p>
                </div>
              </div>

              <button 
                className="btn btn-primary" 
                disabled={!file || loading} 
                onClick={handleUpload}
                style={{ width: '100%' }}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>

        </div>
      </div>
      {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default BulkUpload;
