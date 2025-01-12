import { useEffect, useState } from 'react';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: { fullName: string }; // Assuming authorId is an object containing fullName
  metaTitle?: string;
  metaDescription?: string;
  thumbnail?: string;
  topImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs/get-blogs');
        setBlogs(res.data); // Axios handles JSON parsing automatically
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>
      <ul className="space-y-6">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.content.substring(0, 150)}...</p>
            <p className="text-sm text-gray-500">By: {blog.authorId?.fullName || 'Unknown Author'}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(blog.updatedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsPage;