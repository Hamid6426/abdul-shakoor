import { NextApiRequest, NextApiResponse } from 'next';
import mailService from 'src/lib/services/mailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing id' });
    }

    try {
      const deletedMail = await mailService.deleteMail(id);
      res.status(200).json(deletedMail);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
