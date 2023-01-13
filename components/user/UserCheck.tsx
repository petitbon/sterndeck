'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@context/AuthProvider';

function AuthCheck({ children }: any) {
  const { user, loading } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading && pathname === '/') {
      router.replace('/models');
    }
  }, [loading]);

  if (user && !loading && pathname !== '/') {
    return children;
  } else if (!user && !loading) {
    return 'please login';
  } else {
    return 'loading ...';
  }
}

export default AuthCheck;
