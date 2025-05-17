import Food from '../organisms/blog/Food'
import Heroblog from '../organisms/blog/Heroblog'
import Footer from '../organisms/Footer'
import Navbar from '../organisms/navbar/Navbar'
import Sidebar from '../organisms/navbar/Sidebar'
import SmallCardsCollection from '../organisms/section/SmallCardsCollection'

const FoodPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Heroblog />
      <Food />
      
      <Footer />
    </>
  )
}

export default FoodPage
