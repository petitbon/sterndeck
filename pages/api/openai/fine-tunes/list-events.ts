import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

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
  const training_file = req.body.training_file || '';
  if (training_file.trim().length === 0) {
    res.status(400).json({ error: { message: 'Please enter a valid training file id' } });
    return;
  }

  switch (method) {
    case 'GET':
      try {
        const response = await openai.listFineTuneEvents('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
        res.status(200).json({ result: response.data });
      } catch (error) {
        if (error.response) {
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(500).json({ error: { message: 'An error occurred during your request.' } });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
