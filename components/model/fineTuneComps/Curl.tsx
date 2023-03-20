import { useState, useEffect } from 'react';
import IconCopy from '@components/icons/IconCopy';

export interface Props {
  fine_tuned_model: string;
}

export default function Curl({ fine_tuned_model }: Props) {
  const [curlCodeState, setCurlCodeState] = useState<string>('');
  const [curlCodeCopy, setCurlCodeCopy] = useState<string>('');

  useEffect(() => {
    setCurlCodeState(
      /* prettier-ignore */
      `curl https://api.openai.com/v1/completions  
       -H 'Authorization: Bearer YOUR_API_KEY'  
       -H 'content-type: application/json'
       -d '{
         "prompt": "NEW PROMPT ##>>", 
         "model": "${fine_tuned_model}", 
         "max_tokens": 60, 
         "temperature": 1, 
         "frequency_penalty": 1.4, 
         "presence_penalty": 1.4,
         "stop": "<<##"
       }'`
    );
    setCurlCodeCopy(
      /* prettier-ignore */
      `curl https://api.openai.com/v1/completions -H 'Authorization: Bearer YOUR_API_KEY' -H 'content-type: application/json' -d '{"prompt": "NEW PROMPT", "model": "${fine_tuned_model}", "max_tokens": 60, "temperature": 1, "frequency_penalty": 1.4, "presence_penalty": 1.4, "stop": "<<##"}'`
    );
  }, [fine_tuned_model]);

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-full bg-gray-100">
          <pre>
            <code className="p-2 block whitespace-pre-line text-xs overflow-x-auto">{curlCodeState}</code>
          </pre>
        </div>
        <div
          className="p-2 cursor-pointer w-[100px] flex items-center justify-center"
          onClick={() => {
            navigator.clipboard.writeText(curlCodeCopy);
          }}
        >
          <IconCopy />
        </div>
      </div>
    </>
  );
}
