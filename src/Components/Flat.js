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
            {isSticky && <div style={{ width: '100%', height: '100px', backgroundColor: 'white', position: 'fixed', top: 0, zIndex: 1000 }}>
            <MyCarousel height={60} />
                <div
                    className='flatlist'
                >
                    {data.map((item, index) => (
                        <div key={item.id} style={{paddingBottom:'20px' , margin:'0px 5px'}} >
                            <Chip variant='light' default={true} >
                                {item.title}
                            </Chip>
                        </div>
                    ))}
                </div>
            </div>}
            <div
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
                        <Chip variant='' defaultChecked>
                            {item.title}
                        </Chip>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Flat;
