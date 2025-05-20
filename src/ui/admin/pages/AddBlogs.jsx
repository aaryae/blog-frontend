// src/ui/admin/pages/AddBlog.jsx
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { addBlogPost } from "../../../services/blog/blogService" // Make sure this is the right service

const AddBlog = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('image', data.image[0])
      // Only title, content, userId and optionally categoryId (can hardcode or omit)
      const postDto = {
        title: data.title,
        content: data.content,
        userId: 1,  // Replace with real admin userId if available
        // categoryId: 1, // Uncomment/hardcode if backend requires
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
