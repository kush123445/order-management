import React from 'react';
import { Chip } from '@mantine/core';

const Flat = () => {
  const data = [
    { id: '1', title: '  Veg  ' },
    { id: '2', title: ' Non Veg ' },
    { id: '3', title: " Chef's Special " },
    { id: '4', title: ' Kids Choice ' },
    { id: '5', title: ' Super snacks ' },
    // More items...
  ];

  return (
    <div style={{ overflowX: 'scroll', display: 'flex' ,marginTop:'10px'}}>
      {data.map(item => (
        <div key={item.id} style={{ margin: '0 20px' }}> {/* Adjusted margin here */}
          <Chip variant='' defaultChecked >
            {item.title}
          </Chip>
        </div>
      ))}
    </div>
  );
};

export default Flat;