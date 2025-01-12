import Post from '../models/Post';

interface CreatePostInput {
  title: string;
  content: string;
  tags?: string[];
  summary?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: string;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: string;
  topImage?: string;
  published?: boolean;
}

class PostService {
  // Create a new post
  async createPost(input: CreatePostInput) {
    try {
      const post = new Post(input);
      return await post.save();
    } catch (error) {
      throw new Error(`Failed to create post: ${error}`);
    }
  }

  // Get all posts
  async getAllPosts() {
    try {
      return await Post.find().populate('authorId', 'fullName email');
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error}`);
    }
  }

  // Get a single post by ID
  async getPostById(id: string) {
    try {
      const post = await Post.findById(id).populate('authorId', 'fullName email');
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error}`);
    }
  }

  // Update post details
  async updatePost(id: string, updates: Partial<CreatePostInput>) {
    try {
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to update post: ${error}`);
    }
  }

  // Delete a post
  async deletePost(id: string) {
    try {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error}`);
    }
  }
}

export default new PostService();
