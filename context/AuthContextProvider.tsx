'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@lib/firebase/authentication';
import { onAuthStateChanged, User } from 'firebase/auth';
import { AuthContext } from './AuthContext';

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
