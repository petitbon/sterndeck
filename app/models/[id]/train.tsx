import { useState, useEffect } from 'react';

import { addFineTune } from '@firestore/fineTunes';
import { getFineTunes } from '@firestore/fineTunes';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';
import { IFineTune } from '@interfaces/IFineTune';

import TrainingFile from '@components/model/trainingcomps/TrainingFile';
import HyperParameters from '@components/model/trainingcomps/HyperParameters';
import FineTune from '@components/model/fineTuneComps/FineTune';

export interface Props {
  user_uid: string;
  model: IModel;
  training_file: ITrainingFile;
}

export interface ITrainData {
  training_file: string;
  model: string;
}

export default function TrainStanza({ user_uid, model, training_file }: Props) {
  const [modelState, setModelState] = useState<IModel>({} as IModel);
  const [trainingFileState, setTrainingFileState] = useState<ITrainingFile>({} as ITrainingFile);
  const [fineTunesState, setFineTunesState] = useState<IFineTune[]>([]);

  useEffect(() => {
    setModelState(model || {});
  }, [model]);

  useEffect(() => {
    setTrainingFileState(training_file || {});
  }, [training_file]);

  useEffect(() => {
    const fetchData = async () => {
      const forgetit = await getFineTunes(user_uid, modelState.id, setFineTunesState);
      return () => {
        forgetit();
      };
    };
    fetchData();
  }, [modelState]);

  const train = async (file: ITrainingFile): Promise<Partial<IFineTune> | null> => {
    let trainData: ITrainData = {
      training_file: file.id,
      model: model.model,
    };

    let fineTune: IFineTune;
    try {
      const response = await fetch(`/api/openai/fine-tunes/create`, { method: 'POST', body: JSON.stringify(trainData) });
      const data: any = await response.json();
      fineTune = data.result;
      await addFineTune(user_uid, model.id, fineTune);
      return fineTune;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <>
      <div className="border">
        <div className="pb-2 flex w-full">
          <div className="w-full p-3 mx-4">
            <TrainingFile model={model} training_file={training_file} />
          </div>
        </div>
        <HyperParameters model={modelState} user_uid={user_uid} />
        <div className="pb-2 flex w-full">
          <div className="w-full flex flex-row p-3 mx-4 justify-end">
            <div className="flex m-2 font-semibold">
              <button className="btn-small" onClick={() => train(trainingFileState)}>
                Train
              </button>
            </div>
          </div>
        </div>
        <ul>
          {fineTunesState.map((fineTune: IFineTune, i: number) => (
            <li className="relative m-2" key={i}>
              <FineTune user_uid={user_uid} model={modelState} fine_tune={fineTune} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/*
  <div className="flex m-2 font-semibold">
    <button className="btn-small" onClick={() => deleteFile(trainingFileState)}>
      Remove
    </button>
  </div>

  const deleteFile = async (file: ITrainingFile): Promise<IDeletedFileConfirmation | null> => {
    const response = await fetch(`/api/openai/training-files/${file.id}`, { method: 'DELETE' });
    const confirmation: IDeletedFileConfirmation = await response.json();
    deleteTrainingFile(user_uid, modelState.id, file.id);
    deleteStorageFile(file.path);
    setTrainingFileState({} as ITrainingFile) ;
    return confirmation;
  };
 */
