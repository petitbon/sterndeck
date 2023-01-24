import { ITrainingFile } from '@interfaces/ITrainingFile';

export interface IFineTune {
  id: string;
  object: string;
  model: string;
  created_at: Date;
  events: [
    {
      object: string;
      created_at: Date;
      level: string;
      message: string;
    }
  ];
  fine_tuned_model: null;
  hyperparams: {
    batch_size: number;
    learning_rate_multiplier: number;
    n_epochs: number;
    prompt_loss_weight: number;
  };
  organization_id: string;
  result_files: Array<string>;
  status: string;
  validation_files: Array<string>;
  training_files: Array<ITrainingFile>;
  updated_at: Date;
}
