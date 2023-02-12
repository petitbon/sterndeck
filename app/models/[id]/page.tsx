'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, SubmitHandler, FormProvider, FieldValues } from 'react-hook-form';

import { IModel } from '@interfaces/IModel';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';

import { getModel } from '@firestore/models';
import { getTrainingFiles } from '@firestore/trainingFiles';
import { getFineTunes } from '@firestore/fineTunes';

import UserCheck from '@components/user/UserCheck';
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
  const onSubmit = (data: any) => console.log('DATA FROM EDIT PAGE: ', data);

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4 h-screen">
          <FormProvider {...methods}>
            <form className="custom-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                {' '}
                <div className="text-4xl"> {model?.title} </div>
                <div className="text-sm pb-10">
                  Base Model: {model?.model} | Number of Epochs: {model?.n_epochs}{' '}
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
              </div>
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
