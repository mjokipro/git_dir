import React, { useState } from "react";
import { useHistory } from "react-router-dom"

const NewUserForm = ({addP}) => {
  const {history} = useHistory()

  const INITIAL_STATE = {
    to_user: "",
    from_user: "",
    to_first_name: "",
    from_first_name: "",
    body: "",
  }
  const [formData, setFormData] = useState(INITIAL_STATE)
  console.debug("create", addP)
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

   async function handleSubmit(e){

   let result = await addP(formData)
   if(result) {
     history.push("/messages")
   } else {
     setFormData(INITIAL_STATE)
   }
  }
  

  return (
    <div className="business">
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor={formData.to_user}>To user:</label>
      <input
        key={formData.id}
        type="text"
        name={formData.to_user}
        placeholder="Enter text here..."
        onChange={handleChange}
        className="container"
      />

      <label htmlFor={formData.from_user}>From user:</label>
      <input
        key={formData.id}
        type="text"
        placeholder="Enter integer here..."
        name={formData.from_user}
        onChange={handleChange}
        className="container"
      />

      <label htmlFor={formData.body}>Body:</label>
      <input
        key={formData.id}
        type="text"
        placeholder="Enter text here..."
        name={formData.body}
        onChange={handleChange}
        className="container"
      />
      
      <button type="submit" className="btn btn-primary small mt-2"  >Send Message</button>
    </form>
    </div>
  )
}

export default NewUserForm;