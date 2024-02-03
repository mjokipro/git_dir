import React, { useState } from "react";
import { useHistory } from "react-router-dom"

const NewMessageForm = ({addP}) => {

const {history} = useHistory()

  console.debug("create", addP)
  const INITIAL_STATE = {
    title: "",
    content: "",
    user_id: ""
  }
  const [formData, setFormData] = useState(INITIAL_STATE)
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  async function handleSubmit(e){
    let result = await addP( formData)
    if(result){
      history.push("/posts")
    } else {
      setFormData(INITIAL_STATE)
    }
  }


  return (
    <div className="container">
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor={formData.title}>Title:</label>
      <input
      key={formData.id}
        type="text"
        name={formData.title}
        placeholder="Enter text here..."
        onChange={handleChange}
        className="form-control"
      />

      <label htmlFor={formData.content}>Content:</label>
      <input
      key={formData.id}
        type="text"
        name={formData.content}
        placeholder="Enter text here..."
        onChange={handleChange}
        className="form-control"
      />

      <button className="btn btn-primary mt-2" type='submit'>Add Post</button>
    </form>
    </div>
  )
}

export default NewMessageForm;