import { useState, useEffect } from 'react';
import { IFineTune } from '@interfaces/IFineTune';
import { IModel } from '@interfaces/IModel';
import { IEvent } from '@interfaces/IEvents';
import { User } from 'firebase/auth';
import Loading from '@components/shared/Loading';
import Prompt from '@components/model/fineTuneComps/Prompt';
import Curl from '@components/model/fineTuneComps/Curl';

export interface Props {
  user: User;
  model: IModel;
  training_file_id: string;
  fine_tune: IFineTune;
}

export default function FineTune({ user, model, training_file_id, fine_tune }: Props) {
  const [lastEvent, setLastEvent] = useState<IEvent>({} as IEvent);
  const [showTest, setShowTest] = useState<boolean>(false);
  const [showCurl, setShowCurl] = useState<boolean>(false);

  useEffect(() => {
    if (showCurl && showTest) setShowTest(false);
  }, [showCurl]);

  useEffect(() => {
    if (showTest && showCurl) setShowCurl(false);
  }, [showTest]);

  useEffect(() => {
    const last: number = fine_tune.events.length - 1;
    setLastEvent(fine_tune.events[last]);
  }, [fine_tune]);

  const cancelTraining = async (fine_tune_id: string) => {
    setLastEvent({ ...lastEvent, message: 'Cacelling fine tune job ' });
    const token = await user.getIdToken(true);
    const payload = { fine_tune_id: fine_tune_id, path: `models/${user.uid}/list/${model.id}/training_files/${training_file_id}/fine_tunes` };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/fine-tunes-cancel`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const confirmation: any = await response.json();
  };

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 18)}...${input.slice(-19)}` : input);

  return (
    <div className="flex-1 p-2 mx-2 border ">
      <ul>
        <li className="relative m-2 flex flex-row w-full">
          <div className="flex w-full">
            {fine_tune?.fine_tuned_model ? (
              <div className="flex items-center">
                <div className="text-sm">{truncate(fine_tune?.fine_tuned_model)}</div>
                {false && (
                  <div className="text-sm">
                    <span className="ml-4">params </span>[{fine_tune?.hyperparams?.n_epochs},{fine_tune?.hyperparams?.batch_size} ,
                    {fine_tune?.hyperparams?.learning_rate_multiplier} ,{fine_tune?.hyperparams?.prompt_loss_weight}]
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-sm">Status: {lastEvent.message} </div>
                <div className="flex mx-2">
                  <Loading size="text-sml" />
                  <Loading size="text-sml" />
                  <Loading size="text-sml" />
                </div>
              </div>
            )}
          </div>
          <div className=" w-min justify-end">
            <div className="mx-4">
              {fine_tune?.fine_tuned_model ? (
                <div className="flex flex-row">
                  <button className="btn-link whitespace-nowrap" onClick={() => (showCurl ? setShowCurl(false) : setShowCurl(true))}>
                    {showCurl ? 'Hide' : 'Show'} Curl
                  </button>
                  <button className="btn-link whitespace-nowrap" onClick={() => (showTest ? setShowTest(false) : setShowTest(true))}>
                    {showTest ? 'Hide' : 'Show'} Promt
                  </button>
                </div>
              ) : (
                <button className="btn-link whitespace-nowrap" onClick={() => cancelTraining(fine_tune.id)}>
                  Cancel Training
                </button>
              )}
            </div>
          </div>
        </li>
        <li className={showCurl ? ' visible relative m-2' : 'hidden'}>
          <Curl fine_tuned_model={fine_tune.fine_tuned_model as string} />
        </li>
        <li className="relative m-2">
          <div className={showTest ? 'visible' : 'hidden'}>{!!fine_tune?.fine_tuned_model && <Prompt fine_tuned_model={fine_tune.fine_tuned_model} />}</div>
        </li>
      </ul>
    </div>
  );
}
