'use client';

import { useSystemContext } from '@context/SystemProvider';

function AuthCheck({ children }: any) {
  const { isSignedIn } = useSystemContext();

  if (isSignedIn) {
    return children;
  } else {
    return '';
  }
}

export default AuthCheck;
