'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { getCustommodels } from '@context/firebase/firestore';
import { useAuth } from '@context/AuthUserProvider';
import { useEffect, useState } from 'react';

export default function CustommodelPane() {
  const router = useRouter();

  const { authUser, isLoading } = useAuth();
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

  console.log(custommodels);

  return (
    <>
      <ul className="relative px-1">
        <li className="relative">
          <div className="p-2.5 mt-3 flex items-center  px-4 duration-300 ">
            <IconPhoto size={15} stroke={1.5} />
            <span className="text-[15px] mx-4 font-semibold">Custom Models</span>
            <button onClick={() => router.push('/custommodels/new')} className="btn-small">
              Add New
            </button>
          </div>
        </li>

        {custommodels?.map((doc, i) => (
          <li className="relative pl-8 pr-4" key={i}>
            <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/custommodels/${doc.id}`)}>
              <span className="text-[13px] ml-4" key={i}>
                {doc.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
