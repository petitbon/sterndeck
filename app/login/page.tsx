'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="h-16 grid grid-cols-1 gap-4 content-center">
          {session?.user?.email}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-16 grid grid-cols-1 gap-4 content-center">
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      </>
    );
  }
}
