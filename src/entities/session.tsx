import { Answer } from "./answers";

interface Session {
    idForm: string; 
    date: string; // I keep the date in string cause firestore does the work for me 
    answers: [Answer] | [];
  } 

export type { Session };