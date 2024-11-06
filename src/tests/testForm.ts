import { Formular } from "../entities/form";




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


const tests = [testSelectedOption, testIfOptionEmpty, testIfQuestionEmpty];

const testEverything = (formular: Formular) => {
    return tests.every((test)=>{
        if(!test(formular)) {
            console.log(`${test.name} did not work!` );
            return false;
        }
        
        
        return true;
    })
    
   
}



export  {testEverything}