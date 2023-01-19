'use client';

import { useEffect, ReactNode, createContext, useContext, useState, useMemo } from 'react';
import { User, onAuthStateChanged, getAuth } from 'firebase/auth';

export const SystemContext = createContext({
  authUser: {} as User,
  setAuthUser: (user: User) => {},
});

export function SystemProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState({} as User);

  const clear = () => {
    setAuthUser({} as User);
  };

  const authStateChanged = async (authUser: any) => {
    if (!authUser) {
      clear();
      return;
    }
    setAuthUser(authUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), authStateChanged);
    return () => unsubscribe();
  }, [authUser]);

  const providerValue = useMemo(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser]
  );

  return <SystemContext.Provider value={providerValue}>{children}</SystemContext.Provider>;
}

export const useSystemContext = () => useContext(SystemContext);
