import { useEffect } from 'react';

const WebSocketClient = () => {
    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('ws://localhost:5000');

        ws.onopen = () => {
            console.log('WebSocket connection established');
            // Optionally send a message to the server
            ws.send(JSON.stringify({ message: 'Hello from client' }));
        };

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Clean up WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);

    return null; // This component does not render anything
};

export default WebSocketClient;
