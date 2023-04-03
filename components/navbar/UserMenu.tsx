'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { User, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

import { firebaseAuth } from '@context/firebase/firebase';
import { useSystemContext } from '@context/SystemProvider';
import { UserCard } from '@components/user/UserCard';

import { IconChevronDown } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
import { IconKey } from '@tabler/icons-react';

export default function Example() {
  const { authUser, isSignedIn, setIsSignedIn, setAuthUser } = useSystemContext();
  const provider = new GoogleAuthProvider();
  const router = useRouter();

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
    <div className="relative w-full ">
      {!isSignedIn ? (
        <div className="flex items-end justify-end ">
          <div className="mx-4">
            <button className="px-2 py-2" onClick={signIn}>
              Sign In
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-end ">
          <Menu as="div" className="inline-block">
            <div className="">
              <Menu.Button className="inline-flex w-full px-4 py-2 hover:text-stern-blue">
                <UserCard user={authUser} />
                <IconChevronDown size={46} stroke={1} className="ml-2 -mr-1 h-5 w-5 " aria-hidden="true" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-4 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push(`/users/${authUser.uid}`)}
                        className={`${active ? 'bg-stern-blue text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <IconKey stroke={1} className="mr-2 h-5 w-5" aria-hidden="true" />
                        API Keys
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut(firebaseAuth)}
                        className={`${active ? 'bg-stern-blue text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <IconLogout className="mr-2 h-5 w-5" stroke={1} aria-hidden="true" />
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
}
