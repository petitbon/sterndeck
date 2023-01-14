'use client';

import { useAuthContext } from '@context/AuthProvider';

function AuthCheck({ children }: any) {
  const { user, loading } = useAuthContext();

  if (user && !loading) {
    return children;
  } else if (!user && !loading) {
    return '';
  } else {
    return '...';
  }
}

export default AuthCheck;
