import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

import { ICompletionRequest } from '@interfaces/ICompletions';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: { message: 'OpenAI API key not configured' },
    });
    return;
  }

  let completionRequest: ICompletionRequest = {
    model: 'ada:ft-tunedmodels-2023-02-06-15-51-49',
    prompt: req.body.prompt,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: '\n',
  };

  if (!completionRequest) {
    res.status(400).json({ error: { message: 'Please enter a valid data' } });
    return;
  }

  switch (method) {
    case 'POST':
      try {
        console.log(req.body);
        const response = await openai.createCompletion(completionRequest);
        const completion: any = response.data.choices[0].text;
        res.status(200).json({ completion: completion });
      } catch (error) {
        if (error.response) {
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
