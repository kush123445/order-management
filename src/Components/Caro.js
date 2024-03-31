import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import food from './food.jpg'; // Assuming this is the path to your image
import pizza from './pizza.jpg';
import bir from './bir.jpg';
import pasta from './pasta.jpg';
import ppg from './ppg.png';
import aib from './aib.png';
import vada from './vada.png';
import holi from './holi.png';
import { Card,Paper , Image,Divider, Text, Badge, Button, Group } from '@mantine/core';
import { Chip, rem } from '@mantine/core';
import Lottie from "lottie-react";
import ban from "./ban.json";

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
            <div>
              {/* <img src={pizza} alt="Tea" style={{ width: '100%' }} /> */}
              <div style={{
  background: 'radial-gradient(circle at 10% 20%, rgb(10, 174, 227) 0%, rgb(124, 182, 255) 100.2%)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> {/* Adjusted padding and added font color */}
    <h2 style={{ fontWeight: 'bold', fontSize: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>BEST OF FLAVOURS</h2> {/* Changed to h2 for better hierarchy */}
    <p> Save & savour more from the top spots !</p> {/* Changed to p for better hierarchy */}
    <Chip
     
      color="red"
      variant="filled"
      defaultChecked
    > Order Now !
    </Chip>
  </div>
  <div style={{ width: '130px', height: '100px', overflow: 'visible', position: 'relative', margin: '2px', width: '60%' }}>
    <img src={aib} style={{ width: '129%', height: '118px', borderRadius: '8px', transition: 'transform 0.3s ease-in-out',marginLeft:'-18px', marginTop:'15px' }} />
  </div>
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

<div style={{
background:' radial-gradient(circle at 10% 20%, rgb(254, 255, 165) 0%, rgb(255, 232, 182) 90%)', 
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> {/* Adjusted padding and added font color */}
    <h2 style={{ fontWeight: 'bold', fontSize: '20px',color :'black' , textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>UP  TO  60% OFFF</h2> {/* Changed to h2 for better hierarchy */}
    <p style={{color:'black'}}>On yummy delights this weekend. </p> {/* Changed to p for better hierarchy */}
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


            
<div style={{
 background: 'linear-gradient(135deg, #FFFFFF, #CCFFCC)', 
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> {/* Adjusted padding and added font color */}
    <h2 style={{ fontWeight: 'bold', fontSize: '20px',color :'orange', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}> ROYAL FLAVOURS OF SOUTH INDIA</h2> {/* Changed to h2 for better hierarchy */}
    <p style={{color:'#17B169'}}>Spice up your day with a taste of South India !</p> {/* Changed to p for better hierarchy */}
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

            
            
            
<div style={{
 background: 'linear-gradient(135deg, #EE82EE, #FFFFFF)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '8px 8px 8px 8px',
  margin: '11px',
  padding: '15px', // Added padding for spacing
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Added box shadow for depth
}}>
  <div style={{ paddingRight: '20px', color: '#fff' }}> {/* Adjusted padding and added font color */}
  <h2 style={{ fontWeight: 'bold', fontSize: '20px',color :' goldenyellow', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}> HOLI CRAFTED FROM VIBRANT COLORS !</h2>
    <p style={{color:'black'}}>   Celebrate Holi with our exclusive offers!</p> {/* Changed to p for better hierarchy */}
    <Chip
     
      color="goldenrod"
      variant="filled"
      defaultChecked
    > Order Now !
    </Chip>
  </div>
  <div style={{ width: '130px', height: '100px', overflow: 'visible', position: 'relative', margin: '2px', width: '60%' }}>
    <img src={holi} style={{ width: '143%', height: '148px', borderRadius: '8px', transition: 'transform 0.3s ease-in-out',marginLeft:'-18px', marginTop:'15px',   transform: 'scaleX(-1)'  }} />
  </div>
</div>
          </Carousel>
          
          
        </div>
        
      </div>
      
    </div>
  );
};

export default MyCarousel;
