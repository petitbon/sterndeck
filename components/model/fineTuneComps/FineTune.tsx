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

  const cancelTraining = async (fineTune: IFineTune) => {
    if (fineTune.status != 'cancelled' && !fineTune.fine_tuned_model) {
      const response = await fetch(`/api/openai/fine-tunes/cancel`, { method: 'POST', body: fineTune.id });
      const confirmation: ICancelFineTuneConfirmation = await response.json();
      await cancelFineTune(user_uid, modelState.id, fineTune.id);
    }
  };

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 18)}...${input.slice(-19)}` : input);

  return (
    <div className="flex-1 p-2 mx-2 border ">
      <ul>
        <li className="relative m-2 flex flex-row w-full">
          <div className="flex w-full">
            <div className="">{!fineTuneState?.fine_tuned_model ? <Loading size={25} /> : ''}</div>
            {fineTuneState?.fine_tuned_model ? (
              <div className="flex items-center">
                <div className=" ">
                  <Link href={`/api/v1/model/${fineTuneState?.fine_tuned_model}`} className="text-sm hover:text-stern-blue">
                    {truncate(fineTuneState?.fine_tuned_model)}
                  </Link>
                </div>
                <div className="text-sm">
                  <span className="font-semibold ml-4">h.params </span>[{fineTuneState?.hyperparams?.n_epochs},{fineTuneState?.hyperparams?.batch_size} ,
                  {fineTuneState?.hyperparams?.learning_rate_multiplier} ,{fineTuneState?.hyperparams?.prompt_loss_weight}]
                </div>
              </div>
            ) : (
              <div className="">Status: {event.latestMessage} </div>
            )}
          </div>
          <div className=" w-min justify-end">
            <div className="mx-4">
              {!!fineTuneState?.fine_tuned_model ? (
                <button className="btn-link whitespace-nowrap" onClick={() => (showTest ? setShowTest(false) : setShowTest(true))}>
                  {showTest ? 'Hide' : 'Show'} Promt
                </button>
              ) : (
                <button className="btn-link whitespace-nowrap" onClick={() => cancelTraining(fineTuneState)}>
                  Cancel Training
                </button>
              )}
            </div>
          </div>
        </li>
        <li className="relative m-2">
          <div className={showTest ? 'visible' : 'hidden'}> {!!fineTuneState?.fine_tuned_model && <FineTunedPrompt fine_tuned_model={fineTuneState.fine_tuned_model} />}</div>
        </li>
      </ul>
    </div>
  );
}
