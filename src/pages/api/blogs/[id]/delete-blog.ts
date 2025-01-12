import { NextApiRequest, NextApiResponse } from 'next';
import blogService from 'src/lib/services/blogService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Retrieve the ID from the URL parameters

  if (req.method === 'DELETE') {
    try {
      const deletedBlog = await blogService.deleteBlog(id as string);
      res.status(200).json(deletedBlog);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
