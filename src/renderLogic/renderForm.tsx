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
            <div className="questionContainer" key={questionKey} id={`${questionKey}`}>
                <label>{`${lastNumberOfTheQuestionKey}. Question:`}</label>
                <p>{questionData.question}</p>
                <div className={`optionsContainer-${questionKey}`}>
                {Object.entries(options).map(([key, text]) => (
                    <div key={key}>
                    <p>{text}</p>
                    <input
                        type="radio"
                        name={`options-${questionKey}`}
                        id={key}
                        onChange={(e) => chooseRightAnswer(e, questionKey as string)}
                        checked={selectedOption[questionKey as string] === key} 
                    />
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