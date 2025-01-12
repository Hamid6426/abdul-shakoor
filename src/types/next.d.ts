// src/types/next.d.ts

import { NextApiRequest } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  user?: any; // You can define the user type more strictly based on your JWT payload
}

export type { CustomNextApiRequest };
