'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuth } from './firebase/firebase';
import { User, onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';

interface AuthProviderProps {
  firebaseConfig: {};
  children: React.ReactNode;
}

interface AuthContextProps {
  authUser: {};
  signOut: () => void;
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clear = () => {
    setAuthUser({});
    setIsLoading(false);
  };

  const authStateChanged = async (authUser: any) => {
    setIsLoading(true);
    if (!authUser) {
      clear();
      return;
    }
    setAuthUser(authUser);
    setIsLoading(false);
  };

  const signOut = () => authSignOut(firebaseAuth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
    return () => unsubscribe();
  }, [authUser]);

  return {
    authUser,
    signOut,
  };
}

export const AuthUserContext = createContext({
  authUser: null,
  async signOut() {},
});

export function AuthUserProvider({ children }: any) {
  const auth: AuthContextProps = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);
