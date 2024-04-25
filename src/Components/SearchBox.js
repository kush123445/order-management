import React,{useState,useRef,useEffect} from 'react'
import { FaMicrophone } from 'react-icons/fa';
import { FaSearch,FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { Divider } from '@mantine/core';
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import './Menu.css'; 


function SearchBox({searchText,setSearchText ,cart,setCart,isOpenR,setIsOpenR }) {
    const [suggestions, setSuggestions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isMicActive, setIsMicActive] = useState(false);
    const recognition = useRef(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});


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
      let filteredSuggestions ;

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
            console.log(isOpenR)
          setIsOpenR(true);
          recognition.current.stop();
    
          // Filter suggestions based on the voice input
           filteredSuggestions = menuItems.filter(item => 
            item.name.toLowerCase().includes(transcript.toLowerCase()) ||
            item.description.toLowerCase().includes(transcript.toLowerCase())
          );
          console.log("ncn",isOpenR,filteredSuggestions)
          // if(isOpenR){
          setSuggestions(filteredSuggestions);
          // }
        };
        recognition.current.onend = () => {
          setIsMicActive(false); // Set isMicActive to false when voice recognition ends
        };
      
        recognition.current.start();
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
                <button className="read-more-button" style={{ background: '#fafafa', border: 'none', color: 'black', padding: '0px' }} onClick={() => toggleDescriptionExpansion(itemId)}>Read more...</button>
              </>
            ) : (
              <>
                <span>{description}</span>
                {shouldTruncate && (
                  <button className="read-more-button" style={{ background: '#fafafa', border: 'none', color: 'black', padding: '0px' }} onClick={() => toggleDescriptionExpansion(itemId)}>Read less</button>
                )}
              </>
            )}
          </div>
        );
      }
      const handleInputChange = (event) => {
        setIsTyping(true);
        const inputText = event.target.value;
        setSearchText(inputText);
    
        // Filter suggestions based on the input text
         filteredSuggestions = menuItems.filter(item => 
          item.name.toLowerCase().includes(inputText.toLowerCase()) ||
          item.description.toLowerCase().includes(inputText.toLowerCase())
        );
        
        setSuggestions(filteredSuggestions);
      };

      const handleClearInput = () => {
        setSearchText('');
        setSuggestions([]);
      };
      const handleBlur = () => {
        setIsTyping(false);
        // Other blur logic
      };
      const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion);
        setSuggestions([]);
      };
      const handleScroll = (event) => {
        const suggestionsDiv = event.target;
        const isBottom = suggestionsDiv.scrollHeight - suggestionsDiv.scrollTop === suggestionsDiv.clientHeight;
      
        if (isBottom) {
          event.stopPropagation();
        }
      }
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
      const handleChipClickR = () => {
        setIsOpenR(true);
        };
      
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center',marginTop:'15px',paddingBottom:'20px',marginBottom:'5px' ,paddingLeft:'5px',paddingRight:'5px'}}>
            {isOpenR && (<div style={{ width: '40px', fontSize: '30px', fontWeight: 'bold', display:'flex' , alignContent:'center',marginRight:'-12px' }}
            onClick={()=>{setIsOpenR(!isOpenR)
            setSearchText('')
            setSuggestions('')}}>
      <IoChevronBackOutline />
    </div>)}
            <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgb(223, 225, 229)',
        borderRadius: '15px',
        backgroundColor: 'white',
        color: 'rgb(33, 33, 33)',
        fontSize: '16px',
        fontFamily: 'Arial',
        zIndex: '10',
        marginLeft: '6px',
        marginRight:'8px',
        width: '100%',
        boxShadow: isTyping ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2) 0px 2px 4px', // Apply box shadow when typing
        transition: 'box-shadow 0.3s', // Smooth transition for box shadow
        
      }}
    >
      {/* Your input field and other elements */}
      {/* <div onClick={isOpenR ? () => {} : handleChipClickR}> */}
      <FaSearch style={{ position: 'absolute', left: '10px', color: '#aaa', marginRight: '20px' }} />
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        // onClick={handleBlur}
        onClick={isOpenR ? () => {} : handleChipClickR}
        placeholder="Search..."
        style={{ padding: '8px 5px 8px 30px', width: '100%', border: 'none', outline: 'none', borderRadius: '20px', backgroundColor: 'white' }}
      /> 
      {/* </div> */}
      {searchText.length>0 && (
        <FaTimes
          style={{ position: 'absolute', right: '50px', cursor: 'pointer', color: '#aaa' }}
          onClick={handleClearInput}
        />
      )}
      <Divider orientation="vertical" />
      <div style={{marginRight:'10px'}}>   
       <FaMicrophone style={{ marginLeft: '3px', cursor: 'pointer', marginTop: '2px', fontSize: '26px', color: 'grey' 
              , color: isMicActive ? 'red' : 'grey', // Change color when active
              animation: isMicActive ? 'pulse 1s infinite' : 'none' // Smooth transition for color change
            }} onClick={handleVoiceSearch} /> </div>
    </div>

{console.log('nfejjgkjf',isOpenR,suggestions)}
              {isOpenR && suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '48px', width: '100%',height:'85vh', backgroundColor: '#fafafa',  zIndex: '20', overflowY:'scroll',overflowX:'hidden' ,marginRight:'5px'}} onScroll={handleScroll}>
                  {suggestions
                  .map((menuItem,index1,array) => (<>
                    <div key={menuItem.id} className="menu-item" style={{marginLeft:'0px',paddingLeft:'10px'}}> 
                      <div className="item-details">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="13" height="15" viewBox="0 0 32 32"
                          style={{ fill: menuItem.veg ? '#40C057' : '#FF5252', marginRight: '4px',fontWeight:'bold',paddingBottom:'2px' }}>
                          <path d="M 7 3 C 4.8 3 3 4.8 3 7 L 3 25 C 3 27.2 4.8 29 7 29 L 25 29 C 27.2 29 29 27.2 29 25 L 29 7 C 29 4.8 27.2 3 25 3 L 7 3 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 12.400391 12 L 12.400391 19.599609 L 20 19.599609 L 20 12 L 12.400391 12 z"></path>
                        </svg><span style={{fontWeight:'Bold' , marginTop:'-4px' ,color:'goldenrod', fontFamily: 'cursive'}}>Bestseller</span>
                        <p className="item-namem">{menuItem.name}</p>
                        <p className="item-pricee"> ₹ {menuItem.price}</p>
                        {renderDescription(menuItem.description, menuItem.id)}

                      </div>
                      <div className="counterbox" style={{marginRight:'5px',width:'100px'}}>
                        <button className="quantity-btn" 
                        onClick={() => removeFromCart(menuItem)} 
                        style={{ fontSize: '18px', fontWeight: '200' }}><FaMinus /></button>
                        <span className="quantity" style={{ fontSize: '18px', fontWeight: '700' }}>
                          {Math.max((cart.find(cartItem => cartItem.id === menuItem.id) || { quantity: 0 }).quantity, 0)}
                        </span>
                        <button className="quantity-btn" 
                        onClick={() => addToCart(menuItem)} 
                        style={{ fontSize: '18px', fontWeight: '200' }}><FaPlus /></button>
                      </div>
                    </div>
                    {index1 !== array.length - 1 && <Divider variant="dashed" size={1} />}   
                      </>

                  )
                  )
                  }
                </div>
              )}
                
            </div>
  )
}

export default SearchBox
