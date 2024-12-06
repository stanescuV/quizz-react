import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {AnswersChart} from '../components/AnswersChart';

const HostPage = () => {
    // Destructure both parameters from useParams
    const { hostId, sessionId } = useParams<{ hostId: string; sessionId: string }>();

    const answerData = [
        { "question1": { "question": "Combien font 2 + 2 ?", "isCorrect": true, "selectedOption": "option4" } },
        { "question1": { "question": "Combien font 2 + 2 ?", "isCorrect": false, "selectedOption": "option2" } },
        { "question2": { "question": "Capital of France?", "isCorrect": true, "selectedOption": "option1" } }
      ];
    // Ref to hold the WebSocket instance
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Only connect if both ids are provided
        if (sessionId && hostId) {
            wsRef.current = new WebSocket('ws://localhost:3001');

            wsRef.current.onopen = () => {
                const adminObject = {
                    adminMessage: 'Admin has connected',
                    adminId: hostId,
                    adminSession: sessionId
                };

                const dataToSend = JSON.stringify(adminObject);
                wsRef.current?.send(dataToSend);
            };

            wsRef.current.onmessage = (event) => {
                //TODO: USE STATE THE CLIENTS ANSWERS 
                console.log("Message from server:", event.data);
            };
        }

        // Clean up WebSocket connection on component unmount
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                console.log("WebSocket connection closed");
            }
        };
    }, [sessionId, hostId]);

    

    return (
        <div>
            <h1>Host Page</h1>
            <p>Host ID: {hostId}</p>
            <p>Session ID: {sessionId}</p>
            <AnswersChart answersData={answerData} />
        </div>
    );
};

export default HostPage;
