import React, { useState } from 'react';
import './Menu.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { FaBook,FaShoppingCart   } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
const Menu = ({ cart, setCart }) => {
  //const [cart, setCart] = useState([]);
  const menuItems = [
    { id: 1, category: 'Breads', name: 'Parantha', price: 5 },
    { id: 2, category: 'Breads', name: 'Naan', price: 3 },
    { id: 3, category: 'Snacks', name: 'Samosa', price: 2 },
    { id: 4, category: 'Snacks', name: 'Pakora', price: 3 },
    { id: 5, category: 'Main Course', name: 'Dal Makhani', price: 8 },
    { id: 6, category: 'Main Course', name: 'Paneer Tikka', price: 10 },
    { id: 7, category: 'Main Course', name: 'Chicken Biryani', price: 12 },
    { id: 8, category: 'Drinks', name: 'Mango Lassi', price: 4 },
    { id: 9, category: 'Drinks', name: 'Masala Chai', price: 2 },
    { id: 10, category: 'Appetizers', name: 'Chicken Wings', price: 6 },
    { id: 11, category: 'Appetizers', name: 'Bruschetta', price: 5 },
    { id: 12, category: 'Appetizers', name: 'Caprese Salad', price: 7 },
    { id: 13, category: 'Desserts', name: 'Gulab Jamun', price: 3 },
    { id: 14, category: 'Desserts', name: 'Rasgulla', price: 3 },
    { id: 15, category: 'Desserts', name: 'Kheer', price: 4 },
    // Add more items as needed
  ];
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
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      }));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
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
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        }));
      }
    }
  };



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

  return (
    <div className="menu-container">
<svg className="menu-svg" width="100vw" height="100" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(180, 500, 50)">
    <path d="M0 50 C50 0, 150 100, 200 50 C250 0, 350 100, 400 50 C450 0, 550 100, 600 50 C650 0, 750 100, 800 50 C850 0, 950 100, 1000 50 L1000 100 L0 100 Z" fill="#1FAB89"/>
  </g>
</svg>
      <h2 className="menu-title" style={{marginTop:'20px',marginLeft:'0px'}}>Menu</h2>
      <div className="dropdown-container">
      <button className="browse-menu-btn" onClick={toggleDropdown}>
      <div className="icon-container">
        <FaBook size={24}/> {/* Book icon */}
        <span>Menu</span> {/* Text */}
      </div>
    </button>
        
    {showDropdown && (
  <div className="dropdown-menu">
    <button className="close-btn" onClick={toggleDropdown}>X</button> {/* Cross button */}
    
    <ul className="dropdown-list">
      {uniqueCategories.map(category => (
        <li key={category} onClick={(e) => { e.stopPropagation(); scrollToCategory(category); }}>
          {category}
        </li>
      ))}
    </ul>
  </div>
)}
      </div>
      <div className="categories">
      {uniqueCategories.map(category => (
        <div key={category} className={`category ${accordionState[category] ? '' : 'closed'}`} id={category}>
          <h3 className="category-name">
          <span className="category-heading">{category}</span>
            {/* Accordion icon */}
            <span className="accordion-icon" onClick={() => toggleAccordion(category)}>
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
                      <p className="item-name">{menuItem.name}</p>
                      <p className="item-price"> ₹ {menuItem.price}</p>
                    </div>
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => removeFromCart(menuItem)}>-</button>
                      <span className="quantity">{(cart.find(cartItem => cartItem.id === menuItem.id) || { quantity: 0 }).quantity}</span>
                      <button className="quantity-btn" onClick={() => addToCart(menuItem)}>+</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
          
        </div>
      ))}
      {/* Order line */}
      {!Object.values(accordionState).some(state => state) && (
        <div className="order-line">Order line content here...</div>
      )}
    </div>
      <div className="browse-menu-btnn">
  <Link to="/cart" style={{ textDecoration: 'none', color: 'white'}}>
  <FaShoppingCart style={{marginRight:'10px'}} /> {/* Font Awesome cart icon */}
     Order
  </Link>
</div>
    </div>
  );
}

export default Menu;
