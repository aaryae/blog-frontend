import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { addBlogPost, getAllCategories } from '../../services/blog/blogService'

const USER_ID = 2
const CATEGORY_OPTIONS = [
  { label: 'Food', value: 'Food' },
  { label: 'Business', value: 'Business' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Political', value: 'Political' },
  { label: 'Others', value: 'Others' },
]
const OTHERS_CATEGORY_ID = 8 // fallback ID

const AddPost = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    let categoryId = OTHERS_CATEGORY_ID // Default fallback

    try {
      // 1. Fetch all categories
      const categories = await getAllCategories()

      // 2. Try to find category by title (case-insensitive)
      const found = categories.find(
        (cat) => cat.categoryTitle?.toLowerCase() === data.category?.toLowerCase()
      )

      // 3. If found, use its ID, else fallback to 8 (Others)
      if (found) {
        categoryId = found.id
      }

    } catch (e) {
      // If API fails, fallback to Others
      categoryId = OTHERS_CATEGORY_ID
    }

    try {
      // Prepare formData as before
      const formData = new FormData()
      formData.append('image', data.image[0])
      const postDto = {
        title: data.title,
        content: data.content,
        userId: USER_ID,
        categoryId,
      }
      formData.append('postDto', new Blob([JSON.stringify(postDto)], { type: 'application/json' }))

      await addBlogPost(formData)
      toast.success('✅ Post added successfully!')
      reset()
    } catch (err) {
      toast.error('❌ Failed to add post')
    }
    setIsSubmitting(false)
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10'>
      <h2 className='text-3xl font-bold mb-6 text-[#991010] text-center'>Create New Blog Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Post Title</label>
          <input
            {...register('title', { required: true })}
            placeholder='Your post title...'
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#991010]'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
          <textarea
            {...register('content', { required: true })}
            placeholder='Write your content here...'
            rows={6}
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#991010] resize-none'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
          <select
            {...register('category', { required: true })}
            className='w-full px-4 py-2 border rounded-md'
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Upload Image</label>
          <input
            type='file'
            accept='image/*'
            {...register('image', { required: true })}
            className='w-full text-gray-600'
          />
        </div>

        <div className='text-center pt-4'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-[#991010] hover:bg-[#742e24] text-white font-medium py-2 px-6 rounded-lg transition-all'
          >
            {isSubmitting ? 'Posting...' : 'Submit Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPost
