import { firebaseDB } from '@context/firebase/firebase';

import { ITrainingFile } from '@interfaces/ITrainingFile';

import { doc, setDoc, deleteDoc, onSnapshot, collection, query, addDoc, orderBy, Query } from 'firebase/firestore';

export async function getTrainingFiles(user_uid: string, model_id: string, setTrainingFiles: any) {
  const path = `models/${user_uid}/list/${model_id}/training_files`;
  const collectionQuery = query(collection(firebaseDB, path), orderBy('created_at', 'desc'));
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
