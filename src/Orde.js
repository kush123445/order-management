import React, { useState } from 'react';

 import './Orm.css'
// import './Co.css'
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [totalPrice, settotalPrice] = useState(0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var newOrder = {}

  // Function to simulate incoming orders
  const simulateIncomingOrder = () => {
    newOrder = {
      id: orders.length + 1,
      tableNumber: Math.floor(Math.random() * 10) + 1, // Random table number between 1 and 10
      items: [
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 15 },
        { name: 'Item 3', price: 20 }
      ],  // Example items
      status: 'pending',
    };
    setOrders([newOrder, ...orders]); // Add new order at the beginning of the array
    var p = 0;
    for (let item of newOrder.items) {
      p += item.price; // Add the price of each item to the total
    }
    settotalPrice(p);


  };
  const [allTables, setAllTables] = useState([
    { tableNumber: 1, status: 'occupied' },
    { tableNumber: 2, status: 'free' },
    { tableNumber: 3, status: 'occupied' },
    { tableNumber: 4, status: 'occupied' },
    { tableNumber: 5, status: 'free' },
    // Add more table objects as needed
  ]);



  // Function to accept an order
  const acceptOrder = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'accepted' };
      }
      return order;
    });
    setOrders(updatedOrders);

    const updatedTables = allTables.map(table => {
      // Check if any order corresponds to the current table
      const orderExists = updatedOrders.some(order => order.tableNumber === table.tableNumber);
      // If an order exists for the table, mark it as occupied; otherwise, keep its current status
      return { ...table, status: orderExists ? 'occupied' : table.status };
    });
    setAllTables(updatedTables);
  };

  // Function to mark an order as completed

  // Function to mark a completed order as pending (in case of mistake)

  const markOrderPending = (tableNumber) => {


    const updatedOrders = orders.filter(order => order.tableNumber !== tableNumber);
    setOrders(updatedOrders);

    const updatedTables = allTables.map(table => {
      if (table.tableNumber === tableNumber) {
        return { ...table, status: 'free' };
      }
      return table;
    });
    setAllTables(updatedTables);
  };


  return (
    <div className="App">
      <div className="container">
        <div className="section">
          <h2>Order Management</h2>
          <button className="simulate-button" onClick={simulateIncomingOrder}>Simulate Incoming Order</button>
          {orders.map(order => (
            <div key={order.id} className={`order-item ${order.status === 'pending' ? 'pending' : 'accepted'}`}>
              <p className="order-info">Table No: {order.tableNumber}</p>
              <p className="order-info">Total Items: {order.items.length}</p>
              <p className="order-info">Total Price: {totalPrice}</p>
              {order.status === 'pending' ? (
                <button className="accept-button" onClick={() => acceptOrder(order.id)}>Accept Order</button>
              ) : null}
              <Button variant="primary" onClick={handleShow}>
                Open Modal
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>{item.name}</p>
                        <p style={{ margin: '0' }}>Price: ${item.price}</p>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <p style={{ margin: '0', fontWeight: 'bold' }}>Total: ${totalPrice}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  
                </Modal.Footer>
              </Modal>
            </div>
          ))}
        </div>
        <div className="section">
          <h2>Completed Orders</h2>
          {allTables.map(table => (
            <div key={table.tableNumber} className={`table-item ${table.status === 'occupied' ? 'with-order' : 'without-order'} ${  table.status === 'occupied' ? 'blue-background' : 'yellow-background'}`}>
              <p className="table-info">Table No: {table.tableNumber}</p>
              {table.status === 'occupied' ? (
                <p className="table-info">Status: Occupied</p>
              ) : (
                <p className="table-info">Status: Free</p>
              )}
              {(table.status === 'free') ? null : (
                <button
                  className={`complete-button ${table.status === 'free' ? 'blue' : ''}`}
                  onClick={() => markOrderPending(table.tableNumber)}
                  disabled={table.status === 'free'}
                >
                  Mark as Free
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
