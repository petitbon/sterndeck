import { useState } from 'react';

import { ICompletionRequest, ICompletionResponse } from '@interfaces/ICompletions';

export interface Props {
  fine_tuned_model: string;
}

export default function FineTunedPrompt({ fine_tuned_model }: Props) {
  const [response, setResponse] = useState(null as any);
  const [promptstr, setPromptstr] = useState<string>('');

  const clean = (input: string) => input?.replace(/['"]+/g, '');

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptstr(evt.target.value);
  };

  const submittest = async () => {
    let request: Partial<ICompletionRequest> = {
      model: fine_tuned_model,
      prompt: promptstr,
    };
    const r = await fetch(`/api/sterndeck/completion`, { method: 'POST', body: JSON.stringify(request) });
    const completionResponse: ICompletionResponse = await r.json();
    setResponse(completionResponse);
  };
  return (
    <div className="flex flex-col p-2 mx-2 border ">
      <div className=" w-full ">
        <textarea className="custom-textarea" rows={4} onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}></textarea>
      </div>

      <div className="w-full py-4 text-orange-500">{clean(JSON.stringify(response?.choices[0].text))}</div>
      <div className="flex flex-row w-full justify-end pt-4">
        <button className="btn-small p-2" onClick={() => submittest()}>
          Test
        </button>
      </div>
    </div>
  );
}
