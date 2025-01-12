import { NextApiRequest, NextApiResponse } from 'next';
import mailService from 'src/lib/services/mailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const mails = await mailService.getAllMails();
      res.status(200).json(mails);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
