// src/ui/admin/pages/ManageBlogs.jsx
import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import AddBlog from './AddBlogs'
import AddCategory from './AddCatagory'

const ManageBlogs = () => {
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)

  // Dummy blogs array; fetch from backend in real use
  const blogs = [
    { id: 1, title: "How to Master React", author: "Admin", date: "2024-05-20", category: "Technology" },
    { id: 2, title: "Top 10 Business Hacks", author: "Admin", date: "2024-05-19", category: "Business" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 rounded-md transition-all"
          >
            Add Category
          </button>
          <button
            onClick={() => setShowAddBlog(true)}
            className="flex items-center gap-2 bg-[#991010] hover:bg-[#742e24] text-white py-2 px-5 rounded-md transition-all"
          >
            <PlusCircle size={18} /> Add Blog
          </button>
        </div>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700 uppercase tracking-wider">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, idx) => (
                <tr key={blog.id} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold">{blog.title}</td>
                  <td className="px-4 py-3">{blog.author}</td>
                  <td className="px-4 py-3">{blog.date}</td>
                  <td className="px-4 py-3">{blog.category}</td>
                  <td className="px-4 py-3">
                    <button className="text-[#991010] hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
            <AddBlog onSuccess={() => setShowAddBlog(false)} />
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
            <AddCategory onSuccess={() => setShowAddCategory(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
export default ManageBlogs
