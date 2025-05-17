import image from '../../../../assets/bg.jpg'
import SecondHeading from '../../atoms/SecondHeading'
import SmallCard from '../../molecules/SmallCards'
import Heroblog from '../../organisms/blog/Heroblog'

const BlogStructure = ({ heading }) => {
  return (
    <>
      <Heroblog />
      <div className='max-w-7xl mx-auto '>
        <SecondHeading value={heading} />

        <div className=' relative h-[30rem] bg-gray-300 rounded-lg flex flex-col justify-end p-6 text-white max-w-6xl mx-auto'>
          <span className='text-[#af4133]  font-bold text-xl uppercase mb-2 tracking-widest'>Title</span>
          <h2 className='text-2xl font-bold mb-2'>this is going to be heading </h2>
          <p className='text-sm font-semibold'>
            JOHN DOE • <span className='font-normal'>20 APRIL 2018</span>
          </p>
        </div>

        <div className='max-w-6xl mx-auto py-4'>
          <div className='flex gap-3 flex-col'>
            <SmallCard
              image={image}
              category='Travel'
              title='Sed ut perspiciatis, unde omnis iste natus error sit'
              author='John Doe'
              date='20 April 2018'
              excerpt='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...'
            />
            <SmallCard
              image={image}
              category='Travel'
              title='Sed ut perspiciatis, unde omnis iste natus error sit'
              author='John Doe'
              date='20 April 2018'
              excerpt='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...'
            />
            <SmallCard
              image={image}
              category='Travel'
              title='Sed ut perspiciatis, unde omnis iste natus error sit'
              author='John Doe'
              date='20 April 2018'
              excerpt='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogStructure
