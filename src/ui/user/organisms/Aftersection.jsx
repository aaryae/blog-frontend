import Heading from '../atoms/Heading'
import HandleMedia from './section/HandleMedia'
import SmallCardsCollection from './section/SmallCardsCollection'

const Aftersection = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex flex-wrap md:flex-nowrap'>
        <div className='md:w-2/3 w-full'>
          <Heading value={'more'} />
          <SmallCardsCollection />
        </div>
        <div className=' md:w-1/2 w-full '>
          <HandleMedia />
        </div>
      </div>
    </div>
  )
}

export default Aftersection
