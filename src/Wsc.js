// WebSocketContext.js
import React, { createContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import bellSound from './Components/live.mp3'; 
export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [play] = useSound(bellSound, { volume: 0.4});
  const [orders, setOrders] = useState(() => {
    const localData = localStorage.getItem('table-order');
    return localData ? JSON.parse(localData) : [];
  });

  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      const adminUserId = 'admin123'; // Replace with the actual admin user ID
      const authMessage = JSON.stringify({
        type: 'authenticatekushal',
        userId: adminUserId,
      });
      ws.send(authMessage);
      console.log('WebSocket connection established');
    };

    ws.onmessage = async(event) => {
        await  play();
      console.log('Received message:', event.data);
      const newOrder = JSON.parse(event.data);
      setOrders((prevOrders) => {
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('table-order', JSON.stringify(updatedOrders));
        return updatedOrders;
      });
      setNewOrdersCount((prevCount) => prevCount + 1);
    
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  const resetNewOrdersCount = () => {
    setNewOrdersCount(0);
  };


  return (
    <WebSocketContext.Provider value={{ orders, setOrders , newOrdersCount, resetNewOrdersCount }}>
      {children}
    </WebSocketContext.Provider>
  );
};
