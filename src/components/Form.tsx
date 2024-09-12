import React, { useState } from 'react';

function Form() {
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState({})
  const [selectedOption, setSelectedOption] = useState('');

  interface Option {
    text: string;
    isTrue: boolean;
    class: string;
  }
  
  interface Question {
    question: string;
    options: Option[];
  }
  
  interface Form {
    questions: Question[];
  }
  
  interface FormsData {
    forms: Form[];
  }
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setOption({...option, [e.target.className]: e.target.value})
    console.log(option)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Question:', question);
    console.log('Selected Option:', selectedOption);
    // You can handle form submission here
  };

 
  function chooseRightAnswer(e :any){
    setSelectedOption(e.target.className)
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input 
          type="text" 
          value={question} 
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
          <input type='radio' name="options"  className='Option-1'checked={selectedOption === 'Option-1'}  onClick={chooseRightAnswer}></input>

        </div>
        <div>
          <input 
            type="text"
            placeholder='option 2'
            id="option2" 
            className='Option-2'
            name="option" 
            
            onChange={handleOptionChange} 
          />
          <input type='radio' name="options" className='Option-2' checked={selectedOption === 'Option-2'} onClick={chooseRightAnswer}></input>
        </div>
        <div>
          <input 
            type="text" 
            id="option3" 
            placeholder='option 3'
            className='Option-3'
            name="option" 
             
            onChange={handleOptionChange} 
            
          />
          <input type='radio' name="options" className='Option-3'checked={selectedOption === 'Option-3'}onClick={chooseRightAnswer}></input>

        </div>
        <div>
          <input 
            type="text" 
            id="option4" 
            name="option" 
            placeholder='option 4'
            className='Option-4'
            onChange={handleOptionChange} 
          />
          <input type='radio' name="options" className='Option-4' checked={selectedOption === 'Option-4'} onClick={chooseRightAnswer}></input>

        </div>
      </div>
      <button>add option</button>
      <button>add form</button>
      <button type="submit" >Submit</button>
    </form>
  );
}

export default Form;
