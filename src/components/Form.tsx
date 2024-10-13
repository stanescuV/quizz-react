import React, {useState} from 'react';
import type { FormEntity, QuestionDB, OptionDB } from '../entities/formDB';
import { useAuth} from '../firebase/authContext';
import { Formular } from '../entities/form';
import { addFormDb } from '../firebase/firestore';
import { testEverything } from '../tests/testForm';
import QRCodeGenerator from './QRCode';

function Form() {
  //User
  const {currentUser} = useAuth();

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

  
  // n2 // de modificat sa fie mai clara
  //this converts the formular from the frontend entity into the DB entity
  function convertFormularToFormEntity(formular: Formular, name: string, host: string): FormEntity {
    const questions: QuestionDB[] = Object.values(formular).map((q) => {
        const options: OptionDB[] = Object.keys(q.options).map((key) => ({
          isSelected: key === q.selectedOption,
          [key]: q.options[key], // You can choose to set option1 or option2 dynamically here
        }));

        return {
          question: q.question,
          options: options,
        };
    });

    return {
      host,
      name,
      questions,
    };
} 
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
            [newOptionKey]: "",  
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
    const button = e.target as HTMLButtonElement;  
    const questionKey = button.id; 
  
    if (Object.keys(formular).includes(questionKey)) {
      addOption(questionKey as keyof Formular);  
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
      setIdForm((await addFormDb(dbForm)) as string);  // Save form data to the database

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
      <div className="questionContainer" key={questionKey} id={`${questionKey}`}>
        <label>{`${lastNumberOfTheQuestionKey}. `}Question:</label>
        <input 
          type="text"
          value={questionData.question} 
          onChange={(e) =>handleQuestionChange(e, questionKey)} 
          placeholder="Enter your question here" 
        />
        <div className={`optionsContainer-${questionKey}`}>
          {Object.entries(options).map(([key, text]) => (
            <div key={key}>
              <input
                type="text"
                name={key}
                placeholder={`${text}`}
                value={text}
                onChange={(e) => handleOptionChange(e, questionKey)}
              />
              <input 
                type='radio' 
                name={`options-${questionKey}`}  
                id={key} 
                onChange={(e) => chooseRightAnswer(e, questionKey)}
                checked={selectedOption === key}
              />
            </div>
            ))}
        </div>
        <button type="button" key={`${questionKey} +` } id={`${questionKey}`} onClick={handleAddOption} >+</button>
        <button type="button" key={`${questionKey} -` } onClick={() => deleteOption(questionKey)} >-</button>
      </div>
    )

  }

  const renderFormular = (formular: Formular) => {
    const questionsOfForm = Object.keys(formular);
    return questionsOfForm.map((key)=>renderQuestion(key))
  }

  // de facut functie de verificat formular pentru submit
  return (
    <div>
      <label style={{marginRight:"10px"}}>Form Name</label>
      <input  type="text"
            value={formName} 
            onChange={(e) =>setFormName(e.target.value)} 
            placeholder="Math Form, Fun form, quizz..."></input>
      <form onSubmit={handleSubmit}>
        <div>{renderFormular(formular)}</div>
        <button type="button" onClick={addQuestion}>add form</button>
        <button type="button" onClick={reinitializeForm}> Reinitialize Form</button>
        <input 
            type="text"
            value={questionToDelete} 
            onChange={(e) =>setQuestionToDelete(e.target.value)} 
            placeholder="Ex: 1, 2, 4..." 
            />
        <button type="button" onClick={handleDeleteQuestion}>Delete Question</button>
        <button type="submit" >Submit</button>
      </form>

      {idForm && QRCodeGenerator(idForm) }
    </div>
  );
}


export default Form;
