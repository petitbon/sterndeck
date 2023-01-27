'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconPhoto } from '@tabler/icons-react';
import { useSystemContext } from '@context/SystemProvider';

import { IModel } from '@interfaces/IModel';

import { getModels } from '@firestore/models';

export default function CustommodelPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();
  const [models, setModels] = useState<IModel[]>([]);

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
      <ul className="relative px-1">
        <li className="relative">
          <div className="flex flex-row">
            {' '}
            <div className="flex items-center m-4">
              <IconPhoto size={35} stroke={1.5} className="mr-4" />
              <span className="text-lg font-semibold">Custom Models </span>
            </div>
            <div className="flex items-center m-4">
              <button className="btn-small" onClick={() => router.push('/models/new')}>
                <span className="text-[11px] mx-4">+ Create New </span>
              </button>
            </div>
          </div>
        </li>

        {models?.map((model: IModel, i) => (
          <li className="relative pl-8" key={i}>
            <div className="m-3 p-1 flex items-center duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/models/${model.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {model.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative pl-8 pr-4"></li>
      </ul>
    </>
  );
}
