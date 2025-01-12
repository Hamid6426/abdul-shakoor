// // src/lib/middleware/auth.ts

// import { NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import { CustomNextApiRequest } from 'src/types/next';  // Import custom type

// export const authenticate = (req: CustomNextApiRequest, res: NextApiResponse, next: () => void) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
//     req.user = decoded; // You can store the decoded user info in the request object
//     next(); // Continue to the protected route
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };
