// src/lib/models/Admin.ts
import mongoose, { Document, Schema } from 'mongoose';
import dbConnect from '../dbConfig'; // Import dbConnect function

// Ensure the DB connection is established
dbConnect();

// Define the Admin interface that extends mongoose.Document
interface IAdmin extends Document {
  adminId: string;
  fullName: string;
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>({
  adminId: { type: String, unique: true, required: true },
  fullName: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true }, // Changed select to false for security
  passwordResetToken: { type: String, required: false },
  passwordResetExpiresAt: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Virtual relationships
adminSchema.virtual('blog', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'authorId',
});

adminSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'authorId',
});

// Check if the model already exists before creating it
let Admin: mongoose.Model<IAdmin>;
if (mongoose.models.Admin) {
  Admin = mongoose.models.Admin;
} else {
  Admin = mongoose.model<IAdmin>('Admin', adminSchema);
}

export default Admin;
