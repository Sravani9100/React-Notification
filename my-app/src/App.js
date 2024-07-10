//import logo from './logo.svg';
//import './App.css';
import React, { useEffect } from 'react';
import WebSocketService from './services/websocketService';

function App() {
  useEffect(() => {
    // Create the STOMP client connection
    WebSocketService.createStompClient('https://localhost:8443/ws');
  }, []);

  const sendNotification = () => {
    WebSocketService.sendMessage('Test Notification');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendNotification}>Send Notification</button>
      </header>
    </div>
  );
}

export default App;
