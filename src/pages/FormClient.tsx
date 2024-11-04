import { useParams } from "react-router-dom";
import { convertFormEntityToFormular } from "../entities/convertEntities";
import { FormEntity } from "../entities/formDB";
import { readFormularWithId } from "../firebase/firestore";
import { useEffect, useState } from 'react';
import { Formular } from "../entities/form";
import { renderFormular } from "../renderLogic/renderForm";


//WS
let _ws: any; 

function FormClient() {
  // Get the id from the URL using useParams
  const { id } = useParams<{ id: string }>();
  const idForm = id || "";


  function sendMessage(message: object, ws: WebSocket) {
    if (ws.readyState === WebSocket.OPEN) {
      const dataToSend = JSON.stringify(message);
      ws.send(dataToSend);
    } else {
      console.log('WebSocket connection is not open');
    }
  }

  // State to manage form data, loading, and errors
  const [formFrontend, setFormFrontend] = useState<Formular | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{ [key: string]: string }>({});
  const chooseRightAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => {
    setSelectedOption({
      ...selectedOption,
      [questionKey]: e.target.id,
    });
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {

        // Fetch the form from the database // idk how to change this to make it cleaner
        const formFromDb: FormEntity = await readFormularWithId(idForm) as unknown as FormEntity;

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
      fetchForm();
      _ws = new WebSocket('ws://localhost:3001');
      console.log(_ws)
   
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
    <form>
      {renderFormular(formFrontend, chooseRightAnswer, selectedOption)}
      <button
        onClick={()=>{sendMessage(formFrontend, _ws)}}
        type="button"
        className="mt-3 ml-2 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
      Submit
      </button>
    </form>
  ) : null;
}

export default FormClient;

