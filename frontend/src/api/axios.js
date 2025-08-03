import axios from 'axios';

// Use environment variable from .env file
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

// Add token automatically if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
