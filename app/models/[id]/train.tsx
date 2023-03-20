import { useState, useEffect } from 'react';

import { getFineTunes } from '@firestore/fineTunes';

import { useSystemContext } from '@context/SystemProvider';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';
import { IFineTune } from '@interfaces/IFineTune';
import { ILiveModel } from '@interfaces/IModel';

import TrainingFile from '@components/model/trainingcomps/TrainingFile';
import FineTune from '@components/model/fineTuneComps/FineTune';
//import Loading from '@components/shared/Loading';
import { removeTrainingFile } from '@firestore/trainingFiles';

export interface Props {
  model: IModel;
  training_file: ITrainingFile;
  live_models: ILiveModel[];
}

export default function TrainStanza({ model, training_file, live_models }: Props) {
  const { authUser } = useSystemContext();
  const [fineTunesState, setFineTunesState] = useState<IFineTune[]>([]);
  const [selectedLiveModel, setSelectedLiveModel] = useState<string>('davinci');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getFineTunes(authUser.uid, model.id, training_file.id, setFineTunesState);
      } catch (error) {
        console.error('Error fetching fine-tunes:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [authUser.uid, model.id, training_file]);

  const train = async (training_file: ITrainingFile): Promise<Partial<IFineTune> | null> => {
    setLoading(true);
    const token = await authUser.getIdToken(true);
    const payload = { user_uid: authUser.uid, training_file_id: training_file.id, model_id: model.id, use_case_id: model.use_case, base_model: selectedLiveModel };
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

  const saveLiveModel = async (e: any) => {
    setSelectedLiveModel(e.target.value);
  };

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 0)}...${input.slice(-26)}` : input);

  return (
    <>
      <div className="border">
        <ul>
          <li className="relative m-2">
            <div className="flex flex-row w-full p-2 items-center">
              <TrainingFile user_uid={authUser.uid} model={model} training_file={training_file} />
            </div>
          </li>
          <li className="relative m-2">
            <div className="flex-1 m-2 border-0 ">
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
                    <span className="mr-4"> ON </span>
                    <select className="custom-select" onChange={(e) => saveLiveModel(e)} value={selectedLiveModel}>
                      <option value="davinci">base model (davinci) </option>
                      {live_models.map((ft, i) => (
                        <option value={String(ft.id)} key={i}>
                          {truncate(ft.id)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex w-[120px] justify-end ">
                    <button className="btn-small w-[120px]" onClick={() => remove(training_file.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
