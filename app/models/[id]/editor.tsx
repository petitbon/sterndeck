import { useState, useEffect } from 'react';

import BaseModel from '@components/model/editorcomps/BaseModel';
import Epochs from '@components/model/editorcomps/Epochs';
import Batch from '@components/model/editorcomps/Batch';
import LearningRate from '@components/model/editorcomps/LearningRate';
import PromptLoss from '@components/model/editorcomps/PromptLoss';
import ComputeClassification from '@components/model/editorcomps/ComputeClassification';
import FileDrop from '@components/model/editorcomps/FileDrop';

import { IModel } from '@interfaces/IModel';

export interface Props {
  user_uid: string;
  model: IModel;
}

export default function EditorStanza({ user_uid, model }: Props) {
  const [modelInput, setModelInput] = useState<IModel>({} as IModel);

  useEffect(() => {
    setModelInput(model || {});
  }, [model]);

  return (
    <>
      <div className="border">
        <div className="pb-4 flex w-full">
          <div className="w-1/3 p-4">
            <BaseModel user_uid={user_uid} model_id={modelInput.id} baseModel={modelInput.model} />
          </div>
          <div className="w-1/3 p-4">
            <Epochs user_uid={user_uid} model_id={modelInput.id} n_epochs={modelInput.n_epochs} />
          </div>
          <div className="w-1/3 p-4">
            <Batch user_uid={user_uid} model_id={modelInput.id} batch={modelInput.batch_size} />
          </div>
        </div>
        <div className="pb-4 flex w-full">
          <div className="w-1/3 p-4">
            <LearningRate user_uid={user_uid} model_id={modelInput.id} learning_rate={modelInput.learning_rate_multiplier} />
          </div>
          <div className="w-1/3 p-4">
            <PromptLoss user_uid={user_uid} model_id={modelInput.id} prompt_loss_weight={modelInput.prompt_loss_weight} />
          </div>
          <div className="w-1/3 p-4">
            <ComputeClassification user_uid={user_uid} model_id={modelInput.id} compute_classification_metrics={modelInput.compute_classification_metrics} />
          </div>
        </div>
        <FileDrop user_uid={user_uid} model_id={modelInput.id} />
      </div>
    </>
  );
}
