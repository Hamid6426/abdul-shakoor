import Blog from '../models/Blog';

interface CreateBlogInput {
  title: string;
  content: string;
  authorId: string;
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: string;
  topImage?: string;
  published?: boolean;
}

class BlogService {
  // Create a new blog
  async createBlog(input: CreateBlogInput) {
    try {
      const blog = new Blog(input);
      return await blog.save();
    } catch (error) {
      throw new Error(`Failed to create blog: ${error}`);
    }
  }

  // Get all blogs
  async getAllBlogs() {
    try {
      return await Blog.find().populate('authorId', 'fullName email');
    } catch (error) {
      throw new Error(`Failed to fetch blogs: ${error}`);
    }
  }

  // Get a single blog by ID
  async getBlogById(id: string) {
    try {
      const blog = await Blog.findById(id).populate('authorId', 'fullName email');
      if (!blog) {
        throw new Error('Blog not found');
      }
      return blog;
    } catch (error) {
      throw new Error(`Failed to fetch blog: ${error}`);
    }
  }

  // Update blog details
  async updateBlog(id: string, updates: Partial<CreateBlogInput>) {
    try {
      const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
      if (!blog) {
        throw new Error('Blog not found');
      }
      return blog;
    } catch (error) {
      throw new Error(`Failed to update blog: ${error}`);
    }
  }

  // Delete a blog
  async deleteBlog(id: string) {
    try {
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        throw new Error('Blog not found');
      }
      return blog;
    } catch (error) {
      throw new Error(`Failed to delete blog: ${error}`);
    }
  }
}

export default new BlogService();
