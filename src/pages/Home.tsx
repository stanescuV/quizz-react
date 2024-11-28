import Hero from '../components/Hero'
import NavbarShad from '../components/NavbarShad'
import MiddleSection from '../components/MiddleSection'
type Props = {}

function Home({}: Props) {
  return (
    <div className='flex flex-col'>
        <NavbarShad/>
        <Hero/>
        <MiddleSection/>
        <div className='bg-white'>HELLO WORLD</div>
       
    </div>
  )
}

export default Home