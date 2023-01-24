import { firebaseDB } from '@context/firebase/firebase';
import { IModel } from '@interfaces/IModel';

import { onSnapshot, collection, query, where, documentId } from 'firebase/firestore';
export async function getModels(user_uid: string, setModels: any) {
  const path = `models/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const model = documentSnapshot.data();
      allDatas.push({
        ...model,
        id: documentSnapshot.id,
      });
    }
    setModels(allDatas);
  });
  return unsubscribe;
}

export async function getModel(user_uid: string, model_id: string, setModel: any) {
  const path = `models/${user_uid}/list`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', model_id));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const model = documentSnapshot.data();
      allDatas.push({
        ...model,
        id: documentSnapshot.id,
      });
    }
    setModel(allDatas[0] as IModel);
  });
  return unsubscribe;
}

/*
export const addModel = (user_uid: string, model: IModel) => addDocument(`models/${user_uid}/list`, model);

export const updateModel = (user_uid: string, model_id: string, model: IModel) => updateDocument(`models/${user_uid}/list/${model_id}`, model);

export const addDocument = async <T>(collectionName: string, data: T) => {
  return await addDoc(collection(firestore, collectionName), data as T[]);
};

export const updateDocument = async <T>(collectionName: string, data: T) => {
  return await updateDoc(doc(firestore, collectionName), { ...(data as T[]) });
};

export const deleteDocument = async <T>(collectionName: string) => {
  return await deleteDoc(doc(firestore, collectionName));
};
 */
