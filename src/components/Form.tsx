import React, { useState } from 'react';

function Form() {

  // Interfaces

  interface Option {
    [key:string]: string; //dynamic key and inside the real text of the option
  }
  interface Question {
    question: string;
    options: Option;
    selectedOption: string; // the key of the correct answer
  }

  interface Formular {
    [key: string]: Question;
  }

  //The global form we are going to modify along the way 
  const [formular, setFormular] = useState<Formular>({
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
  });
 

  //modify the formular state
  const setTextQuestion = (formularKey: keyof Formular, text: string) => {
    setFormular(prevFormular => ({
      ...prevFormular, [formularKey]: {
        ...prevFormular[formularKey],
        question:text,
      }
    })) 
  }

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
  
  //jsx methods
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, formularKey: keyof Formular) => {
    setTextQuestion(formularKey, e.target.value);
  };

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formular);
  };


  const chooseRightAnswer = (e: React.ChangeEvent<HTMLInputElement>, formularKey: keyof Formular) => {
    const selectedOptionKey = e.target.id;
    setSelectedOption(formularKey, selectedOptionKey);
  };

  //render stuff on screen
  const renderQuestion = (questionKey: keyof Formular) => {
    const questionData = formular[questionKey];
    const options = questionData.options
    const selectedOption = questionData.selectedOption
    return (
      <div className="questionContainer" key={questionKey} id={`${questionKey}`}>
        <label>Question:</label>
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
                name="options"  
                id={key} 
                onChange={(e) => chooseRightAnswer(e, 'question1')}
                checked={selectedOption === `${key}`}
              />

            </div>
            ))}
        </div>
      <button key={questionKey} id={`${questionKey}`} onClick={handleAddOption} >add option</button>
      </div>
    )

  }

  const renderFormular = (formular: Formular) => {
    const questionsOfForm = Object.keys(formular);
    return questionsOfForm.map((key)=>renderQuestion(key))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{renderFormular(formular)}</div>
      <button>add form</button>
      <button type="submit" >Submit</button>
    </form>
  );
}


export default Form;
