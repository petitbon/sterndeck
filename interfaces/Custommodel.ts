// STERNDECK

export interface UploadedTrainingFile {
  id: string;
  trainingFile: TrainingFile;
  trainingFilePath: string;
  trainingFileURL: string;
}

export interface Custommodel {
  title: string;
  useruid: string;
  epochs: number;
  basemodel: string;
}

// OPENAI
//
export interface TrainingFile {
  id: string;
  object: string;
  bytes: number;
  created_at: Date;
  filename: string;
  purpose: string;
}

export interface FineTune {
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
  training_files: Array<TrainingFile>;
  updated_at: Date;
}

export interface DeletedFileConfirmation {
  id: string;
  object: string;
  deleted: boolean;
}
