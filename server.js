const WebSocket = require('ws');

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server started on port 8080');

// Store all connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Send welcome message
    ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to WebSocket server'
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data);

            // Relay the message to all connected clients
            console.log(`Relaying ${data.type} to ${clients.size} clients`);
            console.log('Data received:', JSON.stringify(data, null, 2));
            
            let relayMessage;
            if (data.type === 'button_click') {
                relayMessage = {
                    type: 'button_click',
                    buttonNumber: data.buttonNumber,
                    timestamp: new Date().toISOString()
                };
                console.log('Sending button click:', JSON.stringify(relayMessage, null, 2));
            } else if (data.type === 'state_change') {
                relayMessage = {
                    type: 'state_change',
                    state: data.state,
                    timestamp: new Date().toISOString()
                };
                console.log('Sending state change:', JSON.stringify(relayMessage, null, 2));
            }
            
            if (relayMessage) {
                clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        try {
                            client.send(JSON.stringify(relayMessage));
                            console.log(`Message sent to client successfully`);
                        } catch (error) {
                            console.error('Error sending message to client:', error);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('Shutting down WebSocket server...');
    wss.close();
    process.exit(0);
}); 