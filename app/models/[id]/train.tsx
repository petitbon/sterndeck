import { useState, useEffect } from 'react';

import { getFineTunes } from '@firestore/fineTunes';

import { useSystemContext } from '@context/SystemProvider';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';
import { IFineTune } from '@interfaces/IFineTune';

import TrainingFile from '@components/model/trainingcomps/TrainingFile';
import FineTune from '@components/model/fineTuneComps/FineTune';

import { removeTrainingFile } from '@firestore/trainingFiles';

export interface Props {
  model: IModel;
  training_file: ITrainingFile;
}

export default function TrainStanza({ model, training_file }: Props) {
  const { authUser } = useSystemContext();
  const [fineTunesState, setFineTunesState] = useState<IFineTune[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const forgetit = await getFineTunes(authUser.uid, model.id, training_file.id, setFineTunesState);
      return () => forgetit();
    };
    fetchData();
  }, [training_file]);

  const train = async (training_file: ITrainingFile): Promise<Partial<IFineTune> | null> => {
    const path = `models/${authUser.uid}/list/${model.id}/training_files/${training_file.id}/fine_tunes`;
    const token = await authUser.getIdToken(true);
    const payload = { training_file_id: training_file.id, path: path, use_case_id: model.use_case };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/fine-tunes-create`, {
      //const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const confirmation: Partial<IFineTune> = await response.json();
    return confirmation;
  };

  const remove = async (training_file_id: string) => {
    await removeTrainingFile(authUser.uid, model.id, training_file_id);
  };

  return (
    <>
      <div className="border">
        <ul>
          <li className="relative m-2">
            <div className="flex flex-row w-full p-2 items-center">
              <TrainingFile user_uid={authUser.uid} model={model} training_file={training_file} />
            </div>
          </li>
          {fineTunesState.length > 0}
          {fineTunesState.map((fineTune: IFineTune, i: number) => (
            <li className="relative m-2" key={i}>
              <FineTune user={authUser} model={model} training_file_id={training_file.id} fine_tune={fineTune} />
            </li>
          ))}
          {fineTunesState.length == 0 && (
            <li className="relative m-2">
              <div className="flex flex-row w-full p-2 items-center justify-center ">
                <button className="btn-small mx-4 w-[120px]" onClick={() => train(training_file)}>
                  Train
                </button>
                <button className="btn-small mx-4 w-[120px]" onClick={() => remove(training_file.id)}>
                  Remove
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
