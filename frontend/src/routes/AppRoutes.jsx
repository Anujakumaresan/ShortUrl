import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import MyUrls from '../pages/dashboard/MyUrls';
import Analytics from '../pages/dashboard/Analytics';
import BulkUpload from '../pages/dashboard/BulkUpload';
import PublicStats from '../pages/dashboard/PublicStats';
import Profile from '../pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Urls from '../pages/admin/Urls';
import SystemAnalytics from '../pages/admin/SystemAnalytics';

// Layout & Common
import ProtectedRoute from '../components/layout/ProtectedRoute';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* User Dashboard Routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/urls" element={<ProtectedRoute><MyUrls /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/bulk-upload" element={<ProtectedRoute><BulkUpload /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><Users /></ProtectedRoute>} />
      <Route path="/admin/urls" element={<ProtectedRoute adminOnly={true}><Urls /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute adminOnly={true}><SystemAnalytics /></ProtectedRoute>} />
      
      {/* Public Stats - No auth required but might be protected by user settings */}
      <Route path="/stats/:shortId" element={<PublicStats />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
