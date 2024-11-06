import React, {useState} from 'react';
import { convertFormularToFormEntity } from '../entities/convertEntities';
import { useAuth} from '../firebase/authContext';
import { Formular } from '../entities/form';
import { addFormDb, readFormularWithId } from '../firebase/firestore';
import { testEverything } from '../tests/testForm';
import QRCodeGenerator from './QRCode';
// import { useNavigate } from 'react-router-dom';

function Form({ document }: { document: Formular }) {
  
  
  //User
  const {currentUser} = useAuth();
  
  //react router
  // const navigate = useNavigate();


  //Default input 
  const defaultInput = {
    question1: {
      question: "",
      options: {
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
      selectedOption: ""
    }
  }

  const dynamicDefaultInput = (newFormularKey : keyof Formular) => {
    return {
      [newFormularKey]: {
        question: "",
        options: {
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        },
        selectedOption: ""
      }}
  }

  //The global form we are going to modify along the way 
  const [formular, setFormular] = useState<Formular>(defaultInput);
  const [questionToDelete, setQuestionToDelete] = useState("");
  const [formName, setFormName] = useState("");
  const [idForm, setIdForm] = useState("");

  
  //modify the formular state
  const setTextQuestion = (formularKey: keyof Formular, text: string) => {
    setFormular(prevFormular => ({
      ...prevFormular, [formularKey]: {
        ...prevFormular[formularKey],
        question:text,
      }
    })) 
  }

  const addQuestion = () => {
    setFormular((prevFormular) => {
      const currentQuestions = Object.keys(prevFormular); 
      const questionCount = currentQuestions.length;
      const newQuestionKey = `question${questionCount + 1}`;
  
      return {
        ...prevFormular, 
        ...dynamicDefaultInput(newQuestionKey as keyof Formular)  
      };
    });
  };
  
  const setTextOption = (formularKey: keyof Formular, text: string, optionKey: string)=> {
    setFormular(prevFormular => ({
      ...prevFormular, [formularKey]:{
        ...prevFormular[formularKey],
        options:{...prevFormular[formularKey].options, [optionKey]: text}
      }
    }))
  }

  const setSelectedOption = (formularKey: keyof Formular, text: string) => {
    setFormular(prevFormular => ({
      ...prevFormular, [formularKey]:{
        ...prevFormular[formularKey],
        selectedOption : text,
      }
    }))
  }

  const addOption = (formularKey: keyof Formular) => {
    setFormular((prevFormular) => {
      const currentOptions = prevFormular[formularKey].options;
      const optionCount = Object.keys(currentOptions).length;
      const newOptionKey = `option${optionCount + 1}`;
  
      return {
        ...prevFormular,
        [formularKey]: {
          ...prevFormular[formularKey],
          options: {
            ...currentOptions,
            [newOptionKey]: "", // Add new option with an empty string as a placeholder
          },
        },
      };
    });
  };

  const deleteOption = (formularKey: keyof Formular) => {
    setFormular((prevFormular) => {
      const currentOptions = { ...prevFormular[formularKey].options };
      const optionKeys = Object.keys(currentOptions);
      
      if (optionKeys.length === 0) return prevFormular; 
  
      const lastOptionKey = `option${optionKeys.length}`;
      
      if(lastOptionKey === formular[formularKey].selectedOption){
        setSelectedOption(formularKey, "")
      }
      
      // Remove the last option
      delete currentOptions[lastOptionKey];

      
  
      return {
        ...prevFormular,
        [formularKey]: {
          ...prevFormular[formularKey],
          options: currentOptions, // Return updated options without the deleted one
        },
      };
    });
  };
  
  const deleteQuestion = (stringWithQuestionNumbers: string) => {

    const deleteQuestion = (number: number) => {
      setFormular((prevFormular) => {
        // Create a shallow copy of the previous formular object
        const newFormular = { ...prevFormular };
    
        // Find the key (e.g., 'question1', 'question2', etc.) to delete
        const questionKey = `question${number}`;
        
        // Delete the key from the new copy
        delete newFormular[questionKey];
  
        return newFormular;
      });
    };

    const arrayStrings = stringWithQuestionNumbers.split(",");
    const numberArray = arrayStrings.map(item => Number(item.trim()));

    numberArray.map((number) => deleteQuestion(number));
  }

  //jsx methods
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, formularKey: keyof Formular) => {
    setTextQuestion(formularKey, e.target.value);
  };

  const handleDeleteQuestion = () => {
    deleteQuestion(questionToDelete);
    setQuestionToDelete("")
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, formularKey: keyof Formular) => {
    const optionKey = e.target.name; 
    setTextOption(formularKey, e.target.value, optionKey);
  };

  const handleAddOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget; // Access the current button element
    const questionKey = button.getAttribute("data-key"); // Retrieve data-key attribute
  
    if (questionKey && Object.keys(formular).includes(questionKey)) {
      addOption(questionKey as keyof Formular); // Add option for the specific question key
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!testEverything(formular)) {
      return window.alert("The form is not completed correctly.");
    } 

    const uid = currentUser?.uid;
    if (uid) {
      const dbForm = convertFormularToFormEntity(formular, formName, uid);

      // www.quizzReact.com/form/?id 
      const urlForm = `/form/${(await addFormDb(dbForm)) as string}`  // Save form data to the database
      setIdForm("http://localhost:5173" + urlForm);
      // navigate(urlForm);

      console.log("Form submitted:", dbForm);
    } else {
      window.alert("User ID is missing.");
    }
  };
  
  const chooseRightAnswer = (e: React.ChangeEvent<HTMLInputElement>, formularKey: keyof Formular) => {
    const selectedOptionKey = e.target.id;
    setSelectedOption(formularKey, selectedOptionKey);
  };

  const reinitializeForm = () => {
    setFormular(defaultInput);
  }

  //render stuff on screen
  const renderQuestion = (questionKey: keyof Formular) => {

    const questionData = formular[questionKey];
    const options = questionData.options;
    const selectedOption = questionData.selectedOption;
    const lastNumberOfTheQuestionKey = (questionKey as string).substring((questionKey as string).length - 1);

    return (
      <div
      className="questionContainer p-4 mb-4 border rounded-lg shadow-lg bg-white"
      key={questionKey}
      id={`${questionKey}`}
      >
      <label className="block text-lg font-semibold mb-2 text-gray-700">
      {`${lastNumberOfTheQuestionKey}.`} Question:
      </label>
      <input
         type="text"
         value={questionData.question}
         onChange={(e) => handleQuestionChange(e, questionKey)}
      placeholder="Enter your question here"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className={`optionsContainer-${questionKey} mt-4 space-y-2`}>
         {Object.entries(options).map(([key, text]) => (
         <div className="flex items-center space-x-2" key={key}>
            <input
               type="text"
               name={key}
               placeholder={`${text}`}
               value={text}
               onChange={(e) => handleOptionChange(e, questionKey)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
               type="radio"
               name={`options-${questionKey}`}
               id={key}
               onChange={(e) => chooseRightAnswer(e, questionKey)}
            checked={selectedOption === key}
            className="text-blue-600 focus:ring-blue-500"
            />
         </div>
         ))}
      </div>
      <div className="flex space-x-2 mt-4">
         <button
         type="button"
         id={`${questionKey} +`}
         data-key={questionKey}
         onClick={handleAddOption}
         className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
         >
         +
         </button>
         <button
            type="button"
            onClick={() => deleteOption(questionKey)}
         className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
         >
         -
         </button>
      </div>
   </div>
    )

  }

  const renderFormular = (formular: Formular) => {
    const questionsOfForm = Object.keys(formular);
    return questionsOfForm.map((key)=>renderQuestion(key))
  }

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white space-y-4">
   {/* Form Name Input */}
   <div className="flex items-center space-x-3">
      <label className="text-lg font-semibold text-gray-700">Form Name</label>
      <input
         type="text"
         value={formName}
         onChange={(e) => setFormName(e.target.value)}
      placeholder="Math Form, Fun form, quiz..."
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
   </div>
   {/* Conditional Form Display */}
   {!idForm && (
   <form onSubmit={handleSubmit} className="space-y-4">
      {/* Render Form Content */}
      <div>
         {document && renderFormular(document)}
         {Object.keys(document).length === 0 && renderFormular(formular)}
      </div>
      {/* Form Action Buttons */}
      <div className="flex flex-wrap space-x-3">
         <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
         Add Form
         </button>
         <button
            type="button"
            onClick={reinitializeForm}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
         Reinitialize Form
         </button>
         <button
            type="button"
            onClick={() => readFormularWithId('CGHYfpmb3KkfoeaYs226')}
         className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
         TEST
         </button>
      </div>
      {/* Delete Question Section */}
      <div className="flex items-center space-x-3">
         <input
            type="text"
            value={questionToDelete}
            onChange={(e) => setQuestionToDelete(e.target.value)}
         placeholder="Ex: 1, 2, 4..."
         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
         />
         <button
            type="button"
            onClick={handleDeleteQuestion}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
         Delete Question
         </button>
      </div>
      {/* Submit Button */}
      <button
         type="submit"
         className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
         >
      Submit
      </button>
   </form>
   )}
   {/* QR Code Display */}
   {idForm && (
   <div className="flex justify-center mt-4">
      {QRCodeGenerator(idForm)}
   </div>
   )}
</div>
  );
}

export default Form;

