// Define the interface for options
interface OptionDB {
    isSelected: boolean;
    option1?: string;
    option2?: string;
}

// Define the interface for questions
interface QuestionDB {
    question: string;
    options: OptionDB[];
}

// Define the main interface for formEntity
interface FormEntity {
    host: string;
    name: string;
    questions: QuestionDB[];
}

// Create the formEntity object
const formEntity: FormEntity = {
    host: "",
    name: "",
    questions: [
        { question: "", options: [{ isSelected: false, option1: "" }] },
        { question: "", options: [{ isSelected: true, option2: "" }] }
    ],
};

export type { FormEntity, QuestionDB, OptionDB }; // Export the type
export { formEntity }; // Export the object
