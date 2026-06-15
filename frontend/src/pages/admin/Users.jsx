import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import AdminSidebar from '../../components/layout/AdminSidebar';
import * as adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { Trash2, Edit2 } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await adminService.getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (!users) return <Loader />;

  return (
    <div className="app-container">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h1 className="page-title">Manage Users</h1>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>URLs</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Role</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{user.name}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{user.urls}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem',
                        background: user.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: user.role === 'admin' ? 'var(--error)' : 'var(--success)'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem', marginRight: '0.5rem' }}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-danger" style={{ padding: '0.4rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
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

export default Users;
