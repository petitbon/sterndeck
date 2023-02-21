import { useState, useEffect } from 'react';

import BaseModel from '@components/model/trainingcomps/BaseModel';
import Epochs from '@components/model/trainingcomps/Epochs';
import Batch from '@components/model/trainingcomps/Batch';
import LearningRate from '@components/model/trainingcomps/LearningRate';
import PromptLoss from '@components/model/trainingcomps/PromptLoss';
import ComputeClassification from '@components/model/trainingcomps/ComputeClassification';

import { IModel } from '@interfaces/IModel';

export interface Props {
  user_uid: string;
  model: IModel;
}

export default function HyperParameters({ user_uid, model }: Props) {
  const [modelState, setModelState] = useState<IModel>({} as IModel);

  useEffect(() => {
    setModelState(model || {});
  }, [model]);

  return (
    <>
      <div className="pb-2 flex w-full">
        <div className="w-1/3 p-3 mx-4">
          <BaseModel user_uid={user_uid} model_id={modelState.id} baseModel={modelState.model} />
        </div>
        <div className="w-1/3 p-3 mx-4">
          <Epochs user_uid={user_uid} model_id={modelState.id} n_epochs={modelState.n_epochs} />
        </div>
        <div className="w-1/3 p-3 mx-4">
          <Batch user_uid={user_uid} model_id={modelState.id} batch={modelState.batch_size} />
        </div>
      </div>
      <div className="pb-2 flex w-full">
        <div className="w-1/3 p-3 mx-4">
          <LearningRate user_uid={user_uid} model_id={modelState.id} learning_rate={modelState.learning_rate_multiplier} />
        </div>
        <div className="w-1/3 p-3 mx-4">
          <PromptLoss user_uid={user_uid} model_id={modelState.id} prompt_loss_weight={modelState.prompt_loss_weight} />
        </div>
        <div className="w-1/3 p-3 mx-4">
          <ComputeClassification user_uid={user_uid} model_id={modelState.id} compute_classification_metrics={modelState.compute_classification_metrics} />
        </div>
      </div>
    </>
  );
}
