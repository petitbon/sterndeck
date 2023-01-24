import { IFineTune } from '@interfaces/IFineTune';

import { addDocument, getCollectionAt, getCollectionWithLimit, getDocument, updateDocument } from './firestore';

export const getFineTunes = async (user_uid: string, model_id: string, setFineTunes: any) => {
  const resp = await getCollectionWithLimit<IFineTune>(`models/${user_uid}/list/${model_id}/fine_tunes`, 'createdAt', user_uid);
  setFineTunes(resp);
  return null;
};

export const getFineTune = async (user_uid: string, model_uid: string, fine_tune_id: string, setFineTune: any) => {
  const resp = await getDocument<IFineTune>(`models/${user_uid}/list/${model_uid}/fine_tunes/${fine_tune_id}`);
  setFineTune(resp);
  return null;
};

export const addFineTune = (user_uid: string, model_id: string, fine_tune: IFineTune) => addDocument(`models/${user_uid}/list/${model_id}/fine_tunes`, fine_tune);

export const UpdateFineTune = (user_uid: string, model_id: string, fine_tune: IFineTune) =>
  updateDocument(`models/${user_uid}/list/${model_id}/fine_tunes/${fine_tune.id}`, fine_tune);

//export const getMoreTrainingFiles = (lastElement: any, state: boolean, uidUser: string) =>
//  getCollectionAt<ITrainingFile>('training_file', 'createdAt', `users/${uidUser}/customodels/${lastElement}`, state, uidUser);
