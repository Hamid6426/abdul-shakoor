// src/lib/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';
import dbConnect from '../dbConfig'; // Import dbConnect function

// Ensure the DB connection is established
dbConnect();

// Define the Post interface that extends mongoose.Document
interface IPost extends Document {
  title: string;
  content: string;
  tags: string[];
  summary: string;
  published: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: mongoose.Schema.Types.ObjectId;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: string;
  topImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: false },
  summary: { type: String, required: false },
  published: { type: Boolean, default: false },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  metaTitle: { type: String, required: false },
  metaDescription: { type: String, required: false },
  thumbnail: { type: String, required: false },
  topImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model already exists before creating it
let Post: mongoose.Model<IPost>;
if (mongoose.models.Post) {
  Post = mongoose.models.Post;
} else {
  Post = mongoose.model<IPost>('Post', postSchema);
}

export default Post;
