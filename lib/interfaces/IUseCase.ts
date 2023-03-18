export interface IUseCase {
  id: string;
  model: string;
  short_name: string;
  long_name: string;
  description: string;
  hyper_parameters: IHyperParameters;
  completion_parameters: ICompletionParameters;
  completion_separator: string;
  prompt_separator: string;
}

export interface IHyperParameters {
  n_epochs?: number;
  batch_size?: number;
  learning_rate_multiplier?: number;
  prompt_loss_weight?: number;
}

export interface ICompletionParameters {
  compute_classification_metrics?: boolean;
  classification_n_classes?: number;
  classification_positive_class?: string;
  frequency_penalty?: number;
  presence_penalty?: number;
  temperature?: number;
}
