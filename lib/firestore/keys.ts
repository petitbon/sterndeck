import { firebaseDB } from '@context/firebase/firebase';
import { IKey } from '@interfaces/IKey';

import { doc, setDoc, getDoc, onSnapshot, where, collection, query, Timestamp, documentId } from 'firebase/firestore';

export async function getKey(user_uid: string, setKey: any) {
  const path = `keys`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', user_uid), where('status', '==', 'active'));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const key = documentSnapshot.data();
      allDatas.push({
        ...key,
        id: documentSnapshot.id,
      });
    }
    setKey(allDatas[0] as IKey);
  });
  return unsubscribe;
}

export async function updateKey<T>(user_uid: string, data: T) {
  const docRef = doc(firebaseDB, `keys/${user_uid}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    data = { ...data, created_at: Timestamp.now() };
  }

  return await setDoc(docRef, { ...(data as T[]) }, { merge: true });
}
