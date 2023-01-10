'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { UserCard } from '@components/user/UserCard';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <UserCard user={session?.user} />
        <div className="h-16 flex p-4 justify-center">
          <button onClick={() => signOut()} className=" justify-end text-sm w-[80px] h-[30px] bg-indigo-500 rounded-full text-white">
            Sign Out
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-16 flex p-4 justify-center">
          <button onClick={() => signIn()} className=" justify-end text-sm w-[80px] h-[30px] bg-indigo-500 rounded-full text-white">
            Sign In
          </button>
        </div>
      </>
    );
  }
}
