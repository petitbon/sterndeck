import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

import { ICompletionOAIRequest } from '@interfaces/ICompletions';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  const model: string = id as string;
  const prompt: string = req.body.promt || '';
  const temperature: number = req.body.temperature || 1;
  const completionRequest: ICompletionOAIRequest = {
    model: model,
    prompt: prompt,
    temperature: temperature,
    max_tokens: 256,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: ' END',
  };

  let token: string = req.headers['Authorization'] as string;

  if (token) {
    token = token.replace(/^Bearer\s+/, '');
    const userToken: string = await jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Token not provided',
    });
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: { message: 'OpenAI API key not configured' },
    });
    return;
  }

  if (!completionRequest) {
    res.status(400).json({ error: { message: 'Please enter a valid data' } });
    return;
  }

  switch (method) {
    case 'POST':
      try {
        const response = await openai.createCompletion(completionRequest);
        const completion: any = response.data.choices[0].text;
        res.status(200).json(response.data);
      } catch (error) {
        console.log(error);
        console.log(req);
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
