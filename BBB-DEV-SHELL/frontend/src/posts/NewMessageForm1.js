import React, { useState } from "react";
import JoblyApi from "../api/api";


const NewMessageForm = () => {

    const [formData, setFormData] = useState({
      title: "",
      content: ""
    })

    const handleChange =(e) => {
      const {name, value} = e.target
      setFormData((data) =>({
        ...data,
        [name]: value,
      }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      // let {to_user, from_user, body} = formData
      let post = await JoblyApi.addPost({...formData})
      console.log(post)
      setFormData(post)
    }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input 
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-control"
        />

      <label htmlFor="content">Content:</label>
      <input 
        type="text"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        className="form-control"
        />

      <button className="btn btn-secondary mt-3" type="submit">Submit</button>
    </form>
  )
}

export default NewMessageForm