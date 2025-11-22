import { ReactNode, useEffect, useState } from 'react';
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (requiredRole && user && !requiredRole.includes(user.role)) {
      navigate('/');
    }
  }, [isAuthenticated, user, requiredRole, navigate, isHydrated]);

  if (!isHydrated || !isAuthenticated) {
    return <LoadingSpinner fullScreen />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <LoadingSpinner fullScreen />;
  }

  return <>{children}</>;
}
