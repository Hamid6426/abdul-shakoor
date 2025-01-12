// src/lib/models/Mail.ts
import mongoose, { Document, Schema } from "mongoose";
import dbConnect from "../dbConfig"; // Import dbConnect function

// Ensure the DB connection is established
dbConnect();

// Define the Mail interface that extends mongoose.Document
interface IMail extends Document {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const mailSchema = new Schema<IMail>({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  subject: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists before creating it
let Mail: mongoose.Model<IMail>;
if (mongoose.models.Mail) {
  Mail = mongoose.models.Mail; // Use the existing model
} else {
  Mail = mongoose.model<IMail>("Mail", mailSchema); // Compile the model if it doesn't exist
}

export default Mail;
