const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
    let filePath = '';
    
    // Route handling
    if (req.url === '/') {
        filePath = path.join(__dirname, 'landing.html');
    } else if (req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/player.html') {
        filePath = path.join(__dirname, 'player.html');
    } else if (req.url === '/visual.html') {
        filePath = path.join(__dirname, 'visual.html');
    } else {
        // Default to landing page
        filePath = path.join(__dirname, 'landing.html');
    }
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }
        
        // Set appropriate content type
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        
        if (ext === '.js') {
            contentType = 'text/javascript';
        } else if (ext === '.css') {
            contentType = 'text/css';
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

// Create WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Available routes:`);
    console.log(`- http://localhost:${PORT}/ (landing page)`);
    console.log(`- http://localhost:${PORT}/index.html (controller)`);
    console.log(`- http://localhost:${PORT}/player.html (dashboard)`);
    console.log(`- http://localhost:${PORT}/visual.html (visual display)`);
});

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