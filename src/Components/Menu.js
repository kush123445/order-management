import React, { useState, useEffect, useRef } from 'react';
import './Menu.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { FaBook, FaShoppingCart } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaAngleDown, FaAngleUp, FaPlus, FaMinus } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashLoader
} from 'react-spinners';
import { Divider } from '@mantine/core';
import emptyCartSvg from './cook.png';
import { FaMicrophone } from 'react-icons/fa';
import { css } from '@emotion/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import tea from './aib.png';
import { FaSearch } from 'react-icons/fa';
// import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './cook.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-material-ui-carousel';
import MyCarousel from './Caro.js'
import Flat from './Flat.js';
import Lottie from "lottie-react";
import jj from "./jj.json";
import ReactSearchBox from "react-search-box";
import { FaTimes } from 'react-icons/fa';

const Menu = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const recognition = useRef(null);

  const handleVoiceSearch = () => {
    // Ensure browser support for SpeechRecognition
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Please use a supported browser.");
      return;
    }
    setIsMicActive(true);
    // Initialize SpeechRecognition
    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setSearchText(transcript);
      recognition.current.stop();

      // Filter suggestions based on the voice input
      const filteredSuggestions = menuItems.filter(item =>
        item.name.toLowerCase().includes(transcript.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    };
    recognition.current.onend = () => {
      setIsMicActive(false); // Set isMicActive to false when voice recognition ends
    };
  
    recognition.current.start();
  };


  const handleInputChange = (event) => {
    setIsTyping(true);
    const inputText = event.target.value;
    setSearchText(inputText);
    setShowClearButton(inputText.length > 0);

    // Filter suggestions based on the input text
    const filteredSuggestions = menuItems.filter(item =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };



  const handleClearInput = () => {
    setSearchText('');
    setShowClearButton(false);
    setSuggestions([]);
  };
  const handleSearch = () => {
    // Implement your search logic here using the searchText state
    console.log("Perform search for:", searchText);
  };
  const handleBlur = () => {
    setIsTyping(false);
    // Other blur logic
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]);
  };

  const handleOrderClick = async () => {

    if ("vibrate" in navigator) {
      // Vibrate the phone for 1000 milliseconds (1 second)
      navigator.vibrate(100);
    }
    setLoading(true);

    // Simulate a 2-second delay before setting orderPlaced to true
    await setTimeout(() => {
      navigate('/cart');
      setLoading(false)
    }, 3000);

  };





  // Function to handle clicking on a category item
  const handleClick = (category) => {
    setSelectedCategory(category);
    scrollToCategory(category);
  };


  const menuItems = [
    { id: 1, category: "Breads", name: "Parantha", description: "Flaky, layered Indian bread filled with rich buttery taste. Perfectly pairs with spicy curries or creamy gravies.", price: 5, half: false, veg: true },
    { id: 2, category: "Breads", name: "Naan", description: "Soft, leavened Indian bread traditionally cooked in a tandoor. Its pillowy texture and slightly charred edges make it an irresistible accompaniment to any meal.", price: 3, half: false, veg: true },
    { id: 3, category: "Snacks", name: "Samosa", description: "Crispy pastry filled with spiced potatoes, peas, and aromatic spices. A popular street food snack enjoyed across the Indian subcontinent.", price: 2, half: false, veg: true },
    { id: 4, category: "Snacks", name: "Pakora", description: "Crispy fried fritters made with assorted vegetables coated in a spiced chickpea flour batter. Perfect for rainy days or as a tea-time snack.", price: 3, half: false, veg: true },
    { id: 5, category: "Main Course", name: "Dal Makhani", description: "Creamy lentil curry cooked with butter, cream, and aromatic spices. Slow-cooked to perfection, it's a comforting dish that pairs well with rice or naan.", price: 8, half: true, veg: true },
    { id: 6, category: "Main Course", name: "Paneer Tikka", description: "Cubes of paneer marinated in a flavorful blend of yogurt and spices, then grilled to perfection. Served with mint chutney, it's a vegetarian delight.", price: 10, half: false, veg: true },
    { id: 7, category: "Main Course", name: "Chicken Biryani", description: "Fragrant basmati rice cooked with succulent chicken pieces, aromatic spices, and caramelized onions. Served with raita and a squeeze of lemon, it's a festive meal.", price: 12, half: false, veg: false },
    { id: 8, category: "Drinks", name: "Mango Lassi", description: "Refreshing yogurt-based drink blended with ripe mangoes, sugar, and a touch of cardamom. A perfect thirst-quencher on a hot summer day.", price: 4, half: true, veg: true },
    { id: 9, category: "Drinks", name: "Masala Chai", description: "Spiced Indian tea brewed with aromatic spices like cardamom, cinnamon, cloves, and ginger. Served with milk and sugar, it's a comforting beverage.", price: 2, half: false, veg: true },
    { id: 10, category: "Appetizers", name: "Chicken Wings", description: "Crispy chicken wings marinated in a tangy sauce, then deep-fried to perfection. Served with a side of ranch dressing, they are a favorite at any gathering.", price: 6, half: true, veg: false },
    { id: 11, category: "Appetizers", name: "Bruschetta", description: "Toasted bread slices topped with a flavorful mixture of diced tomatoes, garlic, basil, and olive oil. A classic Italian appetizer that bursts with fresh flavors.", price: 5, half: false, veg: true },
    { id: 12, category: "Appetizers", name: "Caprese Salad", description: "Simple yet elegant salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and a drizzle of balsamic glaze. A light and refreshing starter.", price: 7, half: false, veg: true },
    { id: 13, category: "Desserts", name: "Gulab Jamun", description: "Soft and spongy milk balls soaked in a fragrant sugar syrup flavored with rose water and cardamom. A decadent Indian sweet enjoyed during festivals and celebrations.", price: 3, half: false, veg: true },
    { id: 14, category: "Desserts", name: "Rasgulla", description: "Spongy balls made from cottage cheese kneaded into a dough, then cooked in a sugar syrup until soft and spongy. A popular Bengali sweet enjoyed chilled.", price: 3, half: true, veg: true },
    { id: 15, category: "Desserts", name: "Kheer", description: "Creamy Indian rice pudding made with fragrant basmati rice, milk, sugar, and flavored with cardamom, saffron, and nuts. A delightful sweet treat served chilled or warm.", price: 4, half: false, veg: true },
  ];

  const totalCounts = menuItems.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  // Extract unique categories
  const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
  const initialAccordionState = {};
  uniqueCategories.forEach(category => {
    initialAccordionState[category] = true; // Start with all accordions open
  });
  const [accordionState, setAccordionState] = useState(initialAccordionState);

  // Function to toggle accordion for a specific category
  const toggleAccordion = (category) => {
    setAccordionState(prevState => ({
      ...prevState,
      [category]: !prevState[category] // Toggle the accordion state for the category
    }));
  };
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + (cartItem.half ? 0.5 : 1) };
        }
        return cartItem;
      }));
    } else {
      setCart([...cart, { ...item, quantity: (item.half ? 0.5 : 1) }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
      } else {
        setCart(cart.map(cartItem => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - (cartItem.half ? 0.5 : 1) };
          }
          return cartItem;
        }));
      }
    }
  };


  const toggleDescriptionExpansion = (itemId) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const renderDescription = (description, itemId) => {
    const maxLength = 50; // Maximum length of truncated description
    const shouldTruncate = description.length > maxLength;

    return (
      <div style={{ color: 'gray' }}>
        {shouldTruncate && !expandedDescriptions[itemId] ? (
          <>
            <span >{`${description.substring(0, maxLength)} `}</span>
            <button className="read-more-button" style={{ background: 'white', border: 'none', color: 'black', padding: '0px' }} onClick={() => toggleDescriptionExpansion(itemId)}>Read more...</button>
          </>
        ) : (
          <>
            <span>{description}</span>
            {shouldTruncate && (
              <button className="read-more-button" style={{ background: 'white', border: 'none', color: 'black', padding: '0px' }} onClick={() => toggleDescriptionExpansion(itemId)}>Read less</button>
            )}
          </>
        )}
      </div>
    );
  }
  // const [searchText, setSearchText] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  const handleInputChange1 = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
    setShowClearButton(inputText.length > 0);
    // You may want to implement your autocomplete logic here
  };

  const handleClearInput1 = () => {
    setSearchText('');
    setShowClearButton(false);
  };

  // const handleSearch = () => {
  //   // Implement your search logic here using the searchText state
  //   console.log("Perform search for:", searchText);
  // };

  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log(uniqueCategories)
  };
  useEffect(() => {
    // console.log("kushal",cart)
    if (cart.length > 0) {
      localStorage.setItem('orderPlaced', JSON.stringify(cart));
    }
  }, [cart])

  // main return 
  return (
    <div >

      {loading == true ? (

        <div className="loader-container" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* <HashLoader
 color={'#F98820'} loading={loading} css={override} size={70} /> */}
          <Lottie animationData={jj} loop={true} style={{ height: "400px", width: "400px" }} />
        </div>
      ) : (

        <div>

          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
      <input 
        type="text" 
        value={searchText} 
        onChange={handleInputChange} 
        placeholder="Search..." 
        style={{ marginRight: '10px' }} 
      />
      <button onClick={handleSearch}>Search</button>
      <FaMicrophone style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleVoiceSearch} />
    </div> */}
          <header style={{
            backgroundColor: '#fff',
            color: '#333',
            padding: '20px 20px 10px 20px',


          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <img src={tea} alt="Company Logo" style={{
                width: '40px',
                height: '40px',
                marginRight: '10px',
              }} />
              <div style={{ display: 'flex', flexDirection: "column" }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}>GoodCorp</span>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  margin: '0px 0 0',
                }}>Your trusted partner</p>
              </div>
            </div>
          </header>
        
            {/* <div style={{width:'90%'}}> <ReactSearchAutocomplete
            items={menuItems}
            value="kushal"
            autoFocus
           placeholder='search food...'
          />
          </div> */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgb(223, 225, 229)',
        borderRadius: '24px',
        backgroundColor: '#fafafa',
        color: 'rgb(33, 33, 33)',
        fontSize: '16px',
        fontFamily: 'Arial',
        zIndex: '10',
        marginLeft: '6px',
        width: '86%',
        boxShadow: isTyping ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none', // Apply box shadow when typing
        transition: 'box-shadow 0.3s', // Smooth transition for box shadow
        
      }}
    >
      {/* Your input field and other elements */}
      <FaSearch style={{ position: 'absolute', left: '10px', color: '#aaa', marginRight: '20px' }} />
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={handleBlur}
        placeholder="Search..."
        style={{ padding: '8px 30px 8px 30px', width: '100%', border: 'none', outline: 'none', borderRadius: '24px', backgroundColor: 'transparent' }}
      />
      {showClearButton && (
        <FaTimes
          style={{ position: 'absolute', right: '10px', cursor: 'pointer', color: '#aaa' }}
          onClick={handleClearInput}
        />
      )}
    </div>


              {suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '48px', left: '10px', width: '94%', backgroundColor: '#fafafa', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '5px', zIndex: '20' }}>
                  {suggestions.map(suggestion => (
                    <div
                      key={suggestion.id}
                      style={{ padding: '8px 16px', borderBottom: '1px solid #eee', cursor: 'pointer',color:'#4f4f4f' }}
                      onClick={() => handleSuggestionClick(suggestion.name)}
                    >
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
                <div>    <FaMicrophone style={{ marginLeft: '3px', cursor: 'pointer', marginTop: '2px', fontSize: '26px', color: 'grey' 
              , color: isMicActive ? 'red' : 'grey', // Change color when active
              animation: isMicActive ? 'pulse 1s infinite' : 'none' // Smooth transition for color change
            }} onClick={handleVoiceSearch} /> </div>
            </div>
          

        
          {/* <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={menuItems}
        leftIcon={<FaSearch />}
        callback={(record) => console.log(record)}
      /> */}


          {/* <div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  padding: '20px',
  background: 'linear-gradient(135deg, #FFE5CC, #FFFFFF)', // Off white background color
  borderBottom: '1px solid #ccc', // Border at the bottom
  borderRadius: '0 0 20px 20px', // Border radius on bottom corners
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
  fontFamily: 'Arial, sans-serif', // Font family
  maxHeight:'65px'
}}>
  <div>
  <img src={tea} alt="Tea Logo" style={{ 
  width: '86px', // Increase the width
  height: 'auto', // Maintain aspect ratio
  marginRight: '10px',
  paddingTop:'27px'
}} />
    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>TeaTime</span>
  </div>
  <div>
  
  </div>
</div> */}
          <p style={{
            fontSize: '18px', // Increased font size for emphasis
            fontWeight: 'bold',
            color: 'black',
            marginTop: '23px',
            textTransform: 'uppercase',
            paddingLeft: '10px',
            paddingBottom: '-254px', // Increased padding for spacing
            // Center align the heading
            fontFamily: 'Arial, sans-serif' // Specified font family
          }}>
            Features
          </p>
          <MyCarousel />
          <Divider my="xs" label="Taste your choice" labelPosition="left" style={{ marginTop: '-15px !important', color: 'black', paddingLeft: '10px' }} />
          <Flat />

          <div className="menu-container" style={{ paddingBottom: '80px' }}>


            <div className="dropdown-containerk">
              <button className="browse-menu-btn" onClick={toggleDropdown}>
                <div className="icon-container">
                  <FaBook size={24} /> {/* Book icon */}
                  <span>Menu</span> {/* Text */}
                </div>
              </button>

              {showDropdown && (
                <div className="dropdown-menuk" style={{ width: "60%" }}>
                  <button className="close-btn" onClick={toggleDropdown}><MdOutlineCancel /></button> {/* Cross button */}
                  <ul className="dropdown-list">
                    {uniqueCategories.map((category) => (
                      <li key={category} onClick={() => handleClick(category)} className={selectedCategory === category ? 'selected' : ''}>
                        <div className="category-info">
                          <span className="category-name">{category}</span>
                          <span className="category-count">{totalCounts[category]}</span> {/* Total count */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* <div className="categories">
        {uniqueCategories.map(category => (
          <div key={category} className={`category ${accordionState[category] ? '' : 'closed'}`} id={category}>
            <h3 className="category-name" onClick={() => toggleAccordion(category)}>
  <span className="category-heading">{category}</span>
  <span className="accordion-icon">
    {accordionState[category] ?
      <FaAngleUp /> :
      <FaAngleDown />
    }
  </span>
</h3>

            
            // Show menu items if this category is open 
            {accordionState[category] && (
              <>
              <div className="accordion-content">
                {menuItems
                  .filter(item => item.category === category)
                  .map(menuItem => (
                    <div key={menuItem.id} className="menu-item">
                      <div className="item-details">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="13" viewBox="0 0 32 32"
      style={{ fill: menuItem.veg ? '#40C057' : '#FF5252', marginRight: '5px' }}>
      <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
    </svg>
                        <p className="item-namem">{menuItem.name}</p>
                        <p className="item-pricee"> ₹ {menuItem.price}</p>
                        {renderDescription(menuItem.description, menuItem.id)}
                      </div>
                      <div className="counterbox">
                        <button className="quantity-btn" onClick={() => removeFromCart(menuItem)}><FaMinus /></button>
                        <span className="quantity">{Math.max((cart.find(cartItem => cartItem.id === menuItem.id) || { quantity: 0 }).quantity, 0)}</span>
                        <button className="quantity-btn" onClick={() => addToCart(menuItem)}><FaPlus /></button>
                        
                      </div>
                    </div>
                  ))}
              </div>
              <Divider size={15} ml={-20} mr={-20} mt={20}/>
           </>
              
            )}
          

          </div>
        ))
// </>
}
        // Order line 
        {!Object.values(accordionState).some(state => state) && (
          <div className="order-line">Order line content here...</div>
        )}
      </div> */}

            <div className="categories">
              {uniqueCategories.map((category, index) => (
                <div key={category} className={`category ${accordionState[category] ? '' : 'closed'}`} id={category}>
                  <h3 className="category-name" onClick={() => toggleAccordion(category)}>
                    <span className="category-heading">{category}</span>
                    {/* Accordion icon */}
                    <span className="accordion-icon">
                      {accordionState[category] ?
                        <FaAngleUp /> :
                        <FaAngleDown />
                      }
                    </span>
                  </h3>

                  {/* Show menu items if this category is open */}
                  {accordionState[category] && (
                    <div className="accordion-content">
                      {menuItems
                        .filter(item => item.category === category)
                        .map(menuItem => (
                          <div key={menuItem.id} className="menu-item">
                            <div className="item-details">
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="13" viewBox="0 0 32 32"
                                style={{ fill: menuItem.veg ? '#40C057' : '#FF5252', marginRight: '5px' }}>
                                <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
                              </svg>
                              <p className="item-namem">{menuItem.name}</p>
                              <p className="item-pricee"> ₹ {menuItem.price}</p>
                              {renderDescription(menuItem.description, menuItem.id)}
                            </div>
                            <div className="counterbox">
                              <button className="quantity-btn" onClick={() => removeFromCart(menuItem)}><FaMinus /></button>
                              <span className="quantity">{Math.max((cart.find(cartItem => cartItem.id === menuItem.id) || { quantity: 0 }).quantity, 0)}</span>
                              <button className="quantity-btn" onClick={() => addToCart(menuItem)}><FaPlus /></button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  {/* Render divider only if it's not the last category */}
                  {index !== uniqueCategories.length - 1 && <Divider size={2} ml={-20} mr={-20} mt={20} />}
                </div>
              ))}
              {/* Order line */}
              {!Object.values(accordionState).some(state => state) && (
                <div className="order-line">Order line content here...</div>
              )}
            </div>

            {/* <div className={`browse-menu-btnn ${cart.length>0 ? 'cart-open' : 'cart-close'}`}> */}
            <div className={`browse-menu-btnn cart-open`}>

              <div className='btn-gradc' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} onClick={handleOrderClick}>
                <FaShoppingCart style={{ marginRight: '10px', fontSize: '16px' }} /> {/* Font Awesome cart icon */}
                Order
              </div>
            </div>
            {/* njbmm */}
          </div>
        </div>
      )}

    </div>
  );
}
const override = css`
  display: block;
  margin: 0 auto;
`;
export default Menu;