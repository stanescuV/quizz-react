import { useNavigate, useParams } from 'react-router-dom';
import { convertFormEntityToFormularWithNoAnswersChecked } from '../entities/convertEntities';
import { FormEntity } from '../entities/formDB';
import {
  readFormularWithSessionId,
  readSessionUUIDWith8DigitCode
} from '../firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { Formular } from '../entities/form';
import { v4 as uuidv4 } from 'uuid';
import { DialogAnswers } from './DialogAnswers';
import { DigitsCodeEntity } from '../entities/digitsCodeEntity';

////////////// WebSocket instance
let _ws: WebSocket | null = null;

////////////////////COOKIE LOGIC ////////////////////////////
function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
}

function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function FormClient() {
  //Navigation
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [idSession, setIdSession] = useState(id || '');

  const cookie = useRef<string>('');
  const [formFrontend, setFormFrontend] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnswersDialogOpen, setIsAnswersDialogOpen] = useState(false);
  const [answersAndQuestionsCount, setAnswersAndQuestionCount] = useState({
    correctAnswersNumber: 0,
    allQuestions: 0
  });

  //////////////////////////SESSION CODE LOGIC //////////////////
  /**
   *
   * @param digitsCode
   * @returns idSession
   */
  async function getSessionUUIDUsing8DigitsCode(digitsCode: string) {
    const sessionUUID: String =
      ((await readSessionUUIDWith8DigitCode(digitsCode)) as DigitsCodeEntity)
        .sessionID || '';
    return sessionUUID;
  }

  //TODO: put it in entities / form logic
  function convertFormFrontendIntoFormCookies(formData: any) {
    if (!formData || typeof formData !== 'object' || !formData.form) {
      console.error('Invalid form data:', formData);
      return {};
    }
  
    const form = formData.form; // Extract the actual form object
    let newFormCookies: { [key: string]: any } = {};
  
    Object.keys(form).forEach((key) => {
      if (
        key !== 'idSession' && 
        key !== 'type' &&
        key !== 'formDbCookie' &&
        key !== 'cookieId' &&
        form[key] &&
        typeof form[key] === 'object' &&
        'selectedOption' in form[key]
      ) {
        newFormCookies[key] = form[key].selectedOption;
      }
    });
  
    return newFormCookies;
  }

  async function fetchForm(uuid: string) {
    try {
      const formFromDb: FormEntity = (await readFormularWithSessionId(
        uuid
      )) as unknown as FormEntity;

      const formFrontend =
        convertFormEntityToFormularWithNoAnswersChecked(formFromDb);
      setFormFrontend(formFrontend);
    } catch (err) {
      console.log(err);
      setError('Failed to load the form');
    } finally {
      setLoading(false);
    }
  }

  function checkOrSetUUID(keyCookie: string) {
    cookie.current = getCookie(keyCookie);

    if (!cookie.current) {
      let uuid = uuidv4();
      setCookie(keyCookie, uuid, 365);
      cookie.current = uuid;
      return cookie.current;
    }

    return cookie.current;
  }

  useEffect(() => {
    //we make sure loading is true at the beggining
    setLoading(true);

    //we use the 8 digits to get the real id Session
    getSessionUUIDUsing8DigitsCode(idSession).then((uuidString) => {
      //idk why but uuidString is String instead of string
      const uuid = uuidString.toString();

      //update the idSession
      setIdSession(uuid);

      if (uuid) {
        //open ws to get form data via server
        _ws = new WebSocket('ws://localhost:3001');

        _ws.onopen = () => {
          if (_ws) {
            _ws.send(
              JSON.stringify({
                type: 'CookieQuery',
                cookie: cookie.current,
                idSession: uuid
              })
            );
          } else {
            console.log('WS is null or undefined !');
          }
        };

        _ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);

          console.log('event.data.type', data.type);
          switch (data.type) {
            case 'CorrecAnswersQuestionCount':
              //when {question count + correctAnswers}
              console.log(data);
              console.log({ data: data });
              setAnswersAndQuestionCount(data);
              break;

            case 'CookieExistsAlready':
              console.log('data', data);
              navigate('/formFinished');
            // window.alert(data.cookieMessageToShowOnFrontend);
          }
        };

        fetchForm(uuid);

        //searches in browser for a cookie, if it finds it it gets it, if it doesn't he creates one
        cookie.current = checkOrSetUUID(uuid);
      } else {
        setLoading(false);
        setError('Form ID is missing');
      }
    });
  }, []);

  //we send the form via ws to server
  function sendMessage(message: any) {
    if (_ws && _ws.readyState === WebSocket.OPEN) {
      console.log(message);
      //we add the type and the idSession in the form before sending it on WS
      message = { ...message, idSession: idSession, type: 'UserAnswer' };

      const formCookie = convertFormFrontendIntoFormCookies(message);
      //adding the cookie in the message before sending it
      if (cookie.current) {
        message.formDbCookie = { [cookie.current]: formCookie };
        message.cookieId = cookie.current;
      }
      console.log({formCookie});

      _ws.send(JSON.stringify(message));
      console.log(message)
    } else {
      console.log('WebSocket connection is not open');
    }
  }

  ////form logic///
  const chooseRightAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionKey: string
  ) => {
    const selectedOption = e.target.id;

    setFormFrontend((prevForm: { [x: string]: any }) => ({
      ...prevForm,
      [questionKey]: {
        ...prevForm[questionKey],
        selectedOption
      }
    }));
  };

  const renderQuestion = (formular: Formular, questionKey: keyof Formular) => {
    const questionData = formular[questionKey];

    //TODO: Ask him why ?
    // If questionData or options is missing, return null (skip rendering)
    if (!questionData || !questionData.options) {
      return null;
    }

    const options = questionData.options;
    const lastNumberOfTheQuestionKey = (questionKey as string).slice(-1);

    return (
      <div
        className="p-4 mb-4 border rounded-lg shadow-lg bg-white"
        key={questionKey}
      >
        <label className="block text-lg font-semibold text-gray-700">
          {`${lastNumberOfTheQuestionKey}. Question:`}
        </label>
        <p className="mb-4">{questionData.question}</p>
        {Object.entries(options).map(([key, text]) => (
          <div className="flex items-center" key={key}>
            <input
              type="radio"
              name={`options-${questionKey}`}
              id={key}
              onChange={(e) => chooseRightAnswer(e, questionKey as string)}
              checked={formFrontend[questionKey]?.selectedOption === key}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor={key} className="ml-2">
              {text}
            </label>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
      <form className="space-y-4">
        {Object.keys(formFrontend).map((key) =>
          renderQuestion(formFrontend, key as keyof Formular)
        )}
        <button
          onClick={() => {
            console.log('this is the form that im fkin sending', formFrontend);
            sendMessage(formFrontend);
            setIsAnswersDialogOpen(true);
          }}
          type="button"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>
      <DialogAnswers
        questionsAndCorrectAnswersCount={answersAndQuestionsCount}
        open={isAnswersDialogOpen}
        setOpen={(open) => {
          setIsAnswersDialogOpen(open);
          if (!open) window.location.reload();
        }}
      />
    </div>
  );
}

export default FormClient;
