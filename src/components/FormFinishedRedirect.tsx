import { useNavigate } from 'react-router-dom';

function FormFinishedRedirect() {
  //Navigation
  const navigate = useNavigate();

  return (
    <div className="section bg-white pt-20 flex justify-center items-center font-xl flex-col">
      <div className="">
        You alerady Answered this Quizz, fell free to check our Home Page here
      </div>
      <button
        onClick={() => {
          navigate('/');
        }}
        className="bg-purple-600 mt-10 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default FormFinishedRedirect;
