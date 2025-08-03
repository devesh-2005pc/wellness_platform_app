// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Updated to point directly to your backend API
});

// ✅ Automatically add token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or sessionStorage, based on your app
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
