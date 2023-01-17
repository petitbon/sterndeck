'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuth } from './firebase/firebase';
import { User, onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';

export default function useFirebaseAuth() {
  //const [authUser, setAuthUser] = useState<User | null>(null);

  const [authUser, setAuthUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clear = () => {
    setAuthUser({} as User);
    setIsLoading(false);
  };

  const authStateChanged = async (user: User | null) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser(user);
    setIsLoading(false);
  };

  const signOut = () => authSignOut(firebaseAuth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut,
  };
}

export const AuthUserContext = createContext({
  authUser: {} as User,
  isLoading: true,
  async signOut() {},
});

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);
