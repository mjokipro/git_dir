import React, { useState } from "react";
import JoblyApi from "../api/api";


const NewMessageForm = () => {

    const [formData, setFormData] = useState({
      to_user: "",
      from_user: "",
      to_first_name:"",
      from_first_name: "",
      body: ""
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
      let message = await JoblyApi.postMessage({...formData})
      console.log(message)
      setFormData(message)
    }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="to_user">To User:</label>
      <input 
        type="text"
        id="to_user"
        name="to_user"
        value={formData.to_user}
        onChange={handleChange}
        className="form-control"
        />

      <label htmlFor="from_user">From User:</label>
      <input 
        type="text"
        id="from_user"
        name="from_user"
        value={formData.from_user}
        onChange={handleChange}
        className="form-control"
        />

      <label htmlFor="body">Body</label>
      <input 
        type="text"
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
        className="form-control"
        />

      <button className="btn btn-secondary mt-3" type="submit">Submit</button>
    </form>
  )
}

export default NewMessageForm