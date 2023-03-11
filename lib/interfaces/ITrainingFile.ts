import { Timestamp } from 'firebase/firestore';

export interface ITrainingFile {
  id: string;
  object: string;
  bytes: number;
  created_at: Timestamp;
  filename: string;
  purpose: string;
  status: string;
  status_details: string;
  path: string;
}
