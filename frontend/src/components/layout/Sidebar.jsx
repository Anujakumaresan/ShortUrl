import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, BarChart3, UploadCloud, Settings, LogOut, Menu, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My URLs', path: '/urls', icon: LinkIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Bulk Upload', path: '/bulk-upload', icon: UploadCloud },
    { name: 'Profile', path: '/profile', icon: Settings }
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: 'var(--bg-sidebar)',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 20
    }}>
      <div style={{ padding: '0 2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ color: 'white', display: 'flex' }}>
          <Menu size={24} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
          <LinkIcon size={24} color="var(--brand-primary)" style={{ transform: 'rotate(-45deg)' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Linkly
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 1rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              color: isActive ? 'white' : 'var(--text-sidebar)',
              background: isActive ? 'var(--brand-primary)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all var(--transition-fast)'
            })}
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              color: 'var(--text-sidebar)',
              background: 'transparent',
              fontWeight: 500,
              transition: 'all var(--transition-fast)'
            })}
          >
            <Shield size={20} />
            Admin Panel
          </NavLink>
        )}

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              color: 'var(--text-sidebar)',
              background: 'transparent',
              fontWeight: 500,
              transition: 'all var(--transition-fast)',
              textAlign: 'left'
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
