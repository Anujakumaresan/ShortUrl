import { fetchWithAuth } from './api';

export const getUrlAnalytics = async (shortId) => {
  const data = await fetchWithAuth(`/analytics/${shortId}`);
  return data;
};

export const getDashboardStats = async () => {
  const data = await fetchWithAuth('/analytics/dashboard');
  return data;
};

export const getPublicUrlAnalytics = async (shortId) => {
  const response = await fetch(`http://localhost:5000/s/${shortId}/stats`);
  if (!response.ok) throw new Error('Stats not found');
  return await response.json();
};
