import { IModel } from '@interfaces/IModel';

import { addDocument, getCollectionWithLimit, getDocument, updateDocument } from './firestore';

export const getModels = async <T>(user_uid: string, setModels: any): Promise<object> => {
  const resp = await getCollectionWithLimit<IModel>(`models/${user_uid}/list`, 'createdAt', user_uid);
  console.log('getModels: ', resp);
  setModels(resp);
  return resp as T[];
};

export async function getCustommodels(uid: string, setCustommodels: any, setIsLoadingCustommodels: any) {
  const path = `custommodels/${uid}/list`;
}

export const getModel = async (user_uid: string, model_uid: string, setModel: any) => {
  const resp = await getDocument<IModel>(`models/${user_uid}/list/${model_uid}`);
  setModel(resp);
  return null;
};

export const addModel = (user_uid: string, model: IModel) => addDocument(`models/${user_uid}/list`, model);

export const updateModel = (user_uid: string, model_id: string, model: IModel) => updateDocument(`models/${user_uid}/list/${model_id}`, model);

//export const getMoreTrainingFiles = (lastElement: any, state: boolean, uidUser: string) =>
//  getCollectionAt<ITrainingFile>('training_file', 'createdAt', `users/${uidUser}/customodels/${lastElement}`, state, uidUser);
