import { useSystemContext } from '@context/SystemProvider';

import { IconFocus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';
import { ICancelFineTuneConfirmation } from '@interfaces/ICancelFineTuneConfirmation';

import { IFineTuneDeleteConfirmation } from '@interfaces/IFineTune';

import { getEvent } from '@firestore/fineTunes';
import TrainedFile from '@components/custommodels/TrainedFile';
import FineTunedPrompt from '@components/custommodels/FineTunedPrompt';

import { cancelFineTune } from '@firestore/fineTunes';
import { deleteFineTune } from '@firestore/fineTunes';

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

  const cancelTraining = async (fineTuneId: string): Promise<ICancelFineTuneConfirmation | null> => {
    const response = await fetch(`/api/openai/fine-tunes/cancel`, { method: 'POST', body: fineTuneId });
    const confirmation: ICancelFineTuneConfirmation = await response.json();
    await cancelFineTune(authUser.uid, modelId, fineTuneId);
    fineTune = {} as IFineTune;
    return confirmation;
  };

  const deleteFineTuned = async (fineTune: IFineTune): Promise<IFineTuneDeleteConfirmation | null> => {
    await fetch(`/api/openai/fine-tunes/delete`, { method: 'DELETE', body: fineTune.fine_tuned_model });
    await cancelFineTune(authUser.uid, modelId, fineTune.id);
    await deleteFineTune(authUser.uid, modelId, fineTune.id);
    fineTune = {} as IFineTune;
    return null;
  };

  return (
    <div className="flex-1 p-2 mx-2 border items-center border ">
      <div className="text-[12px] m-1 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle"></div>
        <div className="flex py-1 tems-center inline-block align-middle"></div>
      </div>

      <ul>
        <li className="relative m-2">
          <div className="flex flex-row">
            <div className="flex block">
              <IconFocus size={55} stroke={1.5} className="text-gray-500" />
            </div>
            <div className="flex block">
              {fineTune.id} <br />
              Status: {event?.latestMessage} <br />
            </div>
          </div>
        </li>
      </ul>
      <ul>
        {fineTune.training_files.map((file: ITrainingFile, i: number) => (
          <li className="relative m-2" key={i}>
            <TrainedFile trainingFile={file} />
          </li>
        ))}
      </ul>

      <ul>
        <li className="relative m-2">
          {!!fineTune.fine_tuned_model && <div className="flex-1 p-2 mx-2 border bg-gray-300 items-center border ">{fineTune.fine_tuned_model}</div>}
        </li>
      </ul>
      <ul>
        <li className="relative m-2">
          {!fineTune.fine_tuned_model && (
            <button className="btn-primary" onClick={() => cancelTraining(fineTune.id)}>
              Cancel Training
            </button>
          )}
          {!!fineTune.fine_tuned_model && <FineTunedPrompt fine_tuned_model={fineTune.fine_tuned_model} />}
        </li>
      </ul>
      <ul>
        <li className="relative flex justify-center  m-2 pt-4">
          {!!fineTune.fine_tuned_model && (
            <button className="btn-primary" onClick={() => deleteFineTuned(fineTune)}>
              Remove Training
            </button>
          )}
        </li>
      </ul>
      <div className="flex m-2 font-semibold justify-end"></div>
    </div>
  );
}
