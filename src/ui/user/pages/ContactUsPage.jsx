import { Sidebar } from 'lucide-react'
import UserDetail from '../organisms/auth/Profile'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/navbar/Navbar'

const ContactUsPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <UserDetail />
      <Footer />
    </>
  )
}

export default ContactUsPage
