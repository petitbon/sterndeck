'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@context/AuthContext';

import FirebaseLogin from '@components/auth/FirebaseLogin';

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
    return <FirebaseLogin />;
  } else {
    return 'loading ...';
  }
}

export default AuthCheck;
