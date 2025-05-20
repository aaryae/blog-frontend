import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBlogs } from '../../../services/blog/blogService'

const Hero = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs()
        setBlogs(res.slice(0, 3))
      } catch (err) {
        setBlogs([])
      }
    }
    fetchBlogs()
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).toUpperCase()
  }

  const getImageUrl = (imageName) => {
    return imageName ? `http://localhost:8080/api/post/image/${imageName}` : undefined
  }

  // Function to handle card click
  const handleCardClick = (blog) => {
    navigate('/card-detail', {
      state: {
        id: blog.id,
        image: getImageUrl(blog.imageName),
        title: blog.title,
        intro: blog.content, // or another field for intro
        date: formatDate(blog.createdDate),
        likes: blog.likes,
      }
    })
  }

  return (
    <div className='max-w-6xl mx-auto pt-24'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 '>
        {/* Main Left Block */}
        <div
          className='lg:col-span-2 relative h-[30rem] bg-gray-300 rounded-lg flex flex-col justify-end p-6 text-white cursor-pointer transition hover:scale-[1.02]'
          style={{
            backgroundImage: blogs[0]?.imageName
              ? `url(${getImageUrl(blogs[0].imageName)})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => blogs[0] && handleCardClick(blogs[0])}
        >
          <span className='text-[#af4133] font-bold text-xl uppercase mb-2 tracking-widest'>
            {blogs[0]?.categoryId || 'Category'}
          </span>
          <h2 className='text-2xl font-bold mb-2'>
            {blogs[0]?.title || 'No Title'}
          </h2>
          <p className='text-sm font-semibold'>
            USER {blogs[0]?.userId} • <span className='font-normal'>
              {formatDate(blogs[0]?.createdDate)}
            </span>
          </p>
        </div>

        {/* Right Column */}
        <div className='flex flex-col gap-4'>
          {/* Top Right */}
          <div
            className='relative h-60 bg-gray-300 rounded-lg flex flex-col justify-end p-4 text-white cursor-pointer transition hover:scale-[1.02]'
            style={{
              backgroundImage: blogs[1]?.imageName
                ? `url(${getImageUrl(blogs[1].imageName)})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => blogs[1] && handleCardClick(blogs[1])}
          >
            <span className='text-[#af4133] font-bold text-xs uppercase mb-1 tracking-widest'>
              {blogs[1]?.categoryId || 'Category'}
            </span>
            <h3 className='text-base font-bold leading-snug'>
              {blogs[1]?.title || 'No Title'}
            </h3>
            <p className='text-xs mt-1 font-semibold'>
              USER {blogs[1]?.userId} • <span className='font-normal'>
                {formatDate(blogs[1]?.createdDate)}
              </span>
            </p>
          </div>

          {/* Bottom Right */}
          <div
            className='relative h-56 bg-gray-300 rounded-lg flex flex-col justify-end p-4 text-white cursor-pointer transition hover:scale-[1.02]'
            style={{
              backgroundImage: blogs[2]?.imageName
                ? `url(${getImageUrl(blogs[2].imageName)})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => blogs[2] && handleCardClick(blogs[2])}
          >
            <span className='text-[#af4133] font-bold text-xs uppercase mb-1 tracking-widest'>
              {blogs[2]?.categoryId || 'Category'}
            </span>
            <h3 className='text-base font-bold leading-snug'>
              {blogs[2]?.title || 'No Title'}
            </h3>
            <p className='text-xs mt-1 font-semibold'>
              USER {blogs[2]?.userId} • <span className='font-normal'>
                {formatDate(blogs[2]?.createdDate)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
