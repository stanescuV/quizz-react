import Hero from '../components/Hero'
import NavbarShad from '../components/NavbarShad'
import MiddleSection from '../components/MiddleSection'
import CarouselFront from '../components/CarouselFront'
type Props = {}

function Home({}: Props) {
  return (
    <div className='flex flex-col'>
        <NavbarShad/>
        <Hero/>
        <MiddleSection/>
        <CarouselFront />
        <div>Hello world</div>  
       
    </div>
  )
}

export default Home