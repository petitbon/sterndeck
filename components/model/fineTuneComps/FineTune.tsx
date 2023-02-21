import { IconFocus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

import { IFineTune } from '@interfaces/IFineTune';
import { ICancelFineTuneConfirmation } from '@interfaces/ICancelFineTuneConfirmation';
import { IFineTuneDeleteConfirmation } from '@interfaces/IFineTune';
import { IModel } from '@interfaces/IModel';

import FineTunedPrompt from '@components/model/fineTuneComps/FineTunedPrompt';

import { getEvent } from '@firestore/fineTunes';
import { cancelFineTune } from '@firestore/fineTunes';
import { deleteFineTune } from '@firestore/fineTunes';
import { updateFineTune } from '@firestore/fineTunes';

export interface Props {
  user_uid: string;
  model: IModel;
  fine_tune: IFineTune;
}

export interface IPublishedFineTune {
  published_finetune_id: string;
  published_model: string | null;
}

export default function FineTune({ user_uid, model, fine_tune }: Props) {
  const [event, setEvent] = useState({ latestMessage: '' });
  const [fineTuneState, setFineTuneState] = useState<IFineTune>({} as IFineTune);
  const [modelState, setModelState] = useState<IModel>({} as IModel);
  const [showTest, setShowTest] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setFineTuneState(fine_tune);
      const unsub = await getEvent(user_uid, modelState.id, fineTuneState.id, setEvent);
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [fine_tune]);

  useEffect(() => {
    setModelState(model || {});
  }, [model]);

  const cancelTraining = async (fineTuneId: string): Promise<ICancelFineTuneConfirmation | null> => {
    const response = await fetch(`/api/openai/fine-tunes/cancel`, { method: 'POST', body: fineTuneId });
    const confirmation: ICancelFineTuneConfirmation = await response.json();
    await cancelFineTune(user_uid, modelState.id, fineTuneId);
    setFineTuneState({} as IFineTune);
    return confirmation;
  };

  const deleteFineTuned = async (fineTune: IFineTune): Promise<IFineTuneDeleteConfirmation | null> => {
    await fetch(`/api/openai/fine-tunes/delete`, { method: 'DELETE', body: fineTune.fine_tuned_model });
    await cancelFineTune(user_uid, modelState.id, fineTune.id);
    await deleteFineTune(user_uid, modelState.id, fineTune.id);
    setFineTuneState({} as IFineTune);
    return null;
  };

  const publishFineTuned = async (fineTune: IFineTune): Promise<any> => {
    let pubFT: IPublishedFineTune = {
      published_finetune_id: fineTune.id,
      published_model: fineTune.fine_tuned_model,
    };
    await updateFineTune(user_uid, modelState.id, pubFT);
    return null;
  };

  return (
    <div className="flex-1 p-2 mx-2 border items-center">
      <ul>
        <li className="relative m-2">
          <div className="flex flex-row w-full space-x-4 justify-left">
            <div className="">
              <IconFocus size={25} stroke={1.5} className="text-gray-500" />
            </div>
            <div className="">Status: {event?.latestMessage} </div>
            <div className="">{fineTuneState?.fine_tuned_model}</div>
            <div className="">
              {fineTuneState?.fine_tuned_model && (
                <button className="btn-small" onClick={() => cancelTraining(fineTuneState.id)}>
                  Cancel Training
                </button>
              )}
            </div>
            {!!fineTuneState?.fine_tuned_model && (
              <>
                <div className="">
                  <button className="btn-small" onClick={() => deleteFineTuned(fineTuneState)}>
                    Remove Training
                  </button>
                </div>
                <div className="">
                  <button className="btn-small" onClick={() => publishFineTuned(fineTuneState)}>
                    Publish
                  </button>
                </div>
                <div className="">
                  <button className="btn-small" onClick={() => (showTest ? setShowTest(false) : setShowTest(true))}>
                    {showTest ? 'Hide' : 'Show'} Promt
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      </ul>
      <ul>
        <li className="relative m-2">
          <div className={showTest ? 'visible' : 'hidden'}> {!!fineTuneState?.fine_tuned_model && <FineTunedPrompt fine_tuned_model={fineTuneState.fine_tuned_model} />}</div>
        </li>
      </ul>
    </div>
  );
}
