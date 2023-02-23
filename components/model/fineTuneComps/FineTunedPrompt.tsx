import { useState, useEffect } from 'react';

import { ICompletionOAIRequest, ICompletionOAIResponse } from '@interfaces/ICompletions';

import Temperature from './Temperature';

export interface Props {
  fine_tuned_model: string;
}

export default function FineTunedPrompt({ fine_tuned_model }: Props) {
  const [responseState, setResponseState] = useState(null as any);
  const [requestState, setRequestState] = useState<ICompletionOAIRequest>({} as ICompletionOAIRequest);

  const clean = (input: string) => input?.replace(/['"]+/g, '');

  useEffect(() => {
    setRequestState((existingValues) => ({
      ...existingValues,
      model: fine_tuned_model,
    }));
  }, [fine_tuned_model]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestState((existingValues) => ({
      ...existingValues,
      prompt: evt.target.value,
    }));
  };

  const temperatureChange = (e: number) => {
    requestState.temperature = e;
    setRequestState((existingValues) => ({
      ...existingValues,
      temperature: e,
    }));
  };

  const submittest = async () => {
    const r = await fetch(`/api/sterndeck/completion`, { method: 'POST', body: JSON.stringify(requestState) });
    const completionResponse: ICompletionOAIResponse = await r.json();
    setResponseState(completionResponse);
  };

  return (
    <div className="flex flex-row p-2 mx-2 space-x-8">
      <div className="w-4/5">
        <textarea className="custom-textarea" rows={4} onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}></textarea>
        <div className="p-2 my-2 bg-gray-100">{clean(JSON.stringify(responseState?.choices[0].text))}</div>
      </div>
      <div className="flex flex-col w-1/5">
        <div className="">
          <Temperature temperature={1} onTemperatureChange={(e: number) => temperatureChange(e)} />
        </div>
        <div className="flex justify-end">
          <button className="btn-small mt-4" onClick={() => submittest()}>
            Test
          </button>
        </div>
      </div>
    </div>
  );
}
