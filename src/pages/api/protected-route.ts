// src/pages/api/protected-route.ts

import { CustomNextApiRequest } from 'src/types/next'; // Import the custom request type
import { NextApiResponse } from 'next';
import { authenticate } from 'src/lib/middleware/auth';

const protectedRoute = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  authenticate(req, res, async () => {
    // Now you can access req.user
    console.log(req.user); // For example, the decoded admin info

    res.status(200).json({ message: 'Protected content' });
  });
};

export default protectedRoute;
