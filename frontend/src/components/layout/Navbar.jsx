import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Bell, Plus, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      height: 'var(--navbar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 2rem',
      backgroundColor: 'transparent',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      marginTop: '1rem',
      marginBottom: '1rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem',
        background: 'var(--bg-card)',
        padding: '0.5rem 1rem',
        borderRadius: '30px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        <button 
          className="btn btn-primary" 
          style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}
          onClick={() => navigate('/')}
        >
          <Plus size={16} /> Create New URL
        </button>

        <button style={{ background: 'none', color: 'var(--text-secondary)', padding: '0.5rem', display: 'flex' }}>
          <Bell size={20} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.5rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--bg-main)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)'
          }}>
            <User size={18} />
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {user?.name || 'John Doe'}
          </div>
          <button onClick={handleLogout} style={{ background: 'none', color: 'var(--text-secondary)', display: 'flex', marginLeft: '0.5rem' }} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
