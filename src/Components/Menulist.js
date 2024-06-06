// Customers.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "@mantine/core";
import Swal from 'sweetalert2'
import { Chip } from '@mantine/core';
import { TextInput, Textarea, Button, Group } from "@mantine/core";
import "./Menulist.css";

const Menulist = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [current, setcurrent] = useState(null);
  const [ErrorV, setErrorV] = useState({
    editCategory:false,
    name:false,
    price:false,
    category:false
  });
  const [Addc, setAddc] = useState(false);
  const [groupedMenuItems, setgroupedMenuItems] = useState([]);
  const [deleteItem, setDelete] = useState(false);
  const [value, setValue] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [formDataC, setFormDataC] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [showConfirmation, setShowConfirmation] = useState("no");
  const [Edit, setEdit] = useState("");
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);

  const textArray = ['veg', 'nonveg', 'special', 'kids', 'combo'];

const swalnotify =(text)=>{

  Swal.fire({
    position: "center",
    icon: "success",
    title: `${text}`,
    showConfirmButton: false,
    timer: 1500
  });
setTimeout(() => {
  window.location.reload()
}, 2000);
  
}
  const handleClick = (val, category) => {
    setSelectedItem(null);
    setAddc(false);


    console.log("hhhhhhhhhhhhhh", val);


    if (val == "EDIT") {
      setShowConfirmation("EDIT");
      setEdit(category);
      setcurrent(category);
      
    } 
    
    else if (val == "DELETE") {
      setShowConfirmation("DELETE");
      setEdit(category);
    }
    
    else if (val == "ADD") {
      setFormData({
        name: "",
        price: "",
        description: "",
      });
      setEdit(category);
      setShowConfirmation("ADD");
      setState({ 
        veg: true,
        nonveg: false,
        special: false,
        kids: false,
        combo: false
      })
    }


  };

  const handleDeleteConfirmed = (categoryName) => {
    // Perform delete operation here
    // setShowConfirmation(false);
    console.log(Edit, categoryName);

    axios
      .delete(`http://localhost:8000/category/${categoryName}`)
      .then((res) => {
        console.log(res.data);
        swalnotify('category name delete successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditConfirmed = (categoryName) => {
    // Perform delete operation here
    // setShowConfirmation(false);
    console.log(Edit, categoryName);

    if(Edit==''){
      
      setErrorV({...ErrorV,editCategory:true})
      
      return 
    }else{
      setErrorV({...ErrorV,editCategory:false})
    }

    axios
      .put(`http://localhost:8000/category`, {
        newCategoryName: categoryName,
        currentCategoryName: current,
      })
      .then((res) => {
        console.log(res.data);
        swalnotify('category name edit successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleEditClick = (item, check) => {
    setShowConfirmation(false);
    setAddc(false);
    if (check == "delete") {
      setDelete(true);
    } else {
      setDelete(false);
    }
    setSelectedItem(item);

    // Set the form data to the selected item's details
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
    });

    setState({ 
      veg: true,
      nonveg: false,
      special: false,
      kids: false,
      combo: false
    })
  };

  const handledeleteitem = (select) => {
    // setSelectedItem(null);
    console.log(select);
    axios
      .delete(`http://localhost:8000/menu/${selectedItem._id}`)
      .then((res) => {
        console.log(res.data);
        swalnotify(' delete  item successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    window.location.reload();
  };
  const handleChangename = (val, e) => {
    setFormData({
      name: e,
      price: formData.price,
      description: formData.description,
    });
  };

  const handleChangedescription = (val, e) => {
    setFormData({
      name: formData.name,
      price: formData.price,
      description: e,
    });
  };

  const handleChangeprice = (val, e) => {
    setFormData({
      name: formData.name,
      price: e,
      description: formData.description,
    });
  };

  const handleSubmit = (select) => {
    console.log(select);

    if(select.name=='' || select.price==''){

      setErrorV({...ErrorV,name:true,price:true})
      return
    }
    else{
      setErrorV({...ErrorV,name:false,price:false})
    }
    axios
      .put(`http://localhost:8000/menu/${selectedItem._id}`, {
        name: select.name,
        price: select.price,
        description: select.description,
        veg: state.veg,
        chefSpecial: state.special,
       kidsChoice: state.kids,
       combos: state.combo,
      })
      .then((res) => {
        console.log(res.data);
        setState({ veg: false,
          nonveg: false,
          special: false,
          kids: false,
          combo: false
        })
        swalnotify('Item Edited successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const menuItems1 = [
    {
      id: 1,
      category: "Breads",
      name: "Parantha",
      description:
        "Flaky, layered Indian bread filled with rich buttery taste. Perfectly pairs with spicy curries or creamy gravies.",
      price: 5,
      half: false,
      veg: true,
      chefSpecial: true,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 2,
      category: "Breads",
      name: "Naan",
      description:
        "Soft, leavened Indian bread traditionally cooked in a tandoor. Its pillowy texture and slightly charred edges make it an irresistible accompaniment to any meal.",
      price: 3,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: true,
      combos: false,
    },
    {
      id: 3,
      category: "Snacks",
      name: "Samosa",
      description:
        "Crispy pastry filled with spiced potatoes, peas, and aromatic spices. A popular street food snack enjoyed across the Indian subcontinent.",
      price: 2,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: true,
    },
    {
      id: 4,
      category: "Snacks",
      name: "Pakora",
      description:
        "Crispy fried fritters made with assorted vegetables coated in a spiced chickpea flour batter. Perfect for rainy days or as a tea-time snack.",
      price: 3,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 5,
      category: "Main Course",
      name: "Dal Makhani",
      description:
        "Creamy lentil curry cooked with butter, cream, and aromatic spices. Slow-cooked to perfection, it's a comforting dish that pairs well with rice or naan.",
      price: 8,
      half: true,
      veg: true,
      chefSpecial: true,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 6,
      category: "Main Course",
      name: "Paneer Tikka",
      description:
        "Cubes of paneer marinated in a flavorful blend of yogurt and spices, then grilled to perfection. Served with mint chutney, it's a vegetarian delight.",
      price: 10,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 7,
      category: "Main Course",
      name: "Chicken Biryani",
      description:
        "Fragrant basmati rice cooked with succulent chicken pieces, aromatic spices, and caramelized onions. Served with raita and a squeeze of lemon, it's a festive meal.",
      price: 12,
      half: false,
      veg: false,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 8,
      category: "Drinks",
      name: "Mango Lassi",
      description:
        "Refreshing yogurt-based drink blended with ripe mangoes, sugar, and a touch of cardamom. A perfect thirst-quencher on a hot summer day.",
      price: 4,
      half: true,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 9,
      category: "Drinks",
      name: "Masala Chai",
      description:
        "Spiced Indian tea brewed with aromatic spices like cardamom, cinnamon, cloves, and ginger. Served with milk and sugar, it's a comforting beverage.",
      price: 2,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 10,
      category: "Appetizers",
      name: "Chicken Wings",
      description:
        "Crispy chicken wings marinated in a tangy sauce, then deep-fried to perfection. Served with a side of ranch dressing, they are a favorite at any gathering.",
      price: 6,
      half: true,
      veg: false,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 11,
      category: "Appetizers",
      name: "Bruschetta",
      description:
        "Toasted bread slices topped with a flavorful mixture of diced tomatoes, garlic, basil, and olive oil. A classic Italian appetizer that bursts with fresh flavors.",
      price: 5,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 12,
      category: "Appetizers",
      name: "Caprese Salad",
      description:
        "Simple yet elegant salad made with ripe tomatoes, fresh mozzarella cheese, basil leaves, and a drizzle of balsamic glaze. A light and refreshing starter.",
      price: 7,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 13,
      category: "Desserts",
      name: "Gulab Jamun",
      description:
        "Soft and spongy milk balls soaked in a fragrant sugar syrup flavored with rose water and cardamom. A decadent Indian sweet enjoyed during festivals and celebrations.",
      price: 3,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 14,
      category: "Desserts",
      name: "Rasgulla",
      description:
        "Spongy balls made from cottage cheese kneaded into a dough, then cooked in a sugar syrup until soft and spongy. A popular Bengali sweet enjoyed chilled.",
      price: 3,
      half: true,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
    {
      id: 15,
      category: "Desserts",
      name: "Kheer",
      description:
        "Creamy Indian rice pudding made with fragrant basmati rice, milk, sugar, and flavored with cardamom, saffron, and nuts. A delightful sweet treat served chilled or warm.",
      price: 4,
      half: false,
      veg: true,
      chefSpecial: false,
      kidsChoice: false,
      combos: false,
    },
  ];
  const [state, setState] = useState({
    veg: true,
    nonveg: false,
    special: false,
    kids: false,
    combo: false
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/menu");
        const menuItems = response.data;
        const groupedMenuItems = menuItems.reduce((acc, menuItem) => {
          if (!acc[menuItem.category]) {
            acc[menuItem.category] = [];
          }
          acc[menuItem.category].push(menuItem);
          return acc;
        }, {});
        setgroupedMenuItems(groupedMenuItems);

        console.log("Menu items added to the database");
      } catch (error) {
        console.error("Error fetching or adding menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);
  const handleAddConfirmed = (formData1, e, Edit) => {
    // Perform the add operation here
    e.preventDefault();

    if(formData.name=='' || formData.price==''){

      setErrorV({...ErrorV,name:true,price:true})
      return
    }else{
      setErrorV({...ErrorV,name:false,price:false})

    }


    setShowAddConfirmation(false);
    console.log(formData1,state,state.veg);
    axios
      .post(`http://localhost:8000/menu/add`, {
        name: formData1.name,
        price: formData1.price,
        description: formData1.description,
        category: Edit,
        veg: state.veg,
        chefSpecial: state.special,
       kidsChoice: state.kids,
       combos: state.combo,
       
      })
      .then((res) => {
        console.log(res.data);
        setState({ veg: false,
          nonveg: false,
          special: false,
          kids: false,
          combo: false
        })
        swalnotify('Item Added successfully successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  


  const handleAddConfirmedC = (formData1, e, Edit) => {
    // Perform the add operation here
    e.preventDefault();
    console.log(formData1);

    if(formData1.name=='' || formData1.price=='' ||  formData1.category==''){

      setErrorV({...ErrorV, name:true, price:true,category:true})
      return
    }else{
      setErrorV({...ErrorV, name:false, price:false,category:false})
    }
    setShowAddConfirmation(false);
   
    axios
      .post(`http://localhost:8000/menu/add`, {
        name: formData1.name,
        price: formData1.price,
        description: formData1.description,
        category: formData1.category,
        veg: state.veg,
        chefSpecial: state.special,
       kidsChoice: state.kids,
       combos: state.combo,
      })
      .then((res) => {
        console.log(res.data);
        setState({ veg: false,
          nonveg: false,
          special: false,
          kids: false,
          combo: false
        })
        swalnotify('Category Added successfully successfully')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleCancelAdd = () => {
  //   setShowAddConfirmation(false);
  // };
  const handleAddC = () => {

    setAddc(true);
    setSelectedItem(null);
    setShowConfirmation(false);
    setState({ 
      veg: true,
      nonveg: false,
      special: false,
      kids: false,
      combo: false
    })
  };
  const handleChipClick = (text) => {
    setState(prevState => ({
      ...prevState,
      [text]: !prevState[text]
    }));
    console.log(state)
  };
  // Group menu items by category

  return (
    <div className="menu">
      <div className="menu-container">
      <div className="button-container">
  <div
    className="chip-button"
    onClick={() => {
      handleAddC();
    }}
  
  >
    <span className="clickable-text1">Add category</span>
  </div>
</div>


        {Object.entries(groupedMenuItems).map(([category, items]) => (
  <div key={category} className="category-container">
    <div className="category-header">
      <h3 className="category-title">{category}</h3>
      <div className="category-buttons">
        <FontAwesomeIcon
          className="category-icon edit-icon"
          icon={faEdit}
          onClick={() => {
            handleClick("EDIT", category);
          }}
        />
        <FontAwesomeIcon
          className="category-icon add-icon"
          icon={faPlus}
          onClick={() => {
            handleClick("ADD", category);
          }}
        />
        <FontAwesomeIcon
          className="category-icon delete-icon"
          icon={faTrash}
          onClick={() => {
            handleClick("DELETE", category);
          }}
        />
      </div>
    </div>
    <div className="menu-items">
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <h4 className="item-name">{item.name}</h4>
        
          <p className="item-price">Price: ₹{item.price}</p>
          <div className="item-buttons">
            <FontAwesomeIcon
              className="item-icon edit-icon"
              icon={faEdit}
              onClick={() => handleEditClick(item, "edit")}
            />
            <FontAwesomeIcon
              className="item-icon delete-icon"
              icon={faTrash}
              onClick={() => handleEditClick(item, "delete")}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
))}

      </div>
      <div className="remaining-space" style={{ width: "30%" }}>
      {selectedItem && (
  <div className="edit-delete-form">
    <h3 className="form-title">{!deleteItem ? "Edit Item" : "Delete Item"}</h3>
    <div className="edit-delete-input-group">
      <label htmlFor="name" className="edit-delete-label">* Name:</label>
      <input
        type="text"
        id="name"
        className="edit-delete-input"
        disabled={deleteItem}
        value={formData.name}
        onChange={(event) =>
          handleChangename("name", event.target.value)
        }
      />
    </div>
    <div className="edit-delete-input-group">
      <label htmlFor="description" className="edit-delete-label">Description:</label>
      <textarea
        id="description"
        className="edit-delete-textarea"
        value={formData.description}
        disabled={deleteItem}
        onChange={(event) =>
          handleChangedescription("description", event.target.value)
        }
      ></textarea>
    </div>
    <div className="edit-delete-input-group">
      <label htmlFor="price" className="edit-delete-label">* Price:</label>
      <input
        type="number"
        id="price"
        className="edit-delete-input"
        value={formData.price}
        disabled={deleteItem}
        onChange={(event) =>
          handleChangeprice("price", event.target.value)
        }
      />
    </div>
    {!deleteItem ? (
      <div>
        <div className="chip-group">
          {textArray.map((text, index) => (
            <Chip
              key={index}
              color="red" // Change color based on state
              variant="filled"
              checked={text === 'veg' ? state.veg : state[text]}
              onClick={() => handleChipClick(text)}
              className="edit-delete-chip"
            >
              {text}
            </Chip>
          ))}
        </div>
        {ErrorV.name && ErrorV.price && (
          <p className="error-message">Please fill mandatory fields</p>
        )}
        <div className="button-group">
          <button
            className="primary-button animated-button"
            onClick={() => {
              handleSubmit(formData);
            }}
          >
            Submit
          </button>
          <button className="secondary-button animated-button"  onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="button-group">
        <button
          className="primary-button animated-button"
          onClick={() => {
            handledeleteitem(selectedItem);
          }}
        >
          Delete
        </button>
        <button className="secondary-button animated-button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    )}
  </div>
)}


{Addc && (
  <div className="add-popup-container">
    <h3 className="add-popup-title">Add New Item</h3>
    <form
      onSubmit={(e) => {
        handleAddConfirmedC(formDataC, e, Edit);
      }}
    >
      <div className="add-input-group">
        <label htmlFor="newCategory" className="add-input-label">* Category:</label>
        <input
          type="text"
          id="newCategory"
          className="add-input-field"
          value={formDataC.category}
          onChange={(e) =>
            setFormDataC({ ...formDataC, category: e.target.value })
          }
        />
      </div>
      <div className="add-input-group">
        <label htmlFor="newName" className="add-input-label">* Name:</label>
        <input
          type="text"
          id="newName"
          className="add-input-field"
          value={formDataC.name}
          onChange={(e) =>
            setFormDataC({ ...formDataC, name: e.target.value })
          }
        />
      </div>
      <div className="add-input-group">
        <label htmlFor="newDescription" className="add-input-label">Description:</label>
        <textarea
          id="newDescription"
          className="add-textarea-field"
          value={formDataC.description}
          onChange={(e) =>
            setFormDataC({ ...formDataC, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="add-input-group">
        <label htmlFor="newPrice" className="add-input-label">* Price:</label>
        <input
          type="number"
          id="newPrice"
          className="add-input-field"
          value={formDataC.price}
          onChange={(e) =>
            setFormDataC({ ...formDataC, price: e.target.value })
          }
        />
      </div>
      <div className="add-chip-group">
        {textArray.map((text, index) => (
          <Chip
            key={index}
            color="red" // Change color based on state
            variant="filled"
            checked={text === 'veg' ? state.veg : state[text]}
            onClick={() => handleChipClick(text)}
            className="add-chip"
          >
            {text}
          </Chip>
        ))}
      </div>
      {ErrorV.name && ErrorV.price && ErrorV.category && (
        <p className="add-error-message">Please fill in all mandatory fields</p>
      )}
      <div className="add-button-group">
        <button type="submit" className="add-primary-button animated-button">Add Item</button>
        <button type="button" className="add-secondary-button animated-button" onClick={handleCloseModal}>Cancel</button>
      </div>
    </form>
  </div>
)}

        
        {showConfirmation == "DELETE" && (
  <div className="delete-popup-container">
    <h3 className="delete-popup-title">Delete Item</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDeleteConfirmed(Edit);
      }}
    >
      <div className="delete-input-group">
        <label htmlFor="deleteName" className="delete-input-label">Name</label>
        <input
          type="text"
          id="deleteName"
          className="delete-input-field"
          value={Edit}
          disabled
          onChange={(e) => setEdit(e.target.value)}
        />
      </div>
      <div className="delete-button-group">
        <button type="submit" className=" animated-button delete-primary-button">Yes</button>
        <button type="button" className=" animated-button delete-secondary-button" onClick={handleCloseModal}>No</button>
      </div>
    </form>
  </div>
)}

      {showConfirmation == "EDIT" && (
  <div className="edit-popup-container">
    <h3 className="edit-popup-title">Edit Item</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditConfirmed(Edit);
      }}
    >
      <div className="edit-input-group">
        <label htmlFor="editName" className="edit-input-label">* Name</label>
        <input
          type="text"
          id="editName"
          className="edit-input-field"
          value={Edit}
          onChange={(e) => setEdit(e.target.value)}
        />
      </div>
      {ErrorV.editCategory && (
        <p className="edit-error-message">Please first give category name</p>
      )}
      <div className="edit-button-group">
        <button type="submit" className=" animated-button edit-primary-button">Yes</button>
        <button type="button" className=" animated-button edit-secondary-button" onClick={handleCloseModal}>No</button>
      </div>
    </form>
  </div>
)}

      {showConfirmation == "ADD" && (
  <div className="confirmation-popup">
    <h3>Add New Item</h3>
    <form
      onSubmit={(e) => {
        handleAddConfirmed(formData, e, Edit);
      }}
    >
      <div className="input-group">
        <label htmlFor="newName">* Name:</label>
        <input
          type="text"
          id="newName"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="newDescription">Description:</label>
        <textarea
          id="newDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="input-group">
        <label htmlFor="newPrice">* Price:</label>
        <input
          type="number"
          id="newPrice"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
      </div>
      <div className="chip-container">
        {textArray.map((text, index) => (
          <Chip
            key={index}
            color="red"
            variant="filled"
            checked={text == 'veg' ? state.veg : state[text]}
            onClick={() => handleChipClick(text)}
            style={{ marginRight: '8px', marginBottom: '8px' }}
          >
            {text}
          </Chip>
        ))}
      </div>
      {ErrorV.name && ErrorV.price && (
        <p className="error-message">Please first fill mandatory fields</p>
      )}
      <div className="button-group">
        <button type="submit" className=" animated-button primary-button">Add Item</button>
        <button type="button" className=" animated-button secondary-button" onClick={handleCloseModal} style={{backgroundColor:'red'}}>Cancel</button>
      </div>
    </form>
  </div>
)}

      </div>
    </div>
  );
};

export default Menulist;
