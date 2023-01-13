'use client';

import { GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthContext } from '@context/AuthProvider';
import { getAuth } from 'firebase/auth';
import firebaseApp from '@context/firebase/firebaseApp';
import { UserCard } from '@components/user/UserCard';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display GitHub as auth providers.
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
    //signInSuccess: () => false,
  },
};

function SignInScreen() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="">
        <p className="p-6">Sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebaseApp)} />
      </div>
    );
  } else {
    return (
      <>
        <div className="m-4 flex">
          <UserCard user={user} />
        </div>
        <div className="right-0">
          <button className="btn-primary m-4 justify-right" onClick={() => getAuth(firebaseApp).signOut()}>
            Sign-out
          </button>
        </div>
      </>
    );
  }
}

export default SignInScreen;
