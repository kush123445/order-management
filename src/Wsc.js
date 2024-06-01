import React, { createContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import bellSound from './Components/live.mp3'; 
export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  // Initialize useSound Hook with the bell sound and volume
  const [play] = useSound(bellSound, { volume: 0.4 });

  // State to manage orders and new orders count
  const [orders, setOrders] = useState(() => {
    const localData = localStorage.getItem('table-order');
    return localData ? JSON.parse(localData) : [];
  });
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    // Establish WebSocket connection
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

    ws.onmessage = async (event) => {
      try {
        // Play sound when a message is received
      //  await play();
        
        console.log('Received message:', event.data);
        const newOrder = JSON.parse(event.data);
        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders, newOrder];
          localStorage.setItem('table-order', JSON.stringify(updatedOrders));
          return updatedOrders;
        });
        setNewOrdersCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close WebSocket connection
    return () => {
      ws.close();
    };
  }, []); // Add play function as a dependency

  // Function to reset new orders count
  const resetNewOrdersCount = () => {
    setNewOrdersCount(0);
  };

  // Provide context value to child components
  return (
    <WebSocketContext.Provider value={{ orders, setOrders, newOrdersCount, resetNewOrdersCount }}>
      {children}
    </WebSocketContext.Provider>
  );
};
