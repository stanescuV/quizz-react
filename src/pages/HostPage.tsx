import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnswersChart } from '../components/AnswersChart';
import {
  readSessionWithIdReturnsAnswers,
  
  readSessionUUIDWith8DigitCode
} from '../firebase/firestore';
import { DigitsCodeEntity } from '../entities/digitsCodeEntity';

const HostPage = () => {
  const { hostId, sessionId } = useParams<{
    hostId: string;
    sessionId: string;
  }>();

  const [idSession, setIdSession] = useState(sessionId || '');
  const [answerData, setAnswerData] = useState<Array<any>>([]);
  const wsRef = useRef<WebSocket | null>(null);

  async function getSessionUUIDUsing8DigitsCode(digitsCode: string) {
    const sessionUUID: String =
      ((await readSessionUUIDWith8DigitCode(digitsCode)) as DigitsCodeEntity)
        .sessionID || '';
    return sessionUUID;
  }

  useEffect(() => {
    if (sessionId && hostId) {

      getSessionUUIDUsing8DigitsCode(idSession).then((uuidString) => {
        const uuid = uuidString.toString();
        wsRef.current = new WebSocket('ws://localhost:3001');

        wsRef.current.onopen = () => {
          const adminObject = {
            adminMessage: 'Admin has connected',
            adminId: hostId,
            adminSession: uuid,
            type: 'AdminMessage'
          };

          // Initial data fetch
          readSessionWithIdReturnsAnswers(uuid).then((answers) => {
            console.log('Initial answers fetched:', answers);
            setAnswerData([...answers]);
          });

          const dataToSend = JSON.stringify(adminObject);

          wsRef.current?.send(dataToSend);
        };

        wsRef.current.onmessage = async (event) => {
          console.log('WebSocket message received:', event.data);

          // Fetch updated answers
          const answers = await readSessionWithIdReturnsAnswers(uuid);
          console.log('Updated answers fetched:', answers);

          // Trigger state update
          setAnswerData([...answers]);
        };

        setIdSession(uuid);
      });
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket connection closed');
      }
    };
  }, []);

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
