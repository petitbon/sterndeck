/*
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { ITrainingFile } from '@interfaces/Custommodel';

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

export async function getUploadedTrainingFiles(uid: string, id: string, setUploadedTrainingFiles: any) {
  const path = `custommodels/${uid}/list/${id}/uploadedTrainingFiles`;
  const custommodelsQuery = query(collection(firebaseDB, path));
  const unsubscribe = onSnapshot(custommodelsQuery, async (snapshot) => {
    let allfiles: any = [];
    setUploadedTrainingFiles(allfiles);
    for (const doc of snapshot.docs) {
      const file = doc.data();
      allfiles.push({
        ...file,
      });
      setUploadedTrainingFiles(allfiles);
    }
  });
  return unsubscribe;
}

export async function getCustommodel(uid: string, id: string, setCustommodel: any) {
  const path = `custommodels/${uid}/list/${id}`;
  const unsubscribe = onSnapshot(doc(firebaseDB, path), async (doc) => {
    setCustommodel(doc.data());
  });
  return unsubscribe;
}

export async function updateCustommodelFirst(
  custommodelid: string,
  uid: string,
  trainingFileId: string,
  trainingFile: ITrainingFile,
  trainingFilePath: string,
  trainingFileURL: string
) {
  const path = `custommodels/${uid}/list/${custommodelid}/uploadedTrainingFiles`;
  const unsub = await setDoc(doc(firebaseDB, path, trainingFileId), { id: trainingFileId, trainingFile, trainingFilePath, trainingFileURL });
  return unsub;
}

export async function updateFineTunes(custommodelid: string, uid: string, trainingFileId: string, fine_tune_id: string) {
  const path = `custommodels/${uid}/list/${custommodelid}/fine-tunes`;
  const unsub = await setDoc(doc(firebaseDB, path, fine_tune_id), { id: trainingFileId, fine_tune_id: fine_tune_id });
  return unsub;
}

export function deleteCustommodel(uid: string, id: string) {
  const path = `custommodels/${uid}/list/`;
  deleteDoc(doc(firebaseDB, path, id));
}

export function deleteTrainingFile(uid: string, custommodelid: string, fileid: string) {
  const path = `custommodels/${uid}/list/${custommodelid}/uploadedTrainingFiles`;
  deleteDoc(doc(firebaseDB, path, fileid));
}


*/
