import { Formular } from "../entities/form";

  interface Props {
    formular: Formular;
    chooseRightAnswer: (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => void;
    selectedOption: { [key: string]: string };
  }
  
  // Function to render a single question
  const renderQuestion = (
    formular: Formular,
    questionKey: keyof Formular,
    chooseRightAnswer: (e: React.ChangeEvent<HTMLInputElement>, questionKey: string) => void,
    selectedOption: { [key: string]: string }
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
                checked={selectedOption[questionKey as string] === key}
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
  const renderFormular = (formular: Formular, chooseRightAnswer: Props['chooseRightAnswer'], selectedOption: Props['selectedOption']) => {
    const questionsOfForm = Object.keys(formular);
    return questionsOfForm.map((key) => renderQuestion(formular, key as keyof Formular, chooseRightAnswer, selectedOption));
  };
  
export {renderFormular}