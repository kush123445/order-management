import React, { useState, useEffect } from 'react';
import './Cart.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Cart = ({ cart, setCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true); // State for accordion open/close
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(10);

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

  const placeOrder = () => {
    setOrderPlaced(true);
    setShowCancelButton(true);

    // Automatically hide cancel button after 10 seconds
    setTimeout(() => {
      setCancelTimer(10);
      setShowCancelButton(false);
      setAccordionOpen(!accordionOpen)
    }, 10000);
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

  const addCookingInstructions = (index) => {
    const newCart = [...cart];
    // Here you can implement the logic to add cooking instructions to the item
    // For now, let's just log a message indicating that the instructions are added
    console.log("Cooking instructions added for:", newCart[index].name);
  };
  const [removedItems, setRemovedItems] = useState([]);

  const deleteItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const toggleStrikeThrough = (itemId) => {
    if (removedItems.includes(itemId)) {
      setRemovedItems(removedItems.filter((id) => id !== itemId));
    } else {
      setRemovedItems([...removedItems, itemId]);
    }
  };

  // Function to cancel the order
  const cancelOrder = () => {
    setOrderPlaced(false);
    setShowCancelButton(false);
    setCancelTimer(10);

    // You might also want to clear the cart or take other actions related to canceling the order
  };

  useEffect(() => {
    let timerInterval;
    if (showCancelButton) {
      timerInterval = setInterval(() => {
        setCancelTimer(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [showCancelButton]);

  useEffect(() => {
    if (orderPlaced && !showCancelButton) {
      setTimelineOpen(true);
    }
  }, [orderPlaced, showCancelButton]);


  return (
    <div className="cart-page">
      <svg className="moving-svg" width="100%" height="50" xmlns="http://www.w3.org/2000/svg">

        <path d="M0 25 C50 0, 150 50, 200 25 C250 0, 350 50, 400 25 C450 0, 550 50, 600 25 C650 0, 750 50, 800 25 C850 0, 950 50, 1000 25 L1000 50 L0 50 Z" fill="#ff9700" />
      </svg>
      <h2 className="menu-titleC" style={{ marginTop: '35px', marginLeft: '0px' }}>Your Orders</h2>
      <div className={`accordion-header ${!accordionOpen ? 'closed' : ''}`} onClick={() => setAccordionOpen(!accordionOpen)}>
        <span className="accordion-icon">{accordionOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        <h3 className="category-name">Order List</h3>
      </div>
      {accordionOpen && (
        <>
          { (!orderPlaced && !showCancelButton) || ( orderPlaced && showCancelButton)? (
            <ul className="cart-items">
              
              {cart.map((item, index) => (
                <li key={index} className={`cart-item ${removedItems.includes(item.id) ? 'removed' : ''}`}>
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price"> ₹ {item.price} x {item.quantity}</p>
                    <button className="cooking-instructions-btn" onClick={() => addCookingInstructions(index)}>
                      <FontAwesomeIcon icon={faPlus} />
                      Add Cooking Instructions
                    </button>
                  </div>
                  <div className="quantity-actions">
                    <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
                    <button className="delete-btn " style={{ background: 'white', border: 'none', color: "red", fontSize: "20px" }} onClick={() => { toggleStrikeThrough(item.id); setTimeout(() => deleteItem(index), 500); }}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </li>
              ))}
              <p className='cart-total'>Total Price: ₹ {totalPrice}</p>
            </ul> ) : (
          

         
         
           
           <ul className="invoice-list">
             {
            timelineOpen && (<p className="order-id">
            <span style={{ color: 'red' }}>Order ID:</span> <span style={{ color: 'black' }}>xx00044</span>
          </p>)
          }
           <li className="invoice-header">
             <span className="header-item">Item</span>
             <span className="header-item">Quantity</span>
             <span className="header-item">Price</span>
           </li>
           {cart.map((item, index) => (
             <li key={index} className="invoice-item">
               <span className="item-name">{item.name}</span>
               <span className="item-quantity">{item.quantity}</span>
               <span className="item-price">₹ {item.price * item.quantity}</span>
             </li>
           ))}
           <li className="invoice-total">
             <span>Total:</span>
             <span>₹ {totalPrice}</span>
           </li>
         </ul>
          )}
        </>
      )}
      <div className="cart-total">
        {/* <button className="place-order-btn " onClick={placeOrder}>Place Order</button> */}


        {!orderPlaced && !showCancelButton && cart.length != 0 && (
          <button className="place-order-btn " onClick={placeOrder}>Place Order</button>
        )}

        {showCancelButton && (
          <div className="timer-container">
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={45} // Adjust the size as needed
              strokeWidth={5} // Adjust the stroke width as needed
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <button className="cancel-order-btn" onClick={cancelOrder}>
              Cancel Order
            </button>
          </div>
        )}
        {orderPlaced && timelineOpen && (
          <VerticalTimeline className="custom-timeline" lineColor={'lightgray'} >
            <VerticalTimelineElement
              className=""
              contentStyle={{ background: '#D0FFBC', color: '#333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="Order Placed"
              iconStyle={{ background: '#333', color: '#fff' }}
              icon={<div className="circle-icon">1</div>}
              lineColor={'black'}
            />
            <VerticalTimelineElement
              className=""
              contentStyle={{ background: '#f0f0f0', color: 'black', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
              contentArrowStyle={{ borderRight: '7px solid #4CAF50' }}
              date="Order Accepted"
              iconStyle={{ background: '#4CAF50', color: '#fff' }}
              icon={<div className="circle-icon">2</div>}
            />
          </VerticalTimeline>
        )}
      </div>
    </div>
  );
}

export default Cart;