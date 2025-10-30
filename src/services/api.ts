import axios from 'axios';
import { CONFIG } from '../config';
import { getAuthToken } from './storage';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - automatically add auth token to requests
api.interceptors.request.use(
  async (config) => {
    // Get auth token from AsyncStorage
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle specific status codes
      if (status === 401) {
        // Handle unauthorized - token expired or invalid
        // Clear auth data and redirect to login
        const { clearAuthData } = await import('./storage');
        await clearAuthData();
        console.log('Session expired, auth data cleared');
      } else if (status === 403) {
        // Handle forbidden
        console.error('Access forbidden');
      } else if (status >= 500) {
        // Handle server errors
        console.error('Server error:', status);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Error in request setup
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
