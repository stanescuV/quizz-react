import { useParams } from "react-router-dom";
import {  convertFormEntityToFormularWithNoAnswersChecked } from "../entities/convertEntities";
import { FormEntity } from "../entities/formDB";
import { readFormularWithSessionId } from "../firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Formular } from "../entities/form";
import { v4 as uuidv4 } from "uuid";

//WS
let _ws: any;
//TODO: Flow in formular, After submit, Raspuns corect / Raspuns gresit POP UP
function FormClient() {
    // Get the id from the URL using useParams
    const { id } = useParams<{ id: string }>();
    const idSession = id || "";
    const cookie = useRef<string>("");

    function convertFormFrontendIntoFormCookies(form: any) {
        let newFormCookies: { [key: string]: any } = { id: form.id };

        for (let key in form) {
            if (key !== "id" && form[key].selectedOption !== "") {
                // Use bracket notation to dynamically set the property name
                newFormCookies[key] = form[key].selectedOption;
            }
        }
        console.log(newFormCookies);

        return newFormCookies;
    }

    function checkOrSetUUID() {
        const key = idSession; // Change this to your app's specific key

        // Function to get the value of a cookie by name
        function getCookie(name: string) {
            const match = document.cookie.match(
                new RegExp("(^| )" + name + "=([^;]+)")
            );
            return match ? decodeURIComponent(match[2]) : "";
        }

        // Function to set a cookie with name, value, and optional attributes
        function setCookie(name: string, value: string, days: number) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie =
                name + "=" + encodeURIComponent(value) + expires + "; path=/";
        }

        cookie.current = getCookie(key);

        if (cookie.current === "") {
            let uuid = uuidv4();
            setCookie(key, uuid, 365);

            //the cookie that we will send to server
            cookie.current = getCookie(key);
            window.alert(`UUID created and stored in cookies: ${cookie}`);
        } else {
            window.alert(
                `UUID created and stored in cookies: ${cookie.current}`
            );
        }

        return cookie.current;
    }

    useEffect(() => {
        cookie.current = checkOrSetUUID();
    }, [idSession]);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Fetch the form from the database // idk how to change this to make it cleaner
                const formFromDb: FormEntity = (await readFormularWithSessionId(
                    idSession
                )) as unknown as FormEntity;
                // Convert it to the format needed for the frontend
                const formFrontend = convertFormEntityToFormularWithNoAnswersChecked(formFromDb);


                Object.entries(formFrontend);
                // Update the state with the fetched and converted form
                setFormFrontend(formFrontend);
            } catch (err) {
                // Handle errors (e.g., form not found)
                setError("Failed to load the form");
            } finally {
                setLoading(false);
            }
        };

        // Fetch the form only if an id is provided
        if (idSession) {
            console.log(idSession);
            fetchForm();

            //configure WS
            _ws = new WebSocket("ws://localhost:3001");

            _ws.onmessage = (event: MessageEvent) => {
                // Log the received message to the console
                window.alert(`Message from server:${event.data}`);
            };
        } else {
            setError("Form ID is missing");
            setLoading(false);
        }
    }, [idSession]);

    // WS functions

    function sendMessage(message: any, ws: WebSocket) {
        if (ws.readyState === WebSocket.OPEN) {
            message.id = idSession;
            const formCookie = convertFormFrontendIntoFormCookies(message);
            console.log(formCookie);
            if (cookie) {
                const formDbCookie = { [cookie.current]: formCookie };
                message.formDbCookie = formDbCookie;
            }

            console.log("this is cookie : ", cookie);

            const dataToSend = JSON.stringify(message);
            console.log(dataToSend);
            ws.send(dataToSend);
        } else {
            //TODO: SEND AN ERROR TO CLIENT
            console.log("WebSocket connection is not open");
        }
    }

    // State to manage form data, loading, and errors
    const [formFrontend, setFormFrontend] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const chooseRightAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        questionKey: string
    ) => {
        const selectedOption = e.target.id;

        // Update formFrontend state with the selected option for the given questionKey
        setFormFrontend((prevForm: { [x: string]: any }) => ({
            ...prevForm,
            [questionKey]: {
                ...prevForm[questionKey],
                selectedOption: selectedOption, // Update selectedOption for the question
            },
        }));
    };

    const renderQuestion = (
        formular: Formular,
        questionKey: keyof Formular
    ) => {
        const questionData = formular[questionKey];
        const options = questionData.options;
        const lastNumberOfTheQuestionKey = (questionKey as string).substring(
            (questionKey as string).length - 1
        );

        return (
            <div
                className="questionContainer p-4 mb-4 border border-gray-300 rounded-lg shadow-lg bg-white"
                key={questionKey}
                id={`${questionKey}`}
            >
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                    {`${lastNumberOfTheQuestionKey}. Question:`}
                </label>
                <p className="mb-4 text-gray-800">{questionData.question}</p>
                <div className={`optionsContainer-${questionKey} space-y-2`}>
                    {Object.entries(options).map(([key, text]) => (
                        <div className="flex items-center space-x-2" key={key}>
                            <input
                                type="radio"
                                name={`options-${questionKey}`}
                                id={key}
                                onChange={(e) =>
                                    chooseRightAnswer(e, questionKey as string)
                                }
                                checked={
                                    formFrontend[questionKey]
                                        ?.selectedOption === key
                                }
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={key} className="text-gray-700">
                                {text}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Function to render the entire form
    const renderFormular = (formular: Formular) => {
        const questionsOfForm = Object.keys(formular);
        return questionsOfForm.map((key) =>
            renderQuestion(formular, key as keyof Formular)
        );
    };

    // Display a loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display an error message if something went wrong
    if (error) {
        return <div>{error}</div>;
    }

    // Once the form data is fetched and ready, render the Form component
    return formFrontend ? (
        <form>
            {renderFormular(formFrontend)}
            <button
                onClick={() => {
                    sendMessage(formFrontend, _ws);
                    convertFormFrontendIntoFormCookies(formFrontend);
                }}
                type="button"
                className="mt-3 ml-2 p-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Submit
            </button>
        </form>
    ) : null;
}

export default FormClient;
