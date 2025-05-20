import React, { useEffect, useState } from 'react'
import SecondHeading from '../../atoms/SecondHeading'
import Card from '../../molecules/Cards'
import Heroblog from '../../organisms/blog/Heroblog'
import { getBlogsByCategory } from '../../../../services/blog/blogService'

const getImageUrl = (imageName) =>
  imageName ? `http://localhost:8080/api/post/image/${imageName}` : undefined

const BlogStructure = ({ heading }) => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogsByCategory(heading?.toUpperCase() || 'FOOD')
        setBlogPosts(res)
      } catch {
        setBlogPosts([])
      }
    }
    fetchData()
  }, [heading])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  // Optional: Take first post as hero, others as cards
  const heroPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <>
      <Heroblog />
      <div className='max-w-7xl mx-auto pt-20'>
        <SecondHeading value={heading || 'food'} />

        {/* Background Image Hero */}
        {heroPost && (
          <div
            className='relative h-[30rem] rounded-lg flex flex-col justify-end p-6 text-white max-w-6xl mx-auto overflow-hidden'
            style={{
              backgroundImage: `url(${getImageUrl(heroPost.imageName)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='relative z-10'>
              <span className='text-[#af4133] font-bold text-xl uppercase mb-2 tracking-widest'>{heroPost.categoryId}</span>
              <h2 className='text-2xl font-bold mb-2'>{heroPost.title}</h2>
              <p className='text-sm font-semibold'>
                USER {heroPost.userId} • <span className='font-normal'>{formatDate(heroPost.createdDate)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Blog Cards */}
        <div className='max-w-6xl mx-auto py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {otherPosts.map((post) => (
              <Card
                key={post.id}
                image={getImageUrl(post.imageName)}
                title={post.title}
                intro={post.content}
                date={formatDate(post.createdDate)}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogStructure
