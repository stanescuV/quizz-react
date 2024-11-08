import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { Button } from '../components/ui/button'
type Props = {}

function Home({}: Props) {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Button className='ml-10'> Hello world </Button>
       
    </div>
  )
}

export default Home