import { useState, useEffect } from 'react';

import { useSystemContext } from '@context/SystemProvider';
import { ICompletionOAIRequest, ICompletionOAIResponse } from '@interfaces/ICompletions';

import IconMessageHeart from '@components/icons/IconMessageHeart';

export interface Props {
  fine_tuned_model: string;
}
export interface IChoice {
  text: string;
}

export default function Prompt({ fine_tuned_model }: Props) {
  const { authUser } = useSystemContext();
  const [responsesState, setResponsesState] = useState<IChoice[]>([]);
  const [requestState, setRequestState] = useState<ICompletionOAIRequest>({} as ICompletionOAIRequest);
  const [loading, setLoading] = useState<boolean>(false);

  const clean = (input: string) => input?.replace(/['"]+/g, '');

  useEffect(() => {
    if (fine_tuned_model) {
      setRequestState((existingValues) => ({
        ...existingValues,
        model: fine_tuned_model,
        user_uid: authUser.uid,
      }));
    }
  }, [fine_tuned_model]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestState((existingValues) => ({
      ...existingValues,
      prompt: evt.target.value,
    }));
  };

  const submittest = async () => {
    setLoading(true);
    const token = await authUser.getIdToken(true);
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/completion`, {
      // const r = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestState),
    });
    const completionResponses: ICompletionOAIResponse = await r.json();
    setResponsesState(completionResponses.choices);
    setLoading(false);
  };

  const sendFeedback = async (feedback: string) => {
    const token = await authUser.getIdToken(true);
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/models-feedback`, {
      //const r = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...requestState, completion: feedback }),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2">
        <div className="w-full">
          <textarea className="custom-textarea" rows={3} onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}></textarea>
        </div>
        <div className="flex cursor-pointer w-[100px] justify-center items-center">
          <button className="btn-primary border-0 hover:text-stern-blue" onClick={() => submittest()}>
            submit
          </button>
        </div>
      </div>
      <div className="flex flex-row p-2">
        <div className="w-full ">
          <textarea className="custom-textarea" rows={3} value={loading ? '... loading' : clean(responsesState[0]?.text)}></textarea>
        </div>
        <div className="flex cursor-pointer w-[100px] justify-center items-center">
          <button className="btn-primary border-0 hover:text-stern-blue" onClick={() => sendFeedback(clean(responsesState[0]?.text))}>
            <IconMessageHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
