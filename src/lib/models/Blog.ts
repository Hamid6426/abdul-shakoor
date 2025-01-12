// src/lib/models/Blog.ts
import mongoose, { Document, Schema } from 'mongoose';
import dbConnect from '../dbConfig'; // Import dbConnect function

// Ensure the DB connection is established
dbConnect();

// Define the Blog interface that extends mongoose.Document
interface IBlog extends Document {
  title: string;
  content: string;
  published: boolean;
  authorId: mongoose.Schema.Types.ObjectId;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: string;
  topImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  metaTitle: { type: String, required: false },
  metaDescription: { type: String, required: false },
  thumbnail: { type: String, required: false },
  topImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists before creating it
let Blog: mongoose.Model<IBlog>;
if (mongoose.models.Blog) {
  Blog = mongoose.models.Blog;
} else {
  Blog = mongoose.model<IBlog>('Blog', blogSchema);
}

export default Blog;
