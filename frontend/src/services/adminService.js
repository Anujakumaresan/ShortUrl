import { fetchWithAuth } from './api';

export const getSystemAnalytics = async () => {
  const data = await fetchWithAuth('/admin/stats');
  return data;
};

export const getAllUsers = async () => {
  const data = await fetchWithAuth('/admin/users');
  return Array.isArray(data) ? data : data.users || [];
};
