// Orders.js
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Modal, TextInput, Paper } from '@mantine/core';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { WebSocketContext } from '../Wsc'; // Ensure the correct path
import 'bootstrap/dist/css/bootstrap.min.css';
import './Orderpage.css';

const Orders = () => {
  const { orders, setOrders } = useContext(WebSocketContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [comment, setComment] = useState('');

  const columns = [
    { 
      field: 'billId', 
      headerName: 'Bill ID', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' }}>{params.value}</div> 
    },
    { 
      field: 'orderPlacedTime', 
      headerName: 'Order Time', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' }}>{params.value}</div> 
    },
    { 
      field: 'tableNumber', 
      headerName: 'Table Number', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' }}>{params.value}</div> 
    },
    { 
      field: 'totalPrice', 
      headerName: 'Total Money', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' }}>{params.value}</div> 
    },
    { 
      field: 'totalItems', 
      headerName: 'Total Items', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' }}>{params.value}</div> 
    },
    { 
      field: 'status', 
      headerName: 'Order Status', 
      width: 200, 
      headerClassName: 'header-cell', 
      renderCell: (params) => {
        let backgroundColor;
        let color;
  
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px', backgroundColor, color }}>{params.value}</div>
        );
      }
    }
  ];
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/all-orders'); // Assuming your backend API endpoint is '/api/orders'
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [setOrders]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const acceptOrder = async (billId) => {
    try {
      await axios.put(`http://localhost:8000/orders/${billId}`, { status: 'accepted' });
      const updatedOrders = orders.map(order => {
        if (order.billId === billId) {
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

  const rejectOrder = async (billId) => {
    try {
      await axios.put(`http://localhost:8000/orders/${billId}`, { status: 'rejected' });
      const updatedOrders = orders.map(order => {
        if (order.billId === billId) {
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
          getRowId={(row) => row.billId}
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
            <p>Order ID: {selectedOrder.billId}</p>
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

            <div style={{ display: 'flex', marginTop: 20 }}>
              <Button onClick={() => acceptOrder(selectedOrder.billId)} style={{ marginRight: 10, backgroundColor: '#4caf50', color: '#fff', order: 2 }}>Accept</Button>
              <Button onClick={() => rejectOrder(selectedOrder.billId)} style={{ marginRight: 10, backgroundColor: '#f44336', color: '#fff', order: 1 }}>Reject</Button>
            </div>

            {selectedOrder.isRejected && actionsContent}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
