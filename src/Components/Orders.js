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
      renderCell: (params) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '5px 10px' ,cursor: 'pointer' }}>{params.value}</div> 
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
          onCellClick={handleOrderClick} 
        />
      </Box>

      {selectedOrder && (
       <Modal opened onClose={handleCloseModal} styles={{ overlay: { background: 'rgba(0, 0, 0, 0.5)' } }}>
       <div style={{ padding: 20, backgroundColor: '#fff', borderRadius: 8 }}>
         <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#ea7c1c' }}>Order Details</h2>
         <div style={{ marginBottom: 20 }}>
           <p style={{ marginBottom: 5, color: '#333' }}>Order ID: <strong>{selectedOrder.billId}</strong></p>
           <p style={{ marginBottom: 5, color: '#333' }}>Table Number: <strong>{selectedOrder.tableNumber}</strong></p>
           <p style={{ marginBottom: 5, color: '#333' }}>Order Placed Time: <strong>{new Date(selectedOrder.orderPlacedTime).toLocaleString()}</strong></p>
         </div>
         <h3 style={{ marginBottom: 10, color: '#ea7c1c' }}>Food Items</h3>
         <ul style={{ marginBottom: 20 }}>
           {selectedOrder.foodItems.map((item, index) => (
             <li key={index} style={{ color: '#333' }}>
               <span style={{ marginRight: 10, fontWeight: 'bold' }}>{item.name}</span>
               <span style={{ color: '#888' }}>Quantity: {item.quantity}</span>
               <span style={{ float: 'right', fontWeight: 'bold' }}>₹{item.price.toFixed(2)}</span>
             </li>
           ))}
         </ul>
         <div style={{ marginBottom: 20 }}>
           <p style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 18, color: '#333' }}>Total Price: ₹{selectedOrder.totalPrice.toFixed(2)}</p>
           <p style={{ textAlign: 'right', fontSize: 16, color: '#333' }}>Total Items: {selectedOrder.totalItems}</p>
         </div>
         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           <Button onClick={() => acceptOrder(selectedOrder.billId)} style={{ marginRight: 10, backgroundColor: '#4caf50', color: '#fff', order: 2 }}>Accept</Button>
           <Button onClick={() => rejectOrder(selectedOrder.billId)} style={{ backgroundColor: '#f44336', color: '#fff', order: 1 }}>Reject</Button>
         </div>
         {selectedOrder.isRejected && actionsContent}
       </div>
     </Modal>
     
      
      )}
    </div>
  );
};

export default Orders;
