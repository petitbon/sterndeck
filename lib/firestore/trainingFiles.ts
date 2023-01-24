import { firebaseDB } from '@context/firebase/firebase';

import { onSnapshot, collection, query } from 'firebase/firestore';

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
