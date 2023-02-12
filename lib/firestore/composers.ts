import { firebaseDB } from '@context/firebase/firebase';
import { IComposer } from '@interfaces/IComposer';

import { doc, deleteDoc, onSnapshot, collection, query, where, documentId, addDoc } from 'firebase/firestore';

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

//export const addComposer = async <T>(user_uid: string, data: T) => {
//  addDoc(collection(firebaseDB, `composers/${user_uid}/list/`), data as T[]);
//};

export async function deleteComposer(user_uid: string, composer_id: string) {
  return await deleteDoc(doc(firebaseDB, `composers/${user_uid}/list/${composer_id}`));
}

export async function addComposer(user_uid: string, data: IComposer) {
  addDoc(collection(firebaseDB, `composers/${user_uid}/list/`), data);
}

//  export function addComposer(user_uid, date, locationName, address, items, amount, imageBucket) {
//   addDoc(collection(db, RECEIPT_COLLECTION), { uid, date, locationName, address, items, amount, imageBucket });
//}

/*
export const addComposer = (user_uid: string, composer: IComposer) => addDocument(`composers/${user_uid}/list`, composer);

export const updateComposer = (user_uid: string, composer_id: string, composer: IComposer) => updateDocument(`composers/${user_uid}/list/${composer_id}`, composer);

export const addDocument = async <T>(collectionName: string, data: T) => {
  return await addDoc(collection(firestore, collectionName), data as T[]);
};

export const updateDocument = async <T>(collectionName: string, data: T) => {
  return await updateDoc(doc(firestore, collectionName), { ...(data as T[]) });
};

 */
