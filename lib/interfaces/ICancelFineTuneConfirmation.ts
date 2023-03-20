import { IEvent } from './IEvents';

export interface ICancelFineTuneConfirmation {
  id: string;
  object: string;
  model: string;
  created_at: Date;
  events: Array<IEvent[]>[];
  status: string;
}

/*
{
  "id": "ft-xhrpBbvVUzYGo8oUO1FY4nI7",
  "object": "fine-tune",
  "model": "curie",
  "created_at": 1614807770,
  "events": [ { ... } ],
  "fine_tuned_model": null,
  "hyperparams": { ... },
  "organization_id": "org-...",
  "result_files": [],
  "status": "cancelled",
  "validation_files": [],
  "training_files": [
    {
      "id": "file-XGinujblHPwGLSztz8cPS8XY",
      "object": "file",
      "bytes": 1547276,
      "created_at": 1610062281,
      "filename": "my-data-train.jsonl",
      "purpose": "fine-tune-train"
    }
  ],
  "updated_at": 1614807789,
}
*/
