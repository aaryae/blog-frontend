import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addBlogPost } from '../../services/blog/blogService'

const CATEGORY_OPTIONS = [
  { label: "Food", value: "FOOD" },
  { label: "Business", value: "BUSINESS" },
  { label: "Technology", value: "TECHNOLOGY" },
  { label: "Politics", value: "POLITICS" },
  { label: "Others", value: "OTHERS" }
]

const AddPost = ({ onSuccess }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState(CATEGORY_OPTIONS[0].value)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const getUserId = () => {
    const raw = localStorage.getItem('userId')
    try {
      const parsed = JSON.parse(raw)
      return parsed || raw
    } catch {
      return raw
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userId = getUserId()
      if (!userId) {
        toast.error("❌ User not logged in.")
        setLoading(false)
        return
      }

      const postDto = { title, content, userId, categoryId }
      const postDtoBlob = new Blob([JSON.stringify(postDto)], { type: "application/json" })
      const formData = new FormData()
      formData.append('image', image)
      formData.append('postDto', postDtoBlob)

      await addBlogPost(formData)
      toast.success('✅ Post added successfully!')
      setTitle('')
      setContent('')
      setImage(null)
      setCategoryId(CATEGORY_OPTIONS[0].value)
      if (onSuccess) onSuccess()
    } catch (err) {
      toast.error('❌ Failed to add post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafb]">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg"
        style={{ minWidth: 350 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-[#22223b] text-center tracking-wide">Add New Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-[#22223b]">Title</label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-[#22223b]">Content</label>
          <textarea
            className="block w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-[#22223b]">Category</label>
          <select
            className="block w-full border border-gray-300 rounded px-3 py-2"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Image (Now at Bottom) */}
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-[#22223b]">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#b10018] hover:bg-[#750010] text-white font-bold py-3 rounded-lg transition duration-150"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Add Post'}
        </button>
      </form>
    </div>
  )
}

export default AddPost
