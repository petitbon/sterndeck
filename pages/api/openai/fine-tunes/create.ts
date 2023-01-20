import type { NextApiRequest, NextApiResponse } from 'next';
import type { FineTune } from '@interfaces/Custommodel';

export default async function userHandler(req: NextApiRequest, res: NextApiResponse<FineTune>) {
  const { method } = req;
  let status = 200;

  switch (method) {
    case 'POST':
      const response = await fetch(`https://api.openai.com/v1/fine-tunes`, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_BEARER}`,
        },
        method: 'POST',
        body: '{"training_file": "file-khhcAWfNRjKAE6CjQukMtOx9"}',
      });
      const data = await response.json();
      res.status(status).json(data);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
