import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import googleIcon from '../assets/google.svg';

interface GoogleLoginButtonProps {
  onLoginSuccess: (response: any) => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('Google OAuth response:', response);
        
        // Get user info from Google
        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        
        console.log('Google user info:', userInfoResponse.data);
        
        // Get CSRF token first
        const csrfResponse = await axios.get('http://localhost:8000/api/auth/csrf/', {
          withCredentials: true
        });
        
        const csrfToken = csrfResponse.data.csrfToken;
        
        // Send to our backend
        try {
          const backendResponse = await axios.post(
            'http://localhost:8000/api/auth/google/',
            {
              access_token: response.access_token,
              user_data: userInfoResponse.data
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
            }
          );
          
          // Let the parent component handle token storage and navigation
          onLoginSuccess(backendResponse.data);
        } catch (error: any) {
          console.error('Google login failed:', error);
          if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
            
            // If the error is about existing user, we might want to handle it differently
            if (error.response.data.error && error.response.data.error.includes('already registered')) {
              console.error('User already exists - please try logging in normally');
            }
          }
          throw error;
        }
      } catch (error) {
        console.error('Failed to process login:', error);
        throw error;
      }
    },
    onError: (error) => console.error('Login Failed:', error),
    flow: 'implicit',
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      style={{ minWidth: '200px', maxWidth: '300px' }}
    >
      <img
        src={googleIcon}
        alt="Google logo"
        className="w-4 h-4"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;