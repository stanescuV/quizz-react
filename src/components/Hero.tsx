import { useNavigate } from "react-router-dom";

type Props = {}

function Hero({}: Props) {
  const navigate = useNavigate();


  return (
  <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center space-y-4 mt-6">
        <h2 className="font-sans text-5xl">
          <span className="block">What will be your first quiz?</span>
        </h2>
        <p className="text-xl">
          <span className="block">Turn presentations into conversations with interactive polls</span>
          <span className="block">that engage meetings and classrooms.</span> 
        </p>
      </div>
      <button onClick={()=>{navigate('/forms')}} className="mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Get Started</button>
      <p className='text-slate-500 mt-3'>For free</p>
  </div>
  
  )
}

export default Hero