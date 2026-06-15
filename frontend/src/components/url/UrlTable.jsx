import React from 'react';
import { Copy, Edit3, Trash2, QrCode, BarChart2 } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { copyToClipboard } from '../../utils/copyToClipboard';
import EmptyState from '../common/EmptyState';

const UrlTable = ({ urls, onEdit, onDelete, onQrCode, onViewAnalytics }) => {
  if (!urls || urls.length === 0) {
    return <EmptyState title="No URLs Found" description="You haven't shortened any URLs yet." />;
  }

  const handleCopy = (shortUrl) => {
    copyToClipboard(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Original URL</th>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Short URL</th>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Clicks</th>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Created At</th>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Expiry Date</th>
            <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            const shortLink = `http://${window.location.hostname === 'localhost' ? '10.129.158.103' : window.location.hostname}:5000/s/${url.shortId}`;
            return (
              <tr key={url.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="table-row">
                <td style={{ padding: '1rem 0', maxWidth: '250px' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--brand-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {url.originalUrl}
                  </div>
                </td>
                <td style={{ padding: '1rem 0' }}>
                  <a href={shortLink} target="_blank" rel="noreferrer" style={{ color: 'var(--brand-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {shortLink}
                  </a>
                </td>
                <td style={{ padding: '1rem 0', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  {url.clicks}
                </td>
                <td style={{ padding: '1rem 0', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {formatDate(url.createdAt).split(',')[0]}
                </td>
                <td style={{ padding: '1rem 0', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {url.expiresAt ? formatDate(url.expiresAt).split(',')[0] : 'Never'}
                </td>
                <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button onClick={() => handleCopy(shortLink)} style={{ background: 'none', color: 'var(--brand-primary)' }} title="Copy">
                      <Copy size={18} />
                    </button>
                    <button onClick={() => onViewAnalytics(url.shortId)} style={{ background: 'none', color: '#0EA5E9' }} title="Analytics">
                      <BarChart2 size={18} />
                    </button>
                    <button onClick={() => onEdit(url)} style={{ background: 'none', color: 'var(--text-secondary)' }} title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => onQrCode(url)} style={{ background: 'none', color: '#F59E0B' }} title="QR Code">
                      <QrCode size={18} />
                    </button>
                    <button onClick={() => onDelete(url)} style={{ background: 'none', color: 'var(--error)' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style>{`
        .table-row:hover { background: #F8FAFC; }
      `}</style>
    </div>
  );
};

export default UrlTable;
