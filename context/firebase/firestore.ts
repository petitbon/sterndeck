import { addDoc, collection, deleteDoc, getDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const RECEIPT_COLLECTION = 'receipts';

export function addReceipt(uid: string, date: any, locationName: any, address: any, items: any, amount: any, imageBucket: any) {
  addDoc(collection(firebaseDB, RECEIPT_COLLECTION), { uid, date, locationName, address, items, amount, imageBucket });
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
    setIsLoadingCustommodel(false);
  });
  return unsubscribe;
}

// Updates receipt with @docId with given information.
export function updateReceipt(docId: string, uid: string, date: any, locationName: string, address: string, items: any, amount: any, imageBucket: any) {
  setDoc(doc(firebaseDB, RECEIPT_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket });
}

// Deletes receipt with given @id.
export function deleteReceipt(id: string) {
  deleteDoc(doc(firebaseDB, RECEIPT_COLLECTION, id));
}
