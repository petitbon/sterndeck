'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, SubmitHandler, FormProvider, FieldValues } from 'react-hook-form';

import { IModel } from '@interfaces/IModel';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';

import { getModel } from '@firestore/models';
import { getTrainingFiles } from '@firestore/trainingFiles';

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
        return () => {
          unsubscribe();
          disregard();
        };
      }
    };
    fetchData();
  }, [authUser]);

  const methods = useForm();
  const onSubmit = (data: any) => console.log('DAT FROM EDIT PAGE: ', data);

  const onCreateFineTune: SubmitHandler<FieldValues> = async (subdata) => {
    //   console.log(JSON.stringify(subdata));
    /*
    try {
      const response = await fetch('/api/openai/fine-tunes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subdata),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result);
    } catch (error) {
      console.error(error);
    }
     */
  };

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4 h-screen">
          <FormProvider {...methods}>
            <form className="custommodel-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                {' '}
                <div> Custom Model {model?.title} </div>
                <div> Base Model {model?.model} </div>
                <div> Number of Epochs {model?.n_epochs} </div>
                <SternDrop model_id={params.id as string} />
                <ul>
                  {trainingFiles.map((file: ITrainingFile, i: number) => (
                    <li className="relative m-2" key={i}>
                      <TrainingFile modelId={params.id} trainingFile={file} />
                    </li>
                  ))}
                </ul>
                <div className="flex-1 justify-center align-center m-4">
                  <button className="btn-primary bg-red-600 w-full text-white text-xl" onClick={methods.handleSubmit((d) => onCreateFineTune(d))}>
                    TRAIN FINE TUNE MODEL
                  </button>
                </div>
                <ul>
                  {fineTunes.map((fineTune: IFineTune, i: number) => (
                    <li className="relative m-2" key={i}>
                      <FineTune modelId={params.id} trainingFiles={fineTune.training_files} />
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
