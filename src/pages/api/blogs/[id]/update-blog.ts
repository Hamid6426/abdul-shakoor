import { NextApiRequest, NextApiResponse } from 'next';
import blogService from 'src/lib/services/blogService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Retrieve the ID from the URL parameters

  if (req.method === 'PUT') {
    try {
      const { title, content, metaTitle, metaDescription, thumbnail, topImage, published } = req.body;

      const updatedBlog = await blogService.updateBlog(id as string, {
        title,
        content,
        metaTitle,
        metaDescription,
        thumbnail,
        topImage,
        published,
      });

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
