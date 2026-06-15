import { fetchWithAuth } from './api';

export const bulkUploadUrls = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const data = await fetchWithAuth('/upload/csv', {
    method: 'POST',
    body: formData,
  });

  return {
    success: true,
    message: data.message,
    details: data.details
  };
};
