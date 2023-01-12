'use client';

//import { useSession, signIn, signOut } from 'next-auth/react';
import FirebaseLogin from '@components/auth/FirebaseLogin';

export default function Login() {
  return <FirebaseLogin />;

  /*

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="h-16 grid grid-cols-1 gap-4 content-center">
          <button className="btn-primary" onClick={() => signOut()}>
            Sign Out
          </button>
          {session?.user?.email}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-16 grid grid-cols-1 gap-4 content-center">
          <button className="btn-primary" onClick={() => signIn()}>
            Sign In
          </button>
        </div>
      </>
    );
  }
   */
}
