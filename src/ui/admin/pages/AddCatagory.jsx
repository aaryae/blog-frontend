// src/ui/admin/pages/AddCategory.jsx
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { addCategory } from "../../../services/blog/blogService"

const AddCategory = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await addCategory({
        categoryTitle: data.categoryTitle,
        categoryDescription: data.categoryDescription,
      })
      toast.success("Category added!")
      reset()
      if (onSuccess) onSuccess()
    } catch {
      toast.error("Failed to add category")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-[#991010]">Add Category</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Category Title</label>
        <input {...register("categoryTitle", { required: true })}
               className="w-full px-4 py-2 border rounded" placeholder="Title" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input {...register("categoryDescription", { required: true })}
               className="w-full px-4 py-2 border rounded" placeholder="Description" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onSuccess} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-[#991010] text-white">Add</button>
      </div>
    </form>
  )
}
export default AddCategory
