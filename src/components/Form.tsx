import React, { useState } from 'react';

// Interfaces
interface Option {
  text: string;
  isTrue: boolean;
  className: string; // renamed 'class' to 'className' to avoid reserved keyword conflict
}

interface Question {
  question: string;
  options: Option[];
  selectedOption: string;
}

interface Formular {
  [key: string]: Question; // dynamic question keys
}

function FormComponent() {
  // State for the entire form
  const [formular, setFormular] = useState<Formular>({
    question1: {
      question: "",
      options: [
        { text: "", isTrue: false, className: "Option-1" },
        { text: "", isTrue: false, className: "Option-2" },
        { text: "", isTrue: false, className: "Option-3" },
        { text: "", isTrue: false, className: "Option-4" },
      ],
      selectedOption: ""
    }
  });

  // Event Handlers
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => {
    setFormular(prev => ({
      ...prev,
      [questionKey]: { 
        ...prev[questionKey], 
        question: e.target.value 
      }
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, questionKey: string, optionIndex: number) => {
    const updatedOptions = formular[questionKey].options.map((option, index) => {
      if (index === optionIndex) {
        return { ...option, text: e.target.value };
      }
      return option;
    });

    setFormular(prev => ({
      ...prev,
      [questionKey]: {
        ...prev[questionKey],
        options: updatedOptions
      }
    }));
  };

  const chooseRightAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => {
    setFormular(prev => ({
      ...prev,
      [questionKey]: {
        ...prev[questionKey],
        selectedOption: e.target.id
      }
    }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formular:', formular);
  };

  // Dynamic question and option rendering
  const renderQuestion = (questionKey: string) => {
    const questionData = formular[questionKey];
    return (
      <div key={questionKey}>
        <label>Question:</label>
        <input
          type="text"
          value={questionData.question}
          onChange={(e) => handleQuestionChange(e, questionKey)}
          placeholder="Enter your question here"
        />
        <div className="options">
          {questionData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(e, questionKey, index)}
              />
              <input
                type="radio"
                name={`options-${questionKey}`}
                id={`Option-${index + 1}`}
                checked={questionData.selectedOption === `Option-${index + 1}`}
                onChange={(e) => chooseRightAnswer(e, questionKey)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='questionContainer'>
        {Object.keys(formular).map((key) => renderQuestion(key))}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default FormComponent;
