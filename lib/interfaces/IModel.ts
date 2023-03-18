export interface IModel {
  id: string;
  title: string;
  user_uid: string;
  model: string;
  suffix: string;
  created_at: Date;
  use_case: string;
  fine_tuned_models: [];
}

export interface ILiveModel {
  id: string;
  created_at: Date;
}
