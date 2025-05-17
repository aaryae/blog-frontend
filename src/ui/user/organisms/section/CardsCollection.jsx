import image from '../../../../assets/bg.jpg'
import Card from '../../molecules/Cards'

const CardsCollection = () => {
  return (
    <div className='max-w-6xl mx-auto py-4 '>
      <div className='flex gap-4 flex-wrap md:flex-nowrap'>
        <Card
          image={image}
          title={'This is the intro'}
          intro='lorem lomre is one the greates i have even sene it ds sdfjsd lthi sohwol plant'
          date='2018/34/34'
          likes={122}
        />
        <Card
          image={image}
          title={'This is the intro'}
          intro='lorem lomre is one the greates i have even sene it ds sdfjsd lthi sohwol plant'
          date='2018/34/34'
          likes={122}
        />{' '}
        <Card
          image={image}
          title={'This is the intro'}
          intro='lorem lomre is one the greates i have even sene it ds sdfjsd lthi sohwol plant'
          date='2018/34/34'
          likes={122}
        />
      </div>
    </div>
  )
}

export default CardsCollection
