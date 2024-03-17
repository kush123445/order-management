import React, { useState, useEffect } from 'react';
import './Cart.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
//import Modal from 'react-modal';
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Drawer, TextInput, Button, Group, Text, Divider, Textarea, Accordion, ThemeIcon, Card, Image, Notification } from '@mantine/core';
import { Transition } from '@mantine/core';
import emptyCartSvg from './tea.png';
import { Timeline } from '@mantine/core';
// import  IconMessageDots  from '@tabler/icons-react';
// import  IconGitBranch from '@tabler/icons-react';
import { SwipeableButton } from "react-swipeable-button";
// import { IconArrowLeft } from '@tabler/icons-react';
import boopSfx from './transition.mp3';
import useSound from 'use-sound';
//import SlideUpModal from './SlideUpModal.js';
import { Chip, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react'
import Drawerr from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'


//Modal.setAppElement('#root');

const Cart = ({ cart, setCart }) => {
  const [play] = useSound(boopSfx);
  const [opened, { open, close }] = useDisclosure(false);
  //const { width, height } = useWindowSize()
  const [openedc, { openc, closec }] = useDisclosure(false);

  const [width, height] = useWindowSize()
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()


  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false)


  const [orderAccepted, setOrderAccepted] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true); // State for accordion open/close
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open/close
  const [dialogInput, setDialogInput] = useState(''); // State to manage input in the dialog
  const [currentItem, setCurrentItem] = useState(null); // State to store the index of the current item
  const [customize, setCustomize] = useState('');
  const [removedItems, setRemovedItems] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [isDialogOpeninstruction, setisDialogOpeninstruction] = useState(false); // State to manage dialog open/close
  const [natof, setNatof] = useState(false); // Initialize natof state variable to false




  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle increasing item quantity
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    // newCart[index].quantity++;
    newCart[index].quantity = newCart[index].quantity + (newCart[index].half ? 0.5 : 1);
    setCart(newCart);
  };


  // Function to handle decreasing item quantity
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].half && newCart[index].quantity > 0.5) {
      newCart[index].quantity = newCart[index].quantity - (newCart[index].half ? 0.5 : 1);
      setCart(newCart);
    }
    else if (!newCart[index].half && newCart[index].quantity > 1) {
      newCart[index].quantity = newCart[index].quantity - (newCart[index].half ? 0.5 : 1);
      setCart(newCart);
    }
  };

  const placeOrder = () => {
    if ("vibrate" in navigator) {
      // Vibrate the phone for 1000 milliseconds (1 second)
      navigator.vibrate(400);
    } 

    setOrderPlaced(true);
    setShowCancelButton(true);

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

  const addCookingInstructions = (item) => {
    setDialogInput(item.instruction)
    setCurrentItem(item);
    setIsDialogOpen(true);
  };
  const saveCookingInstructions = () => {
    if (dialogInput.trim() !== '') {
      console.log(currentItem);
      setCart(cart.map(cartItem => {
        if (cartItem.name === currentItem.name) {
          console.log(cartItem, "ander");
          return { ...cartItem, instruction: dialogInput };
        }

        return cartItem;
      }));
      setDialogInput('');
      setIsDialogOpen(false);
    }

  };

  // Function to clear the input field when the clear button is clicked
  const clearCookingInstructions = () => {
    setDialogInput('');
  };

  const clearInstructions = () => {
    setCustomize('');

  }

  const CustomiseInstructions = () => {
    //logic write here 
    setisDialogOpeninstruction(true);
  }


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
    toast('😒 Order Canceled!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    setOrderPlaced(false);
    setShowCancelButton(false);
    setCancelTimer(10);

    // You might also want to clear the cart or take other actions related to canceling the order
  };

  const slideUpTransition = {
    in: { transform: 'translateY(0)' },
    out: { transform: 'translateY(100%)' },
    transitionProperty: 'transform',
  };
  useEffect(() => {
    let timerInterval;
    if (showCancelButton) {
      let secondsElapsed = 0; // Initialize a variable to track elapsed seconds

      timerInterval = setInterval(() => {
        setCancelTimer(prevTime => {
          // Check if the elapsed time is 10 seconds
          if (secondsElapsed === 10) {
            clearInterval(timerInterval);
            setShowCancelButton(false);
            setAccordionOpen(!accordionOpen) // Clear the interval
            return prevTime;
          } else {
            // Increment the elapsed time and return the updated value
            secondsElapsed++;
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);

  }, [showCancelButton]);

  const renderDescription = (description) => {
    const maxLength = 50; // Maximum length of truncated description
    const shouldTruncate = description.length > maxLength;


    const handleToggleExpansion = () => {
      setExpanded(!expanded);
    };

    return (
      <div style={{ color: 'gray' }}>
        {shouldTruncate ? (
          <>
            <span>{expanded ? description : `${description.substring(0, maxLength)} `}</span>
            <button className="read-more-button" style={{ background: 'white', border: 'none', color: 'black', padding: '0px' }} onClick={handleToggleExpansion}>
              {expanded ? "Read less" : "Read more..."}
            </button>
          </>
        ) : (
          <span>{description}</span>
        )}
      </div>
    );
  };
  useEffect(() => {
    if (orderPlaced && !showCancelButton) {
      setTimelineOpen(true);
      play()
      var count = 200;
      var defaults = {
        origin: { y: 0.7 }
      };

      // function fire(particleRatio, opts) {
      //   confetti({
      //     ...defaults,
      //     ...opts,
      //     particleCount: Math.floor(count * particleRatio)
      //   });
      // }

      // fire(0.25, {
      //   spread: 26,
      //   startVelocity: 55,
      // });
      // fire(0.2, {
      //   spread: 60,
      // });
      // fire(0.35, {
      //   spread: 100,
      //   decay: 0.91,
      //   scalar: 0.8
      // });
      // fire(0.1, {
      //   spread: 120,
      //   startVelocity: 25,
      //   decay: 0.92,
      //   scalar: 1.2
      // });
      // fire(0.1, {
      //   spread: 120,
      //   startVelocity: 45,
      // });
    }
  }, [orderPlaced, showCancelButton]);

  useEffect(() => {
    // console.log("kushal", cart)
    if (cart.length > 0) {
      localStorage.setItem('orderPlaced', JSON.stringify(cart));
    }
  }, [cart])

  const saving = () => {
    close();
    setisDialogOpeninstruction(false);
  }
  return (

    <div>
      {cart.length === 0 ? (
        <div className="center-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <svg className="moving-svg" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25 C50 0, 150 50, 200 25 C250 0, 350 50, 400 25 C450 0, 550 50, 600 25 C650 0, 750 50, 800 25 C850 0, 950 50, 1000 25 L1000 50 L0 50 Z" />
          </svg>
          <img src={emptyCartSvg} alt="Empty Cart" style={{ width: '400px', height: '300px' }} />
          <p className="empty-cart-message">Your cart is empty</p>
          <div className="bottom-svg-container" style={{ marginTop: 'auto' }}>
            <svg className="moving-svg" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 H1000 V50 H0 Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="cart-page">
          <svg className="moving-svg" width="100%" height="50" xmlns="http://www.w3.org/2000/svg">

            <path d="M0 25 C50 0, 150 50, 200 25 C250 0, 350 50, 400 25 C450 0, 550 50, 600 25 C650 0, 750 50, 800 25 C850 0, 950 50, 1000 25 L1000 50 L0 50 Z" />
          </svg>
          <h2 className="menu-titleC" style={{ marginTop: '35px', marginLeft: '0px' }}>Your Orders</h2>
          <div className={`accordion-header ${!accordionOpen ? 'closed' : ''}`} onClick={() => setAccordionOpen(!accordionOpen)}>
            <span className="accordion-icon">{accordionOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            <h3 className="category-name">Order List</h3>

          </div>
          {natof && (
            <Notification color="red" title="Bummer!">
              Something went wrong
            </Notification>
          )}
          {accordionOpen && (
            <>
              {(!orderPlaced && !showCancelButton) || (orderPlaced && showCancelButton) ? (
                <ul className="cart-items">

                  {cart.map((item, index) => (
                    <li key={index} className={`cart-item ${removedItems.includes(item.id) ? 'removed' : ''}`}>
                      <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price"> ₹ {item.price} x {item.quantity}</p>
                        {/* <button className="cooking-instructions-btn" onClick={() => addCookingInstructions(item)}>
                      <FontAwesomeIcon icon={faPlus} />
                      Add Instructions
                    </button> */}
                        {!isDialogOpen && item.instruction && <div className='cooking-instructions'>{item.instruction}</div>}
                      </div>
                      <div className="quantity-actions">
                        <div className='counterbox' style={{ maxWidth: "150px" }}>
                          <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>
                            <FaMinus />
                          </button>
                          <span className="quantity">{Math.max(item.quantity, 0)}</span>
                          <button className="quantity-btn" onClick={() => increaseQuantity(index)}>
                            <FaPlus />
                          </button>
                        </div>

                        <button className="delete-btn " style={{ background: 'white', border: 'none', color: "#a6a6a6", fontSize: "23px" }} onClick={() => { toggleStrikeThrough(item.id); setTimeout(() => deleteItem(index), 500); }}>
                          <MdDelete />
                        </button>
                      </div>
                    </li>
                  ))}

                  {/* <div className='d-flex     flex-row'><div style={{width:'50%'}}></div><div>Total Price: ₹ {totalPrice}</div></div> */}
                  <div className="containerk">
                    <div className="itemk">
                      <button className="customise-instructions" onClick={open}>
                        <FontAwesomeIcon icon={faPlus} /> Add Instructions
                      </button>
                      {/* {!isDialogOpeninstruction && (
                        <Accordion variant="separated" defaultValue="Apples">
                          <Accordion.Item key={'Apples'} value={'Apples'}>
                            <Accordion.Control icon={'🍊'}>{'Apples'}</Accordion.Control>
                            <Accordion.Panel>{renderDescription(customize)}</Accordion.Panel>
                          </Accordion.Item>

                        </Accordion>
                      )} */}
                    </div>
                    <div className="itemkp">Total: ₹ {totalPrice}</div>
                  </div>
                </ul>) : (





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

            {/* {!orderPlaced && !showCancelButton && cart.length != 0 && (
          <button className="customise-instructions" onClick={open} >Customise</button>
        )} */}
            {!orderPlaced && !opened && !showCancelButton && cart.length != 0 && (

              <div className="w-[500px] h-[100px] bg-white"
              >
                <SwipeableButton
                  onSuccess={placeOrder} //callback function
                  text="Order me me!" //string 
                  text_unlocked="yeee" //string
                  color="#03C03C" //css hex color
                />
              </div>
              //  <Button 
              //  variant="gradient"
              //  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              //  fullWidth onClick={placeOrder} style={{ height:'55px',position: 'fixed', bottom: '00px', left: '50%', transform: 'translateX(-50%)', zIndex: '999' }}>Place Order</Button>

            )}


            {showCancelButton && (


              <Drawerr
                open={showCancelButton}
                onClose={toggleDrawer}
                direction='bottom'
                className='bla bla bla'
                overlayOpacity='0.5'
                
                style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center',boxShadow: '0px -4px 8px rgba(0, 0, 255, 0.2)' ,maxWidth:'100vw'}}
              >
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                  <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    size={45} // Adjust the size as needed
                    strokeWidth={5} // Adjust the stroke width as needed
                    style={{ marginRight: '10px' }}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
                <div>

                  <Button variant="outline" className="" onClick={cancelOrder} style={{
                    height: '45px', left: '50%', marginLeft: '5px',
                    marginRight: '5px',  marginBottom:'10px',  transform: 'translateX(-50%)', zIndex: '999', border: '1px solid red', color: 'red'
                  }} fullWidth >

                    Cancel Order
                  </Button>


                </div>
                </div>
                <div>
                <Text size="xs" mt={5}>  To ensure , please confirm your order within 60 seconds.</Text>
                </div>
              </Drawerr>


              // <Drawer opened={openedc} onClose={closec} title="Cooking Instructions..." position="bottom" size="xs" maxw='100%' transitionProps={{ transition: 'slide-up', duration: 600 }} mb='2'>

              //   <Divider my="md" /> {/* Add a divider to separate input from buttons */}
              //   <Group position="right">




              //   </Group>
              // </Drawer>



            )}

            {/* {!isDialogOpeninstruction && <div className='cooking-instructions'>{customize}</div>} */}
            {orderPlaced && timelineOpen && (
              <>
                <Confetti
                  width={width}
                  height={height}
                  recycle={false}
                  numberOfPieces={600}
                  tweenDuration={8000}

                />
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
              </>

            )}
          </div>
          {/* <Modal
        isOpen={isDialogOpen}
        onRequestClose={() => setIsDialogOpen(false)}
        contentLabel={`Add Cooking Instructions for ${currentItem ? currentItem.name : ''} `}
        className="modal" 
      >
        <h3>{`Add Cooking Instructions for ${currentItem ? currentItem.name : ''} `}</h3>
        <input
          type="text"
          value={dialogInput}
          onChange={(e) => setDialogInput(e.target.value)}
          placeholder="Enter cooking instructions..."
        />
        <button onClick={saveCookingInstructions} disabled={!dialogInput || !dialogInput.trim()}>Save</button>
        <button onClick={clearCookingInstructions}>Clear</button>
        <button onClick={()=>setIsDialogOpen(false)}>Close</button>
      
      </Modal> */}

          <Drawer opened={opened} onClose={close} title="Cooking Instructions..." position="bottom" size="xs" maxw='100%' transitionProps={{ transition: 'slide-up', duration: 600 }} mb='2'>
            <Textarea
              data-autofocus
              label="Cutomize your order "
              placeholder="Enter cooking instructions..."
              value={customize}
              onChange={(e) => setCustomize(e.target.value)}
              // Set a minimum height for better visibility
              variant="filled"
              autosize
              minRows={4}
              maxRows={8}
              mb={3}
              mt={3}
              closeButtonProps={{
                icon: <MdOutlineCancel size={20} stroke={1.5} />,
              }}

            />
            <Divider my="md" /> {/* Add a divider to separate input from buttons */}
            <Group position="right">
              <Button onClick={() => { setCustomize("") }} variant="outline">
                Clear
              </Button>

              
              {/* <Button onClick={() => setisDialogOpeninstruction(false)}>Close</Button> */}
              <Button type="submit" variant="gradient" onClick={saving}>
                Save
              </Button>
            </Group>
          </Drawer>


          {/*<Modal
      opened={opened}
      onClose={close}
      title="Focus demo"
      transition={slideUpTransition}
      // Additional styling for a more polished look
      overlayColor="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
      padding="md" // Add moderate padding
      radius="md" // Rounded corners
      style={{  position: 'absolute', bottom: 0, left: 0, right: 0 ,backgroundColor:"red"} }
      transitionProps={{ transition: 'slide-up' }}
    
    >
      <TextInput
        data-autofocus
        label="Input with initial focus"
        placeholder="Enter cooking instructions..."
        value={customize}
        onChange={(e) => setCustomize(e.target.value)}
        multiline // Allow multiple lines of text
        minHeight={150} // Set a minimum height for better visibility
        variant="filled" // Use the filled variant for a cleaner look
      />
      <Divider my="md" /> /* Add a divider to separate input from buttons 
      <Group position="right">
        <Button onClick={clearInstructions} variant="outline">
          Clear
        </Button>
        <Button onClick={() => setisDialogOpeninstruction(false)}>Close</Button>
        <Button type="submit" variant="gradient">
          Save
        </Button>
      </Group>
    </Modal>*/}
          {/* <Modal
        isOpen={isDialogOpeninstruction}
        onRequestClose={() => setisDialogOpeninstruction(false)}
        // contentLabel={`Add Cooking Instructions for ${currentItem ? currentItem.name : ''} `}
        className="modal" 
      >
        <h3>{`Add Customise Instructions `}</h3>
        <div>
        <textarea
          length="5"
          type="text"
          value={customize}
          onChange={(e) => setCustomize(e.target.value)}
          placeholder="Enter cooking instructions..."
        />
        </div>
        <div>
        <button onClick={()=>setisDialogOpeninstruction(false)}>Save</button>
        <button onClick={clearInstructions}>Clear</button>
        <button onClick={()=>setisDialogOpeninstruction(false)}>Close</button>
        </div>
        
      
      </Modal> */}
        </div>
      )}
      <ToastContainer />
    </div>

  );
}

export default Cart;