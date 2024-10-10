import React, { useState } from "react";

const NewItemForm = ({ addItem }) => {
  
  ///////////   state setup   //////////
  const INITIAL_STATE = {
    name: '',
    qty: '',
    email: ''
  }

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true)

  ////////////   event handler    ////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value === '') {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
    setFormData(formData => ({
        ...formData,
        [name]: value
      }))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      addItem({ ...formData });
      setFormData(INITIAL_STATE)
    }

  //////////  return markup   /////////
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="qty">Quantity:{formData.qty}</label>
      <input
        id="qty"
        type="range"
        name="qty"
        min="1"
        max="10"
        value={formData.qty}
        onChange={handleChange}
      />
      {isInvalid && <span style={{color: 'red'}}>Email cannot be blank</span>}
      <button>Add Item</button>
    </form>
  )

}

export default NewItemForm;


