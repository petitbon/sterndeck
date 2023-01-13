'use client';

import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import firebaseApp from './firebase/firebaseApp';

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
