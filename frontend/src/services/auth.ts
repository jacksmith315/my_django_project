import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Types for the OAuth response
export interface OAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

// Types for the login credentials
export interface LoginCredentials {
  username: string;
  password: string;
}

// OAuth2 configuration
const OAUTH_CONFIG = {
  client_id: 'OTHSCkC7cCZYdmcf0DEmqMOTLwRoLSqksVxTq4xm',
  client_secret: 'pbkdf2_sha256$600000$SxvISx4iJgogfRj7GulsKL$lzSL7fXIm49WHGKvkNUhKRASkOVQiSre8KGN27Q9FzA=',
  grant_type: 'password'
};

// Create a custom hook for login
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const formData = new URLSearchParams({
        ...OAUTH_CONFIG,
        username: credentials.username,
        password: credentials.password,
      });

      const response = await axios.post<OAuthResponse>(
        'http://127.0.0.1:8000/o/token/',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Store the token in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      return response.data;
    },
  });
};

// Create an axios instance for authenticated requests
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add refresh token functionality
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post<OAuthResponse>(
          'http://127.0.0.1:8000/o/token/',
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken!,
            client_id: OAUTH_CONFIG.client_id,
            client_secret: OAUTH_CONFIG.client_secret,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., logout user)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);