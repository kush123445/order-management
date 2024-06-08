import React, { useState,useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './requestfeed.css'
import { WebSocketContext } from '../Wsc'; 

const SendOTPForm = () => {
  const { feedbackData, setFeedbackData } = useContext(WebSocketContext);
 

  

  const getRowClassName = (params) => {

    if (params.row.title === 'Waiter Call') {
      return 'waiter-call-row'; // Apply this class for Waiter Call rows
    }
  
    switch (params.row.remark) {
      case 'poor':
        return 'poor-row';
      case 'good':
        return 'good-row';
      case 'excellent':
        return 'excellent-row';
      default:
        return '';
    }

    
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'message', headerName: 'Description', width: 400 },
    { field: 'tableNumber', headerName: 'Table No.', width: 150 },
    { field: 'remark', headerName: 'Remark', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <DataGrid
        rows={feedbackData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        getRowClassName={getRowClassName}
        components={{
          Toolbar: () => (
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderBottom: '1px solid #ccc', borderRadius: '8px 8px 0 0' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold' }}>Feedback & Waiter Calls</h3>
              <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Export</button>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default SendOTPForm;
