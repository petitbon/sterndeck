'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { getCustommodels } from '@context/firebase/firestore';
import { useAuth } from '@context/AuthUserProvider';
import { useEffect, useState } from 'react';

type CustommodelDocument = {
  id: string;
  title: string;
  basemodel: string;
  epochs: number;
  useruid: string;
  trainingFile: string;
};

export default function CustommodelPane() {
  const router = useRouter();
  const { authUser } = useAuth();
  const [custommodels, setCustommodels] = useState([]);
  const [isLodingCustommodels, setIsLodingCustommodels] = useState([]);

  useEffect(() => {
    const doit = async () => {
      if (authUser) {
        const unsubscribe = await getCustommodels(authUser.uid, setCustommodels, setIsLodingCustommodels);
        return () => unsubscribe();
      }
    };
    doit();
  }, [authUser]);

  //console.log(custommodels);

  return (
    <>
      <ul className="relative px-1">
        <li className="relative">
          <div className="flex items-center m-4">
            <IconPhoto size={25} stroke={1.5} className="mr-4" />
            <span className="text-lg font-semibold">Custom Models</span>
          </div>
        </li>

        {custommodels?.map((doc: CustommodelDocument, i) => (
          <li className="relative pl-8" key={i}>
            <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/custommodels/${doc.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {doc.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative pl-8 pr-4">
          <div
            className="mt-3 flex items-center rounded-full duration-300 bg-orange-300 text-white cursor-pointer hover:bg-blue-600 "
            onClick={() => router.push('/custommodels/new')}
          >
            <span className="text-[13px] ml-4" key="new">
              Create New
            </span>
          </div>
        </li>
      </ul>
    </>
  );
}
