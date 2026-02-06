import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = (username, password) => {
  return api.post('login/', { username, password });
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getLatestSummary = () => api.get('summary/latest/');
export const getHistory = () => api.get('history/');
export const getReportUrl = (id) => `/report/${id}/`;

export const downloadReport = async (id, filename = 'report.pdf') => {
  try {
    console.log(`Starting download for ID: ${id}`);
    const response = await api.get(`report/${id}/`, {
      responseType: 'blob',
    });
    
    console.log('Download response received:', response.status);
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log('Download complete.');
  } catch (error) {
    console.error('Download failed:', error);
    let message = 'Failed to download report.';
    if (error.response) {
      message += ` (Server returned ${error.response.status}: ${error.response.statusText})`;
    } else if (error.request) {
      message += ' (No response from server. Check your connection.)';
    }
    alert(message + '\n\nPlease check the browser console for more details.');
  }
};




export default api;
