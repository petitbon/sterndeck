'use client';

import { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@context/firebase/firebase';
import { UserCard } from '@components/user/UserCard';
import { useSystemContext } from '@context/SystemProvider';
import { User } from 'firebase/auth';

function SignInScreen() {
  const { isSignedIn, setIsSignedIn } = useSystemContext();
  const { authUser, setAuthUser } = useSystemContext();
  const provider = new GoogleAuthProvider();
  //  const auth = getAuth();

  const signIn = async () => {
    await signInWithPopup(firebaseAuth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user: any) => {
      setAuthUser(user as User);
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

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
        <div className="flex justify-center items-center m-2">
          <button className="btn-primary" onClick={signIn}>
            Sign In
          </button>
        </div>
      </>
    );
  }
}

export default SignInScreen;
