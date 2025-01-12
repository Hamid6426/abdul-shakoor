import { NextApiRequest, NextApiResponse } from 'next';
import blogService from 'src/lib/services/blogService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Retrieve the ID from the URL parameters

  if (req.method === 'GET') {
    try {
      const blog = await blogService.getBlogById(id as string);
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
