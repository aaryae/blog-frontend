import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { addBlogPost } from '../../services/blog/blogService'

const USER_ID = 2
const CATEGORY_ID = 1

const AddPost = () => {
  const { register, handleSubmit, reset } = useForm()

 const onSubmit = async (data) => {
  try {
    const imageFile = data.image[0]

    const formData = new FormData()
    formData.append('image', imageFile)

    const postDto = {
      title: data.title,
      content: data.content,
      userId: USER_ID,
      categoryId: CATEGORY_ID,
    }

    const postBlob = new Blob([JSON.stringify(postDto)], { type: 'application/json' })
    formData.append('postDto', postBlob)

    // 🔍 Debug logs
    console.log('🖼️ Image File:', imageFile)
    console.log('📝 Post DTO Blob:', postBlob)

    for (let pair of formData.entries()) {
      console.log(`📦 FormData [${pair[0]}]:`, pair[1])
    }

    await addBlogPost(formData)
    toast.success('✅ Post added successfully!')
    reset()
  } catch (error) {
    console.error(error)
    toast.error('❌ Failed to add post')
  }
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
            className='bg-[#991010] hover:bg-[#742e24] text-white font-medium py-2 px-6 rounded-lg transition-all'
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPost
