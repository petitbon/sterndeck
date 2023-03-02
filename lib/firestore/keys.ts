import { firebaseDB } from '@context/firebase/firebase';
import { IKey } from '@interfaces/IKey';

import { doc, setDoc, deleteDoc, getDocs, collection, addDoc } from 'firebase/firestore';

export async function getKeys(user_uid: string, setKeys: any) {
  const usersCollectionRef = collection(firebaseDB, `users/${user_uid}/keys`);
  getDocs(usersCollectionRef).then((querySnapshot) => {
    const keys: IKey[] = querySnapshot.docs.map((doc) => {
      return doc.data() as IKey;
    });
    setKeys(keys);
  });
}

export async function deleteKey(user_uid: string, key_id: string) {
  return await deleteDoc(doc(firebaseDB, `users/${user_uid}/keys/${key_id}`));
}

export async function addKey(user_uid: string, data: IKey) {
  addDoc(collection(firebaseDB, `users/${user_uid}/keys/`), data);
}

export async function updateKey<T>(user_uid: string, key_id: string, data: T) {
  const keyRef = doc(firebaseDB, `users/${user_uid}/keys/${key_id}`);
  return await setDoc(keyRef, { ...(data as T[]) }, { merge: true });
}

export async function verifyApiKey(user_uid: string, api_key: string) {
  const result: any = doc(firebaseDB, `users/${user_uid}/keys/${api_key}`);
  return result;
}
