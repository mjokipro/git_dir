import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import "./FoodMenu.css";

const INIT_STATE = {
    id: '',
    name: '',
    description: '',
    recipe: '',
    serve: '',
    type: ''
}

const AddNewItem = ({addNewFood}) => {
  const [formData, setFormData] = useState(INIT_STATE);
  const [amIredirecting, setamIredirecting] = useState(false)
  const redirectCode = <Redirect to='/'></Redirect>;

  const handleChanges = (evt) => {
      const {name, value} = evt.target;

      setFormData({
          ...formData, [name]: value
      });
  }

  const handleSubmit = (evt) => {
      //submit form
      evt.preventDefault();
      addNewFood(formData);
      setFormData(INIT_STATE);
      setamIredirecting(true);
  }

  return (
    <div className="App">
    {
    amIredirecting
    ?
    redirectCode
    :

      <form onSubmit={handleSubmit} className='form-control'>
        <div className='form-group'>
          <label htmlFor='id'>id:</label>
          <input type='text' name='id' id='id' onChange={handleChanges} required />

          <label htmlFor='name'>name:</label>
          <input type='text' name='name' id='name' onChange={handleChanges} required />
          
          <label htmlFor='description'>description:</label>
          <input type='text' name='description' id='description' onChange={handleChanges} required />
          
          <label htmlFor='recipe'>recipe:</label>
          <input type='text' name='recipe' id='recipe' onChange={handleChanges} required />

          <label htmlFor='serve'>serve:</label>
          <input type='text' name='serve' id='serve' onChange={handleChanges} required />

          <label htmlFor='type'>Snack or Drink:</label>
          <select id='type' name='type' onChange={handleChanges}>
            <option value='null'>Select one:</option>
            <option name='type' value='snacks'>Snacks</option>
            <option name='type' value='drinks'>Drinks</option>
          </select>

          <button type='submit'>Submit</button>
        </div>
      </form>
    }
    </div>
  );
}

export default AddNewItem;
