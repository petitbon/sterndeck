import type { NextApiRequest, NextApiResponse } from 'next';
import type { IDeletedFileConfirmation } from '@interfaces/IDeletedFileConfirmation';

export default async function userHandler(req: NextApiRequest, res: NextApiResponse<IDeletedFileConfirmation>) {
  const { query, method } = req;
  const id = query.id as string;
  let status = 200;

  switch (method) {
    case 'DELETE':
      const response = await fetch(`https://api.openai.com/v1/files/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_BEARER}`,
        },
        method: 'DELETE',
      });

      const data = await response.json();
      res.status(status).json(data);
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
