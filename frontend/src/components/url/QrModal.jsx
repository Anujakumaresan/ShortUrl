import React from 'react';
import { X, Download } from 'lucide-react';
import { generateQrDataUrl } from '../../utils/generateQr';

const QrModal = ({ url, onClose }) => {
  if (!url) return null;

  const shortLink = `http://localhost:5000/s/${url.shortId}`;
  const qrCodeUrl = url.qrCode || generateQrDataUrl(shortLink);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '360px', position: 'relative', padding: '2rem' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem', textAlign: 'center', color: 'var(--text-primary)' }}>QR Code</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', background: '#F8FAFC', padding: '1rem', borderRadius: '12px' }}>
          <img src={qrCodeUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', wordBreak: 'break-all' }}>
          {shortLink}
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: '0.875rem' }} onClick={() => {
            const a = document.createElement('a');
            a.href = qrCodeUrl;
            // Add a parameter to tell the browser to download instead of open
            a.download = `qr-${url.shortId}.png`;
            // Trigger a fetch to bypass CORS download issues if necessary, but data urls/external urls might just open
            fetch(qrCodeUrl)
              .then(res => res.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch(() => {
                 a.click();
              });
          }}>
            <Download size={18} /> Download
          </button>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
