import { fetchWithAuth } from './api';

// Helper to map backend snake_case to frontend camelCase
const mapUrlParams = (url) => ({
  id: url.id,
  shortId: url.short_id || url.shortId,
  originalUrl: url.original_url || url.originalUrl,
  clicks: url.clicks || 0,
  createdAt: url.created_at || url.createdAt,
  expiresAt: url.expires_at || url.expiresAt
});

export const getMyUrls = async () => {
  const data = await fetchWithAuth('/urls');
  const urls = data.urls || data;
  return Array.isArray(urls) ? urls.map(mapUrlParams) : [];
};

export const createShortUrl = async (url, customAlias, expiresAt) => {
  const body = { originalUrl: url };
  if (customAlias) body.customAlias = customAlias;
  if (expiresAt) body.expiresAt = expiresAt;

  const data = await fetchWithAuth('/urls', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  const newUrl = data.url || data;
  return mapUrlParams(newUrl);
};

export const deleteUrl = async (id) => {
  await fetchWithAuth(`/urls/${id}`, {
    method: 'DELETE'
  });
};

export const updateUrl = async (id, newUrl) => {
  // Assuming the backend has a PUT/PATCH endpoint for editing
  const data = await fetchWithAuth(`/urls/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ originalUrl: newUrl })
  });
  const updatedUrl = data.url || data;
  return mapUrlParams(updatedUrl);
};
