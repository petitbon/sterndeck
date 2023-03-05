'use client';

import { ReactNode, createContext, useContext, useState, useMemo } from 'react';
import { User } from 'firebase/auth';

export const SystemContext = createContext({
  authUser: {} as User,
  setAuthUser: (user: User) => {},
  isSignedIn: false,
  setIsSignedIn: ({}: boolean) => {},
});

export function SystemProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState({} as User);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const providerValue = useMemo(
    () => ({
      authUser,
      setAuthUser,
      isSignedIn,
      setIsSignedIn,
    }),
    [authUser]
  );

  return <SystemContext.Provider value={providerValue}>{children}</SystemContext.Provider>;
}

export const useSystemContext = () => useContext(SystemContext);
