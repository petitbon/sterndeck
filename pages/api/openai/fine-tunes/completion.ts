import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

import { ICompletionOAIRequest } from '@interfaces/ICompletions';

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

  const completionRequest: ICompletionOAIRequest = req.body;

  if (!completionRequest) {
    res.status(400).json({ error: { message: 'Please enter a valid data' } });
    return;
  }

  switch (method) {
    case 'POST':
      try {
        const response = await openai.createCompletion(completionRequest);
        res.status(200).json(response.data);
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
