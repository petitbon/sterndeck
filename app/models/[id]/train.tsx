import { useState, useEffect } from 'react';

import { getFineTunes } from '@firestore/fineTunes';

import { useSystemContext } from '@context/SystemProvider';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';
import { IFineTune } from '@interfaces/IFineTune';
import { ILiveModel } from '@interfaces/IModel';

import TrainingFile from '@components/model/trainingcomps/TrainingFile';
import FineTune from '@components/model/fineTuneComps/FineTune';
import { removeTrainingFile } from '@firestore/trainingFiles';

export interface Props {
  model: IModel;
  training_file: ITrainingFile;
  latest_model: ILiveModel;
}

export default function TrainStanza({ model, training_file, latest_model }: Props) {
  const { authUser } = useSystemContext();
  const [fineTunesState, setFineTunesState] = useState<IFineTune[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const unsub = await getFineTunes(authUser.uid, model.id, training_file.id, setFineTunesState);
      return () => unsub();
    };
    fetchData();
  }, [authUser.uid, model.id, training_file]);

  const train = async (training_file: ITrainingFile): Promise<Partial<IFineTune> | null> => {
    setLoading(true);
    const token = await authUser.getIdToken(true);
    const payload = { user_uid: authUser.uid, training_file_id: training_file.id, model_id: model.id, use_case_id: model.use_case, base_model: latest_model.id };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/fine-tunes-create`, {
      //const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const confirmation: Partial<IFineTune> = await response.json();
    setLoading(false);
    return confirmation;
  };

  const remove = async (training_file_id: string) => {
    await removeTrainingFile(authUser.uid, model.id, training_file_id);
  };

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 0)}...${input.slice(-26)}` : input);

  return (
    <>
      <div className="flex flex-row border items-top">
        <div className="w-[40px] m-2">
          <div className="flex flex-row w-full">
            <TrainingFile training_file={training_file} />
          </div>
        </div>
        <div className="w-full mt-6">
          {fineTunesState.map((fineTune: IFineTune) => (
            <FineTune user={authUser} model={model} training_file_id={training_file.id} fine_tune={fineTune} key={fineTune.id} />
          ))}
          {loading && <div className="flex"> ... loading </div>}
          {fineTunesState.length == 0 && !loading && (
            <div className="flex flex-row">
              <div className="w-full">
                <button className="btn-small w-[120px] mr-4" onClick={() => train(training_file)}>
                  Train
                </button>
              </div>
              <div className="flex w-[120px] justify-end ">
                <button className="btn-small w-[120px]" onClick={() => remove(training_file.id)}>
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/*
  *
  *
  

                    <span className="mr-4"> ON </span>
                    <select className="custom-select" onChange={(e) => saveLiveModel(e)} value={selectedLiveModel}>
                      <option value="davinci">base model (davinci) </option>
                      {live_models.map((ft, i) => (
                        <option value={String(ft.id)} key={i}>
                          {truncate(ft.id)}
                        </option>
                      ))}
                    </select>

  *
  *
  *
  *
  *
  * */
