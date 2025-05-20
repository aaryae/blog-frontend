import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SmallCard from '../../molecules/SmallCards'
import { getAllBlogs } from '../../../../services/blog/blogService'

const getImageUrl = (imageName) =>
  imageName ? `http://localhost:8080/api/post/image/${imageName}` : undefined

const SmallCardsCollection = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs()
        setBlogs(res.slice(6, 9)) // fetch 7th, 8th, 9th
      } catch {
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
    })
  }

  // Helper: Go to details with state
  const handleCardClick = (blog) => {
    navigate('/card-detail', {
      state: {
        id: blog.id,
        image: getImageUrl(blog.imageName),
        title: blog.title,
        intro: blog.content,
        date: formatDate(blog.createdDate),
        likes: blog.likes,
      },
    })
  }

  return (
    <div className='flex flex-col gap-3 justify-start'>
      {blogs.map((blog) => (
        <div key={blog.id} onClick={() => handleCardClick(blog)} className="cursor-pointer transition hover:scale-[1.01]">
          <SmallCard
            image={getImageUrl(blog.imageName)}
            category={blog.categoryId}
            title={blog.title}
            author={`USER ${blog.userId}`}
            date={formatDate(blog.createdDate)}
            excerpt={blog.content.slice(0, 120) + (blog.content.length > 120 ? '...' : '')}
          />
        </div>
      ))}
    </div>
  )
}

export default SmallCardsCollection
