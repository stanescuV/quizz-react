import Form from '../components/Form'
import Navbar from '../components/Navbar'

interface Props {}

export default function Home({}: Props) {
  return (
    <div>
        <Navbar></Navbar>
        <Form document={{}} />
    </div>
  )
}