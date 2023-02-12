'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconAffiliate } from '@tabler/icons-react';
import { useSystemContext } from '@context/SystemProvider';

import { IComposer } from '@interfaces/IComposer';

import { getComposers } from '@firestore/composers';

export default function CustomcomposerPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();
  const [composers, setComposers] = useState<IComposer[]>([]);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        const unsubscribe = await getComposers(authUser.uid, setComposers);
        return () => unsubscribe();
      };
      fetchData();
    }
  }, [authUser]);

  return (
    <>
      <ul className="relative px-1">
        <li className="relative">
          <div className="flex flex-row">
            {' '}
            <div className="flex items-center m-4">
              <IconAffiliate size={35} stroke={1.5} className="mr-4" />
              <span className="text-lg font-semibold">Composers </span>
            </div>
            <div className="flex items-center m-4">
              <button className="btn-small" onClick={() => router.push('/composers/new')}>
                <span className="text-[11px] mx-4">+ Create New </span>
              </button>
            </div>
          </div>
        </li>

        {composers?.map((composer: IComposer, i) => (
          <li className="relative pl-8" key={i}>
            <div className="m-3 p-1 flex items-center duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/composers/${composer.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {composer.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative pl-8 pr-4"></li>
      </ul>
    </>
  );
}
