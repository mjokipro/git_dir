import React, { useState } from "react";

const UserForm = ({create, update, remove}) => {
  console.debug("create", create, update, remove)
  const initialState = {
    to_user: "",
    from_user: "",
    body: ""
  }
  const [formData, setFormData] = useState(initialState)
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, title, content } = formData;
    
    // alert(`Created user, ${to_user} w/ body ${body} & from ${from_user} + id ${id}`)
    setFormData(initialState)
  }
  

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor={formData.title}>Title:</label>
      <input
        id={formData.id}
        type="text"
        name={formData.title}
        placeholder="Enter text here..."
        value={formData.title}
        onChange={handleChange}
        className="form-control"
      />

      <label htmlFor={formData.content}>Content:</label>
      <input
        id={formData.id}
        type="text"
        name={formData.content}
        placeholder="Enter text here..."
        value={formData.content}
        onChange={handleChange}
        className="form-control"
      />

      <button className="btn btn-primary mt-2" onClick={handleSubmit} type='submit'>Add Post</button>
      <button className="btn btn-secondary ml-2 mt-2" onClick={handleSubmit} type='submit'>Update Post</button>
      <button className="btn btn-danger ml-2 mt-2" onClick={handleSubmit} type='submit'>Delete Post</button>
    </form>
  )
}

export default UserForm;