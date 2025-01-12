// src/lib/models/Admin.ts
import mongoose, { Document, Schema } from 'mongoose';
import dbConnect from '../dbConfig'; // Import dbConnect function

// Ensure the DB connection is established once
dbConnect();

// Define the Admin interface that extends mongoose.Document
interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Admin model
const adminSchema = new Schema<IAdmin>(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false, required: true }, // Password should not be selected by default
    passwordResetToken: { type: String, required: false },
    passwordResetExpiresAt: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Virtual relationships to blog and posts (assuming Blog and Post models exist)
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
const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
