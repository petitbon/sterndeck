import { firebaseDB } from '@context/firebase/firebase';
import { IModel } from '@interfaces/IModel';

import { doc, setDoc, deleteDoc, onSnapshot, collection, query, where, documentId, addDoc } from 'firebase/firestore';

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

export async function deleteModel(user_uid: string, model_id: string) {
  return await deleteDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}`));
}

export async function addModel(user_uid: string, data: IModel) {
  addDoc(collection(firebaseDB, `models/${user_uid}/list/`), data);
}

export async function updateModel<T>(user_uid: string, model_id: string, data: T) {
  return await setDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}`), { ...(data as T[]) }, { merge: true });
}
