import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommentSection from './CommentSection'
import { likeBlogPost } from '../../../services/blog/blogService'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'

const CardDetails = () => {
  const { state } = useLocation()
  const { id, image, title, intro, date, likes } = state || {}

  // Track likes in localStorage to persist for the session
  const storageKey = `liked_post_${id}`
  const [likeCount, setLikeCount] = useState(likes ?? 0)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    // On mount, check if this post was liked already
    const liked = localStorage.getItem(storageKey)
    setHasLiked(liked === '1')
  }, [storageKey])

  if (!state) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>No card details found. Please return to blog list.</p>
      </div>
    )
  }

  const handleLike = async () => {
    if (isLiking || hasLiked) return
    setIsLiking(true)
    try {
      await likeBlogPost(id)
      setLikeCount((prev) => prev + 1)
      setHasLiked(true)
      localStorage.setItem(storageKey, '1')
      toast.success('You liked this post!')
    } catch (err) {
      toast.error('Failed to like post. Please try again.')
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto py-20 px-6'>
      <div className='h-96 w-full overflow-hidden rounded-lg shadow mb-6'>
        <img src={image} alt={title} className='w-full h-full object-cover' />
      </div>
      <h1 className='text-3xl font-bold text-[#af4133] mb-2'>{title}</h1>
      <p className='text-sm text-gray-600 mb-4'>By Admin • {date}</p>
      <p className='text-base text-gray-800 leading-relaxed mb-8'>{intro}</p>
      <div className='flex items-center gap-4 mb-10'>
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-md font-semibold transition ${
            isLiking || hasLiked ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-50'
          }`}
          onClick={handleLike}
          disabled={isLiking || hasLiked}
        >
          <Heart
            size={20}
            className={hasLiked ? 'text-red-600 fill-red-600' : 'text-red-500'}
            fill={hasLiked ? 'red' : 'none'}
          />
          <span className='text-gray-700'>{likeCount}</span>
        </button>
        <span className='text-sm text-gray-500'>{likeCount} people liked this post</span>
      </div>
      {/* Comment Section */}
      <CommentSection postId={id} />
    </div>
  )
}

export default CardDetails
