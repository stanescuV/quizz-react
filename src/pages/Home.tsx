import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
type Props = {}

function Home({}: Props) {
  return (
    <div>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Home