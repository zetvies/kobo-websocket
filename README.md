# WebSocket Button Grid

A 4x4 full-screen button grid that sends button clicks through WebSocket to relay messages between clients.

## Features

- Full-screen 4x4 button grid
- Grey buttons over black background
- WebSocket communication for real-time button click relay
- Connection status indicator
- Automatic reconnection on disconnect

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the WebSocket server:
```bash
npm start
```

3. Open `index.html` in your web browser

## How it works

- The WebSocket server runs on port 8080
- When a button is clicked, it sends the button number (1-16) to the server
- The server relays the message to all connected clients
- Each client receives the button click with timestamp
- Connection status is displayed in the top-left corner

## Files

- `server.js` - WebSocket server that relays messages
- `index.html` - Client-side button grid with WebSocket connection
- `package.json` - Node.js dependencies and scripts

## Multiple Clients

You can open multiple browser windows/tabs with the HTML file to see real-time button clicks being relayed between all connected clients. 