import image from '../../../../assets/bg.jpg'
import SecondHeading from '../../atoms/SecondHeading'
import Card from '../../molecules/Cards'
import Heroblog from '../../organisms/blog/Heroblog'

const BlogStructure = ({ heading }) => {
  // ⛳ Example dynamic data from backend
  const blogPosts = [
    {
      id: 1,
      title: 'This is the intro',
      intro: 'Lorem ipsum is one of the greatest...',
      date: '2018/04/20',
      likes: 122,
      image,
    },
    {
      id: 2,
      title: 'Another Insight',
      intro: 'Planting wisdom through pixels...',
      date: '2019/01/12',
      likes: 90,
      image,
    },
    {
      id: 2,
      title: 'Another Insight',
      intro: 'Planting wisdom through pixels...',
      date: '2019/01/12',
      likes: 90,
      image,
    },
    {
      id: 2,
      title: 'Another Insight',
      intro: 'Planting wisdom through pixels...',
      date: '2019/01/12',
      likes: 90,
      image,
    },
    {
      id: 2,
      title: 'Another Insight',
      intro: 'Planting wisdom through pixels...',
      date: '2019/01/12',
      likes: 90,
      image,
    },
    // ...more blogs
  ]

  return (
    <>
      <Heroblog />
      <div className='max-w-7xl mx-auto pt-20'>
        <SecondHeading value='food' />

        {/* Background Image Hero */}
        <div
          className='relative h-[30rem] rounded-lg flex flex-col justify-end p-6 text-white max-w-6xl mx-auto overflow-hidden'
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='relative z-10'>
            <span className='text-[#af4133] font-bold text-xl uppercase mb-2 tracking-widest'>Title</span>
            <h2 className='text-2xl font-bold mb-2'>this is going to be heading</h2>
            <p className='text-sm font-semibold'>
              JOHN DOE • <span className='font-normal'>20 APRIL 2018</span>
            </p>
          </div>
        </div>

        {/* Dynamic Blog Cards */}
        <div className='max-w-6xl mx-auto py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                image={post.image}
                title={post.title}
                intro={post.intro}
                date={post.date}
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
