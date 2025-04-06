import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminPanel } from './AdminPanel.tsx';
import { GoogleLoginButton } from './GoogleLogin.tsx';

export const ProtectedAdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    
    // Verify token with backend
    axios.get('http://127.0.0.1:8000/api/items/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    })
    .catch(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login');
    });
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return <AdminPanel />;
};