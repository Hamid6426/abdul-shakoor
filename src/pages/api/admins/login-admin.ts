import type { NextApiRequest, NextApiResponse } from "next";
import AdminService from "src/lib/services/adminService";
import bcrypt from "bcryptjs";

const loginAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const existingAdmin = await AdminService.getAdminByEmail(email);
    console.log("Existing Admin:", existingAdmin);

    if (!existingAdmin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Password from DB:", existingAdmin.password);

    if (!existingAdmin.password) {
      return res.status(500).json({ message: "Password not found for this admin" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const { password: _, ...adminWithoutPassword } = existingAdmin.toObject();

    return res.status(200).json({
      message: "Login successful",
      admin: adminWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};


export default loginAdmin;
