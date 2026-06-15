import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { User, Bell, Shield, Camera, CheckCircle2, Eye, EyeOff, Link2, BarChart2, QrCode, Clock, Lock, LogIn, ArrowRight } from 'lucide-react';
import * as authService from '../../services/authService';
import * as urlService from '../../services/urlService';
import ToastMessage from '../../components/common/ToastMessage';

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [stats, setStats] = useState({ urls: 0, clicks: 0, qrs: 0 });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setNotificationsEnabled(user.notifications_enabled !== false);
    }
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const myUrls = await urlService.getMyUrls();
        const totalClicks = myUrls.reduce((sum, u) => sum + u.clicks, 0);
        setStats({ urls: myUrls.length, clicks: totalClicks, qrs: Math.min(myUrls.length, 50) });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const data = await authService.updateProfile({ name, notificationsEnabled });
      updateUser(data.user);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Failed to update profile', type: 'error' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setToast({ message: 'New passwords do not match', type: 'error' });
      return;
    }
    setPasswordLoading(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      setToast({ message: 'Password changed successfully!', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setToast({ message: err.message || 'Failed to change password', type: 'error' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length > 5) strength++;
    if (pwd.length > 7) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 4);
  };

  const strength = calculatePasswordStrength(newPassword);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['#E2E8F0', '#EF4444', '#F59E0B', '#10B981', '#059669'];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 className="page-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>User Profile</h1>
            <p className="page-subtitle" style={{ fontSize: '1rem' }}>Manage your account details and preferences</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
            
            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Account Details */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%',
                      background: '#E2E8F0', color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <User size={40} />
                    </div>
                    <button style={{
                      position: 'absolute', bottom: '0', right: '-5px',
                      background: 'white', border: '1px solid var(--border-color)',
                      borderRadius: '50%', width: '28px', height: '28px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--brand-primary)', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{user?.name || 'User'}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{user?.email}</p>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '0.2rem 0.75rem', borderRadius: '12px',
                      background: 'rgba(67, 24, 255, 0.1)', color: 'var(--brand-primary)',
                      fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {user?.role === 'admin' ? 'Administrator' : 'Free Plan'}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} /> Account Details
                </h3>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <input type="email" className="form-input" defaultValue={user?.email} disabled style={{ paddingRight: '100px' }} />
                      <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                        <CheckCircle2 size={16} /> Verified
                      </div>
                    </div>
                  </div>

                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ flex: 1 }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.25rem 0', color: '#1e293b' }}>
                        <Bell size={18} color="var(--brand-primary)" /> Email Notifications
                      </label>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive alerts about your URLs, clicks and important updates.</p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} />
                      <span style={{ 
                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                        backgroundColor: notificationsEnabled ? 'var(--brand-primary)' : '#cbd5e1', 
                        transition: '.4s', borderRadius: '34px' 
                      }}>
                        <span style={{
                          position: 'absolute', content: '""', height: '18px', width: '18px', 
                          left: notificationsEnabled ? '22px' : '3px', bottom: '3px', 
                          backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', height: '48px', fontSize: '1rem' }} disabled={profileLoading}>
                    {profileLoading ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>

              {/* Account Usage */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Account Usage</h3>
                  <select style={{ padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                  {/* Progress Ring */}
                  <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--brand-primary)" strokeWidth="4" strokeDasharray={`${Math.max((stats.urls / 100) * 100, 2)}, 100`} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{Math.max(Math.round((stats.urls / 100) * 100), 0)}%</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Used</span>
                    </div>
                  </div>

                  {/* Stats List */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <Link2 size={16} color="var(--brand-primary)" /> Total URLs
                      </div>
                      <span style={{ fontWeight: 600 }}>{stats.urls} / 100</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <BarChart2 size={16} color="#0EA5E9" /> Total Clicks
                      </div>
                      <span style={{ fontWeight: 600 }}>{stats.clicks.toLocaleString()} / 50,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <QrCode size={16} color="#10B981" /> Total QR Codes
                      </div>
                      <span style={{ fontWeight: 600 }}>{stats.qrs} / 50</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0 0 0', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Need more? Upgrade your plan for unlimited access.</span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                    Upgrade Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Security & Password */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Shield size={18} color="var(--brand-primary)" /> Security & Password
                  </h3>
                  <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '0.35rem 0.75rem', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Your account is secure <CheckCircle2 size={14} />
                  </div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>Change Password</h4>
                
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showCurrentPassword ? "text" : "password"} 
                        className="form-input" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        placeholder="Enter current password"
                        required 
                      />
                      <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        className="form-input" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Enter new password"
                        required 
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Confirm New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        className="form-input" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm new password"
                        required 
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Password Strength:</span>
                    <div style={{ display: 'flex', gap: '0.25rem', flex: 1, margin: '0 1rem' }}>
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} style={{ 
                          height: '4px', flex: 1, borderRadius: '2px', 
                          background: newPassword.length > 0 && level <= strength ? strengthColors[strength] : '#E2E8F0',
                          transition: 'background 0.3s ease'
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: newPassword.length > 0 ? strengthColors[strength] : 'var(--text-muted)' }}>
                      {newPassword.length > 0 ? strengthLabels[strength] : 'None'}
                    </span>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px', fontSize: '1rem' }} disabled={passwordLoading}>
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

              {/* Recent Account Activity */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Clock size={18} color="var(--brand-primary)" /> Recent Account Activity
                  </h3>
                  <button style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                    View All
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Activity Item 1 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LogIn size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Logged in successfully</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>May 13, 2025 at 10:24 PM • Chrome on Windows</p>
                    </div>
                    <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600 }}>
                      Current
                    </div>
                  </div>

                  {/* Activity Item 2 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Lock size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Password changed</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>May 10, 2025 at 09:15 AM • Chrome on Windows</p>
                    </div>
                  </div>

                  {/* Activity Item 3 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bell size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email notifications enabled</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>May 08, 2025 at 11:40 AM • Chrome on Windows</p>
                    </div>
                  </div>

                  {/* Activity Item 4 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LogIn size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Logged in successfully</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>May 05, 2025 at 08:50 PM • Mobile Safari on iOS</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Profile;
