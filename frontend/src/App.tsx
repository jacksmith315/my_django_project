import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Items from './components/Items';
import { ProtectedAdminPanel } from './components/ProtectedAdminPanel';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token with backend
        await axios.get('http://localhost:8000/api/items/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    console.error('Google Client ID not found in environment variables');
    return <div>Error: Google Client ID not configured</div>;
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/items" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <ProtectedAdminPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/items"
              element={isAuthenticated ? <Items /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/items" : "/login"} />}
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;