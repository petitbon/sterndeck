'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { getCustommodels } from '@context/firebase/firestore';
import { useEffect, useState } from 'react';
import { useSystemContext } from '@context/SystemProvider';

type CustommodelDocument = {
  id: string;
  title: string;
  basemodel: string;
  epochs: number;
  useruid: string;
  trainingFile: string;
};

export default function CustommodelPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();
  const [custommodels, setCustommodels] = useState([]);
  const [isLodingCustommodels, setIsLodingCustommodels] = useState([]);

  useEffect(() => {
    const doit = async () => {
      if (isSignedIn) {
        const unsubscribe = await getCustommodels(authUser.uid, setCustommodels, setIsLodingCustommodels);
        return () => unsubscribe();
      }
    };
    doit();
  }, [authUser]);

  return (
    <>
      <ul className="relative px-1">
        <li className="relative">
          <div className="flex flex-row">
            {' '}
            <div className="flex items-center m-4">
              <IconPhoto size={35} stroke={1.5} className="mr-4" />
              <span className="text-lg font-semibold">Custom Models</span>
            </div>
            <div className="flex items-center m-4">
              <button className="btn-small" onClick={() => router.push('/custommodels/new')}>
                <span className="text-[11px] mx-4">+ Create New </span>
              </button>
            </div>
          </div>
        </li>

        {custommodels?.map((doc: CustommodelDocument, i) => (
          <li className="relative pl-8" key={i}>
            <div className="m-3 p-1 flex items-center duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/custommodels/${doc.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {doc.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative pl-8 pr-4"></li>
      </ul>
    </>
  );
}
