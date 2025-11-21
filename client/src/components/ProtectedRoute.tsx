import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { LoadingSpinner } from './shared/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (requiredRole && user && !requiredRole.includes(user.role)) {
      navigate('/');
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  if (!isAuthenticated) {
    return <LoadingSpinner fullScreen />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <LoadingSpinner fullScreen />;
  }

  return <>{children}</>;
}
