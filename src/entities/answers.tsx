interface Answer {
    [key:string] : {
        isCorrect: boolean; //true
        question: string; // how much is 2 + 2 ? 
        selectedOption: string // option1
    }
}

export type { Answer };