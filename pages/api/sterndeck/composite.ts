import type { NextApiRequest, NextApiResponse } from 'next';

import { ICompositeRequest } from '@interfaces/IComposite';
import { ICompletionRequest, ICompletionResponse } from '@interfaces/ICompletions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  let compositeRequest: ICompositeRequest = {
    prompt: JSON.parse(req.body).prompt,
    sequence: JSON.parse(req.body).sequence,
  };

  if (!compositeRequest) {
    res.status(400).json({ error: { message: 'Please enter a valid data' } });
    return;
  }

  switch (method) {
    case 'POST':
      try {
        compositeRequest.sequence.map(async (model) => {
          let request: Partial<ICompletionRequest> = {
            model: model.published_model,
            prompt: compositeRequest.prompt,
          };
          const r = await fetch(`/api/sterndeck/completion`, { method: 'POST', body: JSON.stringify(request) });
          const completionResponse: ICompletionResponse = await r.json();

          /*


                  let completion: ICompletionRequest = {
                    model: model.model,
                    prompt: JSON.parse(req.body).prompt,
                    max_tokens: 256,
                    temperature: 0.7,
                    top_p: 1,
                    n: 4,
                    stream: false,
                    logprobs: null,
                    stop: '\n',
                  };



    const r = await fetch(`/api/sterndeck/completion`, { method: 'POST', body: JSON.stringify(request) });
    const completionResponse: ICompletionResponse = await r.json();
    setResponse(completionResponse);


let request: Partial<ICompletionRequest> = {
      model: fine_tuned_model,
      prompt: promptstr,
    };
    const r = await fetch(`/api/sterndeck/completion`, { method: 'POST', body: JSON.stringify(request) });
    const completionResponse: ICompletionResponse = await r.json();
    setResponse(completionResponse);
*/

          /*
          
          
                  const r = await fetch(`/api/openai/fine-tunes/completion`, { method: 'POST', body: JSON.stringify(completionRequest) });
                  const completionResponse: ICompletionResponse = await r.json();
          */
        });

        //        const response = await openai.createCompletion(completionRequest);
        //       const completion: any = response.data.choices[0].text;
        //res.status(200).json({ completion: completion });
        res.status(200).json(req.body);
      } catch (error) {
        if (error.response) {
          //res.status(200).json({ hello: 'world' });
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).json({ error: { message: 'An error occurred during your request.' } });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
