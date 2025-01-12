import { NextApiRequest, NextApiResponse } from "next";
import blogService from "src/lib/services/blogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        title,
        content,
        authorId,
        metaTitle,
        metaDescription,
        thumbnail,
        topImage,
        published,
      } = req.body;

      if (!title || !content || !authorId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const blog = await blogService.createBlog({
        title,
        content,
        authorId,
        metaTitle,
        metaDescription,
        thumbnail,
        topImage,
        published,
      });

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
