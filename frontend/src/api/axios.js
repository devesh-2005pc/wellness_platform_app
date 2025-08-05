import axios from 'axios';

// Get API base URL from environment variable or fallback to production backend
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  'https://wellness-backend-k3gz.onrender.com';

const instance = axios.create({
  baseURL: API_BASE_URL + '/api',
});

// Add token automatically if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
