import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IFineTune } from '@interfaces/IFineTune';
import { ICancelFineTuneConfirmation } from '@interfaces/ICancelFineTuneConfirmation';
import { IModel } from '@interfaces/IModel';

import Loading from '@components/shared/Loading';
import FineTunedPrompt from '@components/model/fineTuneComps/FineTunedPrompt';

import { getEvent } from '@firestore/events';
import { cancelFineTune } from '@firestore/fineTunes';

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
    setFineTuneState(fine_tune);
    const fetchData = async () => {
      const unsub = await getEvent(user_uid, model.id, fine_tune.id, setEvent);
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [fine_tune]);

  useEffect(() => {
    setModelState(model);
  }, [model]);

  const cancelTraining = async (fineTuneId: string): Promise<ICancelFineTuneConfirmation | null> => {
    const response = await fetch(`/api/openai/fine-tunes/cancel`, { method: 'POST', body: fineTuneId });
    const confirmation: ICancelFineTuneConfirmation = await response.json();
    await cancelFineTune(user_uid, modelState.id, fineTuneId);
    setFineTuneState({} as IFineTune);
    return confirmation;
  };

  return (
    <div className="flex-1 p-2 mx-2 border items-center">
      <ul>
        <li className="relative m-2">
          <div className="flex flex-row w-full space-x-4 justify-left">
            <div className="">{!fineTuneState?.fine_tuned_model ? <Loading size={25} /> : ''}</div>
            {fineTuneState?.fine_tuned_model ? (
              <div className="flex flex-row space-x-2 text-sm">
                <div className="">
                  <Link href={`/api/v1/model/${fineTuneState?.fine_tuned_model}`} className="text-sm hover:text-stern-blue">
                    {fineTuneState?.fine_tuned_model}
                  </Link>
                </div>
                <div className="">
                  <span className="font-bold">h.params </span>[{fineTuneState?.hyperparams?.n_epochs},{fineTuneState?.hyperparams?.batch_size} ,
                  {fineTuneState?.hyperparams?.learning_rate_multiplier} ,{fineTuneState?.hyperparams?.prompt_loss_weight}]
                </div>
              </div>
            ) : (
              <div className="">Status: {event.latestMessage} </div>
            )}
            <div className="">
              {!fineTuneState?.fine_tuned_model && (
                <button className="btn-small" onClick={() => cancelTraining(fineTuneState.id)}>
                  Cancel Training
                </button>
              )}
            </div>
            {!!fineTuneState?.fine_tuned_model && (
              <>
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
