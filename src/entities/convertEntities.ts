import { FormEntity, OptionDB, QuestionDB } from "./formDB";
import { Formular } from "./form";

// This converts the formular from the frontend entity into the DB entity
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
            )!; // confident this won't fail

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

        // iterate over each option to reconstruct the options (but don't retain selection)
        questionData.options.forEach((option) => {
            const [key, value] = Object.entries(option).find(
                ([k]) => k !== "isSelected"
            )!; // confident this won't fail

            optionsForm[key] = value;
        });

        formular[`question${index + 1}`] = {
            question: questionData.question,
            options: optionsForm,
            selectedOption: "", // explicitly no answer selected
        };
    });

    return formular;
}

export {
    convertFormularToFormEntity,
    convertFormEntityToFormular,
    convertFormEntityToFormularWithNoAnswersChecked
};
