import { firebaseDB } from '@context/firebase/firebase';

import { doc, setDoc, deleteDoc, onSnapshot, collection, query, where } from 'firebase/firestore';

export async function getFineTunes(user_uid: string, model_id: string, setFineTunes: any) {
  const path = `models/${user_uid}/list/${model_id}/fine_tunes`;
  const collectionQuery = query(collection(firebaseDB, path), where('status', '!=', 'cancelled'));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const model = documentSnapshot.data();
      allDatas.push({
        ...model,
        id: documentSnapshot.id,
      });
    }
    setFineTunes(allDatas);
  });
  return unsubscribe;
}

export async function addFineTune(user_uid: string, model_id: string, data: any) {
  const path = `models/${user_uid}/list/${model_id}/fine_tunes`;
  await setDoc(doc(firebaseDB, path, data.id), data);
}

export async function deleteFineTune(user_uid: string, model_id: string, data_id: string) {
  deleteDoc(doc(firebaseDB, `models/${user_uid}/list/${model_id}/fine_tunes/${data_id}`));
}

export async function cancelFineTune(user_uid: string, model_id: string, fine_tune_id: string) {
  const data = { status: 'cancelled' };
  const path = `models/${user_uid}/list/${model_id}/fine_tunes`;
  await setDoc(doc(firebaseDB, path, fine_tune_id), data, { merge: true });
}
export async function getEvent(user_uid: string, model_id: string, finetune_id: string, setEvent: any) {
  const path = `models/${user_uid}/list/${model_id}/fine_tunes/${finetune_id}/events`;
  const unsub = onSnapshot(doc(firebaseDB, path, 'update'), (doc) => {
    console.log(`Received doc snapshot: ${JSON.stringify(doc.data())}`);
    setEvent(doc.data());
  });

  return unsub;
}
