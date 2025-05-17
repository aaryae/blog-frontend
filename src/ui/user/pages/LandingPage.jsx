import Heading from "../atoms/Heading"
import LoginFAB from "../atoms/LoginFAB"
import Aftersection from "../organisms/Aftersection"
import Hero from "../organisms/Hero"
import CardsCollection from "../organisms/section/CardsCollection"

const LandingPage = () => {
  return (
    <>
      <LoginFAB />
      <div className='p-5'>
        <Hero />
        <Heading value={'Editors pick'} />
        <CardsCollection />
        <Aftersection />
      </div>
    </>
  )
}

export default LandingPage
