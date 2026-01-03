'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { lessonService } from '../services/lessonService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status and redirect
    if (lessonService.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <LoadingSpinner />;
}
