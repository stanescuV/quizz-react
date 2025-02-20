import { FormEntity, OptionDB, QuestionDB } from "./formDB";
import { Formular } from "./form";

//this converts the formular from the frontend entity into the DB entity
function convertFormularToFormEntity(
    formular: Formular,
    name: string,
    host: string,
    id: string = ""
): FormEntity {
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
        id,
    };
}

function convertFormEntityToFormular(form: FormEntity): Formular {
    const questions = Object.values(form.questions);

    const formular: Formular = {};

    questions.forEach((questionData, index) => {
        let optionsForm: { [key: string]: string } = {};
        let correctOption = "";

        // iterate over each option to reconstruct the options and identify the selected one
        questionData.options.forEach((option) => {

            const [key, value] = Object.entries(option).find(
                ([k]) => k !== "isSelected"
            )!; // ! shows that we re 100% sure this wont fail, maybe it's not the good idea to keep it but i'll keep it for the moment

            if (option.isSelected) {
                correctOption = key;
            }

            optionsForm[key] = value;
        });

        // rebuild the question object for the frontend structure
        formular[`question${index + 1}`] = {
            question: questionData.question,
            options: optionsForm,
            selectedOption: correctOption,
        };
    });

    return formular;
}

function convertFormEntityToFormularWithNoAnswersChecked(form: FormEntity): Formular {
    const questions = Object.values(form.questions);

    const formular: Formular = {};

    questions.forEach((questionData, index) => {
        let optionsForm: { [key: string]: string } = {};
        let correctOption = "";

        // iterate over each option to reconstruct the options and identify the selected one
        questionData.options.forEach((option) => {

            const [key, value] = Object.entries(option).find(
                ([k]) => k !== "isSelected"
            )!; // ! shows that we re 100% sure this wont fail, maybe it's not the good idea to keep it but i'll keep it for the moment

            if (option.isSelected) {
                correctOption = key;
            }

            optionsForm[key] = value;
        });

        // rebuild the question object for the frontend structure
        formular[`question${index + 1}`] = {
            question: questionData.question,
            options: optionsForm,
            selectedOption: "",
        };
    });

    return formular;
}



export { convertFormularToFormEntity, convertFormEntityToFormular, convertFormEntityToFormularWithNoAnswersChecked };
