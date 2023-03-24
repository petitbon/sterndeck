import { firebaseDB } from '@context/firebase/firebase';
import { IData } from '@interfaces/IData';

import { doc, getDoc, setDoc, Timestamp, onSnapshot, collection, query, where, documentId, addDoc, orderBy } from 'firebase/firestore';

export async function getDatas(user_uid: string, setModels: any) {
  const path = `data_sets/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path), orderBy('created_at', 'desc'));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const data = documentSnapshot.data();
      allDatas.push({
        ...data,
        id: documentSnapshot.id,
      });
    }
    setModels(allDatas);
  });
  return unsubscribe;
}

export async function getData(user_uid: string, data_id: string, setData: any) {
  const path = `data_sets/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', data_id));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const data = documentSnapshot.data();
      allDatas.push({
        ...data,
        id: documentSnapshot.id,
      });
    }
    setData(allDatas[0] as IData);
  });
  return unsubscribe;
}

export async function updateData<T>(user_uid: string, data_id: string, data: T) {
  const docRef = doc(firebaseDB, `data_sets/${user_uid}/list/${data_id}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    data = { ...data, created_at: Timestamp.now() };
  }

  return await setDoc(docRef, { ...(data as T[]) }, { merge: true });
}
