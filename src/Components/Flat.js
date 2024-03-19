import React, { useState, useEffect, useRef } from 'react';
import { Chip } from '@mantine/core';
import MyCarousel from './Caro';

const Flat = () => {
    const data = [
        { id: '1', title: '  Veg  ' },
        { id: '2', title: ' Non Veg ' },
        { id: '3', title: " Chef's Special " },
        { id: '4', title: ' Kids Choice ' },
        { id: '5', title: ' Super snacks ' },
        // More items...
    ];
    const [isSticky, setIsSticky] = useState(false);
    const lastItemRef = useRef(null);
    const flatListRef = useRef(null);

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
              <div style={{ width: '100%', height: '100px', backgroundColor: 'white', position: 'fixed', top: 0, zIndex: 1000 }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '55%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black
                  zIndex: 2 // Ensure it's above other content
                }}></div>
                {/* Company name */}
                <h2 style={{
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
                </h2>
                <p 
                style={{
                    position: 'absolute',
                    top: '25px',
                    left: '10px',
                    margin: 0,
                   
                    color: '#ccc', // Set text color to white
                    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', // Increase text shadow
                    zIndex: 3, // Ensure it's above the overlay
                    transition: 'all 1s ease', // Increase transition duration
                  }}> A good looking & dashing girl jisko kuch ni ata </p>
                {/* Carousel */}
                <MyCarousel height={60} />
                {/* Flatlist */}
                <div className='flatlist'>
                  {data.map((item, index) => (
                    <div key={item.id} style={{ paddingBottom: '20px', margin: '0px 5px' }} >
                      <Chip variant='light' default={true} color='#f98820'>
                        {item.title}
                      </Chip>
                    </div>
                  ))}
                </div>
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
                    <div key={item.id} style={{ margin: '10px 20px' }} ref={index === data.length - 1 ? lastItemRef : null}>
                        <Chip variant='' defaultChecked color="#f98820">
                            {item.title}
                        </Chip>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Flat;