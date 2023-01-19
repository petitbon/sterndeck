'use client';

import { useSystemContext } from '@context/SystemProvider';

function AuthCheck({ children }: any) {
  const { authUser } = useSystemContext();

  if (!authUser) {
    return '';
  } else {
    return children;
  }
}

export default AuthCheck;
