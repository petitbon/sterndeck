import { addDoc, updateDoc, collection, deleteDoc, getDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { getDownloadURL } from './storage';

export function addCustommodels(uid: string, date: any, locationName: any, address: any, items: any, amount: any, imageBucket: any) {
  const path = `custommodels/${uid}/list/`;
  addDoc(collection(firebaseDB, path), { uid, date, locationName, address, items, amount, imageBucket });
}

export async function getCustommodels(uid: string, setCustommodels: any, setIsLoadingCustommodels: any) {
  const path = `custommodels/${uid}/list`;
  const custommodelsQuery = query(collection(firebaseDB, path));
  const unsubscribe = onSnapshot(custommodelsQuery, async (snapshot) => {
    let allCustommodels = [];
    for (const documentSnapshot of snapshot.docs) {
      const custommodel = documentSnapshot.data();
      allCustommodels.push({
        ...custommodel,
        id: documentSnapshot.id,
      });
    }
    setCustommodels(allCustommodels);
    setIsLoadingCustommodels(false);
  });
  return unsubscribe;
}

export async function getCustommodel(uid: string, id: string, setCustommodel: any, setIsLoadingCustommodel: any) {
  const path = `custommodels/${uid}/list/${id}`;
  const unsubscribe = onSnapshot(doc(firebaseDB, path), async (doc) => {
    setCustommodel(doc.data());
  });
  return unsubscribe;
}

export async function updateCustommodel(id: string, uid: string, fileJob: string, trainingFilePath: string, trainingFileURL: string, setSavedFile: any, setIsSaving: any) {
  setIsSaving(true);
  const path = `custommodels/${uid}/list/`;

  await updateDoc(doc(firebaseDB, path, id), { trainingFileURL, fileJob, trainingFilePath })
    .then(() => {
      setIsSaving(false);
    })
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`);
    });
}

export function deleteCustommodel(uid: string, id: string) {
  const path = `custommodels/${uid}/list/`;
  deleteDoc(doc(firebaseDB, path, id));
}
