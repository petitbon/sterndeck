export interface IUseCase {
  id: string;
  short_name: string;
  long_name: string;
  description: string;
  hyper_parameters: IHyperParameters;
}

export interface IHyperParameters {
  n_epochs?: number;
  batch_size?: number;
  learning_rate_multiplier?: number;
  prompt_loss_weight?: number;
  compute_classification_metrics?: boolean;
  classification_n_classes?: number;
  classification_positive_class?: string;
}
