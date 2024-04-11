import React, { useState, useEffect, useRef } from 'react';
import MyCarousel from './Caro';
import { RxCross2 } from "react-icons/rx";
import { TbMoodKidFilled } from "react-icons/tb";
import { MdLocalDining, MdRestaurant, MdChildFriendly } from 'react-icons/md'; 
import { BiFoodTag } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import n from "./n.json";
import aib from './vada.png';
import { Card,Paper , Image,Divider, Text, Badge, Button, Group } from '@mantine/core';
import SearchBox from './SearchBox';
import vegIcon from './icons8-veg-48.png';
import { FaSquareCaretUp } from "react-icons/fa6";


const Flat = ({ isFilterSetting , setIsFilterSetting,searchText , setSearchText }) => {
  
  const [checkedItems, setCheckedItems] = useState(null);
  const [clickedButtonIds, setClickedButtonIds] = useState([]);


  const data = [
    { id: '1', title: 'Veg',icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="20" viewBox="0 0 30 30"
    style={{ fill: '#40C057', marginRight: '2px',fontWeight:'bold', paddingBottom:'3px'}}>
    <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
  </svg>},
    { id: '2', title: 'Non Veg' ,icon:<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="15" viewBox="0 0 30 30"
    style={{ fill: '#FF5252', marginRight: '2px',fontWeight:'bold', paddingBottom:'3px' }}>
    <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
  </svg>},
    { id: '3', title: 'Chef Special', icon: '👨🏻‍🍳' }, // Chef Special category
    { id: '4', title: 'Kids Choice',icon: '🧸' }, // Kids Choice category
    { id: '5', title: 'Combos',icon: '✨' } // Combos category
    // Add more categories as needed
];

const iconMap1 = {
  'Veg': { icon: <BiFoodTag/>, color: 'rgb(150 217 179) ' },
  'Non Veg': { icon: <MdLocalDining />, color: 'rgb(234 145 138)' },
  'Chef Special': { icon: <BiFoodTag />, color: '#fdd66f' }, // Chef Special category icon and color
  'Kids Choice': { icon: <BiFoodTag />, color: '#f5986c' }, // Kids Choice category icon and color
  'Combos': { icon: <BiFoodTag />, color: 'purple' } // Combos category icon and color
  // Add more categories as needed
};
    
    const [isSticky, setIsSticky] = useState(false);
    const lastItemRef = useRef(null);
    const flatListRef = useRef(null);
    const handleToggle = (item) => {
      // Toggle the checked state for the clicked chip
      // setCheckedItems((prevItems) => ({
      //   ...prevItems,
      //   [item.id]: !prevItems[item.id] || false,
      // }));

    const index = clickedButtonIds.indexOf(item.id);
    if (index === -1) {
      // If the button is not already clicked, add its ID to the array
      setClickedButtonIds([...clickedButtonIds, item.id]);
    } else {
      // If the button is already clicked, remove its ID from the array
      const updatedButtonIds = [...clickedButtonIds];
      updatedButtonIds.splice(index, 1);
      setClickedButtonIds(updatedButtonIds);
    }

      if(item.title==='Veg'){
        setIsFilterSetting({ ...isFilterSetting, isVeg: !isFilterSetting.isVeg });
        console.log("clicked")
      }else if(item.title==='Non Veg'){
        console.log(isFilterSetting.isNonveg)
        setIsFilterSetting({ ...isFilterSetting, isNonveg: !isFilterSetting.isNonveg });
        console.log("clicked nonveg")
      }
      else if(item.title==='Chef Special'){
        console.log(isFilterSetting.isChefSpecial)
        setIsFilterSetting({ ...isFilterSetting, isChefSpecial: !isFilterSetting.isChefSpecial });
        console.log("clicked nonveg")
      }
      else if(item.title==='Kids Choice'){
        console.log(isFilterSetting.isKidsChoice)
        setIsFilterSetting({ ...isFilterSetting, isKidsChoice: !isFilterSetting.isKidsChoice });
        console.log("clicked nonveg")
      }
      else if(item.title==='Combos'){
        console.log(isFilterSetting.isCombos)
        setIsFilterSetting({ ...isFilterSetting, isCombos: !isFilterSetting.isCombos });
        console.log("clicked nonveg")
      }
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
              <div  style={{ 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                width: '100%', height: '120px',  position: 'fixed', top: 0, zIndex: 1000 ,backgroundColor:'white',paddingTop:'15px'}}>
{/* <div style={{  backgroundImage: 'linear-gradient(to right, #ffcc99, #ffcc99)',
display:'flex',
flexDirection:'row',
alignItems:'flex-start',
borderRadius: '0px 0px 40% 40%'}}>
  
      <Text style={{ fontWeight: 'bold', fontSize: '16px',paddingLeft:'40px' , paddingTop:'9px'}}> Paneer crafted from royal recipes!</Text>
      <img src={aib} style={{ width: '120px', height: '80px', marginLeft: '-10px' }} />
    </div> */}
    
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
            {/* <div style={{ height: '25px', backgroundColor: 'white', zIndex: '1' ,marginTop:'0px'}}> 
            
            <Divider my="xs" label="Taste your choice" labelPosition="center" style={{marginTop:'0px important!',color:'black'}} />
            </div> */}
            <SearchBox searchText={searchText} setSearchText={setSearchText}/>

      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap',paddingLeft:"10px", backgroundColor: 'white', zIndex: '1' ,marginTop:'10px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'}}>
      {data.map((item, index) => (
    <button key={item.id} className="outline-btnfilter" onClick={() => handleToggle(item)} style={{color:'Black',
    backgroundColor: clickedButtonIds.includes(item.id) ? 'rgb(255, 192, 203, 0.2)' : 'white',
    border: clickedButtonIds.includes(item.id) ? '2px solid #ff9999' : '2px solid gray'
    
  
 }}>{item.icon}{item.title}{<span> {clickedButtonIds.includes(item.id)? <RxCross2 /> : ''}</span>}</button>
))}
</div>
            </div>
            
            
           
            )}        
             <div
                ref={flatListRef}
                style={{
                    overflowX: 'scroll',
                    display: 'flex',
                    marginTop: isSticky ? '20px' : '00px', // Adjusted marginTop to stick below the red box
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    marginBottom: '0px',
                    zIndex: 3,
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    WebkitScrollbar: { display: 'none' } 
                }}
            >
           {data.map((item, index) => (
  <div key={item.id} 
  style={{ paddingBottom: '20px', margin: '0px 5px', color: 'black', paddingTop: '3px',paddingLeft:'3px' }} 
  ref={index === data.length - 1 ? lastItemRef : null}
  >
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '137px', // Set width
      height: '100px', // Set smaller height
      padding: '10px',
      borderRadius: '8px',
      // backgroundColor: iconMap1[item.title.trim()].color,
      color: 'black',
      fontWeight: 'bold',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      backgroundColor:clickedButtonIds.includes(item.id) ? 'rgb(255, 192, 203, 0.2)' : (iconMap1[item.title.trim()].color),
      border: clickedButtonIds.includes(item.id) ? '2px solid #ff9999' : ''
    }}
    onClick={() => handleToggle(item)}>
      <img src={aib} alt="Food" style={{ width: '60px', height: '60px', marginBottom: '-5px' }}  />
      <span>{item.title}{<span> {clickedButtonIds.includes(item.id)? <RxCross2 /> : ''}</span>}</span>
    </div>
  </div>
))}
            </div>
        </div>
    );
};

export default Flat;
