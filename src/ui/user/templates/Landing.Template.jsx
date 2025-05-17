import { Outlet } from 'react-router-dom'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/navbar/Navbar'
import Sidebar from '../organisms/navbar/Sidebar'

const LandingTemplate = () => {
  return (
    <div className='flex flex-col h-screen '>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LandingTemplate
