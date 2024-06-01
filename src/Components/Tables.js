import React, { useState, useContext } from 'react';
import { Modal, Button, Card, Text, Grid, Group, Badge, Paper, Title } from '@mantine/core';
import axios from 'axios';
import { WebSocketContext } from '../Wsc';
import './Tables.css'; // Import the CSS file for styling

const Tables = () => {
  const { orders, setOrders } = useContext(WebSocketContext);
  const totalTables = 10; // Assuming there are 10 tables in total

  const [opened, setOpened] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  const getTotalItemsAndPrice = (orders) => {
    let totalItems = 0, totalPrice = 0;
    for (let i = 0; i < orders.length; i++) {
      totalItems += orders[i].totalItems;
      totalPrice += orders[i].totalPrice;
    }
    return { totalItems, totalPrice };
  };

  const isTableOccupied = (tableNumber) => {
    return orders.some(order => order.tableNumber === String(tableNumber));
  };

  const renderTables = () => {
    const tables = [];
    for (let i = 1; i <= totalTables; i++) {
      const tableClass = isTableOccupied(i) ? 'table occupied' : 'table vacant';
      tables.push(
        <Card
          key={i}
          className={tableClass}
          onClick={() => handleTableClick(i)}
          style={{ cursor: 'pointer', margin: '10px' }}
          shadow="sm"
          padding="lg"
        >
          <Text align="center" size="lg" weight={500}>
            Table {i}
          </Text>
        </Card>
      );
    }
    return tables;
  };

  const handleTableClick = (tableNumber) => {
    const ordersFromStorage = JSON.parse(localStorage.getItem('table-order')) || [];
    const ordersForTable = ordersFromStorage.filter(order => order.tableNumber === String(tableNumber));
    setSelectedTable(tableNumber);
    setOrderDetails(ordersForTable);
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setSelectedTable(null);
    setOrderDetails([]);
  };

  const completeOrder = async () => {
    try {
      await axios.delete(`http://localhost:8000/orders/${selectedTable}`);
      const response = await axios.get('http://localhost:8000/all-orders');
      setOrders(response.data);
      localStorage.setItem("table-order", JSON.stringify(response.data));
      closeModal();
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const { totalItems, totalPrice } = getTotalItemsAndPrice(orderDetails);

  return (
    <div className="tables-container">
     <div className="header">
  <div className="header-left">
    <h2 style={{ margin: 0 }}>Tables Management</h2>
  </div>
  <div className="header-right">
    <Badge  color="yellow" style={{ padding:'10px', fontSize:'12px' }}>Total  tables: {totalTables}</Badge>
  </div>
</div>

      <Grid justify="center" align="center" className="tables-grid">
        {renderTables()}
      </Grid>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Table ${selectedTable}`}
        size="lg"
      >
        {orderDetails.length > 0 ? (
          <div>
            <h3>Order Details</h3>
            {orderDetails.map((order, orderIndex) => (
              <div key={orderIndex} style={{ marginBottom: '15px' }}>
                <Card shadow="sm" padding="lg">
                  <Group position="apart">
                    <Text weight={500}>Order ID: {order.orderId}</Text>
                    <Badge color="yellow" size="lg">Active</Badge>
                  </Group>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {order.foodItems.map((item, index) => (
                      <li key={index} style={{ marginBottom: '5px' }}>
                        {item.name} - ${item.price.toFixed(2)} (Quantity: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
            <Group position="apart" style={{ marginTop: '15px' }}>
              <Text>Total Items: {totalItems}</Text>
              <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
            </Group>
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
