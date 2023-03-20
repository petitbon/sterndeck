import { firebaseDB } from '@context/firebase/firebase';
// todo make the latest event a full event type
//import { IEvent } from '@interfaces/IEvents';
import { documentId, onSnapshot, collection, query, where } from 'firebase/firestore';

export async function getEvent(user_uid: string, model_id: string, training_file_id: string, finetune_id: string, setEvent: any) {
  const path = `models/${user_uid}/list/${model_id}/training_files/${training_file_id}/events`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', finetune_id));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const event = documentSnapshot.data();
      allDatas.push({
        ...event,
        id: documentSnapshot.id,
      });
    }
    if (allDatas.length > 0) {
      setEvent(allDatas[0]);
    }
  });
  return unsubscribe;
}
