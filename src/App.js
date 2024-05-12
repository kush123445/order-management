// import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu.js";
// import Dashboard from './Dashboard.js'
import Cart from "./Components/Cart.js";
import SplashScreen from "./Components/SplashScreen.js";
import ADMIN from "./Components/Admin.js";
import MainLayout from "./Components/MainLayout.js";
import Orders from "./Components/Orders";
import Tables from "./Components/Tables.js";
import Menulist from "./Components/Menulist";
import QRCode from "./Components/Qrcode.js";
import SendOTPForm from "./Components/SendOTPForm.js";
import Login from "./Components/Login.js";
import "@mantine/core/styles.css";

function App() {
  // if(localStorage.getItem('cart')!==''){
  //   const [cart, setCart] = useState(localStorage.getItem('cart'));
  // }
  // else{
  //   const [cart, setCart] = useState([]);
  // }

  const [cart, setCart] = useState([]);
  const [newCart, setNewCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("orderPlaced")) {
      setCart(JSON.parse(localStorage.getItem("orderPlaced")));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("orderConfirmed")) {
      setNewCart(JSON.parse(localStorage.getItem("orderConfirmed")));
    }
  }, []);
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart}  setCart={setCart} newCart={newCart} setNewCart={setNewCart} />} /> */}
          <Route path="/" element={<MainLayout />} />
          <Route
            path="/orders"
            element={
              <MainLayout>
                <Orders />
              </MainLayout>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/tables"
            element={
              <MainLayout>
                <Tables />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/menu"
            element={
              <MainLayout>
                <Menulist />
              </MainLayout>
            }
          ></Route>

          <Route
            path="/qr"
            element={
              <MainLayout>
                <QRCode />
              </MainLayout>
            }
          ></Route>

          <Route
            path="/request"
            element={
              <MainLayout>
                <SendOTPForm />
              </MainLayout>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
