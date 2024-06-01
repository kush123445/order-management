// Inventory.js

import React, { useState, useContext } from 'react';
import { Modal, Button } from '@mantine/core';
import axios from 'axios';
import { WebSocketContext } from '../Wsc';
import './Tables.css'; // Import the CSS file for styling

const Tables = () => {
  const { orders, setOrders } = useContext(WebSocketContext);
  const totalTables = 10; // Assuming there are 10 tables in total

  const [opened, setOpened] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const isTableOccupied = (tableNumber) => {
    return orders.some(order => order.tableNumber === String(tableNumber));
  };

  const renderTables = () => {
    const tables = [];
    for (let i = 1; i <= totalTables; i++) {
      const tableClass = isTableOccupied(i) ? 'table occupied' : 'table vacant';
      tables.push(
        <div
          key={i}
          className={tableClass}
          onClick={() => handleTableClick(i)}
          style={{ cursor: 'pointer' }}
        >
          Table {i}
        </div>
      );
    }
    return tables;
  };

  const handleTableClick = (tableNumber) => {
    const order = orders.find(order => order.tableNumber === String(tableNumber));
    setSelectedTable(tableNumber);
    setOrderDetails(order);
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setSelectedTable(null);
    setOrderDetails(null);
  };

  const completeOrder = async () => {
    try {
      // Call the API to complete the order
      await axios.delete(`http://localhost:8000/orders/${selectedTable}`);

      console.log(`Order completed and entries for table ${selectedTable} deleted`);

      const response = await axios.get('http://localhost:8000/all-orders'); // Assuming your backend API endpoint is '/api/orders'
      console.log(response.data);
      setOrders(response.data);

      // Update localStorage with the updated orders
      localStorage.setItem("table-order", JSON.stringify(response.data));

      // Close the modal
      closeModal();
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div className="tables-container">
      <h2>Tables Page</h2>
      <p>Total number of tables: {totalTables}</p>
      <div className="tables-grid">
        {renderTables()}
      </div>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Table ${selectedTable}`}
      >
        {orderDetails ? (
          <div>
            <h3>Order Details</h3>
            <ul>
              {orderDetails.foodItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)} (Quantity: {item.quantity})
                </li>
              ))}
            </ul>
            <p>Total Items: {orderDetails.totalItems}</p>
            <p>Total Price: ${orderDetails.totalPrice.toFixed(2)}</p>
            <Button
              onClick={completeOrder}
              style={{ backgroundColor: '#fdd835', color: '#000', marginTop: 20 }}
            >
              Complete Order
            </Button>
          </div>
        ) : (
          <p>No order details available for this table.</p>
        )}
      </Modal>
    </div>
  );
};

export default Tables;
