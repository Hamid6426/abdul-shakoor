// src/pages/api/admin/register-user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AdminService from 'src/lib/services/adminService';
import bcrypt from 'bcryptjs';

const createAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, password } = req.body;

  if ( !fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if admin already exists by email
    const existingAdmin = await AdminService.getAdminByEmail(email); // Updated method to check by email
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin with the hashed password
    const newAdmin = await AdminService.createAdmin({
      fullName,
      email,
      password: hashedPassword, // Save hashed password
    });

    // Respond with success message and created admin details (excluding password)
    const { password: _, ...adminWithoutPassword } = newAdmin.toObject(); // Remove password from response

    return res.status(201).json({ message: 'Admin created successfully', admin: adminWithoutPassword });
  } catch (err) {
    // Improved error handling with a response to the client
    console.error(err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export default createAdmin;