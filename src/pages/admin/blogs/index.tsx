// src/pages/admin/blogs/index.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

interface Blog {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/get-blogs");
        setBlogs(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/blogs/delete-blog?id=${id}`);
      if (res.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
  };

  const handleSave = async () => {
    try {
      if (editingBlog) {
        // Update blog
        const res = await axios.put(`/api/blogs/update-blog`, editingBlog);
        if (res.status === 200) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog._id === editingBlog._id ? { ...blog, ...editingBlog } : blog
            )
          );
          setEditingBlog(null);
        }
      } else {
        // Create new blog
        const res = await axios.post(`/api/blogs/create-blog`, newBlog);
        if (res.status === 201) {
          setBlogs((prevBlogs) => [...prevBlogs, res.data]);
          setNewBlog({});
        }
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: "768px" }}>
      <h1 className="text-3xl mb-4">Manage Blogs</h1>

      {/* Create or Edit Blog */}
      <div className="mb-6 bg-white p-4 border rounded-lg">
        <h2 className="text-2xl mb-3">{editingBlog ? "Edit Blog" : "Create Blog"}</h2>
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-2 px-3 py-2 border rounded"
          value={editingBlog ? editingBlog.title : newBlog.title || ""}
          onChange={(e) =>
            editingBlog
              ? setEditingBlog({ ...editingBlog, title: e.target.value })
              : setNewBlog({ ...newBlog, title: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          className="block w-full mb-2 px-3 py-2 border rounded"
          value={editingBlog ? editingBlog.content : newBlog.content || ""}
          onChange={(e) =>
            editingBlog
              ? setEditingBlog({ ...editingBlog, content: e.target.value })
              : setNewBlog({ ...newBlog, content: e.target.value })
          }
        ></textarea>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingBlog ? "Update Blog" : "Create Blog"}
          </button>
          {editingBlog && (
            <button
              onClick={() => setEditingBlog(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <p className="text-center">No blogs found</p>
      ) : (
        <div className="grid gap-4 grid-cols-1">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white border-gray-300 border-2 p-4 rounded-lg">
              <h2 className="text-lg font-bold pb-3 border-b-2">{blog.title}</h2>
              <p className="py-3">{blog.content.slice(0, 100)}...</p>
              <div className="flex justify-between text-gray-600">
                <p>Published: {blog.published ? "Yes" : "No"}</p>
                <p>Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
              </div>
              <div className="flex justify-between mt-4">
                {/* Buttons for Edit, Delete, and Preview */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <button
                  onClick={() => window.open(`/blogs/${blog._id}`, "_blank")}
                  className="text-green-500 hover:text-green-700 transition duration-300 flex items-center"
                >
                  <FaEye className="mr-2" /> Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
