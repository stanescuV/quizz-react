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

  const [formular, setFormular] = useState<Formular>({
    question1: {
      question: "",
      options: {
        option1: "Option 1 Text",
        option2: "Option 2 Text",
        option3: "Option 3 Text",
        option4: "Option 4 Text",
      },
      selectedOption: ""
    }
  });
 
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

 
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };

 
  function chooseRightAnswer(e :any){
    
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input 
          type="text" 
          onChange={handleQuestionChange} 
          placeholder="Enter your question here" 
        />
      </div>
      <div>
        <div>
          <input 
            type="text" 
            placeholder='option 1'
            id="option1" 
            name="option"
            className='Option-1'  
            onChange={handleOptionChange} 
          />
          <input type='radio' name="options"  className='Option-1' onChange={chooseRightAnswer}></input>

        </div>
      </div>
      <button onChange={verification}>add option</button>
      <button>add form</button>
      <button type="submit" >Submit</button>
    </form>
  );
}

export default Form;
