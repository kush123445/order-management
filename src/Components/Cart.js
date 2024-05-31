import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { HashLoader } from 'react-spinners';
import axios from 'axios'
import './Cart.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaAngleUp, FaAngleDown ,FaPen} from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
//import Modal from 'react-modal';
import { MdDelete, MdOutlineCancel } from "react-icons/md";

import { useDisclosure } from '@mantine/hooks';
import { Modal, Drawer, TextInput, Button, Group, Text, Divider, Textarea, Accordion, ThemeIcon, Card, Image, Notification, Badge } from '@mantine/core';
import { Transition } from '@mantine/core';
import emptyCartSvg from './cook.png';
import { Timeline } from '@mantine/core';
import { FaGift } from 'react-icons/fa';
// import  IconMessageDots  from '@tabler/icons-react';
// import  IconGitBranch from '@tabler/icons-react';
import { SwipeableButton } from "react-swipeable-button";
import RequestForm from './Request';
// import { IconArrowLeft } from '@tabler/icons-react';
import boopSfx from './transition.mp3';
import useSound from 'use-sound';
//import SlideUpModal from './SlideUpModal.js';
import { Chip, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react'
import Drawerr from 'react-modern-drawer'
import DrawerR from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'intersection-observer';
//import useWindowSize from 'react-use/lib/useWindowSize'
//import Confetti from 'react-confetti'
import Lottie from "lottie-react";
import ff from "./ff.json";

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'
import { Watermark } from '@hirohe/react-watermark';

//Modal.setAppElement('#root');

const Cart = ({ cart, setCart,newCart,setNewCart }) => {
  const [play] = useSound(boopSfx);
  const [opened, { open, close }] = useDisclosure(false);
  //const { width, height } = useWindowSize()
  const [openedc, { openc, closec }] = useDisclosure(false);

  const [width, height] = useWindowSize()
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()


  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false)


  // const [orderAccepted, setOrderAccepted] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chat, setchat] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true); // State for accordion open/close
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open/close
  const [dialogInput, setDialogInput] = useState(''); // State to manage input in the dialog
  const [currentItem, setCurrentItem] = useState(null); // State to store the index of the current item
  const [customize, setCustomize] = useState('');
  const [removedItems, setRemovedItems] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [isOpenR, setIsOpenR] = React.useState(false)
  const [isDialogOpeninstruction, setisDialogOpeninstruction] = useState(false); // State to manage dialog open/close
  const [natof, setNatof] = useState(false); // Initialize natof state variable to false
  const [timelineData, setTimelineData] = useState([
    {
      date: "Order Placed",
      orderAccepted: false
    },
    {
      date: "Order Accepted",
      orderAccepted: true
    }
  ]);
  const navigate = useNavigate();


  const lottieRef = useRef();


  const handleChipClick = () => {
    navigate("/home");
  };

  const handleChipClickR = () => {
  setIsOpenR(true)
  console.error("h")
  setIsOpenR(prev=>prev)
  };
 

  const toggleDrawerR = () => {
    console.log("kgfjdhsbav")
    setIsOpenR((prevState) => !prevState)
}

  // Calculate total price
  // const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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

  const ConfirmOrder = async () => {


    
var table=1;
var tableName="kushal";

    const response = await axios.post('/generateOrder', { table: tableName }); // tableName is the variable containing the table name
    const { orderId } = response.data;

    console.log(orderId)

    setLoading(true);
    setOrderConfirmed(true);
  

    // Simulate a 2-second delay before setting orderPlaced to true
    await setTimeout(() => {
      // lottieRef.goToAndPlay(2, false)
      setOrderPlaced(true);
      setShowCancelButton(false);
      setCancelTimer(10);
      setchat(true)
      setchat(prev=>prev)
      // Hide loader after 2 seconds
      setLoading(false);
    }, 2000);
    
    if(timelineData.length!=0){

      setTimelineData([...timelineData, {
        date: "Add On",
        orderAccepted: false
      }]);
    }
    
  }

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,

    // animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice"
    // }
  // };
  useEffect(() => {
    console.log('Chat value changed:', chat);

    if(chat==true){
    setchat(true)}
  }, [chat]);
  // Function to cancel the order
  const cancelOrder = () => {

    if ("vibrate" in navigator) {
      // Vibrate the phone for 1000 milliseconds (1 second)
      navigator.vibrate(100);
    }

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
            setTimelineData([...timelineData, {
              date: "Add on 2",
              orderAccepted: false
            }]);
            setShowCancelButton(false);
      setOrderConfirmed(true);
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
    const maxLength = 30; // Maximum length of truncated description
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

  const [orderAccepted, setOrderAccepted] = useState(false);

  const orderAcceptedfn = () => {
    // setAccordionOpen(false) // Clear the interval
    const timer = setTimeout(() => {
      setOrderAccepted(true);
      console.log("kushal kjhkj bmh  khandelwal")
    }, 10000);
    return () => clearTimeout(timer);
  }

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

  useEffect(()=>{
    if(orderConfirmed==true){
      if(cart!=""){
    setNewCart((prev)=>[...prev,...cart]);
      }
    // setCart("");
    }
  },[orderConfirmed,cart])
  useEffect(()=>{
    if(orderConfirmed==true){
      // if(newCart!="" && cart!=""){
    // setNewCart(cart);
    setCart([]);
      // }
    }
  },[orderConfirmed,cart])
  useEffect(() => {
    if (cart.length > 0 && orderConfirmed!=true) {
      localStorage.setItem('orderPlaced', JSON.stringify(cart));
    }else if (cart.length !=0 && orderConfirmed==true){
      localStorage.setItem('orderPlaced', JSON.stringify([]));
        
    }
  }, [orderConfirmed,cart])
  useEffect(() => {
    if (newCart.length > 0) {
      localStorage.setItem('orderConfirmed', JSON.stringify(newCart));
    }
  }, [orderConfirmed,cart])

  const saving = () => {
    close();
    setisDialogOpeninstruction(false);
  }

  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is visible
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (

    <div>

      {loading == true ? (

        <div className="loader-container" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* <HashLoader color={'#F98820'} loading={loading} css={override} size={70} /> */}
          <Lottie animationData={ff} loop={true} style={{height:"900px",width:"900px"}}  goTOAndPlay/>
        </div>
      ) : (

        <div>



          {(cart.length === 0  && newCart.length === 0) ? (
            <div className="center-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

              <img src={emptyCartSvg} alt="Empty Cart" style={{ width: '400px', height: '400px' }} />
              <p className="empty-cart-message">Your cart is empty</p>
              <div className="bottom-svg-container" style={{ marginTop: 'auto' }}>
                <svg className="moving-svg" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 H1000 V50 H0 Z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="cart-page" style={{ paddingBottom: '100px' }}>


              {(cart.length !== 0 && !orderPlaced && !showCancelButton) && (



                <div style={{ marginBottom: '20px', overflow: 'hidden', height: '50px', justifyContent: 'center', alignItems: 'center' }} ref={buttonRef}>
                  <div style={{ animation: isVisible ? 'slideLeft 0.5s ease' : 'none', display: 'inline-block' }}>
                    <Button variant='light' color="yellow" fullWidth style={{ height: '49px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', fontSize: 'small', color: 'white', fontWeight: 'bold', marginLeft: '5px' }}>
                        <FaGift style={{ marginRight: '5px', fontSize: '1.6em', color: 'orange' }} />
                        <span style={{ fontSize: '1.1em', textTransform: 'uppercase', letterSpacing: '1px', color: 'black' }}>
                          (Offer: 10% discount for you)
                        </span>
                      </span>
                    </Button>
                  </div>
                </div>
              )}
              <div style={{
                display: 'flex', alignItems: 'center', width: '100%', height: '50px',
                backgroundImage: 'linear-gradient(to right, #f46b45 0%, #eea849  51%)',
                position: 'fixed', top: '0', marginLeft: '-20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '0px 0px 10px 10px'
              }}>
                <h2 className="menu-titleC">Your Orders</h2>
              </div>
              {/* <svg className="moving-svg" width="100%" height="50" xmlns="http://www.w3.org/2000/svg">

            <path d="M0 25 C50 0, 150 50, 200 25 C250 0, 350 50, 400 25 C450 0, 550 50, 600 25 C650 0, 750 50, 800 25 C850 0, 950 50, 1000 25 L1000 50 L0 50 Z" />
          </svg> */}

              <div className={`accordion-header ${!accordionOpen ? 'closed' : ''}`} onClick={() => setAccordionOpen(!accordionOpen)}>
                <span className="accordion-icon">{accordionOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                <h3 className="category-name">Order List</h3>

              </div>

              {accordionOpen && (
                <>
                  {(cart.length!="" && !orderPlaced && !showCancelButton) || (cart.length!="" && orderPlaced && showCancelButton) ? (
                    <ul className="cart-items">
                    {newCart.length!="" && newCart.map((item, index) => (
                        <li key={index} style={{backgroundColor:"#f1f3f5", borderRadius:"5px",paddingLeft:"5px"}} className={`cart-item ${removedItems.includes(item.id) ? 'removed' : ''}`}>
                          <div className="item-details">
                            <p style={{ marginBottom: '0px' }} className="item-name">{item.name}</p>
                            <p className="item-price"> ₹ {item.price}</p>

                            {/* {!isDialogOpen && item.instruction && <div className='cooking-instructions'>{item.instruction}</div>} */}
                          </div>
                          <div className="quantity-actions">
                            <div className='counterbox' style={{backgroundColor:"#f1f3f5"}} >
                              <button className="quantity-btn" style={{color:"#ADB5BD"}} disabled onClick={() => decreaseQuantity(index)}>
                                <FaMinus />
                              </button>
                              <span className="quantity" style={{color:"#ADB5BD"}}>{Math.max(item.quantity, 0)}</span>
                              <button className="quantity-btn" style={{color:"#ADB5BD"}} disabled onClick={() => increaseQuantity(index)}>
                                <FaPlus />
                              </button>
                            </div>

                            <button className="delete-btn " disabled style={{ background: '#f1f3f5', border: 'none', color: "#ADB5BD", fontSize: "23px" }} onClick={() => { toggleStrikeThrough(item.id); setTimeout(() => deleteItem(index), 500); }}>
                              <MdDelete />
                            </button>
                          </div>
                        </li>
                      ))}
                      {cart.map((item, index) => (
                        <li key={index} className={`cart-item ${removedItems.includes(item.id) ? 'removed' : ''}`}>
                          <div className="item-details">
                            <p style={{ marginBottom: '0px' }} className="item-name">{item.name}</p>
                            <p className="item-price"> ₹ {item.price}</p>

                            {/* {!isDialogOpen && item.instruction && <div className='cooking-instructions'>{item.instruction}</div>} */}
                          </div>
                          <div className="quantity-actions">
                            <div className='counterbox' >
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

                      <li className="add-items-button" style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px', marginBottom: '12px' }}>

                        <Chip color="green" variant="light" defaultChecked checked={true} icon={<FaPlus />} fx={'md'} onClick={handleChipClick}>
                          Add More
                        </Chip>
                        
                        <div className="itemkp">Total : <span style={{ color: 'darkslategrey', marginRight: '0px' }}>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span> </div>
                      </li>





                      <div className="containerc">


                        <div className="itemk">
                          <button className="customise-instructions" onClick={open}>
                            <FontAwesomeIcon icon={faPlus} /> {customize == "" ? "Add Instructions" : "Edit Instructions"}
                          </button>
                          {!isDialogOpeninstruction && (
                            <div>
                              <div style={{ fontSize: '12px' }}>{renderDescription(customize)}</div>
                            </div>
                          )}
                        </div>

                      </div>
                    </ul>) : (

<>


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
                      {newCart.map((item, index) => (
                        <li key={index} className="invoice-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">{item.quantity}</span>
                          <span className="item-price">₹ {item.price * item.quantity}</span>
                        </li>
                      ))}
                      <li className="invoice-total">
                        <span>Total:</span>
                        <span>₹ {newCart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                      </li>
                      <li className="order-more invoice-total">
                      <Chip color="black" variant='filled' defaultChecked checked={true} icon={<FaPen />} onClick={handleChipClickR} >Request Page </Chip>
                      <Chip color="green" variant='filled' defaultChecked icon={<FaPlus />} onClick={handleChipClick} >Order More</Chip>
                     
                      </li>
                    </ul>
                    <DrawerR
                open={isOpenR}
                onClose={toggleDrawerR}
                direction='left'
                className='bla bla bla'
                size="100vw"
            >
                <RequestForm close={toggleDrawerR} setTimelineData={setTimelineData} timelineData={timelineData}/>
            </DrawerR>

  <div style={{ marginBottom: '25px', marginTop: '2px', marginLeft: '7px' }}>
    <Text style={{ fontSize: '12px' }} c="dimmed" >
      <span style={{ verticalAlign: 'super', color: 'red' }}>*</span>
      Please note: The final bill includes additional charges such as taxes and GST.
    </Text>
   
  </div>
  
  </>

                  )}



{(!orderPlaced && !showCancelButton) && (
                  <div style={{ marginBottom: '25px', marginTop: '-12px', marginLeft: '7px' }}>
                    <Text style={{ fontSize: '12px' }} c="dimmed" >
                      <span style={{ verticalAlign: 'super', color: 'red' }}>*</span>
                      Please note: The final bill includes additional charges such as taxes and GST.
                    </Text>
                  </div>
)}

                  {(!orderPlaced && !showCancelButton) && (
                    <div>
                      <Card shadow="sm" padding="lg" radius="md" withBorder mt={5}>


                        <Group justify="space-between" mt="md" mb="xs">

                          <Badge color="#f98820">Cancel & Modify Policy </Badge>
                        </Group>

                        <Text size="sm" c="dimmed">
                          <em style={{ color: 'red' }}>Note : </em>Upon placing your order, you will have a 60-second window to confirm it. After the order is confirmed, you will have the option to submit a  request. If the admin approves your request, it will be processed accordingly.
                          Please note that no refunds will be issued for cancellations made after 60 seconds of order confirmation.
                        </Text>

                      </Card>
                    </div>
                  )
                  }
                </>
              )}


              <div className="cart-total">

                {/* {!orderPlaced && !showCancelButton && cart.length != 0 && (
          <button className="customise-instructions" onClick={open} >Customise</button>
        )} */}
                {!orderPlaced && !opened && !showCancelButton && cart.length != 0 && (



                  <div style={{ position: 'fixed', bottom: '0px', left: '0px', borderRadius: '35px', width: '100vw' }}>

                    <Card shadow="sm" padding="lg" radius="md" withBorder mt={5} style={{
                      borderRadius: '25px 25px 0px 0px',
                      margin: '5px 0px',
                      marginBottom: '0px'
                    }}>


                      <Group justify="space-between" mt="md" mb="xs">

                        <Badge color="#f98820">Cancellation Policy </Badge>
                        <div className="w-[500px] h-[100px] bg-white"
                        >
                          <SwipeableButton
                            onSuccess={placeOrder} //callback function
                            text={'Slide to order | ₹ ' + `${cart.reduce((total, item) => total + item.price * item.quantity, 0)}`}//string 
                            text_unlocked="yeee" //string
                            color="#f98820" //css hex color
                          />
                        </div>
                      </Group>



                    </Card>
                 
                  </div>
                )}


                {showCancelButton && (


                  <Drawerr
                    open={showCancelButton}
                    onClose={toggleDrawer}
                    direction='bottom'
                    className='bla bla bla'
                    overlayOpacity='0.5'

                    style={{ display: 'flex', widh: '100vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0px -4px 8px rgba(0, 0, 255, 0.2)', maxWidth: '100vw' }}
                  >

                    <div>
                      <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        size={45}
                        strokeWidth={5} 
                        style={{ marginRight: '10px' }}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', marginTop: '15px', marginBottom: '15px' }}>

                      <Chip variant='light' defaultChecked color="red" onClick={cancelOrder}>
                        Cancel Order
                      </Chip>


                      <Chip variant='' defaultChecked color="green" onClick={ConfirmOrder}>
                        Confirm Order
                      </Chip>

                    </div>

                    <div>
                      <Text size="xs" mt={5}>  To ensure , please confirm your order within 60 seconds.</Text>
                    </div>
                  </Drawerr>



                )}

                {orderPlaced && timelineOpen && (

                  <>
                    {orderAcceptedfn()}
                  
                    <div className="vertical-timeline-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <VerticalTimeline className="custom-timeline">
                      {/* <VerticalTimelineElement
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
                        contentStyle={{ background: orderAccepted ? '#D0FFBC' : '#f0f0f0', color: 'black', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                        contentArrowStyle={{ borderRight: orderAccepted ? '7px solid #4CAF50' : '7px solid transparent' }}
                        date="Order Accepted"
                        iconStyle={{ background: '#4CAF50', color: '#fff' }}
                        icon={<div className="circle-icon">2</div>}
                      /> */}
  {timelineData.map((item, index) => (
    <VerticalTimelineElement
      key={index}
      className=""
      contentStyle={{ background: item.orderAccepted ? '#D0FFBC' : '#f0f0f0', color: 'black', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      contentArrowStyle={{ borderRight: item.orderAccepted ? '7px solid #4CAF50' : '7px solid transparent' }}
      date={item.date}
      iconStyle={{ background: '#4CAF50', color: '#fff' }}
      icon={<div className="circle-icon">{index + 1}</div>}
    />
  ))}
                    </VerticalTimeline>
                    </div>
                    

                  </>

                )}
              </div>

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
</div>
            
          )}



        </div>
      )}



      <ToastContainer />
    </div>

  );
}
const override = css`
  display: block;
  margin: 0 auto;
`;

export default Cart;