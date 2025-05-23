import { useState, useEffect } from 'react'
import { PlusCircle, RefreshCcw, Search, Loader, Edit2 } from 'lucide-react'
import AddBlog from './AddBlogs'
import {
  getAllBlogs,
  deleteBlog,
  filterBlogsByTitle,
  editBlog, // <-- import editBlog
} from '../../../services/blog/blogService'
import toast from 'react-hot-toast'


const EditBlogModal = ({ blog, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: blog.title || '',
    content: blog.content || '',
    image: '', // File object
    userId: blog.userId,
    categoryId: blog.categoryId,
  })
  const [saving, setSaving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  // Show initial image if any
  useEffect(() => {
    if (blog.imageName) {
      setPreviewUrl(`http://localhost:8888/images/${blog.imageName}`)
    } else {
      setPreviewUrl('')
    }
    // Clean up object URLs when unmounting or image changes
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
    // eslint-disable-next-line
  }, [blog.imageName])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      const file = files[0]
      setForm((prev) => ({ ...prev, image: file }))
      // Preview image
      if (file) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const requestDto = {
        title: form.title,
        content: form.content,
        userId: form.userId,
        categoryId: form.categoryId,
      }

      // FormData for file uploads
      const formData = new FormData()
      formData.append('requestDto', new Blob([JSON.stringify(requestDto)], { type: 'application/json' }))
      if (form.image) {
        formData.append('image', form.image)
      }

      await editBlog(blog.id, formData)
      toast.success('Blog updated!')
      onSaved()
      onClose()
    } catch (err) {
      toast.error('Failed to update blog')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-[#991010] text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="border px-3 py-2 rounded w-full"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea
              className="border px-3 py-2 rounded w-full"
              name="content"
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Image </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          {previewUrl && (
            <div className="mb-3">
              <span className="block text-xs mb-1 text-gray-500">Image Preview:</span>
              <img
                src={previewUrl}
                alt="Blog preview"
                className="max-h-40 rounded border"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}



const ManageBlogs = () => {
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editBlogModal, setEditBlogModal] = useState(null) // holds the blog to edit

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

  // Handle blog delete with confirmation
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setLoading(true)
      try {
        await deleteBlog(postId)
        setBlogs(blogs.filter((b) => b.id !== postId))
        toast.success('Blog deleted!')
      } catch (err) {
        setError('Delete failed. Please try again.')
        toast.error('Failed to delete blog')
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

  // Open edit modal
  const handleEdit = (blog) => {
    setEditBlogModal(blog)
  }

  // After editing, refresh the list
  const handleEditSaved = () => {
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
              {blog.imageName || blog.image ? (
                <img
                  src={`http://localhost:8888/images/${blog.imageName || blog.image}`}
                  alt={blog.title}
                  className="w-12 h-12 object-cover rounded"
                  onError={e => { e.target.style.display = 'none' }}
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
                className="text-green-600 hover:underline flex items-center gap-1"
                onClick={() => handleEdit(blog)}
                disabled={loading}
              >
                <Edit2 size={16} /> Edit
              </button>
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

      {/* Edit Blog Modal */}
      {editBlogModal && (
        <EditBlogModal
          blog={editBlogModal}
          onClose={() => setEditBlogModal(null)}
          onSaved={handleEditSaved}
        />
      )}
    </div>
  )
}

export default ManageBlogs
