// Inventory.js

import React from 'react';
import './Tables.css'; // Import the CSS file for styling

const Tables = () => {
  const totalTables = 10; // Assuming there are 10 tables in total
  const occupiedTables = [2, 5, 7]; // Assuming tables 2, 5, and 7 are occupied

  const renderTables = () => {
    const tables = [];
    for (let i = 1; i <= totalTables; i++) {
      const isOccupied = occupiedTables.includes(i);
      const tableClass = isOccupied ? 'table occupied' : 'table';
      tables.push(<div key={i} className={tableClass}>Table {i}</div>);
    }
    return tables;
  };

  return (
    <div className="tables-container">
      <h2>Tables Page</h2>
      <p>Total number of tables: {totalTables}</p>
      <div className="tables-grid">
        {renderTables()}
      </div>
    </div>
  );
};

export default Tables;
