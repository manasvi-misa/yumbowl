import axios from 'axios';

// In development, React's proxy (set in package.json) forwards /api → localhost:5000
// In production, REACT_APP_API_URL must point to the backend (e.g. https://yumbowl-backend.vercel.app/api)
const BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('yumbowl_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('yumbowl_token');
      localStorage.removeItem('yumbowl_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
