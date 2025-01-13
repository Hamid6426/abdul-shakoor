import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the Authorization header (Bearer token)
  const token = authorization.split(' ')[1];

  try {
    // Verify the token using the secret key
    // const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, "abcdefgh12345678"); // Make sure to set your secret in .env

    // If token is valid, return authenticated status
    return res.status(200).json({ message: 'Authenticated', user: decoded });
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).json({ message: 'Not authenticated' });
  }
}
