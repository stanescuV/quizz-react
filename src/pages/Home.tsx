import Hero from '../components/Hero'
import NavbarShad from '../components/NavbarShad'
import MiddleSection from '../components/MiddleSection'
import CarouselFront from '../components/CarouselFront'
import TextAndDiscoverButton from '../components/TextAndDiscoverButton'
import RegisterForm from '../components/RegisterForm'
type Props = {}

function Home({}: Props) {
  return (
    <div className='flex flex-col'>
        <NavbarShad/>
        <Hero/>
        <MiddleSection/>
        <CarouselFront />
        <TextAndDiscoverButton/>
        <RegisterForm/>
       
    </div>
  )
}

export default Home