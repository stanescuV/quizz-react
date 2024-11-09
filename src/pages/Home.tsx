import Hero from '../components/Hero'
import NavbarShad from '../components/NavbarShad'
type Props = {}

function Home({}: Props) {
  return (
    <div className=''>
        <NavbarShad/>
        <Hero/>
       
    </div>
  )
}

export default Home