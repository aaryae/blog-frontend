import { useLocation } from 'react-router-dom'
import CommentSection from './CommentSection'

const CardDetails = () => {
  const { state } = useLocation()
  const { id, image, title, intro, date, likes } = state || {}

  if (!state) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>No card details found. Please return to blog list.</p>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto py-20 px-6'>
      <div className='h-96 w-full overflow-hidden rounded-lg shadow mb-6'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
      </div>
      <h1 className='text-3xl font-bold text-[#af4133] mb-2'>{title}</h1>
      <p className='text-sm text-gray-600 mb-4'>By Admin • {date}</p>
      <p className='text-base text-gray-800 leading-relaxed mb-8'>{intro}</p>
      <p className='text-sm text-gray-500 mb-10'>❤️ {likes} people liked this post</p>

      {/* Comment Section */}
      <CommentSection postId={id} />
    </div>
  )
}

export default CardDetails
