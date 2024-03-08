// CartPage.jsx

import React from 'react';
import './Cart.css';

const Cart = ({ cart,setCart }) => {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle increasing item quantity
  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  };

  // Function to handle decreasing item quantity
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      setCart(newCart);
    }
  };

  // Function to handle placing order
  const placeOrder = () => {
    // Implement logic to place order
    // This could involve sending cart data to a server, etc.
    // For now, you can console log a message
    console.log("Order placed:", cart);
  };

  return (
    <div className="cart-page">
      <h2 className="page-title">Your Cart</h2>
      <ul className="cart-items">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">Price: ${item.price} x {item.quantity}</p>
            </div>
            <div className="quantity-actions">
              <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
              <span className="quantity">{item.quantity}</span>
              <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total Price: ${totalPrice}</p>
        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Cart;
