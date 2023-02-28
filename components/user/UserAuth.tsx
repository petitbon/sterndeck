'use client';

import { useEffect, useState } from 'react';
import { signInWithCustomToken, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '@context/firebase/firebase';
import jwt from 'jsonwebtoken';
//import { SignJWT } from 'jose/jwt/sign';
import * as jose from 'jose';
import { UserCard } from '@components/user/UserCard';
import { useSystemContext } from '@context/SystemProvider';
import { User } from 'firebase/auth';
import { getUserApiKey } from '@firestore/users';
import * as admin from 'firebase-admin';

function SignInScreen() {
  const { isSignedIn, setIsSignedIn } = useSystemContext();
  const { authUser, setAuthUser } = useSystemContext();
  const { authApiKey, setAuthApiKey } = useSystemContext();
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

  useEffect(() => {
    if (authUser?.uid) {
      const fetchKey = async () => {
        await getUserApiKey(authUser.uid, setAuthApiKey);
        //        const idToken = await authUser.getIdTokenResult(true);
        /* 
        let uint8Array = new TextEncoder().encode(idToken.token);
        const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setIssuer('urn:example:issuer')
          .setAudience('urn:example:audience')
          .setExpirationTime('1000y')
          .sign(uint8Array);
 */
        //       const userJWT = idToken.token;
        console.log(authApiKey);
      };
      fetchKey();
    }
  }, [authUser]);

  if (isSignedIn) {
    return (
      <div className="flex flex-col w-full h-[400px]">
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
