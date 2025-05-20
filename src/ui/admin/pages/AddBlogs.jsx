import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { addBlogPost, getAllCategories } from "../../../services/blog/blogService"

const CATEGORY_OPTIONS = [
  { label: "Food", keyword: "food" },
  { label: "Business", keyword: "business" },
  { label: "Technology", keyword: "technology" },
  { label: "Political", keyword: "political" },
  { label: "Others", keyword: "others" }, // Always keep "Others" last
]
const OTHERS_CATEGORY_ID = 8

const AddBlog = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch categories from backend
  useEffect(() => {
    (async () => {
      try {
        const cats = await getAllCategories()
        setCategories(cats)
      } catch {
        setCategories([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Helper: Get correct categoryId based on dropdown selection and backend list
  const getCategoryId = (selectedLabel) => {
    // Match selected label with fetched category (case-insensitive, substring ok)
    if (!categories || categories.length === 0) return OTHERS_CATEGORY_ID
    const cat = categories.find(
      c =>
        c.categoryTitle &&
        c.categoryTitle.toLowerCase().includes(selectedLabel.toLowerCase())
    )
    return cat?.id || OTHERS_CATEGORY_ID
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('image', data.image[0])

      // Use the mapping to find the backend category ID, or fallback to OTHERS
      const selectedLabel = data.category
      const categoryId = getCategoryId(selectedLabel)

      const postDto = {
        title: data.title,
        content: data.content,
        userId: 1, // TODO: Get from context/auth
        categoryId
      }

      formData.append('postDto', new Blob([JSON.stringify(postDto)], { type: 'application/json' }))

      await addBlogPost(formData)
      toast.success("Blog posted successfully!")
      reset()
      if (onSuccess) onSuccess()
    } catch (err) {
      toast.error("Failed to post blog!")
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-[#991010]">Add New Blog</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register("title", { required: true })}
          className="w-full px-4 py-2 border rounded"
          placeholder="Blog title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full px-4 py-2 border rounded min-h-[100px]"
          placeholder="Blog content"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          {...register("category", { required: true })}
          className="w-full px-4 py-2 border rounded"
          disabled={loading}
        >
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          {...register("image", { required: true })}
          className="w-full"
          accept="image/*"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onSuccess} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-[#991010] text-white">Post Blog</button>
      </div>
    </form>
  )
}

export default AddBlog
