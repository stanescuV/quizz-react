// Function to convert Formular to FormEntity
function convertFormularToFormEntity(formular , name, host) {
    const questions = Object.values(formular).map((q) => {
        const options = Object.keys(q.options).map((key) => ({
            isSelected: key === q.selectedOption,
            [key]: q.options[key], 
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

// Example usage
const formular = {
    question1: {
        question: "What is your favorite color?",
        options: {
            option1: "Red",
            option2: "Blue",
            option3: "Green",
            option4: "Yellow",
        },
        selectedOption: "option2",
    },
    question2: {
        question: "What is your favorite colour?",
        options: {
            option1: "Red",
            option2: "Blue",
            option3: "Green",
            option4: "Yellow",
        },
        selectedOption: "option2",
    }
};

const name = "Sample Form";
const host = "localhost";

const formEntity = convertFormularToFormEntity(formular, name, host);
console.log(formEntity);