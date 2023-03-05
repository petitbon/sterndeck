'use client';

import { useSystemContext } from '@context/SystemProvider';
import { useRouter } from 'next/navigation';

export default function KeysPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();

  return (
    <>
      <ul className="relative">
        <li className="relative ">
          <div onClick={() => router.push(`/users/${authUser.uid}`)} className="flex p-4 justify-end">
            <span className="text-[11px] pl-4 hover:text-stern-blue cursor-pointer font-semibold">[API keys]</span>
          </div>
        </li>
      </ul>
    </>
  );
}
