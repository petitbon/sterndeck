'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '@context/firebase/firebase';
import { UserCard } from '@components/user/UserCard';
import { useSystemContext } from '@context/SystemProvider';
import { User } from 'firebase/auth';

function SignInScreen() {
  const { isSignedIn, setIsSignedIn } = useSystemContext();
  const { authUser, setAuthUser } = useSystemContext();
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    await signInWithPopup(firebaseAuth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user: any) => {
      setAuthUser(user as User);
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isSignedIn) {
    return (
      <div className="flex flex-col w-full h-[50px]">
        <div className="flex flew-row">
          <div className="flex m-2">
            <UserCard user={authUser} />
          </div>
          <div className="flex w-full justify-end items-center m-2">
            <button className="btn-small" onClick={() => signOut(firebaseAuth)}>
              Sign-out
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flew-row w-full h-[300px]">
        <div className="flex w-full justify-center items-start m-2">
          <button className="btn-primary" onClick={signIn}>
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default SignInScreen;
