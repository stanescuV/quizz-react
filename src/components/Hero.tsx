// import { useNavigate } from "react-router-dom";
import Avatar1 from '../assets/avatar1.svg';
import Avatar2 from '../assets/avatar2.svg';
import Avatar3 from '../assets/avatar3.svg';
import Col1 from '../assets/2ndPlace.png';
import Col2 from '../assets/1stPlace.png';
import Col3 from '../assets/3rdPlace.png';
import Line from '../assets/line.svg';

type Props = {}

function Hero({}: Props) {

  // const navigate = useNavigate();

  return (
    <div className="select-none mt-10 w-full flex flex-col justify-center items-center border border-[#6e4fff]  bg-[#6e4fff] min-w-full">
      <div className="pb-5 text-5xl font-bold mb-6 font-pops text-white tracking-wide relative ">
        <span className="bg-white text-[#6e4fff] rounded-lg ">Play</span> until you are the <span className="relative">
          best
          <img
            src={Line}
            alt="underline"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-50 h-7"
          />
        </span>
      </div>

      <div className="flex items-end ">
      {/* Col1 */}
      <div className="flex flex-col items-center animate-rise delay-100">
        <img src={Avatar1} alt="VicSvg" className="w-20 h-20 min-w-10 min-h-10 animate-float" />
        <img src={Col1} alt="2nd Place" className="w-72 h-56" /> {/* Medium height */}
      </div>

      {/* Col2 */}
      <div className="flex flex-col items-center animate-rise delay-200">
        <img src={Avatar2} alt="VicSvg" className="w-20 h-20 min-w-10 min-h-10 animate-float " />
        <img src={Col2} alt="1st Place" className="w-72 h-72" /> {/* Tallest */}
      </div>

      {/* Col3 */}
      <div className="flex flex-col items-center animate-rise delay-300">
        <img src={Avatar3} alt="VicSvg" className="w-20 h-20 min-w-10 min-h-10 animate-float" />
        <img src={Col3} alt="3rd Place" className="w-72 h-48" /> {/* Shortest */}
      </div>
     </div>

    </div>
  );
}

export default Hero;
