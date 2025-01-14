
function TextAndDiscoverButton() {
  return (
    <div className="w-full flex items-center flex-col justify-center w-1/2 text-center bg-white py-3">
        <h3 className="text-[#6e4fff]  text-5xl text-center font-bold font-pops pt-10">
            So are you in ? 
        </h3>
        <div className="text-black text-lg text-center font-normal font-['Inter'] pt-10 ">
            Turn any meeting, training, or event <br /> into an engaging two-way <br /> experience with our new <br /> professional hosting experience.
            <br />
            <button className="px-5 py-3 mt-10 rounded-[10px] bg-[#6e4ffe] text-white text-26 font-extrabold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1]">
                Discover
            </button>
        </div>
    </div>  
  )
}

export default TextAndDiscoverButton