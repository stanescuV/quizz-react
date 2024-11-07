import { useParams } from "react-router-dom";
import { convertFormEntityToFormular } from "../entities/convertEntities";
import { FormEntity } from "../entities/formDB";
import { readFormularWithId } from "../firebase/firestore";
import { useEffect, useState } from 'react';
import { Formular } from "../entities/form";


//WS
let _ws: any; 

function FormClient() {
  // Get the id from the URL using useParams
  const { id } = useParams<{ id: string }>();
  const idForm = id || "";

    // Function to render a single question


  function sendMessage(e:any, message: any, ws: WebSocket) {
    if (ws.readyState === WebSocket.OPEN) {
      message.id = idForm; 
      const dataToSend = JSON.stringify(message);
      ws.send(dataToSend);
    } else {
      console.log('WebSocket connection is not open');
    }

  }

  // State to manage form data, loading, and errors
  const [formFrontend, setFormFrontend] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const chooseRightAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => {
    const selectedOption = e.target.id;

    // Update formFrontend state with the selected option for the given questionKey
    setFormFrontend((prevForm: { [x: string]: any; }) => ({
      ...prevForm,
      [questionKey]: {
        ...prevForm[questionKey],
        selectedOption: selectedOption, // Update selectedOption for the question
      }
    }));
  };

  const renderQuestion = (
  formular: Formular,
  questionKey: keyof Formular,
) => {
  const questionData = formular[questionKey];
  const options = questionData.options;
  const lastNumberOfTheQuestionKey = (questionKey as string).substring((questionKey as string).length - 1);

  return (
    <div className="questionContainer p-4 mb-4 border border-gray-300 rounded-lg shadow-lg bg-white" key={questionKey} id={`${questionKey}`}>
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        {`${lastNumberOfTheQuestionKey}. Question:`}
      </label>
      <p className="mb-4 text-gray-800">{questionData.question}</p>
      <div className={`optionsContainer-${questionKey} space-y-2`}>
        {Object.entries(options).map(([key, text]) => (
          <div className="flex items-center space-x-2" key={key}>
            <input
              type="radio"
              name={`options-${questionKey}`}
              id={key}
              onChange={(e) => chooseRightAnswer(e, questionKey as string)}
              checked={formFrontend[questionKey]?.selectedOption === key}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={key} className="text-gray-700">{text}</label>
          </div>
        ))}
      </div>
    </div>
  );
  };
  
    
  // Function to render the entire form
  const renderFormular = (formular: Formular) => {
    const questionsOfForm = Object.keys(formular);
    return questionsOfForm.map((key) => renderQuestion(formular, key as keyof Formular));
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {

        // Fetch the form from the database // idk how to change this to make it cleaner
        const formFromDb: FormEntity = await readFormularWithId(idForm) as unknown as FormEntity;
        console.log(formFromDb)
        // Convert it to the format needed for the frontend
        const formFrontend = convertFormEntityToFormular(formFromDb);
        
        // Update the state with the fetched and converted form
        setFormFrontend(formFrontend);


      } catch (err) {
        // Handle errors (e.g., form not found)
        setError('Failed to load the form');
      } finally {
        setLoading(false);
      }
    };

    
    // Fetch the form only if an id is provided
    if (idForm) {
      
      console.log(idForm)
      fetchForm();
      _ws = new WebSocket('ws://localhost:3001');
   
    } else {
      setError('Form ID is missing');
      setLoading(false);
    }
  }, [idForm]);

  // Display a loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display an error message if something went wrong
  if (error) {
    return <div>{error}</div>;
  }

  // Once the form data is fetched and ready, render the Form component
  return formFrontend ? (
    <form onSubmit={(e) => sendMessage(e,formFrontend, _ws)}>
      {renderFormular(formFrontend)}
      <button
        type="submit"
        className="mt-3 ml-2 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
      Submit
      </button>
    </form>
  ) : null;
}

export default FormClient;

