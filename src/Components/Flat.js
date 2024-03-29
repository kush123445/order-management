import React, { useState, useEffect, useRef } from 'react';
import { Chip } from '@mantine/core';
import MyCarousel from './Caro';
import { TbMoodKidFilled } from "react-icons/tb";
import { MdLocalDining, MdRestaurant, MdChildFriendly } from 'react-icons/md'; 
import { BiFoodTag } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import n from "./n.json";
import gra from './gra.png';


const Flat = () => {
  const [checkedItems, setCheckedItems] = useState({});
    const data = [
        { id: '1', title: '  Veg  ' },
        { id: '2', title: ' Non Veg ' }
    ];
    const iconMap1 = {
      'Veg': { icon: <BiFoodTag />, color: 'green' },
      'Non Veg': { icon: <MdLocalDining />, color: 'red' },
    };
    
    const [isSticky, setIsSticky] = useState(false);
    const lastItemRef = useRef(null);
    const flatListRef = useRef(null);
    const handleToggle = (id) => {
      // Toggle the checked state for the clicked chip
      setCheckedItems((prevItems) => ({
        ...prevItems,
        [id]: !prevItems[id] || false,
      }));
    };
    useEffect(() => {
        const handleScroll = () => {
            const lastItemPosition = lastItemRef.current.getBoundingClientRect().bottom;
            if (lastItemPosition <= 20) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {isSticky && (
              <div  style={{ width: '100%', height: '140px',  position: 'fixed', top: 0, zIndex: 1000 ,backgroundColor:'white'}}>
              <div  style={{ width: '100%', height: '100%', position: 'relative', backgroundImage: `url(${gra})`, backgroundSize: 'cover' }} >
          
                {/* Overlay */}
                {/* <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '53%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black
                  zIndex: 2 // Ensure it's above other content
                }}></div> */}
                {/* Company name */}
                {/* <h2 style={{
                  position: 'absolute',
                  top: '5px',
                  left: '10px',
                  margin: 0,
                  fontWeight: 'bold',
                  color: 'white', // Set text color to white
                  textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', // Increase text shadow
                  zIndex: 3, // Ensure it's above the overlay
                  transition: 'all 1s ease', // Increase transition duration
                }}>
                  Trapti the Heroine
                </h2> */}
                {/* <p 
                style={{
                    position: 'absolute',
                    top: '25px',
                    left: '10px',
                    margin: 0,
                   
                    color: '#ccc', // Set text color to white
                    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', // Increase text shadow
                    zIndex: 3, // Ensure it's above the overlay
                    transition: 'all 1s ease', // Increase transition duration
                  }}> A good looking & dashing girl jisko kuch ni ata </p> */}
                {/* Carousel */}
                {/* <MyCarousel height={60} /> */}
                {/* Flatlist */}
                {/* <div className='flatlist'>
                  {data.map((item, index) => (
                    <div key={item.id} style={{ paddingBottom: '20px', margin: '0px 5px',color:'black',paddingTop:'3px' }} >
                      <Chip variant='light'  color={iconMap1[item.title.trim()].color} checked={checkedItems[item.id] || false} 
            onChange={() => handleToggle(item.id)} >
                        {iconMap1[item.title.trim()].icon} {item.title}
                      </Chip>
                    </div>
                  ))}
                </div> */}
                 <Lottie animationData={n} loop={true}  style={{ position: 'absolute', top: 0, left: -80, width: '100%', height: '100%', zIndex: 3 }}  />
           
            </div>
            </div>
            )}         <div
                ref={flatListRef}
                style={{
                    overflowX: 'scroll',
                    display: 'flex',
                    marginTop: isSticky ? '20px' : '00px', // Adjusted marginTop to stick below the red box
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    marginBottom: '10px',
                    zIndex: 999,
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For IE and Edge
                    WebkitScrollbar: { display: 'none' } // For WebKit browsers
                }}
            >
                {data.map((item, index) => (
                    <div key={item.id} style={{ paddingBottom: '20px', margin: '0px 5px',color:'black',paddingTop:'3px' }} ref={index === data.length - 1 ? lastItemRef : null}>
                      <Chip variant='light'  color={iconMap1[item.title.trim()].color} checked={checkedItems[item.id] || false} 
            onChange={() => handleToggle(item.id)} >
                        {iconMap1[item.title.trim()].icon} {item.title}
                      </Chip>
                    </div>
                  ))}
            </div>
        </div>
    );
};

export default Flat;
