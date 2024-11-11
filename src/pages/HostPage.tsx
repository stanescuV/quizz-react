import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const HostPage = () => {
    // Destructure both parameters from useParams
    const { hostId, formId } = useParams<{ hostId: string; formId: string }>();

    // Ref to hold the WebSocket instance
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Only connect if both ids are provided
        if (formId && hostId) {
            wsRef.current = new WebSocket('ws://localhost:3001');

            wsRef.current.onopen = () => {
                const adminObject = {
                    adminMessage: 'Admin has connected',
                    adminId: hostId,
                    adminForm: formId
                };

                const dataToSend = JSON.stringify(adminObject);
                wsRef.current?.send(dataToSend);
            };

            wsRef.current.onmessage = (event) => {
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
    }, [formId, hostId]);

    return (
        <div>
            <h1>Host Page</h1>
            <p>Host ID: {hostId}</p>
            <p>Form ID: {formId}</p>
        </div>
    );
};

export default HostPage;
