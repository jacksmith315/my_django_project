// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Add request interceptor to handle CSRF tokens
api.interceptors.request.use(async (config) => {
  // Only get CSRF token for mutation requests
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/csrf/', {
        withCredentials: true
      });
      config.headers['X-CSRFToken'] = response.data.csrfToken;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  }
  return config;
});

export default api;