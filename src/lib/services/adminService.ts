import Admin from '../models/Admin';

interface CreateAdminInput {
  adminId: string;
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
      const admin = new Admin(input);
      return await admin.save();
    } catch (error) {
      throw new Error(`Failed to create admin: ${error}`);
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
        throw new Error('Admin not found');
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
        throw new Error('Admin not found');
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
        throw new Error('Admin not found');
      }
      return admin;
    } catch (error) {
      throw new Error(`Failed to delete admin: ${error}`);
    }
  }
}

export default new AdminService();
