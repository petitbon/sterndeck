'use client';

import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthContext } from '@context/AuthProvider';
import { getAuth } from 'firebase/auth';
import firebaseApp from '@context/firebase/firebaseApp';
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
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="">
        <p className="text-sm text-center">Sign Up | Login</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebaseApp)} />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex m-2">
          <UserCard user={user} />
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
