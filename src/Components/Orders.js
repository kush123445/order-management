// Orders.js

import React, { useEffect ,useState} from 'react';
//import WebSocket from 'ws';
import { Button } from 'react-bootstrap';
import { Modal, TextInput, Paper , Chip } from '@mantine/core'; 
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  const columns = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 230,
      renderCell: (params) => {
        return <div style={{ cursor: 'pointer' }} onClick={() => handleOrderClick(params)}>{params.value}</div>;
    }
      
    },
    {
      field: 'orderPlacedTime',
      headerName: 'Order Time',
      width: 200,
      renderCell: (params) => {
        return <div style={{ marginRight: 10 }}>{params.value}</div>;
    }
      
    },
    {
      field: 'tableNumber',
      headerName: 'Table Number',
      width: 200,
      renderCell: (params) => {
        return <div style={{ marginRight: 10 }}>{params.value}</div>;
    }
      
    },
    {
      field: 'totalPrice',
      headerName: 'Total Money',
      width: 200,
      renderCell: (params) => {
        return <div style={{ marginRight: 10 }}>{params.value}</div>;
    }
     
    },
    {
      field: 'totalItems',
      headerName: 'Total Items',
      width: 200,
      renderCell: (params) => {
        return <div style={{ marginRight: 10 }}>{params.value}</div>;
    }
    },
    ,
    {
      field: 'status',
      headerName: 'Order Status',
      width: 150,
      renderCell: (params) => {
          let backgroundColor;
          let color;
          let borderRadius = 5;

          switch (params.value) {
              case 'pending':
                  backgroundColor = '#fff9c4'; // light yellow
                  color = '#000';
                  break;
              case 'accepted':
                  backgroundColor = '#c8e6c9'; // light green
                  color = '#000';
                  break;
              case 'rejected':
                  backgroundColor = '#ffcdd2'; // light red
                  color = '#000';
                  break;
              default:
                  backgroundColor = '#fff';
                  color = '#000';
          }

          return (
              <div
                  style={{
                      backgroundColor,
                      color,
                      borderRadius,
                      padding: '5px 10px',
                      marginRight: 10
                  }}
              >
                  {params.value}
              </div>
          );
      }
  },
  ];

  
 
  
  useEffect(() => {

    const fetchOrders = async () => {
      try {
          const response = await axios.get('http://localhost:8000/all-orders'); // Assuming your backend API endpoint is '/api/orders'
           console.log(response.data)
          setOrders(response.data);
      } catch (error) {
          console.error('Error fetching orders:', error);
      }
  };

  fetchOrders();
  
    // Connect to the WebSocket server
    const ws = new WebSocket('ws://localhost:8000');

    // Event listener for when the connection is established
    ws.onopen = () => {
      const adminUserId = 'admin123'; // Replace with the actual admin user ID
      const authMessage = JSON.stringify({
        type: 'authenticatekushal',
        userId: adminUserId,
      });
      ws.send(authMessage);
    };

    // Event listener for incoming messages
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle incoming messages here
      const newOrder = JSON.parse(event.data);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    // Event listener for when the connection is closed
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Event listener for errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleCommentChange = (event) => {
    setComment(event.target.value);
};

const acceptOrder = async (orderId) => {
  try {
      await axios.put(`http://localhost:8000/orders/${orderId}`, { status: 'accepted' });
      // Update order status in state
      const updatedOrders = orders.map(order => {
          if (order.orderId === orderId) {
              return { ...order, status: 'accepted' };
          }
          return order;
      });
      setOrders(updatedOrders);
      handleCloseModal();
  } catch (error) {
      console.error('Error accepting order:', error);
  }
};

const rejectOrder = async (orderId) => {
  try {
      await axios.put(`http://localhost:8000/orders/${orderId}`, { status: 'rejected' });
      // Update order status in state
      const updatedOrders = orders.map(order => {
          if (order.orderId === orderId) {
              return { ...order, status: 'rejected' };
          }
          return order;
      });
      setOrders(updatedOrders);
      handleCloseModal();
  } catch (error) {
      console.error('Error rejecting order:', error);
  }
};

  const handleOrderClick = (params) => {
    setSelectedOrder(params.row);
};

const handleCloseModal = () => {
    setSelectedOrder(null);
    setComment('');
};
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const actionsContent = selectedOrder ? (
  <Paper padding="md" style={{ marginTop: 20 }}>
      <TextInput
          placeholder="Add comment (optional)"
          value={comment}
          onChange={handleCommentChange}
          multiline
          rows={3}
          fullWidth
      />
  </Paper>
) : null;

  return (
   
     <div>
      
      <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={orders}
        getRowId={(row) => row.orderId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>


    {selectedOrder && (
                <Modal opened onClose={handleCloseModal}>
                    <div style={{ padding: 20 }}>
                        <h2>Order Details</h2>
                        <p>Order ID: {selectedOrder.orderId}</p>
                        <p>Table Number: {selectedOrder.tableNumber}</p>
                        <p>Order Placed Time: {new Date(selectedOrder.orderPlacedTime).toLocaleString()}</p>
                        <h3>Food Items</h3>
                        <ul>
                            {selectedOrder.foodItems.map((item, index) => (
                                <li key={index}>
                                    {item.name} - ${item.price.toFixed(2)} (Quantity: {item.quantity})
                                </li>
                            ))}
                        </ul>
                        <p>Total Price: ${selectedOrder.totalPrice.toFixed(2)}</p>
                        <p>Total Items: {selectedOrder.totalItems}</p>

                        {/* Chips for Accept and Reject */}
                        <div style={{ display: 'flex', marginTop: 20 }}>
                            <Button onClick={() => acceptOrder(selectedOrder.orderId)}  style={{ marginRight: 10, backgroundColor: '#4caf50', color: '#fff', order: 2 }}>Accept</Button>
                            <Button onClick={() => rejectOrder(selectedOrder.orderId)} style={{ marginRight: 10, backgroundColor: '#f44336', color: '#fff', order: 1 }}>Reject</Button>
                        </div>

                        {/* Comment Box for rejected orders */}
                        {selectedOrder.isRejected && actionsContent}
                    </div>
                </Modal>
            )}
    </div>
  );
};

export default Orders;
// Orders.js
