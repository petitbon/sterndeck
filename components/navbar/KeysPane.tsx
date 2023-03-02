'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSystemContext } from '@context/SystemProvider';
import { v4 as uuidv4 } from 'uuid';

import { IKey } from '@interfaces/IKey';

import { getKeys } from '@firestore/keys';

export default function KeysPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const [keysState, setKeysState] = useState<IKey[]>([]);
  const newDocId: string = uuidv4().replace(/-/g, '').slice(0, 20);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        await getKeys(authUser.uid, setKeysState);
      };
      fetchData();
    }
  }, [authUser]);

  return (
    <>
      <ul className="relative">
        <li className="relative">
          <div className="m-3 p-1 flex">
            <span className="text-[11px] ml-6 font-semibold">Api Keys</span>
          </div>
        </li>

        {keysState?.map((key: IKey, i) => (
          <li className="relative" key={i}>
            <div className="m-3 p-1 flex duration-300 cursor-pointer hover:bg-stern-blue" key={i}>
              <span className="text-[12px] ml-6" key={i}>
                {key.apiKey}
              </span>
            </div>
          </li>
        ))}

        <li className="relative">
          <div className="m-3 p-1 flex duration-300 cursor-pointer  hover:bg-stern-blue" onClick={() => console.log('here')}>
            <span className="text-[12px] ml-6">+ Create New</span>
          </div>
        </li>
      </ul>
    </>
  );
}
