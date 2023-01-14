'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import firebaseApp from '@context/firebase/firebaseApp';
import { useAuthContext } from '@context/AuthProvider';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function CustommodelPane() {
  const { user } = useAuthContext();
  const db = getFirestore(firebaseApp);
  const path = `custommodels/${user.uid}/list`;
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  const router = useRouter();
  return (
    <>
      <ul className="relative px-1">
        <li className="relative">
          <div className="p-2.5 mt-3 flex items-center  px-4 duration-300 ">
            <IconPhoto size={15} stroke={1.5} />
            <span className="text-[15px] mx-4 font-semibold">Custom Models</span>
            <button onClick={() => router.push('/models')} className="btn-small">
              Add New
            </button>
          </div>
        </li>

        {docs?.map((doc, i) => (
          <li className="relative pl-8 pr-4" key={i}>
            <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 " key={i}>
              <span className="text-[13px] ml-4" key={i}>
                {doc.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
      ;
    </>
  );
}
