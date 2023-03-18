import { useState, useEffect } from 'react';
import { IFineTune } from '@interfaces/IFineTune';
import { IModel } from '@interfaces/IModel';
import { IEvent } from '@interfaces/IEvents';
import { User } from 'firebase/auth';
import Loading from '@components/shared/Loading';
import Prompt from '@components/model/fineTuneComps/Prompt';
import Curl from '@components/model/fineTuneComps/Curl';

import IconCornerLeftUp from '@components/icons/IconCornerLeftUp';

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
    if (training_file_id == fine_tune.training_files[0].id) {
      if (fine_tune.status != 'succeeded') {
        setLastEvent(fine_tune.events[last]);
      } else {
        setLastEvent({} as IEvent);
      }
    }
  }, [fine_tune]);

  const cancelTraining = async (fine_tune_id: string) => {
    setLastEvent({ ...lastEvent, message: 'Cacelling fine tune job ' });
    const token = await user.getIdToken(true);
    const payload = { user_uid: user.uid, fine_tune_id: fine_tune_id, path: `models/${user.uid}/list/${model.id}/training_files/${training_file_id}/fine_tunes` };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/fine-tunes-cancel`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const confirmation: any = await response.json();
  };

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 7)}...${input.slice(-26)}` : input);

  return (
    <div className="flex-1 p-2 mx-2 border">
      <ul>
        <li className="relative m-2 flex flex-row w-full">
          <div className="flex w-full">
            {fine_tune?.fine_tuned_model && (
              <div className="flex flex-col">
                <div className="text-sm">{fine_tune?.fine_tuned_model}</div>
                {fine_tune?.model.length > 40 && (
                  <div className="flex flew-row text-sm  items-end text-gray-500">
                    <IconCornerLeftUp /> <span className="ml-2">{truncate(fine_tune?.model)} </span>
                  </div>
                )}
              </div>
            )}
            {lastEvent.message && (
              <div className="flex items-center">
                <div className="text-sm">Status: {lastEvent.message} </div>
                <div className="flex mx-2">
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
                    [ {showCurl ? 'Hide' : 'Show'} Curl ]
                  </button>
                  <button className="btn-link whitespace-nowrap" onClick={() => (showTest ? setShowTest(false) : setShowTest(true))}>
                    [ {showTest ? 'Hide' : 'Show'} Test Prompt ]
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
