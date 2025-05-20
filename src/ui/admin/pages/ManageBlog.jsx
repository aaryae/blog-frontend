import { useState, useEffect } from 'react'
import { PlusCircle, RefreshCcw, Search, Loader } from 'lucide-react'
import AddBlog from './AddBlogs'
import AddCategory from './AddCatagory'
import {
  getAllBlogs,
  deleteBlog,
  filterBlogsByTitle,
} from '../../../services/blog/blogService'

const ManageBlogs = () => {
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  // Fetch blogs (all or by filter)
  const fetchBlogs = async (keyword = '') => {
    setLoading(true)
    setError('')
    try {
      let data
      if (keyword.trim()) {
        data = await filterBlogsByTitle(keyword)
      } else {
        data = await getAllBlogs()
      }
      setBlogs(data)
    } catch (err) {
      setBlogs([])
      setError('Failed to load blogs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Handler for refreshing list after add
  const handleBlogAdded = () => {
    setShowAddBlog(false)
    fetchBlogs()
  }
  const handleCategoryAdded = () => setShowAddCategory(false)

  // Handle blog delete with confirmation
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setLoading(true)
      try {
        await deleteBlog(postId)
        setBlogs(blogs.filter((b) => b.id !== postId))
      } catch (err) {
        setError('Delete failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault()
    fetchBlogs(search)
  }

  // Refresh
  const handleRefresh = () => {
    setSearch('')
    fetchBlogs()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <input
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-gray-200  text-black px-3 rounded-md flex items-center gap-1"
            disabled={loading}
          >
            <Search size={16} /> Search
          </button>
          <button
            type="button"
            className="bg-gray-200  text-black px-2 rounded-md flex items-center"
            onClick={handleRefresh}
            disabled={loading}
            title="Refresh"
          >

        
            <RefreshCcw size={16} />
          </button>
        </form>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-grey-300 text-black py-2 px-5 rounded-md transition-all"
            disabled={loading}
          >
            Add Category
          </button>
          <button
            onClick={() => setShowAddBlog(true)}
            className="flex items-center gap-2 bg-[#991010] hover:bg-[#742e24] text-white py-2 px-5 rounded-md transition-all"
            disabled={loading}
          >
            <PlusCircle size={18} /> Add Blog
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center my-10">
          <Loader className="animate-spin" size={36} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 font-semibold text-center mb-4">{error}</div>
      )}

      {/* Blog Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-700 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Content</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Category ID</th>
                <th className="px-4 py-3 text-left">Likes</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog, idx) => (
                  <tr key={blog.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold">{blog.title}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={blog.content}>{blog.content}</td>
                    <td className="px-4 py-3">
                      {blog.imageName ? (
                        <img
                          src={`http://localhost:8888/images/${blog.imageName}`}
                          alt={blog.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{blog.userId}</td>
                    <td className="px-4 py-3">{blog.categoryId}</td>
                    <td className="px-4 py-3">{blog.likes ?? 0}</td>
                    <td className="px-4 py-3">
                      {blog.createdDate
                        ? new Date(blog.createdDate).toLocaleString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                    
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(blog.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Blog Modal */}
      {showAddBlog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-[#991010] text-xl"
              onClick={() => setShowAddBlog(false)}
            >
              &times;
            </button>
            <AddBlog onSuccess={handleBlogAdded} />
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-blue-700 text-xl"
              onClick={() => setShowAddCategory(false)}
            >
              &times;
            </button>
            <AddCategory onSuccess={handleCategoryAdded} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageBlogs
