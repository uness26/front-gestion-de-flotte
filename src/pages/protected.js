import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { useEffect } from 'react';

// export const Protected = ({ children }) => {
//   const { isAuthenticated , loading} = useAuth();
//   const navigate = useNavigate();
//   console.log('Protected - isAuthenticated:', isAuthenticated);
  
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated]);

//   if (!isAuthenticated) {

//     // alert("Il Faut S'authentifier")
//     return <Navigate to="/" replace />
//   }
//   return children;
// }
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