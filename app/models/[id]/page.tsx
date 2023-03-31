'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, FormProvider } from 'react-hook-form';

import { IModel } from '@interfaces/IModel';
import { ILiveModel } from '@interfaces/IModel';
import { ITrainingFile } from '@interfaces/ITrainingFile';

import { getModel } from '@firestore/models';
import { getLiveModels } from '@firestore/models';
import { getLatestModel } from '@firestore/models';
import { getTrainingFiles } from '@firestore/trainingFiles';

import UploadStanza from './upload';
import TrainStanza from './train';

import Title from '@components/model/comps/Title';
import SubTitle from '@components/model/comps/SubTitle';
import NewModel from '@components/model/comps/NewModel';
import UserCheck from '@components/user/UserCheck';

interface Props {
  params: {
    id: string;
  };
}

export default function ModelEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [model, setModel] = useState<IModel>({} as IModel);
  const [trainingFiles, setTrainingFiles] = useState<ITrainingFile[]>([]);
  const [liveModels, setLiveModels] = useState<ILiveModel[]>([]);
  const [latestModel, setLatestModel] = useState<ILiveModel>({} as ILiveModel);

  useEffect(() => {
    if (authUser?.uid) {
      const fetchData = async () => {
        if (isSignedIn) {
          try {
            const disregard = await getModel(authUser.uid, params.id, setModel);
            const unsubscribe = await getTrainingFiles(authUser.uid, params.id, setTrainingFiles);
            const useless = await getLiveModels(authUser.uid, params.id, setLiveModels);
            const usenot = await getLatestModel(authUser.uid, params.id, setLatestModel);
            return () => {
              unsubscribe();
              disregard();
              useless();
              usenot();
            };
          } catch (error) {
            console.error('Error fetching model data:', error);
          }
        }
      };
      fetchData();
    }
  }, [authUser]);

  const methods = useForm();
  const onSubmit = (data: any) => null;

  return (
    <>
      <UserCheck>
        <div className="flex-1 p-4">
          <FormProvider {...methods}>
            <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
              {!model?.title ? (
                <div className="pb-4">
                  <NewModel user_uid={authUser?.uid} model_id={params.id} />
                </div>
              ) : (
                <div className="pb-4">
                  <Title user_uid={authUser?.uid} model_id={model?.id} title={model?.title} />
                  <SubTitle model={model} />
                </div>
              )}
              <div>
                <ul>
                  <li className="relative m-2">{model?.use_case && <UploadStanza user={authUser} model={model} />}</li>
                  {trainingFiles.map((training_file: ITrainingFile, i: number) => (
                    <li className="relative m-2" key={i}>
                      <TrainStanza model={model} training_file={training_file} latest_model={latestModel} />
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
