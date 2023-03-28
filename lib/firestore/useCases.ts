import { firebaseDB } from '@context/firebase/firebase';

import { getDocs, getDoc, collection, doc, where, query } from 'firebase/firestore';

export async function getUseCases(setUseCases: any, setUseCaseState: any) {
  const querySnapshot = await getDocs(query(collection(firebaseDB, 'use_cases'), where('live_flag', '==', 'production')));
  let allDatas: any = [];
  querySnapshot.forEach((doc) => {
    const model = doc.data();
    allDatas.push({
      ...model,
      id: doc.id,
    });
  });
  setUseCases(allDatas);
  setUseCaseState(allDatas[0].id);
}

export async function getUseCase(use_case_id: string) {
  const oneDoc: any = await getDoc(doc(firebaseDB, 'use_cases', use_case_id));
  return oneDoc.data();
}
