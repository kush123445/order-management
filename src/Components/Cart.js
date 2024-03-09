import React, { useState } from 'react';
import './Cart.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const Cart = ({ cart, setCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true); // State for accordion open/close

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
    setOrderPlaced(true);
    setTimelineOpen(true); // Open the timeline when order is placed
    setAccordionOpen(false); // Close the accordion when timeline is opened
  };

  // Function to handle accepting order
  const acceptOrder = () => {
    setOrderAccepted(true);
  };

  // Function to handle closing the timeline
  const closeTimeline = () => {
    setTimelineOpen(false);
    setAccordionOpen(true); // Open the accordion when timeline is closed
  };

  // Function to toggle the accordion for the order list
  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <div className="cart-page">
         <svg className="moving-svg" width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
          
  <path d="M0 25 C50 0, 150 50, 200 25 C250 0, 350 50, 400 25 C450 0, 550 50, 600 25 C650 0, 750 50, 800 25 C850 0, 950 50, 1000 25 L1000 50 L0 50 Z" fill="#ff9700" />
</svg>
      <h2 className="menu-titleC" style={{ marginTop: '35px', marginLeft: '0px' }}>Your Orders</h2>
      <div className={`accordion-header ${!accordionOpen ? 'closed' : ''}`} onClick={toggleAccordion}>
  <span className="accordion-icon">{accordionOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
  <h3 className="category-name">Order List</h3>
</div>
      {accordionOpen && ( // Render the cart items only if accordion is open
        <ul className="cart-items">
           <p className="order-id">
  <span style={{ color: 'red' }}>Order ID:</span> <span style={{ color: 'black' }}>xx00044</span>
</p>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
             
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-price">Price: ₹ {item.price} x {item.quantity}</p>
              </div>
              <div className="quantity-actions">
                <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
                <span className="quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
              </div>
            </li>
          ))}
           <p className='cart-total'>Total Price: ₹ {totalPrice}</p>
        </ul>
        
      )}
      <div className="cart-total">
       
        <button className="place-order-btn " onClick={placeOrder}>Place Order</button>
        {orderPlaced && (
         <VerticalTimeline className="custom-timeline">
         <VerticalTimelineElement
           className=""
           contentStyle={{ background: '#D0FFBC', color: '#333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
           contentArrowStyle={{ borderRight: '7px solid #f0f0f0' }}
           date="Order Placed"
           iconStyle={{ background: '#333', color: '#fff' }}
           icon={<div className="circle-icon">1</div>} // Add icon prop with circle and number 1
         />
       
           <VerticalTimelineElement
             className=""
             contentStyle={{ background: '#f0f0f0', color: 'black', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
             contentArrowStyle={{ borderRight: '7px solid #4CAF50' }}
             date="Order Accepted"
             iconStyle={{ background: '#4CAF50', color: '#fff' }}
             icon={<div className="circle-icon">2</div>} // Add icon prop with circle and number 2
           />
         
       </VerticalTimeline>
       
        )}
      </div>
     
      
      
    </div>
  );
}

export default Cart;