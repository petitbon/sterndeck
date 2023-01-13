'use client';

import firebase from '../firebase/clientApp';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Image from 'next/image';

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
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = getAuth(firebase).onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div className="">
        <p className="p-6">Sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebase)} />
      </div>
    );
  } else {
    return (
      <>
        <div className="m-4 flex">
          <Image width="35" height="35" className="borderer-0 mr-1 rounded-full" src={getAuth(firebase).currentUser?.photoURL!} alt="user image" />
          {getAuth(firebase).currentUser?.displayName}!
        </div>
        <div className="absolute right-0 ">
          <button className="btn-primary m-4 justify-right" onClick={() => getAuth(firebase).signOut()}>
            Sign-out
          </button>
        </div>
      </>
    );
  }
}

export default SignInScreen;
