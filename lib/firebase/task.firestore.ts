import Task from '@models/Task';

import { addDocument, getCollectionAt, getCollectionWithLimit, getDocument, updateDocument } from './firestore';

export const getTasks = async (state: boolean, uidUser: string) => {
  return await getCollectionWithLimit<Task>('users', 'createdAt', state, uidUser);
};

export const getMoreTasks = (lastElement: any, state: boolean, uidUser: string) =>
  getCollectionAt<Task>('tasks', 'createdAt', `users/${uidUser}/tasks/${lastElement}`, state, uidUser);

export const getTask = (uidUser: string, uidTask: string) => getDocument<Task>(`users/${uidUser}/tasks/${uidTask}`);

export const addTask = (uidUser: string, task: Task) => addDocument(`users/${uidUser}/tasks`, task);

export const UpdateTask = (uidUser: string, task: Task) => updateDocument(`users/${uidUser}/tasks/${task.id}`, task);
