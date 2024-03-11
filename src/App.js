
// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Components/Menu.js';
// import Dashboard from './Dashboard.js'
import Cart from './Components/Cart.js';

function App() {
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
