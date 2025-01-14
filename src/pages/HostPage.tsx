import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswersChart } from "../components/AnswersChart";
import { readSessionWithIdReturnsAnswers } from "../firebase/firestore";

const HostPage = () => {
    const { hostId, sessionId } = useParams<{
        hostId: string;
        sessionId: string;
    }>();
    const [answerData, setAnswerData] = useState<Array<any>>([]);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (sessionId && hostId) {
            wsRef.current = new WebSocket("ws://localhost:3001");

            wsRef.current.onopen = () => {
                const adminObject = {
                    adminMessage: "Admin has connected",
                    adminId: hostId,
                    adminSession: sessionId,
                };

                // Initial data fetch
                readSessionWithIdReturnsAnswers(sessionId).then((answers) => {
                    console.log("Initial answers fetched:", answers);
                    setAnswerData([...answers]);
                });

                const dataToSend = JSON.stringify(adminObject);
                wsRef.current?.send(dataToSend);
            };

            wsRef.current.onmessage = async (event) => {
                console.log("WebSocket message received:", event.data);

                // Fetch updated answers
                const answers = await readSessionWithIdReturnsAnswers(sessionId);
                console.log("Updated answers fetched:", answers);

                // Trigger state update
                setAnswerData([...answers]);
            };
        }

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

            {answerData.length > 0 && <AnswersChart answersData={answerData} />}
        </div>
    );
};

export default HostPage;
