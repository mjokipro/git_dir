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
    const { id, to_user, from_user, body } = formData;
    alert(`Created user, ${to_user} w/ body ${body} & from ${from_user} + id ${id}`)
    setFormData(initialState)
  }
  

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor={formData.to_user}>To user:</label>
      <input
        id={formData.id}
        type="text"
        name={formData.to_user}
        placeholder="Enter text here..."
        value={formData.to_user}
        onChange={handleChange}
        className="form-control"
      />

      <label htmlFor={formData.from_user}>From user:</label>
      <input
        type="text"
        placeholder="Enter integer here..."
        name={formData.from_user}
        id={formData.id}
        value={formData.from_user}
        onChange={handleChange}
        className="form-control"
      />

      <label htmlFor={formData.body}>Body:</label>
      <input
        type="text"
        placeholder="Enter text here..."
        name={formData.body}
        id={formData.id}
        value={formData.body}
        onChange={handleChange}
        className="form-control"
      />

      <button className="btn btn-primary mt-2" onClick={handleSubmit} type='submit'>Send Message</button>
      <button className="btn btn-secondary ml-2 mt-2" onClick={handleSubmit} type='submit'>Update Message</button>
      <button className="btn btn-danger ml-2 mt-2" onClick={handleSubmit} type='submit'>Delete Message</button>
    </form>
  )
}

export default UserForm;