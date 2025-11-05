import { Navigate, useLocation } from 'react-router';
import { useAuth } from './provider/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
      return <Navigate to="/login" replace state = {{from: location.pathname}}/>;
  }
    
  
  return children;
};

export default ProtectedRoute;
