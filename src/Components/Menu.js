import React, { useState } from 'react';
import './Menu.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingCart } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
const Menu = ({ cart, setCart }) => {
  //const [cart, setCart] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle clicking on a category item
  const handleClick = (category) => {
    setSelectedCategory(category);
    scrollToCategory(category);
  };

  const menuItems = [
    { id: 1, category: "Breads", name: "Parantha", description: "Flaky, layered Indian bread filled with rich buttery taste. Perfectly pairs with spicy curries or creamy gravies.", price: 5, half: false },
    { id: 2, category: "Breads", name: "Naan", description: "Soft, leavened Indian bread traditionally cooked in a tandoor. Its pillowy texture and slightly charred edges make it an irresistible accompaniment to any meal.", price: 3, half: false },
    { id: 3, category: "Snacks", name: "Samosa", description: "Crispy pastry filled with spiced potatoes, peas, and aromatic spices. A popular street food snack enjoyed across the Indian subcontinent.", price: 2, half: false },
    { id: 4, category: "Snacks", name: "Pakora", description: "Crispy fried fritters made with assorted vegetables coated in a spiced chickpea flour batter. Perfect for rainy days or as a tea-time snack.", price: 3, half: false },
    { id: 5, category: "Main Course", name: "Dal Makhani", description: "Creamy lentil curry cooked with butter, cream, and aromatic spices. Slow-cooked to perfection, it's a comforting dish that pairs well with rice or naan.", price: 8, half: true },
    { id: 6, category: "Main Course", name: "Paneer Tikka", description: "Cubes of paneer marinated in a flavorful blend of yogurt and spices, then grilled to perfection. Served with mint chutney, it's a vegetarian delight.", price: 10, half: false },
    { id: 7, category: "Main Course", name: "Chicken Biryani", description: "Fragrant basmati rice cooked with succulent chicken pieces, aromatic spices, and caramelized onions. Served with raita and a squeeze of lemon, it's a festive meal.", price: 12, half: false },
    { id: 8, category: "Drinks", name: "Mango Lassi", description: "Refreshing yogurt-based drink blended with ripe mangoes, sugar, and a touch of cardamom. A perfect thirst-quencher on a hot summer day.", price: 4, half: true },
    { id: 9, category: "Drinks", name: "Masala Chai", description: "Spiced Indian tea brewed with aromatic spices like cardamom, cinnamon, cloves, and ginger. Served with milk and sugar, it's a comforting beverage.", price: 2, half: false },
    { id: 10, category: "Appetizers", name: "Chicken Wings", description: "Crispy chicken wings marinated in a tangy sauce, then deep-fried to perfection. Served with a side of ranch dressing, they are a favorite at any gathering.", price: 6, half: true },
    { id: 11, category: "Appetizers", name: "Bruschetta", description: "Toasted bread slices topped with a flavorful mixture of diced tomatoes, garlic, basil, and olive oil. A classic Italian appetizer that bursts with fresh flavors.", price: 5, half: false },
    { id: 12, category: "Appetizers", name: "Caprese Salad", description: "Simple yet elegant salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and a drizzle of balsamic glaze. A light and refreshing starter.", price: 7, half: false },
    { id: 13, category: "Desserts", name: "Gulab Jamun", description: "Soft and spongy milk balls soaked in a fragrant sugar syrup flavored with rose water and cardamom. A decadent Indian sweet enjoyed during festivals and celebrations.", price: 3, half: false },
    { id: 14, category: "Desserts", name: "Rasgulla", description: "Spongy balls made from cottage cheese kneaded into a dough, then cooked in a sugar syrup until soft and spongy. A popular Bengali sweet enjoyed chilled.", price: 3, half: true },
    { id: 15, category: "Desserts", name: "Kheer", description: "Creamy Indian rice pudding made with fragrant basmati rice, milk, sugar, and flavored with cardamom, saffron, and nuts. A delightful sweet treat served chilled or warm.", price: 4, half: false },
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
            return { ...cartItem, quantity: cartItem.quantity - 1 };
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

  return (
    <div className="menu-container">
      <svg className="menu-svg" width="100vw" height="100" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(180, 500, 50)">
          <path d="M0 50 C50 0, 150 100, 200 50 C250 0, 350 100, 400 50 C450 0, 550 100, 600 50 C650 0, 750 100, 800 50 C850 0, 950 100, 1000 50 L1000 100 L0 100 Z" fill="#1FAB89" />
        </g>
      </svg>
      <h2 className="menu-title" style={{ marginTop: '20px', marginLeft: '0px' }}>Menu</h2>
      <div className="dropdown-container">
        <button className="browse-menu-btn" onClick={toggleDropdown}>
          <div className="icon-container">
            <FaBook size={24} /> {/* Book icon */}
            <span>Menu</span> {/* Text */}
          </div>
        </button>

        {showDropdown && (
        <div className="dropdown-menu" style={{ width: "60%" }}>
          <button className="close-btn" onClick={toggleDropdown}>X</button> {/* Cross button */}
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
                        <p className="item-pricee"> ₹ {menuItem.price}</p>
                        {renderDescription(menuItem.description, menuItem.id)}
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
        <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
          <FaShoppingCart style={{ marginRight: '10px' }} /> {/* Font Awesome cart icon */}
          Order
        </Link>
      </div>
      {/* njbmm */}
    </div>
  );
}

export default Menu;