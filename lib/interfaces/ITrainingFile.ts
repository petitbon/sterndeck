export interface ITrainingFile {
  id: string;
  object: string;
  bytes: number;
  created_at: Date;
  filename: string;
  purpose: string;
  status: string;
  status_details: string;
  path: string;
}
