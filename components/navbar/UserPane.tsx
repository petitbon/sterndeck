'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

import { firebaseAuth } from '@context/firebase/firebase';
import { useSystemContext } from '@context/SystemProvider';
import { UserCard } from '@components/user/UserCard';

export default function KeysPane() {
  const router = useRouter();
  const { authUser, isSignedIn, setIsSignedIn, setAuthUser } = useSystemContext();
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

  return (
    <div className="bg-white">
      <ul className="relative">
        {!isSignedIn ? (
          <li className="relative">
            <div className="flex flew-row w-full h-[300px]">
              <div className="flex w-full justify-center items-start m-2">
                <button className="btn-primary" onClick={signIn}>
                  Sign In
                </button>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li className="relative">
              <div className="flex flex-col w-full h-[50px]">
                <div className="flex m-2">
                  <UserCard user={authUser} />
                </div>
              </div>
            </li>
            <li className="relative">
              <div className="flex flex-row w-full justify-end p-2">
                <div className="flex px-2" onClick={() => router.push(`/users/${authUser.uid}`)}>
                  <span className="text-[11px] hover:text-stern-blue cursor-pointer font-semibold">[OpenAI API key]</span>
                </div>
                <div className="flex px-2" onClick={() => signOut(firebaseAuth)}>
                  <span className="text-[11px] hover:text-stern-blue cursor-pointer font-semibold">[Sign-out]</span>
                </div>
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
