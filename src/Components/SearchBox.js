import React,{useState,useRef,useEffect} from 'react'
import { FaMicrophone } from 'react-icons/fa';
import { FaSearch,FaTimes } from 'react-icons/fa';

function SearchBox({searchText,setSearchText}) {
    const [suggestions, setSuggestions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isMicActive, setIsMicActive] = useState(false);
    const recognition = useRef(null);


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
    
        // Filter suggestions based on the input text
        const filteredSuggestions = menuItems.filter(item =>
          item.name.toLowerCase().includes(inputText.toLowerCase())
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

  return (
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
      {searchText.length>0 && (
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
  )
}

export default SearchBox
