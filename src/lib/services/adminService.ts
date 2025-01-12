import Admin from "../models/Admin";

interface CreateAdminInput {
  fullName: string;
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpiresAt?: Date;
}

class AdminService {
  // Create a new admin
  async createAdmin(input: CreateAdminInput) {
    try {
      // Check if the email already exists before creating the admin
      const existingAdmin = await Admin.findOne({ email: input.email });
      if (existingAdmin) {
        throw new Error("Email is already in use");
      }

      const admin = new Admin(input);
      return await admin.save();
    } catch (error) {
      throw new Error(`Failed to create admin: ${error}`);
    }
  }

  async getAdminByEmail(email: string) {
    try {
      return await Admin.findOne({ email }).select("+password"); // Explicitly include password
    } catch (error) {
      throw new Error(`Failed to fetch admin by email: ${error}`);
    }
  }

  // Get all admins
  async getAllAdmins() {
    try {
      return await Admin.find();
    } catch (error) {
      throw new Error(`Failed to fetch admins: ${error}`);
    }
  }

  // Get a single admin by ID
  async getAdminById(id: string) {
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        throw new Error("Admin not found");
      }
      return admin;
    } catch (error) {
      throw new Error(`Failed to fetch admin: ${error}`);
    }
  }

  // Update admin details
  async updateAdmin(id: string, updates: Partial<CreateAdminInput>) {
    try {
      const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });
      if (!admin) {
        throw new Error("Admin not found");
      }
      return admin;
    } catch (error) {
      throw new Error(`Failed to update admin: ${error}`);
    }
  }

  // Delete an admin
  async deleteAdmin(id: string) {
    try {
      const admin = await Admin.findByIdAndDelete(id);
      if (!admin) {
        throw new Error("Admin not found");
      }
      return admin;
    } catch (error) {
      throw new Error(`Failed to delete admin: ${error}`);
    }
  }
}

export default new AdminService();
