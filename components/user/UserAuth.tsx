'use client';

import { useEffect } from 'react';
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
  const { isSignedIn, setIsSignedIn } = useSystemContext();
  const { authUser, setAuthUser } = useSystemContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user: any) => {
      setAuthUser(user as User);
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, [authUser]);

  if (isSignedIn) {
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
  } else {
    return (
      <>
        <div className="">
          <p className="text-sm text-center">Sign Up | Login</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </div>
      </>
    );
  }
}

export default SignInScreen;
