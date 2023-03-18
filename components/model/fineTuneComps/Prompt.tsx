import { useState, useEffect } from 'react';

import { useSystemContext } from '@context/SystemProvider';
import { ICompletionOAIRequest, ICompletionOAIResponse } from '@interfaces/ICompletions';

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
    const token = await authUser.getIdToken(true);
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/completion`, {
      // const r = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(requestState),
    });
    const completionResponses: ICompletionOAIResponse = await r.json();
    setResponsesState(completionResponses.choices);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-full">
          <textarea className="custom-textarea" rows={4} onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}></textarea>
        </div>
        <div className="p-4 cursor-pointer w-[100px] flex items-center justify-center">
          <button className="btn-primary mt-4" onClick={() => submittest()}>
            Test
          </button>
        </div>
      </div>
      {responsesState?.map((choice: IChoice, i: number) => (
        <div className="p-2 my-2 text-sm text-stern-red" key={i}>
          {clean(choice.text)}
        </div>
      ))}
    </div>
  );
}
