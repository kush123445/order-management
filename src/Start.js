
// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Cart from './Cart'; // Import the CartPage component

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart}  setCart={setCart} />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
