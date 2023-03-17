import { firebaseDB } from '@context/firebase/firebase';
import { IKey } from '@interfaces/IKey';

import { doc, setDoc, deleteDoc, onSnapshot, where, collection, addDoc, query } from 'firebase/firestore';

const truncate = (input: string) => `${input.substring(0, 9)}...${input.slice(-4)}`;

export async function getKeys(user_uid: string, setKeys: any) {
  const path = `keys`;
  const collectionQuery = query(collection(firebaseDB, path), where('status', '==', 'active'), where('user_uid', '==', user_uid));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot: any) => {
    let allDatas = [];
    for (const docSnap of snapshot.docs) {
      const nKey: IKey = {
        id: docSnap.id,
        user_uid: docSnap.data().user_uid,
        api_key: truncate(docSnap.data().api_key),
        status: docSnap.data().status,
        created_at: docSnap.data().created_at,
      };
      allDatas.push(nKey);
    }
    setKeys(allDatas);
  });
  return unsubscribe;
}

export async function updateKey<T>(key_id: string, data: T) {
  console.log(data);
  if (key_id == '') {
    return await addDoc(collection(firebaseDB, `keys/`), { ...(data as T[]) });
  } else {
    const keyRef = doc(firebaseDB, `keys/${key_id}`);
    return await setDoc(keyRef, { ...(data as T[]) }, { merge: true });
  }
}
