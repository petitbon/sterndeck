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

import UploadStanza from './upload';
import TrainStanza from './train';

import Title from '@components/model/comps/Title';
import UserCheck from '@components/user/UserCheck';
import PublishedModelCard from '@components/custommodels/PublishedModelCard';

interface Props {
  params: {
    id: string;
  };
}

export default function ModelEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [model, setModel] = useState<IModel>({} as IModel);
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
        <div className="flex h-screen">
          <FormProvider {...methods}>
            <form className="custom-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="pb-4">
                <Title user_uid={authUser.uid} model_id={params.id} title={model?.title} />
              </div>
              <div>
                <ul>
                  <li className="relative m-2">{model?.title && <UploadStanza user_uid={authUser.uid} model={model} />}</li>
                  {trainingFiles.map((training_file: ITrainingFile, i: number) => (
                    <li className="relative m-2" key={i}>
                      <TrainStanza user_uid={authUser.uid} model={model} training_file={training_file} />
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
