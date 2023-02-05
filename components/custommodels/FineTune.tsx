import { useSystemContext } from '@context/SystemProvider';

import { useState, useEffect } from 'react';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';
import { ICancelFineTuneConfirmation } from '@interfaces/ICancelFineTuneConfirmation';

import { getEvent } from '@firestore/fineTunes';
import TrainedFile from '@components/custommodels/TrainedFile';

import { cancelFineTune } from '@firestore/fineTunes';

export interface Props {
  fineTune: IFineTune;
  modelId: string;
}

export default function FineTune({ fineTune, modelId }: Props) {
  const { authUser } = useSystemContext();
  const [event, setEvent] = useState({ latestMessage: '' });

  useEffect(() => {
    const fetchData = async () => {
      const unsub = await getEvent(authUser.uid, modelId, fineTune.id, setEvent);
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [authUser]);

  //

  const cancelTraining = async (fineTuneId: string): Promise<ICancelFineTuneConfirmation | null> => {
    console.log(fineTuneId);
    const response = await fetch(`/api/openai/fine-tunes/${fineTuneId}/cancel`, { method: 'POST', body: fineTuneId });
    const confirmation: ICancelFineTuneConfirmation = await response.json();
    cancelFineTune(authUser.uid, modelId, fineTuneId);
    fineTune = {} as IFineTune;
    return confirmation;
  };

  return (
    <div className="flex-1 p-2 mx-2 border items-center border ">
      <div className="text-[12px] m-1 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle"></div>
        <div className="flex py-1 tems-center inline-block align-middle"></div>
      </div>

      <ul>
        <li className="relative m-2" key="">
          Fine Tune: {fineTune.id} Status: {fineTune.status}
        </li>
      </ul>

      <ul>
        <li className="relative m-2" key="">
          Update: {event?.latestMessage}
        </li>
      </ul>
      <ul>
        {fineTune.training_files.map((file: ITrainingFile, i: number) => (
          <li className="relative m-2" key={i}>
            <TrainedFile trainingFile={file} />
          </li>
        ))}
      </ul>

      <div className="flex m-2 w-1/3 font-semibold justify-end">
        <button className="btn-primary" onClick={() => cancelTraining(fineTune.id)}>
          Cancel Training
        </button>
      </div>
    </div>
  );
}

/*
 *
export interface IFineTune {
  id: string;
  object: string;
  model: string;
  created_at: Date;
  events: [
    {
      object: string;
      created_at: Date;
      level: string;
      message: string;
    }
  ];
  fine_tuned_model: null;
  hyperparams: {
    batch_size: number;
    learning_rate_multiplier: number;
    n_epochs: number;
    prompt_loss_weight: number;
  };
  organization_id: string;
  result_files: Array<string>;
  status: string;
  validation_files: Array<string>;
  training_files: Array<ITrainingFile>;
  updated_at: Date;
}
 */
