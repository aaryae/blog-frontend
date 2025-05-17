import Heading from '../atoms/Heading'
import Hero from '../organisms/Hero'
import Navbar from '../organisms/navbar/Navbar'
import Sidebar from '../organisms/navbar/Sidebar'
import CardsCollection from '../organisms/section/CardsCollection'

const UserPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='p-5'>
        <Hero />
        <Heading value={'Editors pick'} />
        <CardsCollection />
      </div>
    </>
  )
}

export default UserPage
