import { useState } from 'react';

import { ICompletionRequest, ICompletionResponse } from '@interfaces/ICompletions';

export interface Props {
  fine_tuned_model: string;
}

export default function FineTunedPrompt({ fine_tuned_model }: Props) {
  const [response, setResponse] = useState(null as any);
  const [promptstr, setPromptstr] = useState<string>('');

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptstr(evt.target.value);
  };

  const submittest = async () => {
    let completionRequest: ICompletionRequest = {
      model: fine_tuned_model,
      prompt: promptstr,
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
      n: 4,
      stream: false,
      logprobs: null,
      stop: '\n',
    };
    const r = await fetch(`/api/openai/fine-tunes/completion`, { method: 'POST', body: JSON.stringify(completionRequest) });
    const completionResponse: ICompletionResponse = await r.json();
    console.log(completionResponse);
    setResponse(completionResponse);
  };
  return (
    <div className="flex flex-col p-2 mx-2 border ">
      <div className="w-full">
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={5}
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}
        ></textarea>
      </div>
      <div className="w-full">{JSON.stringify(response?.choices[0].text)}</div>
      <div className="w-full items-right pt-4">
        <button className="btn-primary" onClick={() => submittest()}>
          Test
        </button>
      </div>
    </div>
  );
}
