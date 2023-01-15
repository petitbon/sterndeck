'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import firebaseApp from '@context/firebase/firebaseApp';
import { useAuthContext } from '@context/AuthProvider';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function CustommodelPane() {
  const { user } = useAuthContext();
  const db = getFirestore(firebaseApp);
  const path = `custommodels/${user.uid}/list`;
  const [value, loading, error] = useCollection(collection(db, path), {
    snapshotListenOptions: { includeMetadataChanges: false },
  });

  //  console.log(loading);
  //  console.log(error);
  const router = useRouter();
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

        {value?.docs.map((doc, i) => (
          <li className="relative pl-8 pr-4" key={i}>
            <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 " key={i} onClick={() => router.push(`/custommodels/${doc?.id}`)}>
              <span className="text-[13px] ml-4" key={i}>
                {doc?.get('title')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
