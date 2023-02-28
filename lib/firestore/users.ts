import { firebaseDB } from '@context/firebase/firebase';
import { IUser } from '@interfaces/IUser';

import { onSnapshot, collection, query, where, documentId } from 'firebase/firestore';

export async function getUserApiKey(user_uid: string, setAuthApiKey: any) {
  const path = `users`;
  const collectionQuery = query(collection(firebaseDB, path), where(documentId(), '==', user_uid));
  const unsubscribe = onSnapshot(collectionQuery, async (snapshot) => {
    let allDatas = [];
    for (const documentSnapshot of snapshot.docs) {
      const user = documentSnapshot.data();
      allDatas.push({
        ...user,
        id: documentSnapshot.id,
      });
    }
    setAuthApiKey(JSON.stringify(allDatas[0].apiKey));
  });
  return unsubscribe;
}
