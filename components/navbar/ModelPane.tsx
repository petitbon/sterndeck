'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSystemContext } from '@context/SystemProvider';
import { v4 as uuidv4 } from 'uuid';

import { IModel } from '@interfaces/IModel';

import { getModels } from '@firestore/models';

type TFirestoreUUID = string & { _firestoreUUIDBrand: never };

export default function CustommodelPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const router = useRouter();
  const [models, setModels] = useState<IModel[]>([]);
  const newDocId: TFirestoreUUID = uuidv4() as TFirestoreUUID;

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
          <div className="m-3 p-1 flex">
            <span className="text-[18px] ml-6 font-semibold">Models</span>
          </div>
        </li>

        {models?.map((model: IModel, i) => (
          <li className="relative" key={i}>
            <div className="m-3 p-1 flex duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/models/${model.id}`)}>
              <span className="text-[13px] ml-6" key={i}>
                {model.title}
              </span>
            </div>
          </li>
        ))}

        <li className="relative">
          <div className="m-3 p-1 flex duration-300 cursor-pointer hover:bg-blue-300 " onClick={() => router.push(`/models/${newDocId}`)}>
            <span className="text-[13px] ml-6">+ Create New</span>
          </div>
        </li>
      </ul>
    </>
  );
}
