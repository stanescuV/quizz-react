import { FormEntity, OptionDB, QuestionDB } from "./formDB";
import { Formular } from "./form";

//this converts the formular from the frontend entity into the DB entity
function convertFormularToFormEntity(formular: Formular, name: string, host: string): FormEntity {
    const questions: QuestionDB[] = Object.values(formular).map((q) => {
        const options: OptionDB[] = Object.keys(q.options).map((key) => ({
            isSelected: key === q.selectedOption,
            [key]: q.options[key], // You can choose to set option1 or option2 dynamically here
        }));

        return {
            question: q.question,
            options: options,
        };
    });

    return {
        host,
        name, 
        questions,
    };
} 

function convertFormEntityToFormular(form: FormEntity): Formular {
    console.log(form);
    const questions = Object.values(form.questions);

    const formular: Formular = {};

    questions.forEach((questionData, index) => {
        let optionsForm: { [key: string]: string } = {};
        let selectedOption = "";

        // Iterate over each option to reconstruct the options and identify the selected one
        questionData.options.forEach((option) => {
            // Extract the actual key-value pair for the option 
            const [key, value] = Object.entries(option).find(([k]) => k !== 'isSelected')!;
            optionsForm[key] = value;

            // Check if this option is the selected one
            if (option.isSelected) {
                selectedOption = key;
            }
        }); 

        // Rebuild the question object for the frontend structure
        formular[`question${index + 1}`] = {
        question: questionData.question,
        options: optionsForm,
        selectedOption: selectedOption
        };
    });

    return formular;
}
  

  export  {convertFormularToFormEntity, convertFormEntityToFormular}
  