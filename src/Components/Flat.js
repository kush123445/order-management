import React, { useState, useEffect, useRef } from 'react';
import { Chip } from '@mantine/core';
import MyCarousel from './Caro';
import { TbMoodKidFilled } from "react-icons/tb";
import { MdLocalDining, MdRestaurant, MdChildFriendly } from 'react-icons/md'; 
import { BiFoodTag } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import n from "./n.json";
import aib from './vada.png';
import { Card,Paper , Image,Divider, Text, Badge, Button, Group } from '@mantine/core';


const Flat = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const data = [
    { id: '1', title: 'Veg' },
    { id: '2', title: 'Non Veg' },
   
    { id: '3', title: 'Chef Special' }, // Chef Special category
    { id: '4', title: 'Kids Choice' }, // Kids Choice category
    { id: '5', title: 'Combos' } // Combos category
    // Add more categories as needed
];

const iconMap1 = {
  'Veg': { icon: <BiFoodTag />, color: 'rgb(150 217 179) ' },
  'Non Veg': { icon: <MdLocalDining />, color: 'rgb(234 145 138)' },
  'Vegan': { icon: <BiFoodTag />, color: 'green' }, // Vegan category icon and color
  'Gluten-Free': { icon: <BiFoodTag />, color: 'gray' }, // Gluten-Free category icon and color
  'Chef Special': { icon: <BiFoodTag />, color: '#fdd66f' }, // Chef Special category icon and color
  'Kids Choice': { icon: <BiFoodTag />, color: '#f5986c' }, // Kids Choice category icon and color
  'Combos': { icon: <BiFoodTag />, color: 'purple' } // Combos category icon and color
  // Add more categories as needed
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
<div style={{  backgroundImage: 'linear-gradient(to right, #ffcc99, #ffcc99)',
display:'flex',
flexDirection:'row',
alignItems:'flex-start',
borderRadius: '0px 0px 40% 40%'}}>
  
      <Text style={{ fontWeight: 'bold', fontSize: '16px',paddingLeft:'40px' , paddingTop:'9px'}}> Paneer crafted from royal recipes!</Text>
      <img src={aib} style={{ width: '120px', height: '80px', marginLeft: '-10px' }} />
    </div>
    
{/* <Card shadow="sm" padding="lg" radius="md" withBorder style={{

backgroundImage: 'linear-gradient(to right, #ffffff, #ffffcc)',
display:'flex',
flexDirection:'row',
alignItems:'flex-start',
borderRadius: '0px 0px 25px 25px',
marginBottom:'0px',
height:'100px'


}}>
      

      <Group justify="space-between" mt="md" mb="xs" style={{width:'60%',marginTop:'3px'}} >
        <p style={{ fontWeight: 'bold', fontSize: '20px',marginTop:'2px' }}>
  Paneer crafted from royal recipes!
</p>

      </Group>


      <Group justify="space-between" mt="md" mb="xs" style={{ width: '40%' }}>
  <img src={aib} style={{ width: 'auto', height: '100%', marginLeft: '20px' }} />
</Group>

     

      
    </Card> */}
              {/* <div  style={{ width: '100%', height: '100%', position: 'relative', backgroundImage: `url(${gra})`, backgroundSize: 'cover' }} > */}
          
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
                 {/* <Lottie animationData={n} loop={true}  style={{ position: 'absolute', top: 0, left: -80, width: '100%', height: '100%', zIndex: 3 }}  /> */}
           
            {/* </div> */}
            <div style={{ height: '30px', backgroundColor: 'white', zIndex: '1' ,marginTop:'0px'}}> 
            
            <Divider my="xs" label="Taste your choice" labelPosition="center" style={{marginTop:'0px important!',color:'black'}} /></div>

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
                    marginBottom: '0px',
                    zIndex: 999,
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For IE and Edge
                    WebkitScrollbar: { display: 'none' } // For WebKit browsers
                }}
            >
           {data.map((item, index) => (
  <div key={item.id} style={{ paddingBottom: '20px', margin: '0px 5px', color: 'black', paddingTop: '3px' }} ref={index === data.length - 1 ? lastItemRef : null}>
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '120px', // Set width
      height: '100px', // Set smaller height
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: iconMap1[item.title.trim()].color,
      color: 'white',
      fontWeight: 'bold',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer'
    }}
    onClick={() => handleToggle(item.id)}>
      <img src={aib} alt="Food" style={{ width: '60px', height: '60px', marginBottom: '-5px' }} />
      <span>{item.title}</span>
    </div>
  </div>
))}
            </div>
        </div>
    );
};

export default Flat;
