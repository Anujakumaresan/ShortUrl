import { fetchWithAuth } from './api';

export const login = async (credentials) => {
  const data = await fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  return data;
};

export const signup = async (userData) => {
  const data = await fetchWithAuth('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  return data;
};
export const updateProfile = async (profileData) => {
  const data = await fetchWithAuth('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
  return data;
};

export const changePassword = async (passwordData) => {
  const data = await fetchWithAuth('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData)
  });
  return data;
};

export const getMe = async () => {
  const data = await fetchWithAuth('/auth/me', {
    method: 'GET'
  });
  return data;
};
