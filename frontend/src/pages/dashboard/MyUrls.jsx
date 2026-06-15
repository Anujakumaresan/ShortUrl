import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import UrlTable from '../../components/url/UrlTable';
import * as urlService from '../../services/urlService';
import ToastMessage from '../../components/common/ToastMessage';
import EditUrlModal from '../../components/url/EditUrlModal';
import DeleteModal from '../../components/url/DeleteModal';
import QrModal from '../../components/url/QrModal';

const MyUrls = () => {
  const [urls, setUrls] = useState([]);
  const [toast, setToast] = useState(null);
  const [editUrl, setEditUrl] = useState(null);
  const [deleteUrl, setDeleteUrl] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const data = await urlService.getMyUrls();
    setUrls(data);
  };

  const handleEditSave = async (id, newUrl) => {
    try {
      await urlService.updateUrl(id, newUrl);
      setUrls(urls.map(u => u.id === id ? { ...u, originalUrl: newUrl } : u));
      setToast({ message: 'URL updated successfully', type: 'success' });
      setEditUrl(null);
    } catch (e) {
      setToast({ message: 'Failed to update URL', type: 'error' });
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await urlService.deleteUrl(id);
      setUrls(urls.filter(u => u.id !== id));
      setToast({ message: 'URL deleted', type: 'success' });
      setDeleteUrl(null);
    } catch (e) {
      setToast({ message: 'Failed to delete URL', type: 'error' });
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">My URLs</h1>
          </div>
          <UrlTable 
            urls={urls} 
            onEdit={setEditUrl} 
            onDelete={setDeleteUrl} 
            onQrCode={setQrUrl} 
            onViewAnalytics={(id) => window.location.href = `/analytics?id=${id}`} 
          />
        </div>
      </div>
      
      {editUrl && <EditUrlModal url={editUrl} onClose={() => setEditUrl(null)} onSave={handleEditSave} />}
      {deleteUrl && <DeleteModal url={deleteUrl} onClose={() => setDeleteUrl(null)} onConfirm={handleDeleteConfirm} />}
      {qrUrl && <QrModal url={qrUrl} onClose={() => setQrUrl(null)} />}
      {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default MyUrls;
