'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSystemContext } from '@context/SystemProvider';
import { v4 as uuidv4 } from 'uuid';

import { IData } from '@interfaces/IData';

import { getDatas } from '@firestore/datas';

export default function DataPane() {
  const { authUser, isSignedIn } = useSystemContext();
  const [dataSets, setDataSets] = useState<IData[]>([]);
  const newDocId: string = uuidv4().replace(/-/g, '').slice(0, 20);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        const unsubscribe = await getDatas(authUser.uid, setDataSets);
        return () => unsubscribe();
      };
      fetchData();
    }
  }, [authUser]);

  return (
    <>
      <div className="flex flex-col flex-wrap h-fit">
        <ul className="relative">
          <li className="relative">
            <div className="m-1 p-1 flex flex-row">
              <div>
                <span className="text-[18px] ml-4">Data Sets</span>
              </div>
              <div onClick={() => router.push(`/data-sets/${newDocId}`)}>
                <span className="text-[11px] pl-4 hover:text-stern-blue cursor-pointer font-semibold">[+ Create New]</span>
              </div>
            </div>
          </li>
        </ul>
        <ul className="h-full overflow-y-scroll">
          {dataSets?.map((data: IData, i) => (
            <li className="relative " key={i}>
              <div
                className="ml-8 my-4 p-1 rounded-none flex duration-200 cursor-pointer hover:bg-stern-blue hover:text-white"
                key={i}
                onClick={() => router.push(`/data-sets/${data.id}`)}
              >
                {path.split('/')[2] == data.id && <span className="w-[6px] bg-stern-blue mr-2 "></span>}
                <span className="text-[13px] ml-6" key={i}>
                  {data.title}
                </span>
              </div>
            </li>
          ))}
          <li className="relative my-10"></li>
        </ul>
      </div>
    </>
  );
}
