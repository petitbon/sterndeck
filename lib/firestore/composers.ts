import { firebaseDB } from '@context/firebase/firebase';
import { IComposer } from '@interfaces/IComposer';

import { doc, updateDoc, deleteDoc, onSnapshot, collection, query, where, documentId, addDoc } from 'firebase/firestore';

export async function getComposers(user_uid: string, setComposers: any) {
  const path = `composers/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const composer = documentSnapshot.data();
      allDatas.push({
        ...composer,
        id: documentSnapshot.id,
      });
    }
    setComposers(allDatas);
  });
  return unsubscribe;
}

export async function getComposer(user_uid: string, composer_id: string, setComposer: any) {
  const path = `composers/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', composer_id));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const composer = documentSnapshot.data();
      allDatas.push({
        ...composer,
        id: documentSnapshot.id,
      });
    }
    setComposer(allDatas[0] as IComposer);
  });
  return unsubscribe;
}

export async function deleteComposer(user_uid: string, composer_id: string) {
  return await deleteDoc(doc(firebaseDB, `composers/${user_uid}/list/${composer_id}`));
}

export async function addComposer(user_uid: string, data: IComposer) {
  addDoc(collection(firebaseDB, `composers/${user_uid}/list/`), data);
}

export async function updateComposer<T>(user_uid: string, composer_id: string, data: T) {
  return await updateDoc(doc(firebaseDB, `composers/${user_uid}/list/${composer_id}`), { ...(data as T[]) });
}

/*
export const addComposer = (user_uid: string, composer: IComposer) => addDocument(`composers/${user_uid}/list`, composer);


export const addDocument = async <T>(collectionName: string, data: T) => {
  return await addDoc(collection(firestore, collectionName), data as T[]);
};

export const updateDocument = async <T>(collectionName: string, data: T) => {
  return await updateDoc(doc(firestore, collectionName), { ...(data as T[]) });
};

 */
