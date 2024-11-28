import Iphone from '../assets/iPhone 14 Pro Max edit.png';
import Arrow from '../assets/arrow.svg';



const MiddleSection = () => {
  return (
    <div className="flex justify-between w-full select-none">
        <div className="flex items-center flex-col justify-center w-1/2 text-center bg-white">
            <h3 className="text-[#6e4fff] text-3xl text-left font-extrabold font-pops pt-10">
                Become a superstar <br /> presenter with Vic! <br />
            </h3>
            <div className="text-black text-lg text-left font-normal font-['Inter'] pt-10 ">
                Turn any meeting, training, or event <br /> into an engaging two-way <br /> experience with our new <br /> professional hosting experience.
                <br />
                <button className="px-5 py-5 mt-10 rounded-[10px] bg-[#6e4ffe] text-white text-22 font-extrabold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1]">
                    Discover
                </button>
            </div>
        </div>


        <div className="flex items-center flex-col w-1/2 text-center bg-[#6e4fff] relative">
            <div className=" mt-10 text-center text-white text-[31px] font-extrabold font-['Poppins'] ">Discover our quizzes <br/>click to play ! </div>
            <div className='flex-grow'></div>
            <img src={Arrow} alt="arrow" className="w-60 h-60 absolute  top-4 left-1 animate-rotateLeft" />
            <img src={Iphone} alt="Iphone with Vic" className="h-3/4 w-auto" />
        </div>


    </div>


  )
}

export default MiddleSection;