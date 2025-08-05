import axios from 'axios';

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'https://wellness-backend-k3gz.onrender.com';

const instance = axios.create({
  baseURL: API_BASE_URL , // ← base for all non-auth and auth routes (we'll call /auth/* explicitly)
});

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
