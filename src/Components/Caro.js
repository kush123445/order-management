import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import food from './paneer.png'; // Assuming this is the path to your image
import pizza from './pizza.jpg';
import bir from './bir.jpg';
import bir1 from './tikka.png';
import pasta from './pasta.jpg';
import ppg from './ppg.png';
import aib from './burger1.png';
import sand from './sandwich.png';
import dosa from './dosa.png';
import holi from './holi.png';
import { Card,Paper , Image,Divider, Text, Badge, Button, Group } from '@mantine/core';
import { Chip, rem } from '@mantine/core';
import Lottie from "lottie-react";
import ban from "./ban.json";
import './Caro.css';

const MyCarousel = ({ height }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = (e) => {
    const currentPosition = e.target.scrollTop;
    console.log(currentPosition);
    if (currentPosition <= 20) { // Check if scrolled within 20px from top
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        onScroll={handleScroll}
        style={{ overflowY: 'scroll', position: 'relative' }}
      >

        <div> {/* Make the carousel sticky */}
          <Carousel animation="slide" duration="800" interval="5000" >

          <div class="banner1">
    <div class="text1">
        <h2>Delicious Food on Fingertips</h2>
     
        <button class="clip-button1">Check Menu</button>
    </div>
    <div class="image1">
        <img src={aib} alt="Delicious Food" />
    </div>
</div>

<div class="banner2">
    <div class="text2">
        <h2>BUY 1  GET 1 FREE</h2>
        <p>Exclusive for you</p>
     
        <button class="clip-button2">Check Menu</button>
    </div>
    <div class="image2">
        <img src={sand} alt="Delicious Food" />
    </div>
</div>

<div class="banner3">
    <div class="text3">
        <h2> ROYAL FLAVOURS OF SOUTH INDIA</h2>
       
     
        <button class="clip-button3">Check Menu</button>
    </div>
    <div class="image3">
        <img src={dosa} alt="Delicious Food" />
    </div>
</div>
     
<div class="banner4">
    <div class="text4">
        <h2> Enjoy your meal now!</h2>
       
     
        <button class="clip-button4">Check Menu</button>
    </div>
    <div class="image4">
        <img src={bir1} alt="Delicious Food" />
    </div>
</div>
            {/* <div>
      

              <div style={{
                backgroundImage: 'linear-gradient(to right, #ffcc99, #ffcc99)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: '15px'
              }}>

                <Text style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '40px', paddingTop: '9px' }}> Paneer crafted from royal recipes!</Text>
                <img src={aib} style={{ width: '120px', height: '80px', marginLeft: '-10px' }} />
              </div>

            </div> */}

{/* <div style={{
background:' radial-gradient(circle at 10% 20%, rgb(254, 255, 165) 0%, rgb(255, 232, 182) 90%)', 
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  marginTop:'4px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> 
    <h2 style={{ fontWeight: 'bold', fontSize: '20px',color :'black' , textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>UP  TO  60% OFFF</h2> 
   
    <Chip
     
      color="red"
      variant="filled"
      defaultChecked
    > Order Now !
    </Chip>
  </div>
  <div style={{ width: '130px', height: '100px', overflow: 'visible', position: 'relative', margin: '2px', width: '60%' }}>
    <img src={ppg} style={{ width: '139%', height: '128px', borderRadius: '8px', transition: 'transform 0.3s ease-in-out',marginLeft:'-18px', marginTop:'15px' }} />
  </div>
</div> */}

            {/* <div>
            

              <div style={{
                backgroundImage: 'linear-gradient(to right, #ffcc99, #ffcc99)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: '15px'
              }}>

                <Text style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '40px', paddingTop: '9px' }}> Paneer crafted from royal recipes!</Text>
                <img src={aib} style={{ width: '120px', height: '80px', marginLeft: '-10px' }} />
              </div>

            </div> */}


            
{/* <div style={{
 backgroundColor: 'rgb(254, 161, 102)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  marginTop:'4px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> 
    <h2 style={{ fontWeight: 'bold', fontSize: '20px',color :'', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}> ROYAL FLAVOURS OF SOUTH INDIA</h2> 
    <Chip
     
      color="#f98820"
      variant="filled"
      defaultChecked
    > Order Now !
    </Chip>
  </div>
  <div style={{ width: '130px', height: '100px', overflow: 'visible', position: 'relative', margin: '2px', width: '60%' }}>
    <img src={vada} style={{ width: '143%', height: '148px', borderRadius: '8px', transition: 'transform 0.3s ease-in-out',marginLeft:'-18px', marginTop:'15px' }} />
  </div>
</div> */}
            {/* <div>
             

              <div style={{
                backgroundImage: 'linear-gradient(to right, #ffcc99, #ffcc99)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: '15px'
              }}>

                <Text style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '40px', paddingTop: '9px' }}> Paneer crafted from royal recipes!</Text>
                <img src={aib} style={{ width: '120px', height: '80px', marginLeft: '-10px' }} />
              </div>

            </div> */}

            
            

          </Carousel>
          
          
        </div>
        
      </div>
      
    </div>
  );
};

export default MyCarousel;