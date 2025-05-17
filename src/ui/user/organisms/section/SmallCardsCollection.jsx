import image from '../../../../assets/bg.jpg'
import SmallCard from '../../molecules/SmallCards'

const SmallCardsCollection = () => {
  return (
    <div className='flex flex-col gap-3 justify-start'>
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
  )
}

export default SmallCardsCollection
