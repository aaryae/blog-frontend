import React, { useEffect, useState } from 'react'
import Card from '../../molecules/Cards'
import { getAllBlogs } from '../../../../services/blog/blogService'


const getImageUrl = (imageName) => {
  return imageName ? `http://localhost:8080/api/post/image/${imageName}` : undefined
}

const CardsCollection = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs()
        setBlogs(res.slice(3, 6))
      } catch (err) {
        setBlogs([])
      }
    }
    fetchBlogs()
  }, [getAllBlogs])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).toUpperCase()
  }

  return (
    <div className='max-w-6xl mx-auto py-4 '>
      <div className='flex gap-4 flex-wrap md:flex-nowrap'>
        {blogs.map((blog, idx) => (
          <Card
            key={blog.id || idx}
            image={getImageUrl(blog.imageName)}
            title={blog.title}
            intro={blog.content}
            date={formatDate(blog.createdDate)}
            likes={blog.likes}
          />
        ))}
      </div>
    </div>
  )
}

export default CardsCollection
