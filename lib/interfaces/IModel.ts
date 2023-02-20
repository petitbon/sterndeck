export interface IModel {
  id: string;
  title: string;
  user_uid: string;
  n_epochs: number;
  batch_size: number;
  learning_rate_multiplier: number;
  prompt_loss_weight: number;
  compute_classification_metrics: boolean;
  classification_n_classes: number;
  classification_positive_class: string;
  suffix: string;
  model: string;
  publisned_finetune_id: string;
  published_model: string;
}
