import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { useEffect } from 'react';


export const Protected = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};