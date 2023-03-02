'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSystemContext } from '@context/SystemProvider';
import { v4 as uuidv4 } from 'uuid';

import { IModel } from '@interfaces/IModel';

import { getModels } from '@firestore/models';

export default function CustommodelPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();
  const [models, setModels] = useState<IModel[]>([]);
  const newDocId: string = uuidv4().replace(/-/g, '').slice(0, 20);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        const unsubscribe = await getModels(authUser.uid, setModels);
        return () => unsubscribe();
      };
      fetchData();
    }
  }, [authUser]);

  return (
    <>
      <ul className="relative">
        <li className="relative">
          <div className="m-1 p-1 flex flex-row">
            <div>
              <span className="text-[18px] ml-4">Models</span>
            </div>
            <div onClick={() => router.push(`/models/${newDocId}`)}>
              <span className="text-[11px] pl-4 hover:text-stern-blue cursor-pointer font-semibold">[+ Create New]</span>
            </div>
          </div>
        </li>

        {models?.map((model: IModel, i) => (
          <li className="relative" key={i}>
            <div className="ml-8 my-4 p-1 flex duration-500 cursor-pointer hover:bg-stern-blue" key={i} onClick={() => router.push(`/models/${model.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {model.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative my-10"></li>
      </ul>
    </>
  );
}
