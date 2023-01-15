'use client';

import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@context/AuthUserProvider';
import { firebaseApp, firebaseAuth } from '@context/firebase/firebase';
import { UserCard } from '@components/user/UserCard';

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
  const { authUser, isLoading } = useAuth();

  if (!authUser) {
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
          <button className="btn-small" onClick={() => getAuth(firebaseApp).signOut()}>
            Sign-out
          </button>
        </div>
      </>
    );
  }
}

export default SignInScreen;
