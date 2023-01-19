'use client';

import { useState, useEffect } from 'react';
import { GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseAuth } from '@context/firebase/firebase';
import { UserCard } from '@components/user/UserCard';
import { useSystemContext } from '@context/SystemProvider';
import { User } from 'firebase/auth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID, GithubAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { authUser, setAuthUser } = useSystemContext();
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      setIsSignedIn(!!user);
      setAuthUser(user as User);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div className="">
        <p className="text-sm text-center">Sign Up | Login</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex m-2">
          <UserCard user={authUser} />
        </div>
        <div className="flex justify-end items-center m-2">
          <button className="btn-small" onClick={() => firebaseAuth.signOut()}>
            Sign-out
          </button>
        </div>
      </>
    );
  }
}

export default SignInScreen;
