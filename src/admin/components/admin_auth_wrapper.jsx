'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminAuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    
    // If not logged in and not on auth pages, redirect to login
    if (!isLoggedIn && !pathname.includes('/admin/auth/')) {
      router.push('/admin/auth/login');
    }
  }, [pathname, router]);

  return children;
}
