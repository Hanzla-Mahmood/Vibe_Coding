
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
