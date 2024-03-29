
// import './App.css';
import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Components/Menu.js';
// import Dashboard from './Dashboard.js'
import Cart from './Components/Cart.js';
import SplashScreen from './Components/SplashScreen.js';

function App() {
  // if(localStorage.getItem('cart')!==''){
  //   const [cart, setCart] = useState(localStorage.getItem('cart'));
  // }
  // else{
  //   const [cart, setCart] = useState([]);
  // }

  const [cart, setCart] = useState([]);
  const [newCart, setNewCart] = useState([]);


  useEffect(()=>{
    if(localStorage.getItem('orderPlaced')){
      setCart(JSON.parse(localStorage.getItem('orderPlaced')));
        }
    
  },[])
  useEffect(()=>{
    if(localStorage.getItem('orderConfirmed')){
      setNewCart(JSON.parse(localStorage.getItem('orderConfirmed')));
        }
    
  },[])
  return (
    <Router>
    <div>
      <Routes>
      <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart}  setCart={setCart} newCart={newCart} setNewCart={setNewCart} />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
