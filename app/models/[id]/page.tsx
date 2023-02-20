'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, FormProvider } from 'react-hook-form';

import { IModel } from '@interfaces/IModel';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';

import { getModel } from '@firestore/models';
import { getTrainingFiles } from '@firestore/trainingFiles';
import { getFineTunes } from '@firestore/fineTunes';

import Title from '@components/modelcomps/Title';
import BaseModel from '@components/modelcomps/BaseModel';
import Epochs from '@components/modelcomps/Epochs';
import Batch from '@components/modelcomps/Batch';
import LearningRate from '@components/modelcomps/LearningRate';
import PromptLoss from '@components/modelcomps/PromptLoss';
import ComputeClassification from '@components/modelcomps/ComputeClassification';

import UserCheck from '@components/user/UserCheck';
import PublishedModelCard from '@components/custommodels/PublishedModelCard';
import SternDrop from '@components/custommodels/SternDrop';
import TrainingFile from '@components/custommodels/TrainingFile';
import FineTune from '@components/custommodels/FineTune';

interface Props {
  params: {
    id: string;
  };
}

export default function ModelEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [model, setModel] = useState({} as IModel);
  const [trainingFiles, setTrainingFiles] = useState<ITrainingFile[]>([]);
  const [fineTunes, setFineTunes] = useState<IFineTune[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn) {
        const disregard = await getModel(authUser.uid, params.id, setModel);
        const unsubscribe = await getTrainingFiles(authUser.uid, params.id, setTrainingFiles);
        const forgetit = await getFineTunes(authUser.uid, params.id, setFineTunes);
        return () => {
          unsubscribe();
          disregard();
          forgetit();
        };
      }
    };
    fetchData();
  }, [authUser]);

  const methods = useForm();
  //const onSubmit = (data: any) => console.log('DATA FROM EDIT PAGE: ', data);
  const onSubmit = (data: any) => null;

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4 h-screen">
          <FormProvider {...methods}>
            <form className="custom-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                {' '}
                <div className="pb-4">
                  <Title user_uid={authUser.uid} model_id={model?.id} title={model?.title} />
                </div>
                <div className="pb-4 flex w-full">
                  <div className="w-1/3 p-4">
                    <BaseModel user_uid={authUser.uid} model_id={model?.id} baseModel={model?.model} />
                  </div>
                  <div className="w-1/3 p-4">
                    <Epochs user_uid={authUser.uid} model_id={model?.id} n_epochs={model?.n_epochs} />
                  </div>
                  <div className="w-1/3 p-4">
                    <Batch user_uid={authUser.uid} model_id={model?.id} batch={model?.batch_size} />
                  </div>
                </div>
                <div className="pb-4 flex w-full">
                  <div className="w-1/3 p-4">
                    <LearningRate user_uid={authUser.uid} model_id={model?.id} learning_rate={model?.learning_rate_multiplier} />
                  </div>
                  <div className="w-1/3 p-4">
                    <PromptLoss user_uid={authUser.uid} model_id={model?.id} prompt_loss_weight={model?.prompt_loss_weight} />
                  </div>
                  <div className="w-1/3 p-4">
                    <ComputeClassification user_uid={authUser.uid} model_id={model?.id} compute_classification_metrics={model?.compute_classification_metrics} />
                  </div>
                </div>
                <SternDrop model_id={params.id as string} />
                <ul>
                  {fineTunes.length == 0 &&
                    trainingFiles.map((file: ITrainingFile, i: number) => (
                      <li className="relative m-2" key={i}>
                        <TrainingFile model={model} trainingFile={file} />
                      </li>
                    ))}
                </ul>
                <ul>
                  {fineTunes.map((fineTune: IFineTune, i: number) => (
                    <li className="relative m-2" key={i}>
                      <FineTune modelId={params.id} fineTune={fineTune} />
                    </li>
                  ))}
                </ul>
                <ul>
                  <li className="relative m-2">{!!model?.published_model && <PublishedModelCard published_model={model.published_model} />}</li>
                </ul>
              </div>
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
