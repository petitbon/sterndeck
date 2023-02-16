import { IModel } from './IModel';

export interface IComposite {
  id: string;
  title: string;
  user_uid: string;
  sequence: Array<IModel>;
}

export interface ICompositeRequest {
  prompt: string;
  sequence: Array<IModel>;
}
