import { ITrainingFile } from '@interfaces/ITrainingFile';

import { addDocument, deleteDocument, getCollectionAt, getCollectionWithLimit, getDocument, updateDocument } from './firestore';

export const getTrainingFiles = async (user_uid: string, model_id: string, setTrainingFiles: any) => {
  const resp = await getCollectionWithLimit<ITrainingFile>(`models/${user_uid}/list/${model_id}/training_files`, 'createdAt', user_uid);
  setTrainingFiles(resp);
  return null;
};

export const getTrainingFile = (user_uid: string, model_uid: string, training_file_id: string) =>
  getDocument<ITrainingFile>(`models/${user_uid}/list/${model_uid}/training_files/${training_file_id}`);

export const addTrainingFile = (user_uid: string, model_id: string, training_file: ITrainingFile) =>
  addDocument(`models/${user_uid}/list/${model_id}/training_files`, training_file);

export const updateTrainingFile = (user_uid: string, model_id: string, training_file: ITrainingFile) =>
  updateDocument(`models/${user_uid}/list/${model_id}/training_files/${training_file.id}`, training_file);

export const deleteTrainingFile = (user_uid: string, model_id: string, training_file_id: string) =>
  deleteDocument(`models/${user_uid}/list/${model_id}/training_files/${training_file_id}`);
