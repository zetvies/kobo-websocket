# WebSocket Button Grid System

A complete interactive system with a 4x4 button grid, real-time WebSocket communication, and multiple visual interfaces.

## Features

- **Controller**: Full-screen 4x4 button grid with grey buttons over black background
- **Dashboard**: Real-time monitoring with state control (Happy/Dark/Pause)
- **Visual Display**: Animated emojis that respond to button clicks and connections
- **WebSocket Communication**: Real-time message relay between all clients
- **State Management**: System-wide state control with pause functionality
- **Responsive Design**: Works on desktop and mobile devices

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to the server URL

## Available Views

- **Landing Page** (`/`) - Overview and navigation to all views
- **Controller** (`/index.html`) - Full-screen button grid for interaction
- **Dashboard** (`/player.html`) - Monitoring and state control panel
- **Visual Display** (`/visual.html`) - Animated emoji visualization

## How it works

- The server hosts all HTML files and provides WebSocket communication
- When a button is clicked, it sends the button number (1-16) to the server
- The server relays messages to all connected clients
- State changes (Happy/Dark/Pause) affect all connected clients
- Visual display shows animated emojis based on active connections

## Files

- `server.js` - HTTP and WebSocket server that hosts all files
- `landing.html` - Landing page with navigation
- `index.html` - Button grid controller
- `player.html` - Dashboard with monitoring and controls
- `visual.html` - Animated emoji display
- `package.json` - Node.js dependencies and scripts

## Deployment

This system is ready for deployment on platforms like Render:

1. Connect your repository to Render
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Deploy!

## Multiple Clients

Open multiple browser windows/tabs to see real-time interaction between different views. Each view provides a unique perspective on the same WebSocket communication system. 