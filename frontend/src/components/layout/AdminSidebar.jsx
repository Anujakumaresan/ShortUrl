import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Link as LinkIcon, Activity, ArrowLeft, Menu } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'All URLs', path: '/admin/urls', icon: LinkIcon },
    { name: 'Analytics', path: '/admin/analytics', icon: Activity }
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
      
      <div style={{ padding: '0 2rem', marginBottom: '1rem', color: 'var(--text-sidebar)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
        Admin Panel
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 1rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
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

        <div style={{ marginTop: 'auto' }}>
          <NavLink to="/" style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
            color: 'var(--text-sidebar)', fontWeight: 500
          }}>
            <ArrowLeft size={20} /> Back to App
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
