//This is the frontend form 
//It was easier to write it this way and than change it to formDB when
// we insert it in the db 


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

export type { Option, Question, Formular };