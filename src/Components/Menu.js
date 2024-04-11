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
// import ReactSearchBox from "react-search-box";
import { FaTimes } from 'react-icons/fa';
import SearchBox from './SearchBox.js';

const Menu = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFilterSetting,setIsFilterSetting] = useState({
    isVeg: false,
    isNonveg: false,
    isChefSpecial: false,
    isKidsChoice: false,
    isCombos: false,
  });


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
    }, 1000);

  };

  // Function to handle clicking on a category item
  const handleClick = (category) => {
    setSelectedCategory(category);
    scrollToCategory(category);
  };


  const menuItems = [
    { id: 1, category: "Breads", name: "Parantha", description: "Flaky, layered Indian bread filled with rich buttery taste. Perfectly pairs with spicy curries or creamy gravies.", price: 5, half: false, veg: true, chefSpecial: true, kidsChoice: false, combos: false },
    { id: 2, category: "Breads", name: "Naan", description: "Soft, leavened Indian bread traditionally cooked in a tandoor. Its pillowy texture and slightly charred edges make it an irresistible accompaniment to any meal.", price: 3, half: false, veg: true, chefSpecial: false, kidsChoice: true, combos: false },
    { id: 3, category: "Snacks", name: "Samosa", description: "Crispy pastry filled with spiced potatoes, peas, and aromatic spices. A popular street food snack enjoyed across the Indian subcontinent.", price: 2, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: true },
    { id: 4, category: "Snacks", name: "Pakora", description: "Crispy fried fritters made with assorted vegetables coated in a spiced chickpea flour batter. Perfect for rainy days or as a tea-time snack.", price: 3, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 5, category: "Main Course", name: "Dal Makhani", description: "Creamy lentil curry cooked with butter, cream, and aromatic spices. Slow-cooked to perfection, it's a comforting dish that pairs well with rice or naan.", price: 8, half: true, veg: true, chefSpecial: true, kidsChoice: false, combos: false },
    { id: 6, category: "Main Course", name: "Paneer Tikka", description: "Cubes of paneer marinated in a flavorful blend of yogurt and spices, then grilled to perfection. Served with mint chutney, it's a vegetarian delight.", price: 10, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 7, category: "Main Course", name: "Chicken Biryani", description: "Fragrant basmati rice cooked with succulent chicken pieces, aromatic spices, and caramelized onions. Served with raita and a squeeze of lemon, it's a festive meal.", price: 12, half: false, veg: false, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 8, category: "Drinks", name: "Mango Lassi", description: "Refreshing yogurt-based drink blended with ripe mangoes, sugar, and a touch of cardamom. A perfect thirst-quencher on a hot summer day.", price: 4, half: true, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 9, category: "Drinks", name: "Masala Chai", description: "Spiced Indian tea brewed with aromatic spices like cardamom, cinnamon, cloves, and ginger. Served with milk and sugar, it's a comforting beverage.", price: 2, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 10, category: "Appetizers", name: "Chicken Wings", description: "Crispy chicken wings marinated in a tangy sauce, then deep-fried to perfection. Served with a side of ranch dressing, they are a favorite at any gathering.", price: 6, half: true, veg: false, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 11, category: "Appetizers", name: "Bruschetta", description: "Toasted bread slices topped with a flavorful mixture of diced tomatoes, garlic, basil, and olive oil. A classic Italian appetizer that bursts with fresh flavors.", price: 5, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 12, category: "Appetizers", name: "Caprese Salad", description: "Simple yet elegant salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and a drizzle of balsamic glaze. A light and refreshing starter.", price: 7, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 13, category: "Desserts", name: "Gulab Jamun", description: "Soft and spongy milk balls soaked in a fragrant sugar syrup flavored with rose water and cardamom. A decadent Indian sweet enjoyed during festivals and celebrations.", price: 3, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 14, category: "Desserts", name: "Rasgulla", description: "Spongy balls made from cottage cheese kneaded into a dough, then cooked in a sugar syrup until soft and spongy. A popular Bengali sweet enjoyed chilled.", price: 3, half: true, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
    { id: 15, category: "Desserts", name: "Kheer", description: "Creamy Indian rice pudding made with fragrant basmati rice, milk, sugar, and flavored with cardamom, saffron, and nuts. A delightful sweet treat served chilled or warm.", price: 4, half: false, veg: true, chefSpecial: false, kidsChoice: false, combos: false },
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
          <HashLoader
 color={'#F98820'} loading={loading} css={override} size={70} />
          {/* <Lottie animationData={jj} loop={true} style={{ height: "400px", width: "400px" }} /> */}
        </div>
      ) : (

        <div>
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
<SearchBox searchText={searchText} setSearchText={setSearchText}/>
          <p style={{
            fontSize: '18px', 
            fontWeight: 'bold',
            color: 'black',
            marginTop: '23px',
            textTransform: 'uppercase',
            paddingLeft: '10px',
            paddingBottom: '-254px', 
            fontFamily: 'Arial, sans-serif' 
          }}>
            Features
          </p>
          <MyCarousel />
          <Divider my="xs" label="Taste your choice" labelPosition="center" style={{ marginTop: '-15px !important', color: 'black', paddingLeft: '10px' }} />
          {/* <Flat />
           */}
<Flat isFilterSetting={isFilterSetting}  setIsFilterSetting={setIsFilterSetting}
searchText={searchText} setSearchText={setSearchText}
/>
          <div className="menu-container" style={{ paddingBottom: '80px' }}>


            <div className="dropdown-containerk" style={{zIndex:'5'}}>
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
                  {accordionState[category] && 
                  (
                    <div className="accordion-content">
                      {menuItems
                        .filter(item => item.category === category && 
                          ((!isFilterSetting.isVeg && !isFilterSetting.isNonveg && !isFilterSetting.isChefSpecial && !isFilterSetting.isKidsChoice && !isFilterSetting.isCombo) ||
          (isFilterSetting.isVeg && item.veg) ||
          (isFilterSetting.isNonveg && !item.veg) ||
          (isFilterSetting.isChefSpecial && item.chefSpecial) ||
          (isFilterSetting.isKidsChoice && item.kidsChoice) ||
          (isFilterSetting.isCombos && item.combos)
          )
                             )
                        .map((menuItem,index1,array) => (<>
                          <div key={menuItem.id} className="menu-item" style={{marginLeft:'-7px'}}> 
                            <div className="item-details">
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="15" viewBox="0 0 32 32"
                                style={{ fill: menuItem.veg ? '#40C057' : '#FF5252', marginRight: '4px',fontWeight:'bold',paddingBottom:'2px' }}>
                                <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
                              </svg><span style={{fontWeight:'Bold' , marginTop:'-4px' ,color:'goldenrod', fontFamily: 'cursive'}}>Bestseller</span>
                              <p className="item-namem">{menuItem.name}</p>
                              <p className="item-pricee"> ₹ {menuItem.price}</p>
                              {renderDescription(menuItem.description, menuItem.id)}
                            </div>
                            <div className="counterbox" style={{marginRight:'-10px',width:'110px'}}>
                              <button className="quantity-btn" onClick={() => removeFromCart(menuItem)} style={{ fontSize: '18px', fontWeight: '200' }}><FaMinus /></button>
                              <span className="quantity" style={{ fontSize: '18px', fontWeight: '700' }}>{Math.max((cart.find(cartItem => cartItem.id === menuItem.id) || { quantity: 0 }).quantity, 0)}</span>
                              <button className="quantity-btn" onClick={() => addToCart(menuItem)} style={{ fontSize: '18px', fontWeight: '200' }}><FaPlus /></button>
                            </div>
                          </div>
                          {index1 !== array.length - 1 && <Divider variant="dashed" size={1} />}   
                            </>

                        )
                        )}
                    </div>
                  )
                  }
                  {index !== uniqueCategories.length - 1 && <Divider  size={2} ml={-20} mr={-20} mt={20} />}
                </div>
              ))}
              {!Object.values(accordionState).some(state => state) && (
                <div className="order-line">Order line content here...</div>
              )}
            </div>
            <div className={`browse-menu-btnn cart-open`}>

              <div className='btn-gradc' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} onClick={handleOrderClick}>
                <FaShoppingCart style={{ marginRight: '10px', fontSize: '16px' }} /> {/* Font Awesome cart icon */}
                Order
              </div>
            </div>
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