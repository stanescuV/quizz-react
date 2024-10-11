import { Formular } from "../entities/form";

const testEverything = (formular: Formular, formName: string) => {
    if( testIfNameEmpty(formName) && testSelectedOption(formular)&& testIfOptionEmpty(formular)&& testIfQuestionEmpty(formular)) {
        console.log("tests passed ! ");
        return true;
    }
    
    return false;
   
}

//test if there is a question with no selected option
const testSelectedOption = (formular: Formular) => {
    const questions = Object.keys(formular);

    return questions.every((questionKey) => {
        return formular[questionKey].selectedOption !== "";
       
    });
  };


const testIfOptionEmpty = (formular: Formular) => {
    const questions = Object.keys(formular);
    return questions.every((questionKey) => {
        const options = formular[questionKey].options; 
        return Object.values(options).every((option) => {
            return option !== "";  
        });
    });
};


const testIfQuestionEmpty = (formular: Formular) => {
    const questions = Object.keys(formular);
    return questions.every((questionKey) => {
        return formular[questionKey].question !== "";
        
    })
}
  

const testIfNameEmpty = (formName: string) => {
    if(formName !== ""){
        return true
    };

    return false; 

}




export  {testEverything}