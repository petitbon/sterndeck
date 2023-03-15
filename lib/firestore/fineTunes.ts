import { firebaseDB } from '@context/firebase/firebase';

import { updateDoc, doc, setDoc, deleteDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';

export async function getFineTunes(user_uid: string, model_id: string, training_file_id: string, setFineTunesState: any) {
  const path = `models/${user_uid}/list/${model_id}/training_files/${training_file_id}/fine_tunes`;
  const collectionQuery = query(collection(firebaseDB, path), where('status', 'in', ['pending', 'running', 'succeeded']), orderBy('created_at', 'desc'));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const model = documentSnapshot.data();
      allDatas.push({
        ...model,
        id: documentSnapshot.id,
      });
    }
    setFineTunesState(allDatas);
  });
  return unsubscribe;
}

//export async function addFineTune(user_uid: string, model_id: string, training_file_id: string, data: any) {
//  const path = `models/${user_uid}/list/${model_id}/training_files/${training_file_id}/fine_tunes`;
//  await setDoc(doc(firebaseDB, path, data.id), data);
//}

export async function deleteFineTune(user_uid: string, model_id: string, training_file_id: string, data_id: string) {
  await deleteDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}/training_files/${training_file_id}/fine_tunes/${data_id}`));
}

export async function cancelFineTune(user_uid: string, model_id: string, training_file_id: string, fine_tune_id: string) {
  const data = { status: 'cancelled' };
  const path = `models/${user_uid}/list/${model_id}/training_files/${training_file_id}/fine_tunes`;
  await setDoc(doc(firebaseDB, path, fine_tune_id), data, { merge: true });
}

export async function updateFineTune<T>(user_uid: string, model_id: string, training_file_id: string, data: T) {
  return await updateDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}/training_files/${training_file_id}`), { ...(data as T[]) });
}
