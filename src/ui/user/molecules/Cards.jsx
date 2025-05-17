import { Heart } from 'lucide-react'
import { useState } from 'react'

const Card = ({ image, title, intro, date, likes }) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const toggleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
    setLiked(!liked)
  }

  return (
    <div className='group rounded-lg shadow-sm md:max-w-md w-full mx-auto bg-white overflow-hidden transition duration-300 cursor-pointer'>
      {/* Image */}
      <div className='h-60 bg-gray-300 flex items-center justify-center overflow-hidden'>
        {image && (
          <img
            src={image}
            alt={title}
            className='w-full h-full object-cover transition duration-300 delay-400 ease-in-out group-hover:scale-110'
          />
        )}
      </div>

      {/* Content */}
      <div className='p-4'>
        <p className='text-sm text-gray-500 mb-1'>Admin</p>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
        <p className='text-sm text-gray-700'>{intro}</p>

        {/* Footer */}
        <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
          <span>{date}</span>
          <div className='flex items-center space-x-1'>
            <span>{likeCount}</span>
            <Heart
              size={16}
              onClick={toggleLike}
              className={`cursor-pointer transition-all ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
