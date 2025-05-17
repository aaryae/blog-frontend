import Heading from '../atoms/Heading'
import LoginFAB from '../atoms/LoginFAB'
import Aftersection from '../organisms/Aftersection'
import Footer from '../organisms/Footer'
import Hero from '../organisms/Hero'
import Navbar from '../organisms/navbar/Navbar'
import Sidebar from '../organisms/navbar/Sidebar'
import CardsCollection from '../organisms/section/CardsCollection'

const UserPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <LoginFAB />
      <div className='p-5'>
        <Hero />
        <Heading value={'Editors pick'} />
        <CardsCollection />
        <Aftersection />
      </div>
      <Footer />
    </>
  )
}

export default UserPage
