'use client';

import { useAuthContext } from '@context/AuthProvider';
import UserCheck from '@components/user/UserCheck';
import firebaseApp from '@context/firebase/firebaseApp';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getFirestore, doc } from 'firebase/firestore';

interface Props {
  params: {
    id: string;
  };
}

export default function CustommodelEdit({ params }: Props) {
  const { user } = useAuthContext();
  let data;

  if (user) {
    const db = getFirestore(firebaseApp);
    const path = `custommodels/${user.uid}/list/`;
    const [value, loading, error] = useDocument(doc(db, path, params.id));
    data = value;
  }

  return (
    <>
      <UserCheck>
        <ul>{params.id}</ul>
      </UserCheck>
    </>
  );
}
