// src/pages/api/admin/register-user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AdminService from 'src/lib/services/adminService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Import the JWT library

const createAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if admin already exists by email
    const existingAdmin = await AdminService.getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin with the hashed password
    const newAdmin = await AdminService.createAdmin({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET!, // Make sure to set this environment variable
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with success message and the token
    const { password: _, ...adminWithoutPassword } = newAdmin.toObject(); // Remove password from response

    return res.status(201).json({
      message: 'Admin created successfully',
      admin: adminWithoutPassword,
      token,  // Include the JWT token in the response
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export default createAdmin;
