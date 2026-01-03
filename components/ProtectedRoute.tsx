'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { lessonService } from '../services/lessonService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!lessonService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  // Show nothing while checking authentication
  if (!lessonService.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;