
// import './App.css';
import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Components/Menu.js';
// import Dashboard from './Dashboard.js'
import Cart from './Components/Cart.js';

function App() {
  // if(localStorage.getItem('cart')!==''){
  //   const [cart, setCart] = useState(localStorage.getItem('cart'));
  // }
  // else{
  //   const [cart, setCart] = useState([]);
  // }

  const [cart, setCart] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem('orderPlaced')){
      setCart(JSON.parse(localStorage.getItem('orderPlaced')));
        }
    
  },[])
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
