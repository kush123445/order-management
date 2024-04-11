import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const AdminInterface = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Create a WebSocket client instance
    const client = new W3CWebSocket('ws://localhost:8000');

    // Event handler for when the WebSocket connection is opened
    client.onopen = () => {
      console.log('WebSocket client connected.');
    };

    // Event handler for when a message is received from the WebSocket server
    client.onmessage = (message) => {
      // Parse the received message
      console.log("acfsfvfdbdfbdfbdf", message.data, message)
      const data = JSON.parse(message.data);
      console.log('Received message from server:', data);

      // Handle different types of messages from the server
      switch (data.event) {
        case 'newOrder':
          // Update state to include the new order ID


          
          setOrders((prevOrders) => [...prevOrders, data.orderID]);
          break;
        // Handle other types of events if needed
        default:
          break;
      }
    };

    // Event handler for when the WebSocket connection is closed
    client.onclose = () => {
      console.log('WebSocket client disconnected.');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      client.close();
    };
  }, []); // Only run this effect once when the component mounts

  return (
    <div>
      <h1>Admin Interface</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((orderID, index) => (
            <tr key={index}>
              <td>{orderID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInterface;
