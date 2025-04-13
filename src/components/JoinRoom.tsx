import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifySessionUUIDWith8DigitCode } from '../firebase/firestore';

import { ButtonLoading } from './shadcn-components/loader-button';

export function JoinRoom() {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function makeUserWait2SecsBeforeNewSession() {
    function waitFor2Seconds() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    await waitFor2Seconds();
    setIsError(false);
    setIsVisible(true);
  }

  async function verifyThenNavigate(digitsCode: string) {
    if (digitsCode.length < 0 || !digitsCode) {
      setIsLoading(false);
      setIsError(true);
      makeUserWait2SecsBeforeNewSession();
      return;
    }

    verifySessionUUIDWith8DigitCode(digitsCode).then((r) => {
      console.log({ r });
      if (!r) {
        setIsLoading(false);
        setIsError(true);
        makeUserWait2SecsBeforeNewSession();

        return;
      }
      navigate('/session/' + digitsCode);
    });
  }

  return (
    <div className="flex justify-center items-center gap-4 bg-[#7964e0] p-4 rounded-lg">
      <p className="text-white font-pops text-s font-normal">
        Enter code to join the quizz
      </p>
      <input
        onChange={(e) => {
          setCode(e.target.value);
        }}
        id="sessionCodeInput"
        value={code}
        type="text"
        placeholder="1234 1234"
        className="px-2 py-1 w-24 bg-white border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#6e4fff] transition-all"
      />

      {isVisible && (
        <button
          onClick={() => {
            setIsVisible(false);
            setIsLoading(true);
            verifyThenNavigate(code);
          }}
          className="px-5 py-3  rounded-[10px] bg-[#6e4ffe] text-white  font-extrabold font-['Poppins'] shadow-lg hover:shadow-xl active:shadow-md hover:bg-[#5a3ed7] active:bg-[#4a34b1]"
        >
          Join
        </button>
      )}
      {isLoading && <ButtonLoading />}

      {isError && (
        <button
          onClick={() => {
            verifyThenNavigate(code);
          }}
          className="px-5 py-3 cursor-default rounded-[10px] bg-[red] text-white  font-extrabold font-['Poppins'] shadow-lg  active:shadow-md "
        >
          X
        </button>
      )}
    </div>
  );
}
