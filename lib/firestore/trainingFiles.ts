import { firebaseDB } from '@context/firebase/firebase';

import { ITrainingFile } from '@interfaces/ITrainingFile';

import { doc, setDoc, deleteDoc, onSnapshot, collection, query, addDoc } from 'firebase/firestore';

export async function getTrainingFiles(user_uid: string, model_id: string, setTrainingFiles: any) {
  const path = `models/${user_uid}/list/${model_id}/training_files`;
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
    setTrainingFiles(allDatas);
  });
  return unsubscribe;
}

export async function addTrainingFile(user_uid: string, model_id: string, data: ITrainingFile) {
  const path = `models/${user_uid}/list/${model_id}/training_files`;
  await setDoc(doc(firebaseDB, path, data.id), data);
}

export async function deleteTrainingFile(user_uid: string, model_id: string, data_id: string) {
  deleteDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}/training_files/${data_id}`));
}

//export function addTrainingFile(uid, date, locationName, address, items, amount, imageBucket) {
//  addDoc(collection(db, RECEIPT_COLLECTION), { uid, date, locationName, address, items, amount, imageBucket });
//}
//
//
//

/*
export const updateTrainingFile = (user_uid: string, model_id: string, training_file: ITrainingFile) =>
  updateDocument(`models/${user_uid}/list/${model_id}/training_files/${training_file.id}`, training_file);

export const deleteTrainingFile = (user_uid: string, model_id: string, training_file_id: string) =>
  deleteDocument(`models/${user_uid}/list/${model_id}/training_files/${training_file_id}`);



export const addDocument = async <T>(collectionName: string, data: T) => {
  return await addDoc(collection(firestore, collectionName), data as T[]);
};

export const updateDocument = async <T>(collectionName: string, data: T) => {
  return await updateDoc(doc(firestore, collectionName), { ...(data as T[]) });
};

 */
