'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { UserCard } from '@components/user/UserCard';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="h-16 grid grid-cols-1 gap-4 content-center">
          {/* Pass session info to server component */}
          <UserCard user={session?.user} />
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
