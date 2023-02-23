import { ITrainingFile } from '@interfaces/ITrainingFile';

export interface IFineTuneDeleteConfirmation {
  id: string;
  object: string;
  deleted: boolean;
}

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
  fine_tuned_model: string | null;
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

export interface IFineTuneOAIRequest {
  training_file: string;
  validation_file?: string;
  model: string;
  suffix: string;
  n_epochs?: number;
  batch_size?: number;
  learning_rate_multiplier?: number;
  prompt_loss_weight?: number;
  compute_classification_metrics?: boolean;
  classification_n_classes?: number;
  classification_positive_class?: string;
}
